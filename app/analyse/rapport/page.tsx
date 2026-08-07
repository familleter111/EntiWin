import type { Metadata } from "next";
import { StepRapport } from "../_components/step-rapport";

export const metadata: Metadata = {
  title: "Rapport d'analyse",
  description:
    "Étape 4 : scores de conformité, analyse détaillée des exigences et recommandations IA.",
};

export default function Page() {
  return <StepRapport />;
}
