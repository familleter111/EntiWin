/**
 * Langues servies par le site. Le français est la langue de référence : c'est
 * la seule qui n'a pas de préfixe dans l'URL (`/a-propos` et non `/fr/a-propos`),
 * la réécriture est faite par `proxy.ts`.
 */
export const locales = ["fr", "en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** L'arabe s'écrit de droite à gauche : `dir` pilote toute la mise en page. */
export function direction(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Étiquette de chaque langue, écrite dans cette langue. */
export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
};

/** Code court affiché dans le sélecteur de l'en-tête. */
export const localeShort: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ar: "ع",
};

/** Étiquette de langue pour l'attribut `hreflang` et les métadonnées. */
export const htmlLang: Record<Locale, string> = {
  fr: "fr",
  en: "en",
  ar: "ar",
};

/**
 * Préfixe d'URL d'une langue : vide pour le français, `/en` ou `/ar` sinon.
 */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : `/${locale}`;
}

/**
 * Construit le chemin public d'une route interne pour une langue donnée.
 * `path` est toujours écrit sans préfixe (« / », « /a-propos »…).
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return `${localePrefix(locale)}${clean}` || "/";
}

/**
 * Retire le préfixe de langue d'un chemin observé dans le navigateur, pour
 * retrouver la route « nue » : `/en/a-propos` -> `/a-propos`. Sert à comparer
 * la page courante et à reconstruire la même page dans une autre langue.
 */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1);
    }
  }
  return pathname || "/";
}
