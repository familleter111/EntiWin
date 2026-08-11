import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/fr";

/**
 * Un import dynamique par langue : seule celle de la page rendue est chargée.
 * Les composants serveur n'ont rien à se passer, la langue est lue dans le
 * paramètre racine `[lang]`.
 */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./dictionaries/fr").then((m) => m.fr),
  en: () => import("./dictionaries/en").then((m) => m.en),
  ar: () => import("./dictionaries/ar").then((m) => m.ar),
};

export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  const resolved = locale ?? (await lang());
  if (!resolved || !isLocale(resolved)) notFound();
  return loaders[resolved]();
}

/** Langue de la page en cours, pour les composants serveur. */
export async function getLocale(): Promise<Locale> {
  const resolved = await lang();
  if (!resolved || !isLocale(resolved)) notFound();
  return resolved;
}

export type { Dictionary };
