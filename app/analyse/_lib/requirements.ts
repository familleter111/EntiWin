import type { ThemeId } from "./documents";

export type ReqStatus = "couverte" | "partielle" | "non-identifiee";
export type ReqCriticality = "Élevée" | "Moyenne" | "Faible";

export type Requirement = {
  id: number;
  theme: ThemeId;
  label: string;
  status: ReqStatus;
  criticality: ReqCriticality;
  /** Extrait du document justifiant le constat (null si rien n'a été trouvé). */
  evidence: { quote: string; source: string } | null;
  missing: string[];
  recommendation: string;
  /** Niveau de confiance de l'IA, en %. */
  confidence: number;
};

export const STATUS_LABEL: Record<ReqStatus, string> = {
  couverte: "Couverte",
  partielle: "Partiellement couverte",
  "non-identifiee": "Non identifiée",
};

const OK = "Aucun élément manquant relevé.";

/**
 * Résultat de démonstration : 24 exigences (15 couvertes, 6 partielles,
 * 3 non identifiées, 4 en criticité élevée). À remplacer par la sortie du
 * moteur d'analyse.
 */
export const REQUIREMENTS: Requirement[] = [
  {
    id: 1,
    theme: "deviations",
    label: "Vérification de l'efficacité des actions correctives",
    status: "partielle",
    criticality: "Élevée",
    evidence: {
      quote:
        "…une revue des actions correctives est réalisée périodiquement…",
      source: "Section 5.4, p.7",
    },
    missing: [
      "Méthode de vérification non définie",
      "Fréquence non précisée",
      "Responsabilités non précisées",
    ],
    recommendation:
      "Définir la méthode, la fréquence et les responsabilités de vérification.",
    confidence: 78,
  },
  {
    id: 2,
    theme: "deviations",
    label: "CAPA – Identification des causes racines",
    status: "couverte",
    criticality: "Moyenne",
    evidence: {
      quote:
        "…l'analyse des causes racines s'appuie sur la méthode des 5 pourquoi…",
      source: "Section 4.2, p.5",
    },
    missing: [],
    recommendation:
      "Conserver la méthode en place et tracer l'outil retenu pour chaque cas.",
    confidence: 94,
  },
  {
    id: 3,
    theme: "deviations",
    label: "Mise en œuvre des actions correctives",
    status: "couverte",
    criticality: "Moyenne",
    evidence: {
      quote:
        "…chaque action est affectée à un pilote avec une échéance validée…",
      source: "Section 5.1, p.6",
    },
    missing: [],
    recommendation: "Maintenir le suivi des échéances par pilote.",
    confidence: 92,
  },
  {
    id: 4,
    theme: "deviations",
    label: "Suivi et vérification de l'efficacité",
    status: "partielle",
    criticality: "Élevée",
    evidence: {
      quote: "…un point d'avancement est réalisé lors des revues qualité…",
      source: "Section 5.5, p.8",
    },
    missing: [
      "Critères d'efficacité non formalisés",
      "Preuve de clôture non exigée",
    ],
    recommendation:
      "Formaliser les critères d'efficacité et exiger une preuve avant clôture.",
    confidence: 74,
  },
  {
    id: 5,
    theme: "deviations",
    label: "Documentation des actions correctives",
    status: "couverte",
    criticality: "Faible",
    evidence: {
      quote: "…toute action correctives est enregistrée dans le registre CAPA…",
      source: "Section 3.3, p.4",
    },
    missing: [],
    recommendation: "Poursuivre l'enregistrement systématique au registre.",
    confidence: 96,
  },
  {
    id: 6,
    theme: "deviations",
    label: "Revue périodique des actions correctives",
    status: "partielle",
    criticality: "Élevée",
    evidence: {
      quote: "…une revue est organisée en fonction des besoins du service…",
      source: "Section 6.1, p.9",
    },
    missing: ["Périodicité non fixée", "Participants non désignés"],
    recommendation:
      "Fixer une périodicité minimale et désigner les participants requis.",
    confidence: 71,
  },
  {
    id: 7,
    theme: "deviations",
    label: "Responsabilités et autorités",
    status: "couverte",
    criticality: "Faible",
    evidence: {
      quote: "…le responsable qualité valide la clôture de chaque déviation…",
      source: "Section 2.1, p.3",
    },
    missing: [],
    recommendation: "Aucune action requise.",
    confidence: 95,
  },
  {
    id: 8,
    theme: "deviations",
    label: "Indicateurs et tendances CAPA",
    status: "non-identifiee",
    criticality: "Élevée",
    evidence: null,
    missing: [
      "Aucun indicateur de suivi identifié",
      "Aucune analyse de tendance documentée",
    ],
    recommendation:
      "Définir des indicateurs CAPA et une analyse de tendance périodique.",
    confidence: 88,
  },
  {
    id: 9,
    theme: "deviations",
    label: "Intégration avec le management des risques",
    status: "partielle",
    criticality: "Moyenne",
    evidence: {
      quote: "…les déviations majeures font l'objet d'une évaluation du risque…",
      source: "Section 4.6, p.6",
    },
    missing: ["Lien avec l'analyse de risque produit non décrit"],
    recommendation:
      "Décrire le lien entre déviation, CAPA et analyse de risque produit.",
    confidence: 80,
  },
  {
    id: 10,
    theme: "deviations",
    label: "Amélioration continue du système qualité",
    status: "couverte",
    criticality: "Faible",
    evidence: {
      quote: "…les enseignements sont repris en revue de direction…",
      source: "Section 7.2, p.11",
    },
    missing: [],
    recommendation: "Maintenir la remontée en revue de direction.",
    confidence: 91,
  },
  {
    id: 11,
    theme: "documentaire",
    label: "Historique de révision des documents",
    status: "non-identifiee",
    criticality: "Moyenne",
    evidence: null,
    missing: [
      "Aucun historique de révision détecté",
      "Motif de modification non consigné",
    ],
    recommendation:
      "Ajouter un tableau de révision daté et motivé dans chaque document.",
    confidence: 86,
  },
  {
    id: 12,
    theme: "documentaire",
    label: "Approbation avant diffusion",
    status: "couverte",
    criticality: "Moyenne",
    evidence: {
      quote: "…aucun document n'est diffusé sans double approbation…",
      source: "Section 2.4, p.3",
    },
    missing: [],
    recommendation: "Maintenir le circuit de double approbation.",
    confidence: 93,
  },
  {
    id: 13,
    theme: "documentaire",
    label: "Diffusion contrôlée des versions",
    status: "couverte",
    criticality: "Faible",
    evidence: {
      quote: "…la liste de diffusion est tenue à jour par l'assurance qualité…",
      source: "Section 3.1, p.4",
    },
    missing: [],
    recommendation: "Aucune action requise.",
    confidence: 90,
  },
  {
    id: 14,
    theme: "documentaire",
    label: "Retrait des versions obsolètes",
    status: "couverte",
    criticality: "Moyenne",
    evidence: {
      quote: "…les versions périmées sont retirées des postes de travail…",
      source: "Section 3.5, p.5",
    },
    missing: [],
    recommendation: "Conserver la preuve de retrait pour chaque version.",
    confidence: 89,
  },
  {
    id: 15,
    theme: "documentaire",
    label: "Archivage des documents qualité",
    status: "couverte",
    criticality: "Faible",
    evidence: {
      quote: "…l'archivage est assuré pendant la durée réglementaire…",
      source: "Section 8.1, p.12",
    },
    missing: [],
    recommendation: "Aucune action requise.",
    confidence: 92,
  },
  {
    id: 16,
    theme: "documentaire",
    label: "Identification unique des documents",
    status: "couverte",
    criticality: "Faible",
    evidence: {
      quote: "…chaque document porte un code unique et un numéro de version…",
      source: "Section 2.2, p.3",
    },
    missing: [],
    recommendation: "Aucune action requise.",
    confidence: 97,
  },
  {
    id: 17,
    theme: "documentaire",
    label: "Périodicité de revue documentaire",
    status: "partielle",
    criticality: "Moyenne",
    evidence: {
      quote: "…les documents sont revus régulièrement…",
      source: "Section 6.3, p.9",
    },
    missing: ["Intervalle de revue non chiffré"],
    recommendation: "Chiffrer l'intervalle maximal entre deux revues.",
    confidence: 76,
  },
  {
    id: 18,
    theme: "documentaire",
    label: "Gestion des formulaires et enregistrements",
    status: "couverte",
    criticality: "Faible",
    evidence: {
      quote: "…les formulaires vierges sont référencés au même titre que les SOP…",
      source: "Section 4.1, p.6",
    },
    missing: [],
    recommendation: "Aucune action requise.",
    confidence: 90,
  },
  {
    id: 19,
    theme: "documentaire",
    label: "Traçabilité des modifications",
    status: "partielle",
    criticality: "Moyenne",
    evidence: {
      quote: "…les modifications sont validées par le responsable du document…",
      source: "Section 5.2, p.7",
    },
    missing: ["Nature de la modification non tracée"],
    recommendation:
      "Consigner la nature de chaque modification, pas seulement son auteur.",
    confidence: 79,
  },
  {
    id: 20,
    theme: "documentaire",
    label: "Formation aux procédures applicables",
    status: "couverte",
    criticality: "Moyenne",
    evidence: {
      quote: "…la formation est enregistrée avant application de la procédure…",
      source: "Section 7.1, p.10",
    },
    missing: [],
    recommendation: "Maintenir l'enregistrement préalable des formations.",
    confidence: 88,
  },
  {
    id: 21,
    theme: "documentaire",
    label: "Contrôle des documents externes",
    status: "couverte",
    criticality: "Faible",
    evidence: {
      quote: "…les normes externes sont identifiées et leur diffusion maîtrisée…",
      source: "Section 3.8, p.5",
    },
    missing: [],
    recommendation: "Aucune action requise.",
    confidence: 87,
  },
  {
    id: 22,
    theme: "documentaire",
    label: "Sauvegarde et intégrité des données",
    status: "couverte",
    criticality: "Moyenne",
    evidence: {
      quote: "…les sauvegardes sont quotidiennes et vérifiées mensuellement…",
      source: "Section 9.2, p.13",
    },
    missing: [],
    recommendation: "Maintenir le contrôle mensuel de restauration.",
    confidence: 91,
  },
  {
    id: 23,
    theme: "documentaire",
    label: "Habilitations d'accès documentaire",
    status: "non-identifiee",
    criticality: "Moyenne",
    evidence: null,
    missing: [
      "Aucune matrice d'habilitation détectée",
      "Revue des accès non documentée",
    ],
    recommendation:
      "Établir une matrice d'habilitation et en planifier la revue annuelle.",
    confidence: 84,
  },
  {
    id: 24,
    theme: "documentaire",
    label: "Revue de direction du système documentaire",
    status: "couverte",
    criticality: "Faible",
    evidence: {
      quote: "…l'état du système documentaire est présenté en revue de direction…",
      source: "Section 7.4, p.11",
    },
    missing: [],
    recommendation: "Aucune action requise.",
    confidence: 93,
  },
];

