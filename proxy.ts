import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

/**
 * Toutes les routes vivent sous `app/[lang]`, mais le français ne porte pas de
 * préfixe dans l'URL : `/a-propos` doit servir la page `/fr/a-propos`.
 * C'est une réécriture interne, pas une redirection — l'adresse affichée dans
 * la barre du navigateur reste `/a-propos`, et la page rendue est celle qui a
 * été pré-générée au build.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Ni les fichiers internes de Next, ni les images et polices de `public/`.
  matcher: ["/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|avif|ico)$).*)"],
};
