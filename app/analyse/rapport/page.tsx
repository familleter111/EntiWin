import type { Metadata } from "next";
import { StepRapport } from "../_components/step-rapport-final";

export const metadata: Metadata = {
  title: "Rapport d'analyse",
  description:
    "Étape 5 : rapport d'analyse, exigences évaluées, écarts et recommandations.",
};

export default function Page() {
  return <StepRapport />;
}
