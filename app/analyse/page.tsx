import type { Metadata } from "next";
import { StepInformations } from "./_components/step-informations";

export const metadata: Metadata = {
  title: "Vos informations",
  description:
    "Étape 1 du tunnel d'analyse ENTI WIN : identification du répondant et de son organisation.",
};

export default function AnalyseInformationsPage() {
  return <StepInformations />;
}
