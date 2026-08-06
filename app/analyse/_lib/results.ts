/**
 * Résultats de démonstration (étapes 5 et 6).
 * À remplacer par la réponse du moteur d'analyse quand il sera branché.
 */

export const RESULT_TILES = [
  { value: 24, label: "Exigences évaluées", tone: "navy" },
  { value: 15, label: "Couvertes", tone: "green" },
  { value: 6, label: "Partiellement couvertes", tone: "blue" },
  { value: 3, label: "Non identifiées", tone: "red" },
  { value: 2, label: "Incohérences", tone: "navy" },
  { value: 4, label: "Points critiques", tone: "red" },
] as const;

export const FIRST_GAPS = [
  {
    theme: "Déviations et CAPA",
    requirement: "Vérification de l'efficacité des actions correctives",
    status: "partial",
    criticality: "Élevée",
    evidence: "Section 5.4, p.7",
  },
  {
    theme: "Gestion documentaire",
    requirement: "Traçabilité de l'historique de révision",
    status: "missing",
    criticality: "Élevée",
    evidence: "Aucune preuve détectée",
  },
] as const;

export const REPORT_THEMES = [
  {
    id: "deviations",
    label: "Déviations et CAPA",
    covered: 8,
    partial: 3,
    missing: 2,
    recommendations: [
      "Formaliser la preuve de vérification d'efficacité des CAPA",
      "Relier chaque déviation à son investigation et aux actions associées",
      "Compléter les éléments de preuve manquants avant clôture",
    ],
  },
  {
    id: "documentaire",
    label: "Gestion documentaire",
    covered: 7,
    partial: 3,
    missing: 1,
    recommendations: [
      "Consigner l'historique de révision de chaque document maître",
      "Vérifier la diffusion contrôlée des versions approuvées",
      "Archiver les versions obsolètes avec leur date de retrait",
    ],
  },
] as const;

export const PRIORITIES = [
  {
    label: "Critique",
    count: 2,
    hint: "Actions immédiates requises",
    tone: "red",
  },
  {
    label: "Élevée",
    count: 5,
    hint: "Actions à planifier rapidement",
    tone: "orange",
  },
  {
    label: "À surveiller",
    count: 4,
    hint: "Améliorations recommandées",
    tone: "blue",
  },
] as const;

/** Étapes internes affichées pendant l'analyse (étape 4). */
export const ANALYSIS_STAGES = [
  "Lecture des documents",
  "Identification des exigences",
  "Recherche des preuves",
  "Synthèse des écarts",
] as const;
