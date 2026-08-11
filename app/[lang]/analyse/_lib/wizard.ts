import {
  FlagBE,
  FlagCH,
  FlagDZ,
  FlagFR,
  FlagMA,
  FlagTN,
} from "@/app/components/flags";

/**
 * Les 4 étapes du tunnel. L'identité du demandeur n'est plus une étape : elle
 * est demandée au moment de générer le rapport complet.
 * Les libellés sont traduits (`tunnel.stepper.steps`, même index) ; seuls les
 * chemins, canoniques, vivent ici.
 */
export const WIZARD_STEPS = [
  { href: "/analyse" },
  { href: "/analyse/themes" },
  { href: "/analyse/analyse-ia" },
  { href: "/analyse/rapport" },
] as const;

export type WizardStepHref = (typeof WIZARD_STEPS)[number]["href"];

/** Noms traduits dans `tunnel.countries`, même clé `code`. */
export const COUNTRIES = [
  { code: "TN", dial: "+216", Flag: FlagTN },
  { code: "FR", dial: "+33", Flag: FlagFR },
  { code: "MA", dial: "+212", Flag: FlagMA },
  { code: "DZ", dial: "+213", Flag: FlagDZ },
  { code: "BE", dial: "+32", Flag: FlagBE },
  { code: "CH", dial: "+41", Flag: FlagCH },
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