export const NO_MISSING = OK;

export const CRITICALITIES: ReqCriticality[] = ["Élevée", "Moyenne", "Faible"];

/** Poids d'une exigence dans le score : couverte 100 %, partielle 50 %. */
export const COVERAGE: Record<ReqStatus, number> = {
  couverte: 100,
  partielle: 50,
  "non-identifiee": 0,
};

export type Stats = {
  total: number;
  couvertes: number;
  partielles: number;
  nonIdentifiees: number;
  critiques: number;
  /** Couverture pondérée, en %. */
  score: number;
};

function statsOf(list: Requirement[]): Stats {
  const couvertes = list.filter((r) => r.status === "couverte").length;
  const partielles = list.filter((r) => r.status === "partielle").length;

  return {
    total: list.length,
    couvertes,
    partielles,
    nonIdentifiees: list.filter((r) => r.status === "non-identifiee").length,
    critiques: list.filter((r) => r.criticality === "Élevée").length,
    score: list.length
      ? Math.round(((couvertes + partielles * 0.5) / list.length) * 100)
      : 0,
  };
}

/** Compteurs affichés dans la barre d'indicateurs. */
export function requirementStats(): Stats {
  return statsOf(REQUIREMENTS);
}

/** Mêmes compteurs, restreints à un thème (cartes « Scores par thème »). */
export function themeStats(theme: ThemeId): Stats {
  return statsOf(REQUIREMENTS.filter((r) => r.theme === theme));
}

export function requirementsOf(theme: ThemeId) {
  return REQUIREMENTS.filter((r) => r.theme === theme);
}
