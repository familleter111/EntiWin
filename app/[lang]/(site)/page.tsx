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
import { localePath } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

const stepIcons = [CloudUploadIcon, BrainIcon, TrendingUpIcon] as const;
const stepTones = ["green", "blue", "green"] as const;
const highlightIcons = [BrainIcon, ShieldCheckIcon, UserCheckIcon] as const;

const toneClass = {
  green: "bg-green-50 text-green-500 ring-green-100",
  blue: "bg-brand-blue-50 text-brand-blue-500 ring-brand-blue-100",
} as const;

export default async function Home() {
  const locale = await getLocale();
  const { home, common } = await getDictionary(locale);

  return (
    // La hauteur plein écran vient de <main> (layout du groupe `(site)`) ;
    // `flex-1` répartit ici l'espace entre le hero et le bandeau d'étapes.
    <div className="flex flex-1 flex-col">
      {/* ---------------- Hero ---------------- */}
      <section className="mx-auto grid w-full max-w-[1500px] flex-1 items-center gap-10 px-6 py-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)] lg:gap-10 lg:py-4 xl:px-10">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-[13px] font-semibold text-green-600 ring-1 ring-green-100 xl:text-sm">
            <SparkleIcon className="h-4 w-4 text-green-500" />
            <span className="font-bold text-navy-900">{home.badgeBrand}</span> —{" "}
            {home.badgeText}
          </p>

          <h1 className="mt-4 font-display text-[clamp(2rem,3.4vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy-900">
            {home.titleLine1}
            <br className="hidden lg:block" /> {home.titleLine2}
          </h1>

          <p className="mt-4 max-w-[48ch] text-[clamp(1rem,1.1vw,1.1rem)] leading-[1.6] text-ink-500">
            {home.subtitleLine1}
            <br className="hidden lg:block" /> {home.subtitleLine2}
          </p>

          <div className="mt-6 flex flex-col gap-3.5 sm:flex-row">
            <Link
              href={localePath(locale, "/analyse")}
              prefetch
              className="btn-primary"
            >
              <CloudUploadIcon className="h-5 w-5" />
              {common.cta.startAnalysis}
            </Link>
            <Link
              href={localePath(locale, "/comment-ca-marche")}
              prefetch
              className="btn-ghost"
            >
              <PlayIcon className="h-5 w-5 text-navy-800" />
              {home.ctaSecondary}
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-3 text-[13px] font-medium text-ink-700 2xl:text-[15px]">
            {home.highlights.map((label, i) => {
              const Icon = highlightIcons[i];
              return (
                <li key={label} className="flex items-center gap-2.5">
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-500 ring-1 ring-green-100 2xl:h-9 2xl:w-9">
                      <Icon className="h-[17px] w-[17px]" />
                    </span>
                    {label}
                  </span>
                  {i < home.highlights.length - 1 && (
                    <span className="hidden h-1.5 w-1.5 rounded-full bg-green-400 sm:block" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Visuel : next/image (AVIF/WebP, dimensions figées => aucun CLS) */}
        <div className="rounded-2xl border border-line bg-surface p-2.5 sm:p-3.5">
          <Image
            src="/analyseencours.png"
            alt={home.imageAlt}
            width={1536}
            height={1024}
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 50vw"
            // Le retrait suit la hauteur du bandeau « Comment ça marche » :
            // s'il grandit, le visuel doit céder d'autant, sinon il déborde.
            className="mx-auto h-auto w-full rounded-xl lg:max-h-[calc(100dvh-400px)] lg:w-auto"
          />
        </div>
      </section>

      {/* ---------------- Comment ça marche ---------------- */}
      <section className="shrink-0 border-t border-line bg-gradient-to-b from-green-50/70 to-white">
        <div className="mx-auto max-w-[1500px] px-6 py-10 lg:py-8 xl:px-10 xl:py-10">
          <h2 className="text-center font-display text-[clamp(1.35rem,1.7vw,1.75rem)] font-extrabold tracking-[-0.01em] text-navy-900">
            {home.stepsTitle}
          </h2>

          <ol className="mt-6 grid gap-4 lg:mt-7 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch lg:gap-0">
            {home.steps.map(({ title, text }, i) => {
              const Icon = stepIcons[i];
              return (
                <li key={title} className="contents">
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-4 xl:p-5">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ${
                        toneClass[stepTones[i]]
                      }`}
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

                  {i < home.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden items-center px-5 text-ink-300 lg:flex"
                    >
                      <svg
                        viewBox="0 0 60 12"
                        className="h-3 w-14 rtl:-scale-x-100"
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
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
