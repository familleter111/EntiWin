import type { Metadata } from "next";
import { StepPreparation } from "./_components/step-preparation";

export const metadata: Metadata = {
  title: "Préparez votre analyse",
  description:
    "Étape 1 : renseignez votre organisation puis chargez vos documents qualité.",
};

export default function AnalysePage() {
  return <StepPreparation />;
}
