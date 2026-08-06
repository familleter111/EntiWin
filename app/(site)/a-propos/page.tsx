import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "@/app/components/icons";
import { Footer } from "@/app/components/footer";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "ENTI WIN accompagne les équipes qualité pharmaceutiques dans l'évaluation de leurs documents face aux référentiels réglementaires.",
};

const values = [
  "Analyse assistée par IA, jamais autonome : la décision reste humaine.",
  "Résultats justifiés : chaque conclusion cite l'extrait source.",
  "Confidentialité : vos documents ne sont pas réutilisés pour entraîner de modèle.",
  "Traçabilité : version du référentiel, horodatage et historique conservés.",
];

export default function AProposPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[900px] px-6 py-16 xl:px-10 lg:py-20">
        <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold leading-tight tracking-[-0.02em] text-navy-900">
          À propos d&apos;ENTI WIN
        </h1>

        <p className="mt-6 text-lg leading-8 text-ink-500">
          ENTI WIN est une solution d&apos;évaluation qualité assistée par IA
          conçue pour les équipes pharmaceutiques. Elle confronte vos documents
          (procédures, dossiers, rapports) aux exigences des référentiels que
          vous utilisez, et met en évidence ce qui est couvert, partiellement
          couvert ou absent.
        </p>

        <p className="mt-5 text-lg leading-8 text-ink-500">
          L&apos;objectif n&apos;est pas de remplacer l&apos;expert qualité, mais
          de lui faire gagner les heures de lecture croisée qui précèdent chaque
          revue documentaire — pour qu&apos;il consacre son temps aux écarts qui
          comptent.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold text-navy-900">
          Nos principes
        </h2>
        <ul className="mt-6 grid gap-4">
          {values.map((value) => (
            <li
              key={value}
              className="flex items-start gap-3 leading-7 text-ink-700"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                <CheckIcon className="h-4 w-4" strokeWidth={2.5} />
              </span>
              {value}
            </li>
          ))}
        </ul>

        <div className="card mt-12 flex flex-col items-start gap-5 border-green-100 bg-green-50 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-navy-900">
            Envie de tester sur un de vos documents ?
          </p>
          <Link href="/analyse" prefetch className="btn-primary">
            Lancer mon analyse
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
