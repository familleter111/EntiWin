"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/fr";

/**
 * Les composants serveur appellent `getDictionary()` directement ; ceux marqués
 * `"use client"` ne le peuvent pas. Ce contexte leur transmet la langue et la
 * part du dictionnaire dont ils ont besoin — et rien de plus, pour ne pas
 * envoyer au navigateur des textes qu'il n'affichera jamais.
 *
 * Seules des valeurs sérialisables (chaînes, tableaux, objets simples)
 * peuvent traverser la frontière composant serveur -> composant client : une
 * fonction dans `common` ou `tunnel` ferait échouer le rendu. C'est pourquoi
 * le dictionnaire n'en contient aucune — les chaînes paramétrées utilisent des
 * repères `{n}` combinés à `format()`/`plural()` (voir `lib/i18n/interpolate`).
 */
type CommonDictionary = Dictionary["common"];
type TunnelDictionary = Dictionary["tunnel"];

type Value = {
  locale: Locale;
  common: CommonDictionary;
  tunnel: TunnelDictionary;
};

const DictionaryContext = createContext<Value | null>(null);

export function DictionaryProvider({
  locale,
  common,
  tunnel,
  children,
}: Value & { children: ReactNode }) {
  return (
    <DictionaryContext.Provider value={{ locale, common, tunnel }}>
      {children}
    </DictionaryContext.Provider>
  );
}

function useDictionaryContext(): Value {
  const value = useContext(DictionaryContext);
  if (!value) {
    throw new Error(
      "useLocale/useCommon/useTunnel doivent être utilisés sous <DictionaryProvider>.",
    );
  }
  return value;
}

export function useLocale(): Locale {
  return useDictionaryContext().locale;
}

export function useCommon(): CommonDictionary {
  return useDictionaryContext().common;
}

export function useTunnel(): TunnelDictionary {
  return useDictionaryContext().tunnel;
}
