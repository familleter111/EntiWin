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
};
