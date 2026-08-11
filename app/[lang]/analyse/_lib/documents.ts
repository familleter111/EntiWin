import type { Locale } from "@/lib/i18n/config";
import type { LocalizedText } from "@/lib/i18n/text";

export type FileKind = "pdf" | "xlsx" | "docx";

export type UploadedFile = {
  name: string;
  size: number;
  kind: FileKind;
};

export const ACCEPTED_EXTENSIONS = [".pdf", ".docx", ".doc", ".xlsx", ".xls"];

export function kindOf(fileName: string): FileKind {
  const ext = fileName.toLowerCase().split(".").pop() ?? "";
  if (ext === "xlsx" || ext === "xls" || ext === "csv") return "xlsx";
  if (ext === "docx" || ext === "doc") return "docx";
  return "pdf";
}

/** Unités de taille de fichier : « Mo » en français, « MB » en anglais. */
const SIZE_UNITS: Record<Locale, { mb: string; kb: string; decimal: string }> = {
  fr: { mb: "Mo", kb: "Ko", decimal: "," },
  en: { mb: "MB", kb: "KB", decimal: "." },
  ar: { mb: "م.ب", kb: "ك.ب", decimal: "." },
};

export function formatSize(bytes: number, locale: Locale): string {
  const unit = SIZE_UNITS[locale];
  if (bytes >= 1024 * 1024) {
    const value = (bytes / (1024 * 1024)).toFixed(2).replace(".", unit.decimal);
    return `${value} ${unit.mb}`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))} ${unit.kb}`;
}

/** Jeu de démonstration utilisé tant qu'aucun fichier n'a été déposé. */
export const DEMO_FILES: UploadedFile[] = [
  { name: "Procedure_Gestion_Deviations.pdf", size: 1_520_000, kind: "pdf" },
  { name: "Procedure_CAPA.pdf", size: 1_005_568, kind: "pdf" },
  { name: "Liste_Maitresse_Documents.xlsx", size: 2_422_000, kind: "xlsx" },
  { name: "SOP_Qualite.pdf", size: 1_174_405, kind: "pdf" },
];

const DOC_LABELS = {
  deviationProcedure: {
    fr: "Procédure de gestion des déviations",
    en: "Deviation management procedure",
    ar: "إجراء إدارة الانحرافات",
  },
  capaProcedure: {
    fr: "Procédure CAPA",
    en: "CAPA procedure",
    ar: "إجراء الإجراءات التصحيحية والوقائية",
  },
  masterList: {
    fr: "Liste maîtresse des documents",
    en: "Document master list",
    ar: "القائمة الرئيسية للوثائق",
  },
  approvedSop: {
    fr: "Une SOP approuvée",
    en: "An approved SOP",
    ar: "إجراء تشغيلي معياري معتمد",
  },
  changeControl: {
    fr: "Procédure de Change Control",
    en: "Change control procedure",
    ar: "إجراء ضبط التغييرات",
  },
  auditReport: {
    fr: "Rapport d'audit",
    en: "Audit report",
    ar: "تقرير تدقيق",
  },
  complaint: {
    fr: "Réclamation qualité",
    en: "Quality complaint",
    ar: "شكوى تتعلق بالجودة",
  },
  aprPqr: {
    fr: "Rapport APR/PQR",
    en: "APR/PQR report",
    ar: "تقرير APR/PQR",
  },
  generic: {
    fr: "Document qualité",
    en: "Quality document",
    ar: "وثيقة جودة",
  },
  deviationForm: {
    fr: "Formulaire de déviation",
    en: "Deviation form",
    ar: "استمارة انحراف",
  },
  investigationReport: {
    fr: "Rapport d'investigation",
    en: "Investigation report",
    ar: "تقرير تحقيق",
  },
  documentControlProcedure: {
    fr: "Procédure de gestion documentaire",
    en: "Document control procedure",
    ar: "إجراء إدارة الوثائق",
  },
  approvedQualityDoc: {
    fr: "Document qualité approuvé",
    en: "Approved quality document",
    ar: "وثيقة جودة معتمدة",
  },
} satisfies Record<string, LocalizedText>;

/** Libellé métier déduit du nom de fichier. */
export function describeFile(name: string): LocalizedText {
  const n = name.toLowerCase();
  if (/deviation|ecart/.test(n)) return DOC_LABELS.deviationProcedure;
  if (/capa/.test(n)) return DOC_LABELS.capaProcedure;
  if (/liste|maitresse|maîtresse/.test(n)) return DOC_LABELS.masterList;
  if (/sop/.test(n)) return DOC_LABELS.approvedSop;
  if (/change/.test(n)) return DOC_LABELS.changeControl;
  if (/audit/.test(n)) return DOC_LABELS.auditReport;
  if (/reclamation|réclamation/.test(n)) return DOC_LABELS.complaint;
  if (/apr|pqr/.test(n)) return DOC_LABELS.aprPqr;
  return DOC_LABELS.generic;
}

export type ThemeId = "deviations" | "documentaire";

export type DetectedTheme = {
  id: ThemeId;
  label: string;
  files: (UploadedFile & { description: string })[];
};

export const THEME_LABEL: Record<ThemeId, LocalizedText> = {
  deviations: {
    fr: "Déviations et CAPA",
    en: "Deviations and CAPA",
    ar: "الانحرافات والإجراءات التصحيحية والوقائية",
  },
  documentaire: {
    fr: "Gestion documentaire",
    en: "Document control",
    ar: "إدارة الوثائق",
  },
};

const KEYWORDS_DEVIATIONS =
  /deviation|déviation|ecart|écart|capa|change|audit|reclamation|réclamation|apr|pqr/;

function themeOf(name: string): ThemeId | null {
  const n = name.toLowerCase();
  if (KEYWORDS_DEVIATIONS.test(n)) return "deviations";
  if (/liste|maitresse|maîtresse|sop|document|procedure|procédure|qualite|qualité/.test(n))
    return "documentaire";
  return null;
}

/** Libellé de repli par thème, quand le nom du fichier n'est pas explicite. */
const FALLBACK_LABELS: Record<ThemeId, LocalizedText[]> = {
  deviations: [
    DOC_LABELS.deviationProcedure,
    DOC_LABELS.capaProcedure,
    DOC_LABELS.deviationForm,
    DOC_LABELS.investigationReport,
  ],
  documentaire: [
    DOC_LABELS.masterList,
    DOC_LABELS.approvedSop,
    DOC_LABELS.documentControlProcedure,
    DOC_LABELS.approvedQualityDoc,
  ],
};

/**
 * Regroupement des fichiers par thème (règles côté client, sans back-office).
 * Les deux thèmes du parcours — « Déviations et CAPA » et « Gestion
 * documentaire » — sont toujours affichés : les fichiers dont le nom n'est pas
 * explicite sont répartis pour couvrir les deux, et un thème sans document
 * rattaché reste visible (l'analyse porte sur les deux dans tous les cas).
 */
export function detectThemes(
  files: UploadedFile[],
  locale: Locale,
): DetectedTheme[] {
  const buckets: Record<ThemeId, UploadedFile[]> = {
    deviations: [],
    documentaire: [],
  };
  const unknown: UploadedFile[] = [];

  for (const file of files) {
    const id = themeOf(file.name);
    if (id) buckets[id].push(file);
    else unknown.push(file);
  }

  // Répartition des fichiers non explicites : on comble d'abord le thème vide.
  for (const file of unknown) {
    const target =
      buckets.deviations.length <= buckets.documentaire.length
        ? "deviations"
        : "documentaire";
    buckets[target].push(file);
  }

  // Aucun mot-clé n'a matché d'un côté : on rééquilibre pour garder le parcours
  // cohérent (déviations + documentaire) dès qu'il y a au moins 2 fichiers.
  const ids: ThemeId[] = ["deviations", "documentaire"];
  for (const id of ids) {
    const other = id === "deviations" ? "documentaire" : "deviations";
    if (buckets[id].length === 0 && buckets[other].length >= 2) {
      buckets[id].push(buckets[other].pop()!);
    }
  }

  return ids.map((id) => ({
    id,
    label: THEME_LABEL[id][locale],
    files: buckets[id].map((file, i) => {
      const described = describeFile(file.name);
      const fallback = FALLBACK_LABELS[id][i % FALLBACK_LABELS[id].length];
      return {
        ...file,
        description:
          described === DOC_LABELS.generic
            ? fallback[locale]
            : described[locale],
      };
    }),
  }));
}
