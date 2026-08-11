import type { Metadata } from "next";
import { ReportDocument } from "./_components/report-document";

export const metadata: Metadata = {
  title: "Rapport d'analyse de conformité",
  description:
    "Document imprimable : score de conformité, synthèse des exigences et recommandations IA prioritaires.",
};

/**
 * Aperçu du rapport au format A4, hors tunnel (ni en-tête de site ni fil
 * d'étapes) : ce que l'utilisateur voit est exactement ce qui s'imprime.
 */
export default function RapportPdfPage() {
  return <ReportDocument />;
}
