import type { Dictionary } from "./fr";

export const en: Dictionary = {
  meta: {
    template: "%s | ENTI WIN",
    home: {
      title: "ENTI WIN — Assess your quality documents with AI",
      description:
        "Identify in minutes which requirements are covered, where the gaps are and what to improve in your pharmaceutical quality documents.",
    },
    howItWorks: {
      title: "How it works",
      description:
        "The 4 steps of an ENTI WIN assessment: upload the document, AI review of the requirements, gap summary and human validation.",
    },
    about: {
      title: "About",
      description:
        "ENTI WIN supports pharmaceutical quality teams in assessing their documents against regulatory standards.",
    },
  },

  common: {
    brand: "ENTI WiN",
    brandApp: "ENTI WIN",
    nav: {
      home: "Home",
      howItWorks: "How it works",
      about: "About",
      ariaLabel: "Main navigation",
      homeAria: "ENTI WIN — Home",
      menuAria: "Open menu",
    },
    cta: {
      startAnalysis: "Start my analysis",
    },
    language: {
      ariaLabel: "Choose language",
    },
    headerTagline: "AI-assisted pharmaceutical quality assessment",
  },

  footer: {
    tagline: "AI-assisted quality assessment",
    solutionBy: "A solution by",
    description:
      "An AI-assisted quality assessment platform for the African and Mediterranean pharmaceutical industry: your procedures, deviations and CAPAs checked against the GMP standard in minutes, with the source and timestamp behind every result.",
    columns: {
      product: "Product",
      company: "Company",
      legal: "Legal",
    },
    links: {
      howItWorks: "How it works",
      startAnalysis: "Start my analysis",
      sampleReport: "Sample report",
      home: "Home",
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
    },
    contact: {
      address: "Address",
      phone: "Phone",
      email: "Email",
      follow: "Follow us",
      addressLine1: "Cité les pins,",
      addressLine2: "Tunis 1053",
    },
    rights: "All rights reserved",
    startupAct: "Startup Act",
    designedIn: "Designed in Tunis",
  },

  home: {
    badgeBrand: "ENTI WIN",
    badgeText: "AI-assisted pharmaceutical quality assessment",
    titleLine1: "Find your gaps",
    titleLine2: "before the inspection",
    subtitleLine1: "AI checks your procedures, deviations and CAPAs against",
    subtitleLine2: "GMP requirements: every gap justified and traceable.",
    ctaSecondary: "See how it works",
    highlights: ["Results in minutes", "Every gap sourced", "Human validation"],
    imageAlt:
      "Preview of an AI analysis in progress: 15 requirements covered, 6 partial, 3 not identified.",
    stepsTitle: "How it works",
    steps: [
      {
        title: "1. Upload your documents",
        text: "Procedures, deviations, CAPAs: PDF or Word. Your files remain confidential.",
      },
      {
        title: "2. AI checks the requirements",
        text: "Every requirement in the standard is checked against your documents, with the supporting excerpt.",
      },
      {
        title: "3. Decide, with the evidence",
        text: "Gaps, evidence and a prioritised action plan: a report your experts only have to validate.",
      },
    ],
  },

  howItWorks: {
    title: "How it works",
    intro:
      "Four steps, no complex setup: from uploading the document to sign-off by your quality team.",
    steps: [
      {
        title: "1. Upload your document",
        text: "Submit a procedure, a batch record or a quality report (PDF, Word, etc.). Your files stay confidential and are used for your analysis only.",
      },
      {
        title: "2. AI reviews the requirements",
        text: "The document is compared, requirement by requirement, against the selected reference grid. Each requirement is classified: covered, partial or not identified.",
      },
      {
        title: "3. Review your gaps",
        text: "You get a clear summary, every conclusion backed by the matching excerpt from your document. Export it and act.",
      },
      {
        title: "4. Validate as a human",
        text: "The AI proposes, the expert decides. Every gap can be confirmed, adjusted or rejected by your quality team before release.",
      },
    ],
    traceabilityStrong: "Full traceability:",
    traceabilityText:
      "every result keeps the source, the version of the standard and the timestamp of the analysis.",
  },

  about: {
    title: "About ENTI WIN",
    paragraph1:
      "ENTI WIN is an AI-assisted quality assessment solution built for pharmaceutical teams. It checks your documents (procedures, records, reports) against the requirements of the standards you use, and highlights what is covered, partially covered or missing.",
    paragraph2:
      "The goal is not to replace the quality expert, but to save them the hours of cross-reading that precede every document review — so their time goes to the gaps that matter.",
    principlesTitle: "Our principles",
    principles: [
      "AI-assisted analysis, never autonomous: the decision stays human.",
      "Justified results: every conclusion quotes the source excerpt.",
      "Confidentiality: your documents are never reused to train a model.",
      "Traceability: version of the standard, timestamp and history retained.",
    ],
    tryPrompt: "Want to try it on one of your documents?",
  },

  tunnel: {
    stepper: {
      ariaLabel: "Analysis progress",
      steps: ["Documents", "Themes detected", "AI analysis", "Report"],
    },

    countries: {
      TN: "Tunisia",
      FR: "France",
      MA: "Morocco",
      DZ: "Algeria",
      BE: "Belgium",
      CH: "Switzerland",
    },

    preparation: {
      title: "Prepare your analysis",
      subtitle:
        "Follow the steps to generate your AI-assisted regulatory report.",
      org: {
        title: "Organisation",
        hint: "Enter your organisation's name to get started.",
        label: "Organisation name",
        placeholder: "Your organisation's name",
        continue: "Continue",
        confirmedLabel: "Organisation set",
        edit: "Edit",
      },
      docsClosed: {
        title: "Upload your documents",
        hint: "This section opens once the organisation is confirmed.",
      },
      docs: {
        title: "Upload your documents",
        examples:
          "Example documents: deviation management procedure, CAPA procedure, deviation form or template, change control procedure, approved SOP, audit report, quality complaint, APR/PQR report…",
        dropzoneTitle: "Drop your files here",
        dropzoneHint: "or click to browse your files",
        formats: "PDF, DOCX, XLSX",
        selectButton: "Select files",
        ready: "Ready",
        removeAria: "Remove {name}",
        noFiles: "No files added",
        countReady: {
          one: "{n} document ready for analysis",
          other: "{n} documents ready for analysis",
        },
        continueThemes: "Continue to detected themes",
      },
    },

    themes: {
      title: "Themes detected by AI",
      subtitle:
        "ENTI WIN analysed the uploaded files and grouped them by theme.",
      filesAnalyzed: {
        one: "{n} file analysed",
        other: "{n} files analysed",
      },
      themesDetectedCount: {
        one: "{n} theme detected",
        other: "{n} themes detected",
      },
      detected: "Detected",
      noFilesForTheme:
        "No specific document attached — the AI will assess this theme from the files provided.",
      verifyPrompt: "Review the detected themes before starting the analysis.",
      back: "Back to documents",
      confirm: "Confirm themes and start AI analysis",
    },

    analyseIa: {
      runningTitle: "AI analysis in progress",
      runningSubtitle:
        "The AI is reviewing your documents to identify evidence and detect gaps.",
      resumingTitle: "AI analysis resumed",
      resumingSubtitle:
        "Your additional information has been included: the AI is completing the remaining requirements.",
      doneTitle: "Analysis complete",
      doneSubtitle: "Your documents and additions have been taken into account.",
      complementsNeeded: {
        title: "Additional information needed",
        subtitle:
          "The analysis identified a few missing details before the results can be finalised.",
        ringLabel: "Analysis temporarily paused",
        infoTitle: "{n} items to complete",
        infoHint:
          "Answer a few quick questions. You can also add documents if needed.",
        complementsCount: {
          one: "{n} item",
          other: "{n} items",
        },
        answerQuestions: "Answer the questions",
        seeDocuments: "View analysed documents",
        stageReadFiles: "Reading documents",
        stageIdentify: "Identifying requirements",
        stageComplements: "Additional information needed",
        stageComplementsHint: "Waiting for your answers",
      },
      result: {
        title: "Your analysis is ready",
        seeResults: "See the results",
      },
    },

    stageBar: {
      done: "Done",
      inProgress: "In progress",
      upcoming: "Upcoming",
    },

    complementsQuestions: {
      title: "Additional questions",
      subtitle: "A few answers are enough to complete the analysis.",
      quickQuestions: "{n} quick questions",
      answeredOf: "{answered} of {total}",
      addFile: "Add a file (optional)",
      infoNote:
        "Files are optional and are only used to support your answers.",
      back: "Back",
      verify: "Review my answers",
    },

    complementsReview: {
      title: "Review your additions",
      subtitle: "Check your answers before resuming the analysis.",
      summaryTitle: "Answer summary",
      noFile: "No file",
      edit: "Edit",
      addDocTitle: "Add a supporting document",
      addDocFormats: "PDF, DOCX, XLSX",
      addFile: "Add a file",
      infoNote:
        "These answers and documents will be included in the ongoing analysis.",
      backToQuestions: "Back to questions",
      sendAndResume: "Send and resume analysis",
    },

    analysisLive: {
      stages: {
        preparation: "Preparing files",
        extraction: "Extracting content",
        identify: "Identifying requirements",
        evidence: "Searching for evidence",
        gaps: "Analysing gaps",
        synthesis: "Synthesis",
      },
      done: "Done",
      inProgress: "In progress",
      waiting: "Waiting",
      requirementsAnalyzed: "{analysed} / {total} requirements analysed",
      themesDetectedLabel: "Themes detected",
      requirementsAnalysisTitle: "Requirement analysis",
      identifiedCounter: "requirements identified",
      analyzedCounter: "analysed",
      remainingCounter: "remaining",
      searchingEvidence: "Searching for evidence in the documents…",
      evidenceFound: "Evidence found",
      noEvidence: "No evidence",
      remainingRequirements: {
        one: "{n} requirement remaining",
        other: "{n} requirements remaining",
      },
      ariaAnalyzing: "Analysis in progress, {value} percent",
      activityLogTitle: "Live activity",
      logIdentified: "{n} requirements identified",
      logThemeDetected: "Theme detected: {theme}",
      logExtractionDone: {
        one: "Content extraction complete ({n} file)",
        other: "Content extraction complete ({n} files)",
      },
      logEvidenceFound: "Evidence found: {source}",
      logNoEvidence: "No evidence: requirement {id}",
      logAnalyzing: "Analysing requirement {i}/{total}…",
      logSearching: "Searching for evidence…",
      logConsulting: "Reviewing documents…",
    },

    reportAccess: {
      title: "Information to generate the report",
      subtitle: "Enter your details to access the full report.",
      close: "Close",
      generalInfo: "General information",
      lastName: "Last name",
      firstName: "First name",
      email: "Work email",
      role: "Job title",
      phone: "Phone",
      countryCodeAria: "Country code",
      cancel: "Cancel",
      confirm: "Confirm and generate the report",
    },

    report: {
      overview: {
        title: "Analysis report",
        generate: "Generate the full report",
        globalScoreTitle: "Overall compliance score",
        overview: "Overview",
        scoresByTheme: "Scores by theme",
        ctaHint:
          "Generate the full report to view the analyses, evidence and AI recommendations.",
      },
      tiles: {
        requirements: "Requirements",
        covered: "Covered",
        partial: "Partial",
        notIdentified: { one: "Not identified", other: "Not identified" },
        criticalPoints: { one: "Critical point", other: "Critical points" },
      },
      full: {
        title: "Full analysis report",
        generatedBadge: "Report generated",
        downloadPdf: "Download PDF",
        globalTab: "Global view",
        tabsHint:
          "Select a theme to view its analysis, evidence and recommendations.",
        scoreGlobal: "Overall compliance score",
        scoreOfTheme: "{theme} score",
        weightedCoverage: "Weighted requirement coverage",
        legendCovered: "Covered = 100%",
        legendPartial: "Partial = 50%",
        legendNotIdentified: "Not identified = 0%",
        detailedAnalysis: "Detailed analysis",
        searchPlaceholder: "Search a requirement…",
        searchAria: "Search a requirement",
        colId: "#",
        colRequirement: "Requirement",
        colStatus: "Status",
        colCoverage: "Coverage",
        colConfidence: "Confidence",
        noResults: "No requirement matches this search.",
        noRequirements: "No requirement",
        showingRange: "Showing {from} to {to} of {total} requirements",
        prevPage: "Previous page",
        nextPage: "Next page",
        evidenceInDoc: "Evidence in the document",
        noEvidenceDetail: "No evidence detected in the documents provided.",
        missingElements: "Missing elements",
        noMissingDetail: "No missing element identified.",
        aiRecommendation: "AI recommendation",
        confidenceLevel: "Confidence level: {n}%",
        recommendationsTitle: "Top AI recommendations",
        impactLabel: "Expected impact:",
        effortLabel: "Effort:",
      },
      themeSummary: {
        deviations: {
          title: "Sufficient coverage, with gaps",
          detail:
            "Corrective actions are required to strengthen follow-up and effectiveness.",
        },
        documentaire: {
          title: "Good overall coverage",
          detail: "Well-structured documentation with a few items to complete.",
        },
      },
      generatedAt: "{day} at {time}",
      scoreAriaLabel: "Compliance score: {score}%",
    },

    pdf: {
      backToReport: "Back to report",
      previewPages: "Document preview — {n} A4 pages",
      downloadPdf: "Download PDF",
      brandTagline: "AI-assisted pharmaceutical quality assessment",
      reportTitle: "Compliance analysis report",
      analysisInProgress: "Analysis in progress",
      scoreTitle: "Compliance score",
      weightedCoverageLine1: "Weighted requirement",
      weightedCoverageLine2: "coverage",
      legendLine: "Covered = 100% • Partial = 50% • Not identified = 0%",
      tiles: {
        requirements: "Requirements",
        covered: "Covered",
        partial: "Partial",
        notIdentified: "Not identified",
        criticalPoints: "Critical points",
      },
      synthesisTitle: "Summary of results",
      synthesisContinued: "(continued)",
      colId: "#",
      colRequirement: "Requirement",
      colStatus: "Status",
      colCriticality: "Criticality",
      recommendationsTitle: "Top AI recommendations",
      footerBrand: "ENTI WIN",
      footerSubtitle: "Compliance analysis report",
      pageOf: "Page {page} / {total}",
    },
  },
};
