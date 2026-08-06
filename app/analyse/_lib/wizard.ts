import {
  FlagBE,
  FlagCH,
  FlagDZ,
  FlagFR,
  FlagMA,
  FlagTN,
} from "@/app/components/flags";

/** Les 7 étapes du tunnel d'analyse. */
export const WIZARD_STEPS = [
  { label: "Informations", href: "/analyse" },
  { label: "Documents", href: "/analyse/documents" },
  { label: "Thèmes détectés", href: "/analyse/themes" },
  { label: "Analyse IA", href: "/analyse/analyse-ia" },
  { label: "Résultats", href: "/analyse/resultats" },
  { label: "Rapport", href: "/analyse/rapport" },
  { label: "Suivi", href: "/analyse/suivi" },
] as const;

export type WizardStepHref = (typeof WIZARD_STEPS)[number]["href"];

export const COUNTRIES = [
  { code: "TN", name: "Tunisie", dial: "+216", Flag: FlagTN },
  { code: "FR", name: "France", dial: "+33", Flag: FlagFR },
  { code: "MA", name: "Maroc", dial: "+212", Flag: FlagMA },
  { code: "DZ", name: "Algérie", dial: "+213", Flag: FlagDZ },
  { code: "BE", name: "Belgique", dial: "+32", Flag: FlagBE },
  { code: "CH", name: "Suisse", dial: "+41", Flag: FlagCH },
] as const;

export type CountryCode = (typeof COUNTRIES)[number]["code"];

export const SECTORS = [
  "Pharmaceutique",
  "Dispositifs médicaux",
  "Cosmétique",
  "Agroalimentaire",
  "Compléments alimentaires",
  "Chimie fine",
] as const;

export type Sector = (typeof SECTORS)[number];

export const SUB_SECTORS: Record<Sector, string[]> = {
  Pharmaceutique: [
    "Injectables stériles",
    "Lyophilisés stériles",
    "Liquides oraux",
    "Crèmes & Pommades",
    "Ophtalmiques stériles",
    "Inhalation & Aérosols",
    "Médicaments biologiques",
    "Formes sèches orales",
  ],
  "Dispositifs médicaux": [
    "Classe I",
    "Classe IIa",
    "Classe IIb",
    "Classe III",
    "Dispositifs stériles",
    "Diagnostic in vitro",
  ],
  Cosmétique: [
    "Soins de la peau",
    "Capillaires",
    "Parfums",
    "Maquillage",
    "Hygiène corporelle",
  ],
  Agroalimentaire: [
    "Produits laitiers",
    "Boissons",
    "Conserves",
    "Produits carnés",
    "Boulangerie industrielle",
  ],
  "Compléments alimentaires": [
    "Gélules & Comprimés",
    "Sirops & Solutions",
    "Poudres",
    "Probiotiques",
  ],
  "Chimie fine": [
    "Principes actifs (API)",
    "Excipients",
    "Intermédiaires de synthèse",
    "Solvants",
  ],
};

export type CompanyMatch = {
  name: string;
  country: string;
  sector: Sector;
  subSectors: string[];
};

/**
 * Recherche d'entreprise simulée (le back-office n'est pas encore branché).
 * Remplacer par un appel API quand le registre sera disponible.
 */
export function searchCompany(query: string): Promise<CompanyMatch | null> {
  const name = query.trim();

  return new Promise((resolve) => {
    setTimeout(() => {
      if (name.length < 3) {
        resolve(null);
        return;
      }
      resolve({
        name,
        country: "Tunisie",
        sector: "Pharmaceutique",
        subSectors: ["Injectables stériles", "Lyophilisés stériles"],
      });
    }, 700);
  });
}
