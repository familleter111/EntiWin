"use client";

import { useEffect } from "react";

/**
 * Déclare la densité de l'écran courant sur la balise <html>, ce qui choisit
 * la courbe de zoom appliquée au tunnel (voir globals.css).
 *
 * Sans ce mécanisme, une seule courbe servait tout le tunnel : calibrée sur
 * l'écran le plus dense (le rapport complet), elle réduisait inutilement les
 * étapes légères, qui tiennent pourtant dans l'écran à taille réelle.
 */
export function Density({ value }: { value: "dense" }) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.wizard = value;
    return () => {
      delete root.dataset.wizard;
    };
  }, [value]);

  return null;
}
