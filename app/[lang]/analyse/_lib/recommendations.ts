import type { Locale } from "@/lib/i18n/config";
import type { LocalizedText } from "@/lib/i18n/text";
import { THEME_LABEL, type ThemeId } from "./documents";
import {
  REQUIREMENTS,
  requirementStats,
  type Requirement,
} from "./requirements";

export type Priority = "elevee" | "ameliorer" | "surveiller";

export const PRIORITY_LABEL: Record<Priority, LocalizedText> = {
  elevee: { fr: "Priorité élevée", en: "High priority", ar: "أولوية مرتفعة" },
  ameliorer: { fr: "À améliorer", en: "To improve", ar: "بحاجة إلى تحسين" },
  surveiller: { fr: "À surveiller", en: "To monitor", ar: "تحت المراقبة" },
};

export const PRIORITY_HINT: Record<Priority, LocalizedText> = {
  elevee: {
    fr: "Actions à impact immédiat sur la conformité",
    en: "Actions with an immediate impact on compliance",
    ar: "إجراءات ذات أثر فوري على المطابقة",
  },
  ameliorer: {
    fr: "Actions importantes à planifier",
    en: "Important actions to plan",
    ar: "إجراءات مهمة ينبغي برمجتها",
  },
  surveiller: {
    fr: "Améliorations utiles à moyen terme",
    en: "Useful improvements in the medium term",
    ar: "تحسينات مفيدة على المدى المتوسط",
  },
};

export type Level = "eleve" | "moyen" | "faible";

export const LEVEL_LABEL: Record<Level, LocalizedText> = {
  eleve: { fr: "Élevé", en: "High", ar: "مرتفع" },
  moyen: { fr: "Moyen", en: "Medium", ar: "متوسط" },
  faible: { fr: "Faible", en: "Low", ar: "منخفض" },
};

export type Recommendation = {
  id: string;
  /** Action à mener, formulée à l'impératif. */
  title: string;
  /** Exigence dont découle l'action. */
  requirement: string;
  requirementId: number;
  theme: ThemeId;
  themeLabel: string;
  detail: string;
  priority: Priority;
  /** Gain de conformité attendu, repris de la criticité de l'exigence. */
  impact: Level;
  /** Charge estimée, d'après le nombre d'éléments manquants à produire. */
  effort: Level;
};

/** Intitulés d'action rédigés pour les exigences en écart. */
const ACTION_TITLES: Record<number, LocalizedText> = {
  1: {
    fr: "Formaliser la vérification d'efficacité des CAPA",
    en: "Formalise the CAPA effectiveness check",
    ar: "توثيق التحقق من فعالية الإجراءات التصحيحية والوقائية",
  },
  4: {
    fr: "Renforcer le suivi et la vérification de l'efficacité",
    en: "Strengthen follow-up and effectiveness checks",
    ar: "تعزيز المتابعة والتحقق من الفعالية",
  },
  6: {
    fr: "Cadrer la revue périodique des actions correctives",
    en: "Frame the periodic review of corrective actions",
    ar: "تأطير المراجعة الدورية للإجراءات التصحيحية",
  },
  8: {
    fr: "Documenter les indicateurs et tendances CAPA",
    en: "Document CAPA indicators and trends",
    ar: "توثيق مؤشرات واتجاهات الإجراءات التصحيحية والوقائية",
  },
  9: {
    fr: "Compléter l'intégration avec le management des risques",
    en: "Complete the integration with risk management",
    ar: "استكمال التكامل مع إدارة المخاطر",
  },
  11: {
    fr: "Consigner l'historique de révision des documents",
    en: "Record the document revision history",
    ar: "تدوين سجل مراجعات الوثائق",
  },
  17: {
    fr: "Chiffrer la périodicité de revue documentaire",
    en: "Quantify the document review frequency",
    ar: "تحديد دورية مراجعة الوثائق رقميًا",
  },
  19: {
    fr: "Tracer la nature des modifications documentaires",
    en: "Record the nature of document changes",
    ar: "توثيق طبيعة التعديلات على الوثائق",
  },
  23: {
    fr: "Établir la matrice d'habilitations documentaires",
    en: "Establish the document permission matrix",
    ar: "وضع مصفوفة صلاحيات الوثائق",
  },
};

/** Repli quand aucun intitulé n'a été rédigé pour l'exigence. */
const FALLBACK_TITLE: Record<Locale, (label: string) => string> = {
  fr: (label) => `Traiter l'exigence « ${label} »`,
  en: (label) => `Address the requirement “${label}”`,
  ar: (label) => `معالجة المتطلب «${label}»`,
};

function priorityOf(requirement: Requirement): Priority {
  if (requirement.criticality === "elevee") return "elevee";
  if (requirement.criticality === "moyenne") return "ameliorer";
  return "surveiller";
}

function impactOf(requirement: Requirement): Level {
  if (requirement.criticality === "elevee") return "eleve";
  if (requirement.criticality === "moyenne") return "moyen";
  return "faible";
}

/** Plus il y a d'éléments à produire, plus l'action coûte cher. */
function effortOf(requirement: Requirement): Level {
  if (requirement.missing.length >= 4) return "eleve";
  if (requirement.missing.length >= 3) return "moyen";
  return "faible";
}

const ORDER: Priority[] = ["elevee", "ameliorer", "surveiller"];

/**
 * Plan d'amélioration : une action par exigence non couverte, priorisée
 * selon la criticité. Dérivé des résultats, donc toujours cohérent avec eux.
 */
export function recommendations(locale: Locale): Recommendation[] {
  return REQUIREMENTS.filter((r) => r.status !== "couverte")
    .map((r) => ({
      id: `reco-${r.id}`,
      title:
        ACTION_TITLES[r.id]?.[locale] ??
        FALLBACK_TITLE[locale](r.label[locale]),
      requirement: r.label[locale],
      requirementId: r.id,
      theme: r.theme,
      themeLabel: THEME_LABEL[r.theme][locale],
      detail: r.recommendation[locale],
      priority: priorityOf(r),
      impact: impactOf(r),
      effort: effortOf(r),
    }))
    .sort((a, b) => ORDER.indexOf(a.priority) - ORDER.indexOf(b.priority));
}

/**
 * Actions mises en avant dans le rapport et dans le PDF. Les plus critiques
 * d'abord, puisque la liste est déjà triée par priorité.
 * `theme` restreint la liste à l'onglet consulté.
 */
export function topRecommendations(locale: Locale, count = 3, theme?: ThemeId) {
  const list = recommendations(locale);
  const scoped = theme ? list.filter((r) => r.theme === theme) : list;
  return scoped.slice(0, count);
}

export function priorityCounts(locale: Locale) {
  const list = recommendations(locale);
  return ORDER.map((priority) => ({
    priority,
    count: list.filter((r) => r.priority === priority).length,
  }));
}

/**
 * Score de conformité : couverture pondérée des exigences.
 * Couvert = 100 %, partiel = 50 %, non identifié = 0 %.
 */
export function complianceScore() {
  return requirementStats().score;
}
