"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/fr";

/**
 * Les composants serveur appellent `getDictionary()` directement ; ceux marqués
 * `"use client"` ne le peuvent pas. Ce contexte leur transmet la langue et la
 * part du dictionnaire dont ils ont besoin — et rien de plus, pour ne pas
 * envoyer au navigateur des textes qu'il n'affichera jamais.
 */
type CommonDictionary = Dictionary["common"];

type Value = {
  locale: Locale;
  common: CommonDictionary;
};

const DictionaryContext = createContext<Value | null>(null);

export function DictionaryProvider({
  locale,
  common,
  children,
}: Value & { children: ReactNode }) {
  return (
    <DictionaryContext.Provider value={{ locale, common }}>
      {children}
    </DictionaryContext.Provider>
  );
}

function useDictionaryContext(): Value {
  const value = useContext(DictionaryContext);
  if (!value) {
    throw new Error(
      "useLocale/useCommon doivent être utilisés sous <DictionaryProvider>.",
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
