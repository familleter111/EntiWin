import Link from "next/link";
import { HeaderCta } from "./header-cta";
import { LanguageSwitcher } from "./language-switcher";
import { NavLinks } from "./nav-links";
import { Logo, MenuIcon } from "./icons";
import { localePath } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

/**
 * `site`  : en-tête de la vitrine (maquette page d'accueil)
 * `app`   : en-tête du tunnel d'analyse (baseline + CTA avec fusée)
 */
export async function Header({
  variant = "site",
}: {
  variant?: "site" | "app";
}) {
  const isApp = variant === "app";
  const locale = await getLocale();
  const { common } = await getDictionary(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/*
       * Trois colonnes de largeur égale sur les côtés : la navigation est
       * centrée sur la page, et non dans la place que lui laissent la marque et
       * les actions — sinon elle se décale selon que le CTA est affiché ou non.
       * `minmax(0,1fr)` empêche la baseline de l'en-tête applicatif d'élargir
       * la colonne de gauche et de pousser le centre.
       */}
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center gap-6 px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:px-10">
        <Link
          href={localePath(locale, "/")}
          prefetch
          className="flex items-center gap-2.5"
          aria-label={common.nav.homeAria}
        >
          <Logo className="h-8 w-8 shrink-0 text-navy-900" />
          <span className="font-display text-[21px] font-bold tracking-tight text-navy-900">
            {isApp ? common.brandApp : common.brand}
          </span>
          {isApp && (
            <span className="ms-1 hidden max-w-[250px] text-[10.5px] font-medium uppercase leading-tight tracking-[0.06em] text-ink-300 xl:block">
              {common.headerTagline}
            </span>
          )}
        </Link>

        <NavLinks className="hidden items-center justify-center gap-9 lg:flex" />

        <div className="ms-auto flex items-center gap-2">
          {isApp && (
            <span
              aria-hidden="true"
              className="hidden h-6 w-px bg-line sm:block"
            />
          )}

          <LanguageSwitcher />

          {/* Bouton d'en-tête : plus compact que le CTA des pages (utilitaires
              appliqués après `btn-primary`, ils l'emportent sur la classe). */}
          <HeaderCta className="btn-primary hidden px-5 py-2.5 text-sm sm:inline-flex" />

          {/* Menu mobile : également en HTML pur */}
          <details className="relative lg:hidden">
            <summary
              aria-label={common.nav.menuAria}
              className="flex cursor-pointer list-none items-center rounded-lg border border-line p-2 text-ink-700"
            >
              <MenuIcon className="h-5 w-5" />
            </summary>
            <div className="absolute end-0 mt-2 w-56 rounded-xl border border-line bg-white p-2 shadow-lg shadow-navy-900/5">
              <NavLinks className="flex flex-col gap-3 px-3 py-2" />
              <HeaderCta className="btn-primary mt-2 w-full text-sm" />
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
