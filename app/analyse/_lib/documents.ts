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

export function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2).replace(".", ",")} Mo`;
  return `${Math.max(1, Math.round(bytes / 1024))} Ko`;
}

/** Jeu de démonstration utilisé tant qu'aucun fichier n'a été déposé. */
export const DEMO_FILES: UploadedFile[] = [
  { name: "Procedure_Gestion_Deviations.pdf", size: 1_520_000, kind: "pdf" },
  { name: "Procedure_CAPA.pdf", size: 1_005_568, kind: "pdf" },
  { name: "Liste_Maitresse_Documents.xlsx", size: 2_422_000, kind: "xlsx" },
  { name: "SOP_Qualite.pdf", size: 1_174_405, kind: "pdf" },
];

/** Libellé métier déduit du nom de fichier. */
export function describeFile(name: string): string {
  const n = name.toLowerCase();
  if (/deviation|ecart/.test(n)) return "Procédure de gestion des déviations";
  if (/capa/.test(n)) return "Procédure CAPA";
  if (/liste|maitresse|maîtresse/.test(n)) return "Liste maîtresse des documents";
  if (/sop/.test(n)) return "Une SOP approuvée";
  if (/change/.test(n)) return "Procédure de Change Control";
  if (/audit/.test(n)) return "Rapport d'audit";
  if (/reclamation|réclamation/.test(n)) return "Réclamation qualité";
  if (/apr|pqr/.test(n)) return "Rapport APR/PQR";
  return "Document qualité";
}

export type ThemeId = "deviations" | "documentaire";

export type DetectedTheme = {
  id: ThemeId;
  label: string;
  files: (UploadedFile & { description: string })[];
};

export const THEME_LABEL: Record<ThemeId, string> = {
  deviations: "Déviations et CAPA",
  documentaire: "Gestion documentaire",
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
const FALLBACK_LABELS: Record<ThemeId, string[]> = {
  deviations: [
    "Procédure de gestion des déviations",
    "Procédure CAPA",
    "Formulaire de déviation",
    "Rapport d'investigation",
  ],
  documentaire: [
    "Liste maîtresse des documents",
    "Une SOP approuvée",
    "Procédure de gestion documentaire",
    "Document qualité approuvé",
  ],
};

/**
 * Regroupement des fichiers par thème (règles côté client, sans back-office).
 * Les deux thèmes du parcours — « Déviations et CAPA » et « Gestion
 * documentaire » — sont toujours affichés : les fichiers dont le nom n'est pas
 * explicite sont répartis pour couvrir les deux, et un thème sans document
 * rattaché reste visible (l'analyse porte sur les deux dans tous les cas).
 */
export function detectThemes(files: UploadedFile[]): DetectedTheme[] {
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
    label: THEME_LABEL[id],
    files: buckets[id].map((file, i) => {
      const described = describeFile(file.name);
      return {
        ...file,
        description:
          described === "Document qualité"
            ? FALLBACK_LABELS[id][i % FALLBACK_LABELS[id].length]
            : described,
      };
    }),
  }));
}
