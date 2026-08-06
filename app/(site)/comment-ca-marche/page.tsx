import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/app/components/footer";
import {
  BrainIcon,
  CloudUploadIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  UserCheckIcon,
} from "@/app/components/icons";

export const metadata: Metadata = {
  title: "Comment ça marche",
  description:
    "Les 4 étapes de l'évaluation ENTI WIN : import du document, analyse IA des exigences, synthèse des écarts et validation humaine.",
};

const steps = [
  {
    icon: CloudUploadIcon,
    tone: "green",
    title: "1. Importez votre document",
    text: "Déposez une procédure, un dossier de lot ou un rapport qualité (PDF, Word, etc.). Vos fichiers restent confidentiels et ne servent qu'à votre analyse.",
  },
  {
    icon: BrainIcon,
    tone: "blue",
    title: "2. L'IA analyse les exigences",
    text: "Le document est comparé, exigence par exigence, à la grille de référence sélectionnée. Chaque exigence est classée : couverte, partielle ou non identifiée.",
  },
  {
    icon: TrendingUpIcon,
    tone: "green",
    title: "3. Consultez vos écarts",
    text: "Vous obtenez une synthèse claire, chaque conclusion étant justifiée par l'extrait du document correspondant. Exportez et passez à l'action.",
  },
  {
    icon: UserCheckIcon,
    tone: "green",
    title: "4. Validez humainement",
    text: "L'IA propose, l'expert dispose. Chaque écart peut être confirmé, ajusté ou rejeté par votre équipe qualité avant diffusion.",
  },
] as const;

const toneClass = {
  green: "bg-green-50 text-green-500 ring-green-100",
  blue: "bg-brand-blue-50 text-brand-blue-500 ring-brand-blue-100",
} as const;

export default function CommentCaMarchePage() {
  return (
    <>
      <div className="mx-auto w-full max-w-[1100px] px-6 py-16 xl:px-10 lg:py-20">
        <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold leading-tight tracking-[-0.02em] text-navy-900">
          Comment ça marche ?
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-500">
          Quatre étapes, aucune configuration complexe : de l&apos;import du
          document jusqu&apos;à la validation par votre équipe qualité.
        </p>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2">
          {steps.map(({ icon: Icon, tone, title, text }) => (
            <li key={title} className="card flex flex-col gap-4 p-7">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-full ring-1 ${toneClass[tone]}`}
              >
                <Icon className="h-7 w-7" />
              </span>
              <h2 className="font-display text-lg font-bold text-navy-900">
                {title}
              </h2>
              <p className="leading-7 text-ink-500">{text}</p>
            </li>
          ))}
        </ol>

        <div className="card mt-10 flex flex-col items-start gap-4 border-green-100 bg-green-50 p-7 sm:flex-row sm:items-center">
          <ShieldCheckIcon className="h-8 w-8 shrink-0 text-green-500" />
          <p className="text-ink-700">
            <strong className="font-semibold text-navy-900">
              Traçabilité complète :
            </strong>{" "}
            chaque résultat conserve la source, la version du référentiel et
            l&apos;horodatage de l&apos;analyse.
          </p>
          <Link href="/analyse" prefetch className="btn-primary sm:ml-auto">
            Lancer mon analyse
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
