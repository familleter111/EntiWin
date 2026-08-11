import type { Locale } from "./config";

/**
 * Texte métier traduit sur place. Les libellés du référentiel BPF, les extraits
 * de preuve et les recommandations sont des données, pas de l'habillage : les
 * garder à côté de leur enregistrement rend la relecture métier possible ligne
 * à ligne, ce qu'un dictionnaire séparé de 300 clés rendrait impraticable.
 */
export type LocalizedText = Record<Locale, string>;

export function t(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export function tAll(texts: LocalizedText[], locale: Locale): string[] {
  return texts.map((text) => text[locale]);
}
