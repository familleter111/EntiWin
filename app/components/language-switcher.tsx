"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  localeLabels,
  localePath,
  localeShort,
  locales,
  stripLocale,
} from "@/lib/i18n/config";
import { useCommon, useLocale } from "@/lib/i18n/dictionary-provider";
import { ChevronDownIcon, GlobeIcon } from "./icons";

/**
 * Changer de langue conduit à la même page dans l'autre langue, jamais à
 * l'accueil : on repart du chemin courant débarrassé de son préfixe.
 *
 * Le menu est un <details> natif — aucun état React, aucun gestionnaire
 * d'événement, et il fonctionne même si le JS n'a pas encore été chargé.
 */
export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const { language } = useCommon();

  const route = stripLocale(pathname);

  return (
    <details className="group relative hidden sm:block">
      <summary
        aria-label={language.ariaLabel}
        className="flex cursor-pointer list-none items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-ink-500 transition-colors hover:text-navy-900"
      >
        <GlobeIcon className="h-[17px] w-[17px]" />
        {localeShort[locale]}
        <ChevronDownIcon className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
      </summary>

      <ul className="absolute end-0 mt-2 w-36 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lg shadow-navy-900/5">
        {locales.map((item) => (
          <li key={item}>
            <Link
              href={localePath(item, route)}
              prefetch
              hrefLang={item}
              aria-current={item === locale ? "true" : undefined}
              className={`block px-3 py-2 text-start text-sm transition-colors hover:bg-navy-50 hover:text-navy-900 ${
                item === locale
                  ? "font-semibold text-navy-900"
                  : "text-ink-700"
              }`}
            >
              {localeLabels[item]}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
