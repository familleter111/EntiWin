# Deploying to Azure App Service

The app ships as a single container: nginx listens on `:8080` and reverse-proxies
to the Next.js standalone server running on `127.0.0.1:3000` inside the same
container (see [Dockerfile](Dockerfile), [docker/nginx.conf](docker/nginx.conf)).
That one image is what gets deployed to Azure App Service (Web App for
Containers). Database is Azure Database for MySQL Flexible Server, database
name `entiwin`.

Prerequisites: [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)
installed and logged in (`az login`). Local Docker is **not** required — the
build happens in Azure via `az acr build`.

## 0. Variables

Adjust names/region as needed (registry and MySQL server names must be
globally unique in Azure).

```bash
RESOURCE_GROUP=entiwin-rg
LOCATION=francecentral
ACR_NAME=entiwinacr                 # globally unique, alphanumeric only
APP_SERVICE_PLAN=entiwin-plan
WEBAPP_NAME=entiwin-app             # globally unique -> {name}.azurewebsites.net
MYSQL_SERVER_NAME=entiwin-mysql     # globally unique
MYSQL_ADMIN_USER=entiwinadmin
MYSQL_ADMIN_PASSWORD='ChangeMe-Use-A-Strong-Password1!'
MYSQL_DB_NAME=entiwin
IMAGE_NAME=entiwin
IMAGE_TAG=latest
```

## 1. Resource group + container registry

```bash
az group create --name "$RESOURCE_GROUP" --location "$LOCATION"

az acr create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$ACR_NAME" \
  --sku Basic
```

## 2. Build and push the image (in Azure, no local Docker needed)

Run this from the repo root — it uploads the build context and builds the
image using the [Dockerfile](Dockerfile) directly in ACR:

```bash
az acr build \
  --registry "$ACR_NAME" \
  --image "$IMAGE_NAME:$IMAGE_TAG" \
  .
```

## 3. MySQL Flexible Server (database `entiwin`)

```bash
az mysql flexible-server create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$MYSQL_SERVER_NAME" \
  --location "$LOCATION" \
  --admin-user "$MYSQL_ADMIN_USER" \
  --admin-password "$MYSQL_ADMIN_PASSWORD" \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --storage-size 32 \
  --database-name "$MYSQL_DB_NAME" \
  --public-access 0.0.0.0
```

No `--version` is passed, so Azure provisions its current default MySQL 8.0.x
(check `az mysql flexible-server create --help` if you need to pin a specific
version). `--public-access 0.0.0.0` is a special value that creates a firewall rule
allowing any Azure resource (including this App Service) to reach the
server — it does not open the server to the public internet.
`--database-name` already creates the `entiwin` database on the server, no
separate step needed. Flexible Server enforces TLS by default — the app's
`MYSQL_SSL=true` (see [.env.example](.env.example)) matches that.

> For production, prefer VNet integration + private access over the public
> "Allow Azure services" rule above; this doc keeps it simple to get running
> first.

## 4. App Service plan + Web App for Containers

```bash
az appservice plan create \
  --resource-group "$RESOURCE_GROUP" \
  --name "$APP_SERVICE_PLAN" \
  --is-linux \
  --sku B1

az webapp create \
  --resource-group "$RESOURCE_GROUP" \
  --plan "$APP_SERVICE_PLAN" \
  --name "$WEBAPP_NAME" \
  --deployment-container-image-name "$ACR_NAME.azurecr.io/$IMAGE_NAME:$IMAGE_TAG"
```

### Let the Web App pull from ACR via managed identity (no stored credentials)

```bash
az webapp identity assign \
  --resource-group "$RESOURCE_GROUP" \
  --name "$WEBAPP_NAME"

PRINCIPAL_ID=$(az webapp identity show \
  --resource-group "$RESOURCE_GROUP" --name "$WEBAPP_NAME" \
  --query principalId -o tsv)

ACR_ID=$(az acr show --name "$ACR_NAME" --query id -o tsv)

az role assignment create \
  --assignee "$PRINCIPAL_ID" \
  --scope "$ACR_ID" \
  --role AcrPull

az webapp config set \
  --resource-group "$RESOURCE_GROUP" \
  --name "$WEBAPP_NAME" \
  --generic-configurations '{"acrUseManagedIdentityCreds": true}'
```

### App settings: container port + database connection

```bash
MYSQL_HOST="$MYSQL_SERVER_NAME.mysql.database.azure.com"

az webapp config appsettings set \
  --resource-group "$RESOURCE_GROUP" \
  --name "$WEBAPP_NAME" \
  --settings \
    WEBSITES_PORT=8080 \
    DATABASE_URL="mysql://$MYSQL_ADMIN_USER:$MYSQL_ADMIN_PASSWORD@$MYSQL_HOST:3306/$MYSQL_DB_NAME?ssl-mode=REQUIRED" \
    MYSQL_HOST="$MYSQL_HOST" \
    MYSQL_PORT=3306 \
    MYSQL_DATABASE="$MYSQL_DB_NAME" \
    MYSQL_USER="$MYSQL_ADMIN_USER" \
    MYSQL_PASSWORD="$MYSQL_ADMIN_PASSWORD" \
    MYSQL_SSL=true
```

`WEBSITES_PORT=8080` tells App Service which port the container listens on —
must match `EXPOSE 8080` / nginx's `listen 8080` in this repo.

## 5. Verify

```bash
az webapp restart --resource-group "$RESOURCE_GROUP" --name "$WEBAPP_NAME"
az webapp log tail --resource-group "$RESOURCE_GROUP" --name "$WEBAPP_NAME"
```

Then open `https://$WEBAPP_NAME.azurewebsites.net`.

## Redeploying after a code change

```bash
az acr build --registry "$ACR_NAME" --image "$IMAGE_NAME:$IMAGE_TAG" .
az webapp restart --resource-group "$RESOURCE_GROUP" --name "$WEBAPP_NAME"
```

(App Service polls ACR periodically too, but an explicit restart guarantees
the new image is pulled immediately.)

## Custom domain + HTTPS

Use `az webapp config hostname add` for a custom domain and App Service's
free [managed certificate](https://learn.microsoft.com/azure/app-service/configure-ssl-app-service-certificate)
for TLS — no changes needed in this repo, App Service terminates TLS in
front of the container.

## Cleanup

```bash
az group delete --name "$RESOURCE_GROUP" --yes --no-wait
```
