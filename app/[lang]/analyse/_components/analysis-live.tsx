"use client";

import { useEffect, useState } from "react";
import {
  CheckCircleSolidIcon,
  CheckIcon,
  ClockIcon,
  DottedCircleIcon,
  FileTextIcon,
  SearchIcon,
  TagIcon,
  XCircleIcon,
} from "@/app/components/icons";
import type { detectThemes } from "../_lib/documents";
import { REQUIREMENTS } from "../_lib/requirements";
import { useLocale } from "@/lib/i18n/dictionary-provider";
import { ThemeIcon } from "./analysis-ui";

const TOTAL = REQUIREMENTS.length;

/**
 * Les six phases du moteur, exprimées en % de progression globale. La
 * recherche des preuves occupe la majeure partie du trajet : c'est elle qui
 * fait défiler les exigences une à une.
 */
const STAGES = [
  { label: "Préparation des fichiers", from: 0, to: 5 },
  { label: "Extraction du contenu", from: 5, to: 10 },
  { label: "Identification des exigences", from: 10, to: 15 },
  { label: "Recherche des preuves", from: 15, to: 85 },
  { label: "Analyse des écarts", from: 85, to: 95 },
  { label: "Synthèse", from: 95, to: 100 },
] as const;

const EVIDENCE_FROM = 15;
const EVIDENCE_TO = 85;

/** Nombre d'exigences déjà traitées, déduit de la progression globale. */
function analysedAt(progress: number) {
  const ratio = (progress - EVIDENCE_FROM) / (EVIDENCE_TO - EVIDENCE_FROM);
  return Math.max(0, Math.min(TOTAL, Math.floor(ratio * TOTAL)));
}

/** Avancement de l'exigence en cours, en %. */
function subProgressAt(progress: number) {
  const ratio = (progress - EVIDENCE_FROM) / (EVIDENCE_TO - EVIDENCE_FROM);
  if (ratio <= 0) return 0;
  if (ratio >= 1) return 100;
  return Math.round((ratio * TOTAL - Math.floor(ratio * TOTAL)) * 100);
}

type LogIcon = "check" | "tag" | "doc" | "search" | "miss" | "spin" | "clock";

type LogLine = {
  icon: LogIcon;
  text: string;
  active?: boolean;
};

