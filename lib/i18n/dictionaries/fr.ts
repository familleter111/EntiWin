/**
 * Dictionnaire de référence. Sa forme définit le type `Dictionary` : toute clé
 * ajoutée ici devient obligatoire dans `en.ts` et `ar.ts`, et le build échoue
 * tant qu'une traduction manque. C'est le garde-fou contre les oublis.
 */
export const fr = {
  meta: {
    template: "%s | ENTI WIN",
    home: {
      title: "ENTI WIN — Évaluez vos documents qualité avec l'IA",
      description:
        "Identifiez en quelques minutes les exigences couvertes, les écarts et les points à améliorer dans vos documents qualité pharmaceutiques.",
    },
    howItWorks: {
      title: "Comment ça marche",
      description:
        "Les 4 étapes de l'évaluation ENTI WIN : import du document, analyse IA des exigences, synthèse des écarts et validation humaine.",
    },
    about: {
      title: "À propos",
      description:
        "ENTI WIN accompagne les équipes qualité pharmaceutiques dans l'évaluation de leurs documents face aux référentiels réglementaires.",
    },
  },

  common: {
    brand: "ENTI WiN",
    brandApp: "ENTI WIN",
    nav: {
      home: "Accueil",
      howItWorks: "Comment ça marche",
      about: "À propos",
      ariaLabel: "Navigation principale",
      homeAria: "ENTI WIN — Accueil",
      menuAria: "Ouvrir le menu",
    },
    cta: {
      startAnalysis: "Lancer mon analyse",
    },
    language: {
      ariaLabel: "Choisir la langue",
    },
    headerTagline: "Évaluation qualité pharmaceutique assistée par IA",
  },

  footer: {
    tagline: "Évaluation qualité assistée par IA",
    solutionBy: "Une solution",
    description:
      "Plateforme d'évaluation qualité assistée par IA dédiée à l'industrie pharmaceutique africaine et méditerranéenne : vos procédures, déviations et CAPA confrontées au référentiel BPF en quelques minutes, avec la source et l'horodatage de chaque résultat.",
    columns: {
      product: "Produit",
      company: "Entreprise",
      legal: "Légal",
    },
    links: {
      howItWorks: "Comment ça marche",
      startAnalysis: "Lancer mon analyse",
      sampleReport: "Exemple de rapport",
      home: "Accueil",
      about: "À propos",
      contact: "Contact",
      privacy: "Confidentialité",
      terms: "Conditions",
      cookies: "Cookies",
    },
    contact: {
      address: "Adresse",
      phone: "Téléphone",
      email: "Email",
      follow: "Suivez-nous",
      addressLine1: "Cité les pins,",
      addressLine2: "Tunis 1053",
    },
    rights: "Tous droits réservés",
    startupAct: "Startup Act",
    designedIn: "Designed in Tunis",
  },

  home: {
    badgeBrand: "ENTI WIN",
    badgeText: "Évaluation qualité pharmaceutique assistée par IA",
    titleLine1: "Détectez vos écarts",
    titleLine2: "avant l'inspection",
    subtitleLine1: "L'IA confronte vos procédures, déviations et CAPA aux",
    subtitleLine2: "exigences BPF : chaque écart est justifié et traçable.",
    ctaSecondary: "Voir comment ça marche",
    highlights: [
      "Résultat en minutes",
      "Chaque écart sourcé",
      "Validation humaine",
    ],
    imageAlt:
      "Aperçu d'une analyse IA en cours : 15 exigences couvertes, 6 partielles, 3 non identifiées.",
    stepsTitle: "Comment ça marche ?",
    steps: [
      {
        title: "1. Déposez vos documents",
        text: "Procédures, déviations, CAPA : PDF ou Word. Vos fichiers restent confidentiels.",
      },
      {
        title: "2. L'IA confronte les exigences",
        text: "Chaque exigence du référentiel est vérifiée dans vos documents, passage à l'appui.",
      },
      {
        title: "3. Décidez, preuves à l'appui",
        text: "Écarts, preuves et plan d'action priorisé : un rapport que vos experts n'ont plus qu'à valider.",
      },
    ],
  },

  howItWorks: {
    title: "Comment ça marche ?",
    intro:
      "Quatre étapes, aucune configuration complexe : de l'import du document jusqu'à la validation par votre équipe qualité.",
    steps: [
      {
        title: "1. Importez votre document",
        text: "Déposez une procédure, un dossier de lot ou un rapport qualité (PDF, Word, etc.). Vos fichiers restent confidentiels et ne servent qu'à votre analyse.",
      },
      {
        title: "2. L'IA analyse les exigences",
        text: "Le document est comparé, exigence par exigence, à la grille de référence sélectionnée. Chaque exigence est classée : couverte, partielle ou non identifiée.",
      },
      {
        title: "3. Consultez vos écarts",
        text: "Vous obtenez une synthèse claire, chaque conclusion étant justifiée par l'extrait du document correspondant. Exportez et passez à l'action.",
      },
      {
        title: "4. Validez humainement",
        text: "L'IA propose, l'expert dispose. Chaque écart peut être confirmé, ajusté ou rejeté par votre équipe qualité avant diffusion.",
      },
    ],
    traceabilityStrong: "Traçabilité complète :",
    traceabilityText:
      "chaque résultat conserve la source, la version du référentiel et l'horodatage de l'analyse.",
  },

  about: {
    title: "À propos d'ENTI WIN",
    paragraph1:
      "ENTI WIN est une solution d'évaluation qualité assistée par IA conçue pour les équipes pharmaceutiques. Elle confronte vos documents (procédures, dossiers, rapports) aux exigences des référentiels que vous utilisez, et met en évidence ce qui est couvert, partiellement couvert ou absent.",
    paragraph2:
      "L'objectif n'est pas de remplacer l'expert qualité, mais de lui faire gagner les heures de lecture croisée qui précèdent chaque revue documentaire — pour qu'il consacre son temps aux écarts qui comptent.",
    principlesTitle: "Nos principes",
    principles: [
      "Analyse assistée par IA, jamais autonome : la décision reste humaine.",
      "Résultats justifiés : chaque conclusion cite l'extrait source.",
      "Confidentialité : vos documents ne sont pas réutilisés pour entraîner de modèle.",
      "Traçabilité : version du référentiel, horodatage et historique conservés.",
    ],
    tryPrompt: "Envie de tester sur un de vos documents ?",
  },
};

export type Dictionary = typeof fr;
