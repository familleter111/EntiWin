import type { Metadata } from "next";
import { StepDocuments } from "../_components/step-documents";

export const metadata: Metadata = {
  title: "Chargez vos documents",
  description: "Étape 2 : import des documents qualité à analyser.",
};

export default function Page() {
  return <StepDocuments />;
}
