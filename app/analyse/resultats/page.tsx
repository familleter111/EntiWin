import type { Metadata } from "next";
import { StepResultats } from "../_components/step-resultats";

export const metadata: Metadata = {
  title: "Résultats",
  description: "Étape 5 : aperçu des exigences couvertes et des écarts.",
};

export default function Page() {
  return <StepResultats />;
}
