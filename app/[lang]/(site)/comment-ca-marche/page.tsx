import type { Metadata } from "next";
import Link from "next/link";
import {
  BrainIcon,
  CloudUploadIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  UserCheckIcon,
} from "@/app/components/icons";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/comment-ca-marche">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = await getDictionary(lang);
  return { title: meta.howItWorks.title, description: meta.howItWorks.description };
}

const stepIcons = [
  CloudUploadIcon,
  BrainIcon,
  TrendingUpIcon,
  UserCheckIcon,
] as const;
const stepTones = ["green", "blue", "green", "green"] as const;

const toneClass = {
  green: "bg-green-50 text-green-500 ring-green-100",
  blue: "bg-brand-blue-50 text-brand-blue-500 ring-brand-blue-100",
} as const;

export default async function CommentCaMarchePage() {
  const locale = await getLocale();
  const { howItWorks, common } = await getDictionary(locale);

  return (
    <>
      {/* Même largeur utile que l'en-tête et le pied de page (1500 px) : le
          titre s'aligne sur la marque, la grille sur les colonnes du footer. */}
      <div className="mx-auto w-full max-w-[1500px] px-6 py-16 lg:py-20 xl:px-10">
        <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold leading-tight tracking-[-0.02em] text-navy-900">
          {howItWorks.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-500">
          {howItWorks.intro}
        </p>

        {/* 1 colonne, puis 2, puis 4 sur grand écran : les quatre étapes se
            lisent alors comme une seule séquence de gauche à droite. */}
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {howItWorks.steps.map(({ title, text }, i) => {
            const Icon = stepIcons[i];
            return (
              <li key={title} className="card flex flex-col gap-4 p-7">
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-full ring-1 ${
                    toneClass[stepTones[i]]
                  }`}
                >
                  <Icon className="h-7 w-7" />
                </span>
                <h2 className="font-display text-lg font-bold text-navy-900">
                  {title}
                </h2>
                <p className="leading-7 text-ink-500">{text}</p>
              </li>
            );
          })}
        </ol>

        {/* Icône, texte et bouton sur une seule ligne de base : le bouton ne
            se replie plus sur deux lignes et reste aligné à droite de la carte,
            au même fer que la grille des étapes au-dessus. */}
        <div className="card mt-10 flex flex-col items-start gap-5 border-green-100 bg-green-50 p-7 lg:flex-row lg:items-center lg:gap-6">
          <ShieldCheckIcon className="h-8 w-8 shrink-0 text-green-500" />
          <p className="flex-1 text-ink-700">
            <strong className="font-semibold text-navy-900">
              {howItWorks.traceabilityStrong}
            </strong>{" "}
            {howItWorks.traceabilityText}
          </p>
          <Link
            href={localePath(locale, "/analyse")}
            prefetch
            className="btn-primary shrink-0 whitespace-nowrap"
          >
            {common.cta.startAnalysis}
          </Link>
        </div>
      </div>
    </>
  );
}
