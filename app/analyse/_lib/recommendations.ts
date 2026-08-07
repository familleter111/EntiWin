import { THEME_LABEL, type ThemeId } from "./documents";
import { REQUIREMENTS, type Requirement } from "./requirements";

export type Priority = "elevee" | "ameliorer" | "surveiller";

export const PRIORITY_LABEL: Record<Priority, string> = {
  elevee: "Priorité élevée",
  ameliorer: "À améliorer",
  surveiller: "À surveiller",
};

export const PRIORITY_HINT: Record<Priority, string> = {
  elevee: "Actions à impact immédiat sur la conformité",
  ameliorer: "Actions importantes à planifier",
  surveiller: "Améliorations utiles à moyen terme",
};

export type Recommendation = {
  id: string;
  /** Action à mener, formulée à l'impératif. */
  title: string;
  /** Exigence dont découle l'action. */
  requirement: string;
  theme: ThemeId;
  themeLabel: string;
  detail: string;
  priority: Priority;
};

/** Intitulés d'action rédigés pour les exigences en écart. */
const ACTION_TITLES: Record<number, string> = {
  1: "Formaliser la vérification d'efficacité des CAPA",
  4: "Renforcer le suivi et la vérification de l'efficacité",
  6: "Cadrer la revue périodique des actions correctives",
  8: "Documenter les indicateurs et tendances CAPA",
  9: "Compléter l'intégration avec le management des risques",
  11: "Consigner l'historique de révision des documents",
  17: "Chiffrer la périodicité de revue documentaire",
  19: "Tracer la nature des modifications documentaires",
  23: "Établir la matrice d'habilitations documentaires",
};

function priorityOf(requirement: Requirement): Priority {
  if (requirement.criticality === "Élevée") return "elevee";
  if (requirement.criticality === "Moyenne") return "ameliorer";
  return "surveiller";
}

const ORDER: Priority[] = ["elevee", "ameliorer", "surveiller"];

/**
 * Plan d'amélioration : une action par exigence non couverte, priorisée
 * selon la criticité. Dérivé des résultats, donc toujours cohérent avec eux.
 */
export const RECOMMENDATIONS: Recommendation[] = REQUIREMENTS.filter(
  (r) => r.status !== "couverte",
)
  .map((r) => ({
    id: `reco-${r.id}`,
    title: ACTION_TITLES[r.id] ?? `Traiter l'exigence « ${r.label} »`,
    requirement: r.label,
    theme: r.theme,
    themeLabel: THEME_LABEL[r.theme],
    detail: r.recommendation,
    priority: priorityOf(r),
  }))
  .sort((a, b) => ORDER.indexOf(a.priority) - ORDER.indexOf(b.priority));

/**
 * Actions mises en avant dans le rapport et dans le PDF. Les plus critiques
 * d'abord, puisque RECOMMENDATIONS est déjà triée par priorité.
 */
export function topRecommendations(count = 3) {
  return RECOMMENDATIONS.slice(0, count);
}

export function priorityCounts() {
  return ORDER.map((priority) => ({
    priority,
    count: RECOMMENDATIONS.filter((r) => r.priority === priority).length,
  }));
}

/**
 * Score de conformité : couverture pondérée des exigences.
 * Couvert = 100 %, partiel = 50 %, non identifié = 0 %.
 */
export function complianceScore() {
  const covered = REQUIREMENTS.filter((r) => r.status === "couverte").length;
  const partial = REQUIREMENTS.filter((r) => r.status === "partielle").length;
  return Math.round(((covered + partial * 0.5) / REQUIREMENTS.length) * 100);
}
