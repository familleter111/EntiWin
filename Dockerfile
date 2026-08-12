# syntax=docker/dockerfile:1

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- runner: nginx (entry point, :8080) + the Next.js standalone server ----
FROM node:24-alpine AS runner
RUN apk add --no-cache nginx supervisor

WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=127.0.0.1

# `.next/standalone` ships a pruned node_modules + server.js; public/ and
# .next/static are not included there and must be copied alongside it.
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisord.conf

# nginx normally runs its master process as root to bind port 80 and to let
# workers drop privileges; here the whole container runs as the unprivileged
# `node` user instead, so nginx needs its working directories to already be
# owned by that user.
RUN mkdir -p /var/lib/nginx/tmp /var/log/nginx /run/nginx && \
    chown -R node:node /var/lib/nginx /var/log/nginx /run/nginx /etc/nginx

USER node
EXPOSE 8080
ENTRYPOINT ["supervisord", "-c", "/etc/supervisord.conf"]