export function AnalysisLive({
  progress,
  themes,
  fileCount,
  title,
  subtitle,
  running,
}: {
  progress: number;
  themes: ReturnType<typeof detectThemes>;
  fileCount: number;
  title: string;
  subtitle: string;
  /** Faux quand l'analyse est en pause : plus de curseur clignotant. */
  running: boolean;
}) {
  const locale = useLocale();
  const analysed = analysedAt(progress);
  const sub = subProgressAt(progress);
  const currentIndex = Math.min(analysed, TOTAL - 1);

  // Fenêtre glissante : deux exigences traitées, celle en cours, puis la suite.
  const start = Math.max(0, Math.min(currentIndex - 2, TOTAL - 6));
  const visible = REQUIREMENTS.slice(start, start + 6);
  const remaining = TOTAL - (start + visible.length);

  return (
    <>
      {/* ---------------- Anneau + titre ---------------- */}
      <div className="grid shrink-0 items-center gap-6 lg:grid-cols-[236px_1fr]">
        <div className="flex items-center justify-center rounded-2xl border border-line bg-white p-4">
          <LiveRing value={progress} running={running} />
        </div>

        <div>
          <h1 className="font-display text-[clamp(1.5rem,2.1vw,2.1rem)] font-extrabold tracking-[-0.02em] text-navy-900">
            {title}
          </h1>
          <p className="mt-1 text-[14px] text-ink-500">{subtitle}</p>

          <p className="mt-3 text-[13.5px] font-semibold text-navy-900">
            Thèmes détectés
          </p>
          <ul className="mt-1.5 flex flex-wrap gap-3">
            {themes.map((theme) => (
              <li
                key={theme.id}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue-500">
                  <ThemeIcon theme={theme.id} className="h-[18px] w-[18px]" />
                </span>
                <span className="text-[14px] font-semibold text-navy-900">
                  {theme.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------------- Fil des phases ---------------- */}
      <ol className="mt-3 flex shrink-0 rounded-2xl border border-line bg-white px-4 py-3">
        {STAGES.map((stage, i) => {
          const done = progress >= stage.to;
          const current = !done && progress >= stage.from;
          const isEvidence = stage.label === "Recherche des preuves";

          return (
            <li
              key={stage.label}
              className="flex min-w-0 flex-1 flex-col items-center"
            >
              <div className="flex w-full items-center">
                <span
                  className={`h-0.5 flex-1 rounded-full ${
                    i === 0
                      ? "bg-transparent"
                      : progress >= STAGES[i - 1].to
                        ? "bg-green-500"
                        : "bg-line"
                  }`}
                />
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    done
                      ? "border-green-500 bg-green-500 text-white"
                      : current
                        ? "border-brand-blue-500 bg-brand-blue-500 text-white"
                        : "border-line bg-white"
                  }`}
                >
                  {done ? (
                    <CheckIcon className="h-4 w-4" strokeWidth={2.6} />
                  ) : current ? (
                    <DottedCircleIcon
                      className={`h-4 w-4 ${running ? "animate-spin [animation-duration:2.2s]" : ""}`}
                    />
                  ) : null}
                </span>
                <span
                  className={`h-0.5 flex-1 rounded-full ${
                    i === STAGES.length - 1
                      ? "bg-transparent"
                      : done
                        ? "bg-green-500"
                        : current
                          ? "bg-brand-blue-500"
                          : "bg-line"
                  }`}
                />
              </div>

              <p
                className={`mt-1.5 max-w-[130px] text-center text-[12.5px] font-semibold leading-[1.25] ${
                  done || current ? "text-navy-900" : "text-ink-300"
                }`}
              >
                {stage.label}
              </p>
              <p
                className={`mt-0.5 text-center text-[11.5px] leading-[1.25] ${
                  done
                    ? "text-green-600"
                    : current
                      ? "text-brand-blue-500"
                      : "text-ink-300"
                }`}
              >
                {done
                  ? "Terminé"
                  : current
                    ? isEvidence
                      ? `${analysed} / ${TOTAL} exigences analysées`
                      : "En cours"
                    : "En attente"}
              </p>
            </li>
          );
        })}
      </ol>

      {/* ---------------- Exigences + journal ---------------- */}
      <div className="mt-3 grid min-h-0 flex-1 gap-3 lg:grid-cols-[1fr_minmax(0,430px)] lg:grid-rows-[minmax(0,1fr)]">
        <section className="flex min-h-0 flex-col rounded-2xl border border-line bg-white p-4">
          <header className="flex flex-wrap items-center gap-4">
            <h2 className="font-display text-[17px] font-bold text-navy-900">
              Analyse des exigences
            </h2>
            <ul className="ml-auto flex items-center divide-x divide-line">
              <Counter value={TOTAL} label="exigences identifiées" tone="navy" />
              <Counter value={analysed} label="analysées" tone="blue" />
              <Counter
                value={TOTAL - analysed}
                label="restantes"
                tone="muted"
              />
            </ul>
          </header>

          <ul className="mt-3 grid min-h-0 flex-1 content-start gap-2">
            {visible.map((requirement, i) => {
              const index = start + i;
              const isDone = index < analysed;
              const isCurrent = index === analysed && analysed < TOTAL;
              const found = requirement.evidence !== null;

              return (
                <li
                  key={requirement.id}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors ${
                    isCurrent
                      ? "border-l-4 border-brand-blue-500 bg-brand-blue-50/60 pl-2.5"
                      : "border-line bg-white"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12.5px] font-bold ${
                      isDone
                        ? found
                          ? "bg-green-50 text-green-600"
                          : "bg-danger/10 text-danger"
                        : isCurrent
                          ? "bg-brand-blue-500 text-white"
                          : "bg-surface text-ink-300"
                    }`}
                  >
                    {requirement.id}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-[13.5px] leading-5 ${
                        isCurrent
                          ? "font-semibold text-navy-900"
                          : isDone
                            ? "text-navy-900"
                            : "text-ink-500"
                      }`}
                    >
                      {requirement.label[locale]}
                    </p>

                    {isCurrent && (
                      <>
                        <p className="text-[12px] text-ink-500">
                          Recherche de preuves dans les documents…
                        </p>
                        <span className="mt-1 flex items-center gap-2.5">
                          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-brand-blue-100">
                            <span
                              className="block h-full rounded-full bg-brand-blue-500 transition-[width] duration-200"
                              style={{ width: `${sub}%` }}
                            />
                          </span>
                          <span className="shrink-0 text-[12px] font-semibold text-brand-blue-600">
                            {sub} %
                          </span>
                        </span>
                      </>
                    )}
                  </div>

                  {!isCurrent && (
                    <span
                      className={`flex shrink-0 items-center gap-2 text-[12.5px] font-semibold ${
                        isDone
                          ? found
                            ? "text-green-600"
                            : "text-danger"
                          : "text-ink-300"
                      }`}
                    >
                      {isDone ? (
                        <>
                          {found ? "Preuve trouvée" : "Aucune preuve"}
                          {found ? (
                            <CheckCircleSolidIcon className="h-[18px] w-[18px] text-green-500" />
                          ) : (
                            <XCircleIcon className="h-[18px] w-[18px]" />
                          )}
                        </>
                      ) : (
                        "En attente"
                      )}
                    </span>
                  )}
                </li>
              );
            })}

            {remaining > 0 && (
              <li className="flex items-center gap-3 rounded-xl border border-line bg-surface/60 px-3 py-1.5 text-[12.5px] text-ink-300">
                <span className="flex h-6 w-8 shrink-0 items-center justify-center font-bold tracking-widest">
                  …
                </span>
                {remaining} exigence{remaining > 1 ? "s" : ""} restante
                {remaining > 1 ? "s" : ""}
              </li>
            )}
          </ul>
        </section>

        <ActivityLog
          analysed={analysed}
          fileCount={fileCount}
          themes={themes}
          running={running}
        />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function Counter({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: "navy" | "blue" | "muted";
}) {
  const color = {
    navy: "text-navy-900",
    blue: "text-brand-blue-500",
    muted: "text-ink-300",
  }[tone];

  return (
    <li className="px-4 text-center first:pl-0 last:pr-0">
      <span className={`block font-display text-[22px] font-extrabold leading-none ${color}`}>
        {value}
      </span>
      <span className="mt-1 block max-w-[84px] text-[11.5px] leading-[1.2] text-ink-500">
        {label}
      </span>
    </li>
  );
}

function LiveRing({ value, running }: { value: number; running: boolean }) {
  const circumference = 2 * Math.PI * 44;
  // Analyse bouclée : l'anneau passe au vert, comme partout ailleurs.
  const finished = value >= 100;

  return (
    <div className="relative h-[164px] w-[164px]">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke={
            finished ? "var(--color-green-50)" : "var(--color-brand-blue-50)"
          }
          strokeWidth="9"
        />
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke={
            finished
              ? "var(--color-green-500)"
              : "var(--color-brand-blue-500)"
          }
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
          className="transition-[stroke-dashoffset] duration-200"
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center font-display text-[34px] font-extrabold ${
          finished ? "text-green-500" : "text-brand-blue-500"
        }`}
      >
        {value} %
      </span>
      {running && (
        <span className="sr-only" role="status">
          Analyse en cours, {value} pour cent
        </span>
      )}
    </div>
  );
}

/**
 * Journal d'activité. Une ligne par événement, horodatée depuis le démarrage
 * de la phase ; seules les dernières tiennent à l'écran, les plus anciennes
 * sortent par le haut — pas de barre de défilement.
 */
function ActivityLog({
  analysed,
  fileCount,
  themes,
  running,
}: {
  analysed: number;
  fileCount: number;
  themes: ReturnType<typeof detectThemes>;
  running: boolean;
}) {
  const startedAt = useStartTime();

  const lines: LogLine[] = [
    { icon: "check", text: `${TOTAL} exigences identifiées` },
    ...themes.map(
      (theme): LogLine => ({
        icon: "tag",
        text: `Thème ${theme.label} détecté`,
      }),
    ),
    {
      icon: "doc",
      text: `Extraction du contenu terminée (${fileCount} fichier${fileCount > 1 ? "s" : ""})`,
    },
  ];

  for (let i = 0; i < analysed; i++) {
    const requirement = REQUIREMENTS[i];
    lines.push(
      requirement.evidence
        ? { icon: "search", text: `Preuve trouvée : ${requirement.evidence.source}` }
        : { icon: "miss", text: `Aucune preuve : exigence ${requirement.id}` },
    );
  }

  if (running && analysed < TOTAL) {
    lines.push({
      icon: "spin",
      text: `Analyse de l'exigence ${analysed + 1}/${TOTAL}…`,
      active: true,
    });
    lines.push({ icon: "clock", text: "Recherche de preuves en cours…" });
    lines.push({ icon: "clock", text: "Consultation des documents…" });
  }

  // Horodatage figé par rang : une ligne déjà écrite ne bouge plus.
  const stamped = lines.map((line, i) => ({
    ...line,
    time: startedAt ? clock(startedAt + i * 2000) : "",
  }));

  return (
    <section className="flex min-h-0 flex-col rounded-2xl border border-line bg-white p-4">
      <h2 className="font-display text-[17px] font-bold text-navy-900">
        Activité en temps réel
      </h2>

      <ul className="mt-2 grid min-h-0 flex-1 content-start gap-0.5">
        {stamped.slice(-11).map((line, i) => (
          <li
            key={`${line.text}-${i}`}
            className={`flex items-center gap-3 rounded-lg px-2 py-[5px] text-[12.5px] ${
              line.active
                ? "bg-brand-blue-50/70 font-semibold text-brand-blue-600"
                : "text-ink-700"
            }`}
          >
            <span className="w-[58px] shrink-0 tabular-nums text-ink-500">
              {line.time}
            </span>
            <LogGlyph icon={line.icon} running={running} />
            <span className="min-w-0 flex-1 truncate">{line.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LogGlyph({ icon, running }: { icon: LogIcon; running: boolean }) {
  const className = "h-4 w-4 shrink-0";

  switch (icon) {
    case "check":
      return <CheckCircleSolidIcon className={`${className} text-green-500`} />;
    case "tag":
      return <TagIcon className={`${className} text-green-500`} />;
    case "doc":
      return <FileTextIcon className={`${className} text-green-500`} />;
    case "search":
      return <SearchIcon className={`${className} text-brand-blue-500`} />;
    case "miss":
      return <XCircleIcon className={`${className} text-danger`} />;
    case "spin":
      return (
        <DottedCircleIcon
          className={`${className} text-brand-blue-500 ${running ? "animate-spin [animation-duration:2s]" : ""}`}
        />
      );
    case "clock":
      return <ClockIcon className={`${className} text-ink-300`} />;
  }
}

/**
 * Heure de départ du journal. Renvoie 0 au premier rendu : les horodatages
 * n'apparaissent qu'après montage, sinon le HTML du serveur et celui du client
 * différeraient.
 */
function useStartTime() {
  const [startedAt, setStartedAt] = useState(0);

  useEffect(() => {
    // `value || Date.now()` : l'heure est fixée une seule fois, même quand
    // React monte l'effet deux fois (mode strict en développement).
    const id = setTimeout(() => setStartedAt((value) => value || Date.now()), 0);
    return () => clearTimeout(id);
  }, []);

  return startedAt;
}

function clock(ms: number) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(ms));
}
