import type { ThemeId } from "./documents";

export type Complement = {
  id: string;
  theme: ThemeId;
  themeLabel: string;
  /** Question posée à l'utilisateur (écran « Questions complémentaires »). */
  question: string;
  /** Libellé court repris dans le résumé des réponses. */
  summary: string;
};

/**
 * Compléments demandés par l'IA quand une exigence n'est pas tranchée par les
 * documents. Statique pour l'instant : viendra du moteur d'analyse.
 */
export const COMPLEMENTS: Complement[] = [
  {
    id: "capa-efficacite",
    theme: "deviations",
    themeLabel: "Déviations et CAPA",
    question:
      "Disposez-vous d'une preuve de vérification d'efficacité pour les CAPA clôturées ?",
    summary: "Preuve de vérification d'efficacité des CAPA",
  },
  {
    id: "deviations-investigation",
    theme: "deviations",
    themeLabel: "Déviations et CAPA",
    question:
      "Les déviations critiques font-elles l'objet d'une investigation formalisée ?",
    summary: "Investigation des déviations critiques",
  },
  {
    id: "sop-historique",
    theme: "documentaire",
    themeLabel: "Gestion documentaire",
    question: "L'historique de révision de la SOP est-il disponible ?",
    summary: "Historique de révision de la SOP",
  },
];

/** Nombre de compléments attendus par thème. */
export function complementsByTheme(): { theme: ThemeId; label: string; count: number }[] {
  const map = new Map<ThemeId, { theme: ThemeId; label: string; count: number }>();

  for (const c of COMPLEMENTS) {
    const entry = map.get(c.theme) ?? {
      theme: c.theme,
      label: c.themeLabel,
      count: 0,
    };
    entry.count += 1;
    map.set(c.theme, entry);
  }

  return [...map.values()];
}

export const ANSWER_LABEL = {
  oui: "Oui",
  non: "Non",
  nsp: "Je ne sais pas",
} as const;
