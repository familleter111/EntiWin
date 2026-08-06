import type { Metadata } from "next";
import { StepSuivi } from "../_components/step-suivi";

export const metadata: Metadata = {
  title: "Suivi",
  description: "Étape 7 : suivi de votre analyse et prochaines actions.",
};

export default function Page() {
  return <StepSuivi />;
}
