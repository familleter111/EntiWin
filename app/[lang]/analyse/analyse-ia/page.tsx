import type { Metadata } from "next";
import { StepAnalyseIa } from "../_components/step-analyse-ia";

export const metadata: Metadata = {
  title: "Analyse IA en cours",
  description: "Étape 4 : analyse des preuves documentaires par l'IA.",
};

export default function Page() {
  return <StepAnalyseIa />;
}
