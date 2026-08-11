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

  tunnel: {
    stepper: {
      ariaLabel: "Progression de l'analyse",
      steps: ["Documents", "Thèmes détectés", "Analyse IA", "Rapport"],
    },

    countries: {
      TN: "Tunisie",
      FR: "France",
      MA: "Maroc",
      DZ: "Algérie",
      BE: "Belgique",
      CH: "Suisse",
    },

    preparation: {
      title: "Préparez votre analyse",
      subtitle:
        "Suivez les étapes pour générer votre rapport réglementaire assisté par IA.",
      org: {
        title: "Organisation",
        hint: "Indiquez le nom de votre organisation pour commencer.",
        label: "Nom de l'organisation",
        placeholder: "Nom de votre organisation",
        continue: "Continuer",
        confirmedLabel: "Organisation renseignée",
        edit: "Modifier",
      },
      docsClosed: {
        title: "Chargez vos documents",
        hint: "Cette section s'ouvrira après validation de l'organisation.",
      },
      docs: {
        title: "Chargez vos documents",
        examples:
          "Exemples de documents : procédure de gestion des déviations, procédure CAPA, formulaire ou modèle de déviation, procédure de Change Control, SOP approuvée, rapport d'audit, réclamation qualité, rapport APR/PQR…",
        dropzoneTitle: "Déposez vos fichiers ici",
        dropzoneHint: "ou cliquez pour parcourir vos fichiers",
        formats: "PDF, DOCX, XLSX",
        selectButton: "Sélectionner des fichiers",
        ready: "Prêt",
        removeAria: "Retirer {name}",
        noFiles: "Aucun fichier ajouté",
        countReady: {
          one: "{n} document prêt pour l'analyse",
          other: "{n} documents prêts pour l'analyse",
        },
        continueThemes: "Continuer vers les thèmes détectés",
      },
    },

    themes: {
      title: "Thèmes détectés par l'IA",
      subtitle:
        "ENTI WIN a analysé les fichiers chargés et les a regroupés par thème.",
      filesAnalyzed: {
        one: "{n} fichier analysé",
        other: "{n} fichiers analysés",
      },
      themesDetectedCount: {
        one: "{n} thème détecté",
        other: "{n} thèmes détectés",
      },
      detected: "Détecté",
      noFilesForTheme:
        "Aucun document spécifique rattaché — l'IA évaluera ce thème à partir des fichiers fournis.",
      verifyPrompt: "Vérifiez les thèmes détectés avant de lancer l'analyse.",
      back: "Retour aux documents",
      confirm: "Confirmer les thèmes et lancer l'analyse IA",
    },

    analyseIa: {
      runningTitle: "Analyse IA en cours",
      runningSubtitle:
        "L'IA analyse vos documents pour identifier les preuves et détecter les écarts.",
      resumingTitle: "Analyse IA reprise",
      resumingSubtitle:
        "Vos compléments ont été intégrés : l'IA termine l'analyse des exigences restantes.",
      doneTitle: "Analyse terminée",
      doneSubtitle:
        "Les documents et vos compléments ont été pris en compte.",
      complementsNeeded: {
        title: "Compléments nécessaires",
        subtitle:
          "L'analyse a identifié quelques informations manquantes avant de pouvoir finaliser les résultats.",
        ringLabel: "Analyse temporairement en pause",
        infoTitle: "{n} informations à compléter",
        infoHint:
          "Répondez à quelques questions rapides. Vous pourrez également ajouter des documents si nécessaire.",
        complementsCount: {
          one: "{n} complément",
          other: "{n} compléments",
        },
        answerQuestions: "Répondre aux questions",
        seeDocuments: "Voir les documents analysés",
        stageReadFiles: "Lecture des documents",
        stageIdentify: "Identification des exigences",
        stageComplements: "Compléments nécessaires",
        stageComplementsHint: "En attente de vos réponses",
      },
      result: {
        title: "Votre analyse est prête",
        seeResults: "Voir les résultats",
      },
    },

    stageBar: {
      done: "Terminé",
      inProgress: "En cours",
      upcoming: "À venir",
    },

    complementsQuestions: {
      title: "Questions complémentaires",
      subtitle: "Quelques réponses suffisent pour compléter l'analyse.",
      quickQuestions: "{n} questions rapides",
      answeredOf: "{answered} sur {total}",
      addFile: "Ajouter un fichier (optionnel)",
      infoNote:
        "Les fichiers sont facultatifs et servent uniquement à compléter vos réponses.",
      back: "Retour",
      verify: "Vérifier mes réponses",
    },

    complementsReview: {
      title: "Vérifiez vos compléments",
      subtitle: "Relisez vos réponses avant de reprendre l'analyse.",
      summaryTitle: "Résumé des réponses",
      noFile: "Aucun fichier",
      edit: "Modifier",
      addDocTitle: "Ajouter un document complémentaire",
      addDocFormats: "PDF, DOCX, XLSX",
      addFile: "Ajouter un fichier",
      infoNote:
        "Ces réponses et documents seront intégrés à l'analyse en cours.",
      backToQuestions: "Retour aux questions",
      sendAndResume: "Envoyer et reprendre l'analyse",
    },

    analysisLive: {
      stages: {
        preparation: "Préparation des fichiers",
        extraction: "Extraction du contenu",
        identify: "Identification des exigences",
        evidence: "Recherche des preuves",
        gaps: "Analyse des écarts",
        synthesis: "Synthèse",
      },
      done: "Terminé",
      inProgress: "En cours",
      waiting: "En attente",
      requirementsAnalyzed: "{analysed} / {total} exigences analysées",
      themesDetectedLabel: "Thèmes détectés",
      requirementsAnalysisTitle: "Analyse des exigences",
      identifiedCounter: "exigences identifiées",
      analyzedCounter: "analysées",
      remainingCounter: "restantes",
      searchingEvidence: "Recherche de preuves dans les documents…",
      evidenceFound: "Preuve trouvée",
      noEvidence: "Aucune preuve",
      remainingRequirements: {
        one: "{n} exigence restante",
        other: "{n} exigences restantes",
      },
      ariaAnalyzing: "Analyse en cours, {value} pour cent",
      activityLogTitle: "Activité en temps réel",
      logIdentified: "{n} exigences identifiées",
      logThemeDetected: "Thème {theme} détecté",
      logExtractionDone: {
        one: "Extraction du contenu terminée ({n} fichier)",
        other: "Extraction du contenu terminée ({n} fichiers)",
      },
      logEvidenceFound: "Preuve trouvée : {source}",
      logNoEvidence: "Aucune preuve : exigence {id}",
      logAnalyzing: "Analyse de l'exigence {i}/{total}…",
      logSearching: "Recherche de preuves en cours…",
      logConsulting: "Consultation des documents…",
    },

    reportAccess: {
      title: "Informations pour générer le rapport",
      subtitle: "Renseignez vos informations pour accéder au rapport complet.",
      close: "Fermer",
      generalInfo: "Informations générales",
      lastName: "Nom",
      firstName: "Prénom",
      email: "Email professionnel",
      role: "Poste",
      phone: "Téléphone",
      countryCodeAria: "Indicatif pays",
      cancel: "Annuler",
      confirm: "Confirmer et générer le rapport",
    },

    report: {
      overview: {
        title: "Rapport d'analyse",
        generate: "Générer tout le rapport",
        globalScoreTitle: "Score global de conformité",
        overview: "Vue d'ensemble",
        scoresByTheme: "Scores par thème",
        ctaHint:
          "Générez le rapport complet pour consulter les analyses, preuves et recommandations IA.",
      },
      tiles: {
        requirements: "Exigences",
        covered: "Couvertes",
        partial: "Partielles",
        notIdentified: { one: "Non identifiée", other: "Non identifiées" },
        criticalPoints: { one: "Point critique", other: "Points critiques" },
      },
      full: {
        title: "Rapport complet d'analyse",
        generatedBadge: "Rapport généré",
        downloadPdf: "Télécharger le PDF",
        globalTab: "Vue globale",
        tabsHint:
          "Sélectionnez un thème pour consulter son analyse, ses preuves et ses recommandations.",
        scoreGlobal: "Score global de conformité",
        scoreOfTheme: "Score {theme}",
        weightedCoverage: "Couverture pondérée des exigences",
        legendCovered: "Couvert = 100 %",
        legendPartial: "Partiel = 50 %",
        legendNotIdentified: "Non identifié = 0 %",
        detailedAnalysis: "Analyse détaillée",
        searchPlaceholder: "Rechercher une exigence…",
        searchAria: "Rechercher une exigence",
        colId: "#",
        colRequirement: "Exigence",
        colStatus: "Statut",
        colCoverage: "Couverture",
        colConfidence: "Confiance",
        noResults: "Aucune exigence ne correspond à cette recherche.",
        noRequirements: "Aucune exigence",
        showingRange: "Affichage {from} à {to} sur {total} exigences",
        prevPage: "Page précédente",
        nextPage: "Page suivante",
        evidenceInDoc: "Preuve dans le document",
        noEvidenceDetail: "Aucune preuve détectée dans les documents fournis.",
        missingElements: "Éléments manquants",
        noMissingDetail: "Aucun élément manquant relevé.",
        aiRecommendation: "Recommandation IA",
        confidenceLevel: "Niveau de confiance : {n} %",
        recommendationsTitle: "Recommandations IA prioritaires",
        impactLabel: "Impact attendu :",
        effortLabel: "Effort :",
      },
      themeSummary: {
        deviations: {
          title: "Couverture suffisante avec des écarts",
          detail:
            "Des actions correctives sont requises pour renforcer le suivi et l'efficacité.",
        },
        documentaire: {
          title: "Bonne couverture globale",
          detail:
            "Documentation bien structurée avec quelques éléments à compléter.",
        },
      },
      generatedAt: "{day} à {time}",
      scoreAriaLabel: "Score de conformité : {score} %",
    },

    pdf: {
      backToReport: "Retour au rapport",
      previewPages: "Aperçu du document — {n} pages A4",
      downloadPdf: "Télécharger le PDF",
      brandTagline: "Évaluation qualité pharmaceutique assistée par IA",
      reportTitle: "Rapport d'analyse de conformité",
      analysisInProgress: "Analyse en cours",
      scoreTitle: "Score de conformité",
      weightedCoverageLine1: "Couverture pondérée",
      weightedCoverageLine2: "des exigences",
      legendLine: "Couvert = 100 % • Partiel = 50 % • Non identifié = 0 %",
      tiles: {
        requirements: "Exigences",
        covered: "Couvertes",
        partial: "Partielles",
        notIdentified: "Non identifiées",
        criticalPoints: "Points critiques",
      },
      synthesisTitle: "Synthèse des résultats",
      synthesisContinued: "(suite)",
      colId: "#",
      colRequirement: "Exigence",
      colStatus: "Statut",
      colCriticality: "Criticité",
      recommendationsTitle: "Recommandations IA prioritaires",
      footerBrand: "ENTI WIN",
      footerSubtitle: "Rapport d'analyse de conformité",
      pageOf: "Page {page} / {total}",
    },
  },
};

export type Dictionary = typeof fr;
