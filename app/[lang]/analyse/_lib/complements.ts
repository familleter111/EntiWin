import type { Locale } from "@/lib/i18n/config";
import type { LocalizedText } from "@/lib/i18n/text";
import { THEME_LABEL, type ThemeId } from "./documents";

export type Complement = {
  id: string;
  theme: ThemeId;
  /** Question posée à l'utilisateur (écran « Questions complémentaires »). */
  question: LocalizedText;
  /** Libellé court repris dans le résumé des réponses. */
  summary: LocalizedText;
};

/**
 * Compléments demandés par l'IA quand une exigence n'est pas tranchée par les
 * documents. Statique pour l'instant : viendra du moteur d'analyse.
 */
export const COMPLEMENTS: Complement[] = [
  {
    id: "capa-efficacite",
    theme: "deviations",
    question: {
      fr: "Disposez-vous d'une preuve de vérification d'efficacité pour les CAPA clôturées ?",
      en: "Do you have evidence of effectiveness checks for closed CAPAs?",
      ar: "هل لديكم دليل على التحقق من فعالية الإجراءات التصحيحية والوقائية المغلقة؟",
    },
    summary: {
      fr: "Preuve de vérification d'efficacité des CAPA",
      en: "Evidence of CAPA effectiveness checks",
      ar: "دليل التحقق من فعالية الإجراءات التصحيحية والوقائية",
    },
  },
  {
    id: "deviations-investigation",
    theme: "deviations",
    question: {
      fr: "Les déviations critiques font-elles l'objet d'une investigation formalisée ?",
      en: "Are critical deviations subject to a formal investigation?",
      ar: "هل تخضع الانحرافات الحرجة لتحقيق رسمي موثَّق؟",
    },
    summary: {
      fr: "Investigation des déviations critiques",
      en: "Investigation of critical deviations",
      ar: "التحقيق في الانحرافات الحرجة",
    },
  },
  {
    id: "sop-historique",
    theme: "documentaire",
    question: {
      fr: "L'historique de révision de la SOP est-il disponible ?",
      en: "Is the revision history of the SOP available?",
      ar: "هل سجل مراجعات الإجراء التشغيلي المعياري متاح؟",
    },
    summary: {
      fr: "Historique de révision de la SOP",
      en: "SOP revision history",
      ar: "سجل مراجعات الإجراء التشغيلي المعياري",
    },
  },
];

export const ANSWER_LABEL: Record<"oui" | "non" | "nsp", LocalizedText> = {
  oui: { fr: "Oui", en: "Yes", ar: "نعم" },
  non: { fr: "Non", en: "No", ar: "لا" },
  nsp: { fr: "Je ne sais pas", en: "I don't know", ar: "لا أعلم" },
};

export const NO_ANSWER: LocalizedText = {
  fr: "Sans réponse",
  en: "No answer",
  ar: "بدون إجابة",
};

/** Nombre de compléments attendus par thème. */
export function complementsByTheme(
  locale: Locale,
): { theme: ThemeId; label: string; count: number }[] {
  const map = new Map<ThemeId, { theme: ThemeId; label: string; count: number }>();

  for (const c of COMPLEMENTS) {
    const entry = map.get(c.theme) ?? {
      theme: c.theme,
      label: THEME_LABEL[c.theme][locale],
      count: 0,
    };
    entry.count += 1;
    map.set(c.theme, entry);
  }

  return [...map.values()];
}
