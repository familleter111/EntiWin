import Image from "next/image";
import Link from "next/link";
import {
  BrainIcon,
  CloudUploadIcon,
  PlayIcon,
  ShieldCheckIcon,
  SparkleIcon,
  TrendingUpIcon,
  UserCheckIcon,
} from "@/app/components/icons";

const steps = [
  {
    icon: CloudUploadIcon,
    tone: "green",
    title: "1. Importez votre document",
    text: "Déposez vos documents qualité (PDF, Word, etc.). Sécurisé et confidentiel.",
  },
  {
    icon: BrainIcon,
    tone: "blue",
    title: "2. L'IA analyse les exigences",
    text: "Notre IA compare votre document à la grille d'exigences sélectionnée et détecte les écarts.",
  },
  {
    icon: TrendingUpIcon,
    tone: "green",
    title: "3. Consultez vos écarts et recommandations",
    text: "Accédez à une synthèse claire, justifiée et exploitable. Passez à l'action rapidement.",
  },
] as const;

const toneClass = {
  green: "bg-green-50 text-green-500 ring-green-100",
  blue: "bg-brand-blue-50 text-brand-blue-500 ring-brand-blue-100",
} as const;

const highlights = [
  { icon: BrainIcon, label: "Analyse assistée par IA" },
  { icon: ShieldCheckIcon, label: "Résultats traçables" },
  { icon: UserCheckIcon, label: "Validation humaine" },
];

export default function Home() {
  return (
    // Sur grand écran : hauteur exacte de l'écran moins le header -> aucun scroll.
    <div className="flex flex-1 flex-col lg:h-[calc(100dvh-72px)] lg:overflow-hidden">
      {/* ---------------- Hero ---------------- */}
      <section className="mx-auto grid w-full max-w-[1500px] flex-1 items-center gap-10 px-6 py-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)] lg:gap-10 lg:py-4 xl:px-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-[13px] font-semibold text-green-600 ring-1 ring-green-100 xl:text-sm">
            <SparkleIcon className="h-4 w-4 text-green-500" />
            <span className="font-bold text-navy-900">ENTI WIN</span> —
            AI-Assisted Pharmaceutical Quality Assessment
          </p>

          <h1 className="mt-4 font-display text-[clamp(2rem,3.4vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy-900">
            Évaluez vos documents
            <br className="hidden lg:block" /> qualité avec l&apos;IA
          </h1>

          <p className="mt-4 max-w-[46ch] text-[clamp(1rem,1.1vw,1.1rem)] leading-[1.6] text-ink-500">
            Identifiez en quelques minutes les exigences couvertes,
            <br className="hidden lg:block" /> les écarts et les points à
            améliorer.
          </p>

          <div className="mt-6 flex flex-col gap-3.5 sm:flex-row">
            <Link href="/analyse" prefetch className="btn-primary">
              <CloudUploadIcon className="h-5 w-5" />
              Lancer mon analyse
            </Link>
            <Link href="/comment-ca-marche" prefetch className="btn-ghost">
              <PlayIcon className="h-5 w-5 text-navy-800" />
              Voir comment ça marche
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-3 text-[13px] font-medium text-ink-700 2xl:text-[15px]">
            {highlights.map(({ icon: Icon, label }, i) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-500 ring-1 ring-green-100 2xl:h-9 2xl:w-9">
                    <Icon className="h-[17px] w-[17px]" />
                  </span>
                  {label}
                </span>
                {i < highlights.length - 1 && (
                  <span className="hidden h-1.5 w-1.5 rounded-full bg-green-400 sm:block" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Visuel : next/image (AVIF/WebP, dimensions figées => aucun CLS) */}
        <div className="rounded-2xl border border-line bg-surface p-2.5 sm:p-3.5">
          <Image
            src="/analyseencours.png"
            alt="Aperçu d'une analyse IA en cours : 15 exigences couvertes, 6 partielles, 3 non identifiées."
            width={1536}
            height={1024}
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="mx-auto h-auto w-full rounded-xl lg:max-h-[calc(100dvh-370px)] lg:w-auto"
          />
        </div>
      </section>

      {/* ---------------- Comment ça marche ---------------- */}
      <section className="shrink-0 border-t border-line bg-gradient-to-b from-green-50/70 to-white">
        <div className="mx-auto max-w-[1500px] px-6 py-6 xl:px-10">
          <h2 className="text-center font-display text-[clamp(1.35rem,1.7vw,1.75rem)] font-extrabold tracking-[-0.01em] text-navy-900">
            Comment ça marche ?
          </h2>

          <ol className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-0">
            {steps.map(({ icon: Icon, tone, title, text }, i) => (
              <li key={title} className="contents">
                <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-4 xl:p-5">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ${toneClass[tone]}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-[14.5px] font-bold leading-snug text-navy-900 xl:text-[15.5px]">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-[1.55] text-ink-500">
                      {text}
                    </p>
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden items-center px-5 text-ink-300 lg:flex"
                  >
                    <svg
                      viewBox="0 0 60 12"
                      className="h-3 w-14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeDasharray="1 7"
                    >
                      <path d="M2 6h44" />
                      <path
                        d="m46 1.5 6 4.5-6 4.5"
                        strokeDasharray="0"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
