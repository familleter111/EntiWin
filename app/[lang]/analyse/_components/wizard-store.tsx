"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { UploadedFile } from "../_lib/documents";
import type { CountryCode } from "../_lib/wizard";

/** Sous-états de l'étape 4 (l'URL reste /analyse/analyse-ia). */
export type AnalysisPhase =
  | "running" // analyse initiale 0 → 68 %
  | "pending" // compléments nécessaires
  | "questions" // questions complémentaires
  | "review" // vérification des réponses
  | "resuming" // analyse reprise 68 → 100 %
  | "done"; // analyse terminée

export type Answer = "oui" | "non" | "nsp";

export type WizardData = {
  // Étape 1 — organisation puis documents
  organisation: string;
  organisationConfirmed: boolean;
  files: UploadedFile[];
  // Étape 3 — analyse IA
  analysisPhase: AnalysisPhase;
  answers: Record<string, Answer>;
  answerFiles: Record<string, string>;
  extraFiles: UploadedFile[];
  /** Horodatage de fin d'analyse (0 tant qu'elle n'est pas terminée). */
  completedAt: number;
  // Étape 4 — identité demandée pour débloquer le rapport complet
  lastName: string;
  firstName: string;
  email: string;
  role: string;
  countryCode: CountryCode;
  phone: string;
  /** Rapport complet débloqué (le formulaire d'accès a été validé). */
  reportGenerated: boolean;
  generatedAt: number;
};

const EMPTY: WizardData = {
  organisation: "",
  organisationConfirmed: false,
  files: [],
  analysisPhase: "running",
  answers: {},
  answerFiles: {},
  extraFiles: [],
  completedAt: 0,
  lastName: "",
  firstName: "",
  email: "",
  role: "",
  countryCode: "TN",
  phone: "",
  reportGenerated: false,
  generatedAt: 0,
};

const STORAGE_KEY = "entiwin.wizard";

/**
 * Store externe (hors React) : les réponses survivent au passage d'une étape
 * à l'autre, et sont relues depuis sessionStorage au premier montage.
 * `useSyncExternalStore` évite tout setState dans un effet.
 */
let state: WizardData = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): WizardData {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as WizardData) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  if (!hydrated) {
    hydrated = true;
    state = readStorage();
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => state;
const getServerSnapshot = () => EMPTY;

function write(next: WizardData) {
  state = next;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // stockage indisponible : on garde l'état en mémoire
  }
  emit();
}

/**
 * Un patch peut être calculé à partir de l'état courant : indispensable pour
 * plusieurs mises à jour dans le même tick (sinon la dernière écrase les
 * précédentes, calculées sur un instantané périmé).
 */
type Patch =
  | Partial<WizardData>
  | ((prev: WizardData) => Partial<WizardData>);

export function useWizard() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const update = useCallback((patch: Patch) => {
    const value = typeof patch === "function" ? patch(state) : patch;
    write({ ...state, ...value });
  }, []);

  const reset = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    write(EMPTY);
  }, []);

  return useMemo(() => ({ data, update, reset }), [data, update, reset]);
}
