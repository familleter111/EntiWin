import type { Metadata } from "next";
import { StepRecommandations } from "../_components/step-recommandations";

export const metadata: Metadata = {
  title: "Recommandations IA",
  description:
    "Étape 6 : plan d'amélioration priorisé, construit à partir des écarts identifiés.",
};

export default function Page() {
  return <StepRecommandations />;
}
