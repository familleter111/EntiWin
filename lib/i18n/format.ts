import type { Locale } from "./config";

/**
 * Repère BCP 47 utilisé pour les dates. `ar-TN` plutôt que `ar-SA` : ce
 * dernier bascule sur le calendrier hégirien par défaut dans `Intl`, ce qui
 * ferait apparaître une année différente de celle du reste du document.
 */
const INTL_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  ar: "ar-TN",
};

export function formatDate(
  at: number,
  locale: Locale,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], options).format(
    new Date(at),
  );
}
