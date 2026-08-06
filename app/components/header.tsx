import Link from "next/link";
import { HeaderCta } from "./header-cta";
import { NavLinks } from "./nav-links";
import { ChevronDownIcon, GlobeIcon, Logo, MenuIcon } from "./icons";

/**
 * `site`  : en-tête de la vitrine (maquette page d'accueil)
 * `app`   : en-tête du tunnel d'analyse (baseline + CTA avec fusée)
 */
export function Header({ variant = "site" }: { variant?: "site" | "app" }) {
  const isApp = variant === "app";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-[72px] max-w-[1500px] items-center gap-6 px-6 xl:px-10">
        <Link
          href="/"
          prefetch
          className="flex items-center gap-2.5"
          aria-label="ENTI WIN — Accueil"
        >
          <Logo className="h-9 w-9 shrink-0" />
          <span className="font-display text-2xl font-extrabold tracking-tight text-navy-900">
            {isApp ? "ENTI WIN" : "ENTI WiN"}
          </span>
          {isApp && (
            <span className="ml-1 hidden max-w-[190px] text-[10.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-300 xl:block">
              AI-Assisted Pharmaceutical Quality Assessment
            </span>
          )}
        </Link>

        <NavLinks className="hidden flex-1 items-center justify-center gap-10 lg:flex" />

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          {isApp && (
            <span
              aria-hidden="true"
              className="hidden h-6 w-px bg-line sm:block"
            />
          )}

          {/* Sélecteur de langue : <details> natif, donc aucun JS chargé */}
          <details className="group relative hidden sm:block">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 rounded-lg px-2 py-2 text-[15px] font-medium text-ink-700 hover:text-navy-900">
              <GlobeIcon className="h-[18px] w-[18px]" />
              FR
              <ChevronDownIcon className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <ul className="absolute right-0 mt-2 w-32 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lg shadow-navy-900/5">
              {["Français", "English", "العربية"].map((lang) => (
                <li key={lang}>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-sm text-ink-700 hover:bg-navy-50 hover:text-navy-900"
                  >
                    {lang}
                  </button>
                </li>
              ))}
            </ul>
          </details>

          <HeaderCta className="btn-primary hidden sm:inline-flex" />

          {/* Menu mobile : également en HTML pur */}
          <details className="relative lg:hidden">
            <summary className="flex cursor-pointer list-none items-center rounded-lg border border-line p-2 text-navy-900">
              <MenuIcon className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-line bg-white p-2 shadow-lg shadow-navy-900/5">
              <NavLinks className="flex flex-col gap-3 px-3 py-2" />
              <HeaderCta className="btn-primary mt-2 w-full text-sm" />
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
