import type { Metadata } from "next";
import { StepThemes } from "../_components/step-themes";

export const metadata: Metadata = {
  title: "Thèmes détectés",
  description: "Étape 3 : thèmes détectés par l'IA dans vos documents.",
};

export default function Page() {
  return <StepThemes />;
}
