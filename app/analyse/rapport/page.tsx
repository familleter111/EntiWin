import type { Metadata } from "next";
import { StepRapport } from "../_components/step-rapport";

export const metadata: Metadata = {
  title: "Rapport & recommandations",
  description: "Étape 6 : synthèse des constats et recommandations prioritaires.",
};

export default function Page() {
  return <StepRapport />;
}
