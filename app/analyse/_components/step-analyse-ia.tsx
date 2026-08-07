"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  DottedCircleIcon,
  FileTextIcon,
  SparkleIcon,
} from "@/app/components/icons";
import { COMPLEMENTS, complementsByTheme } from "../_lib/complements";
import { DEMO_FILES, detectThemes } from "../_lib/documents";
import { AnalysisLive } from "./analysis-live";
import { ProgressRing, StageBar, ThemeIcon, type Stage } from "./analysis-ui";
import { ComplementQuestions, ComplementReview } from "./complements";
import { useWizard } from "./wizard-store";

/**
 * Progression simulée : l'analyse s'arrête à 68 %, le temps des questions
 * complémentaires, puis reprend jusqu'à 100 %. Les durées sont calées pour
 * que le journal d'activité reste lisible pendant le défilement.
 */
const PAUSE_AT = 68;
const RUN_MS = 11000;
const RESUME_MS = 8000;

export function StepAnalyseIa() {
  const router = useRouter();
  const { data, update } = useWizard();
  const files = data.files.length > 0 ? data.files : DEMO_FILES;
  const themes = detectThemes(files);
  const phase = data.analysisPhase;

  // Progression locale : animée pendant « running » et « resuming ».
  const progress = useProgress(phase, update);

  const body = (() => {
    switch (phase) {
      case "running":
        return (
          <AnalysisLive
            progress={progress}
            themes={themes}
            fileCount={files.length}
            running
            title="Analyse IA en cours"
            subtitle="L'IA analyse vos documents pour identifier les preuves et détecter les écarts."
          />
        );

      case "pending":
        return <ComplementsNeeded themes={themes} />;

      case "questions":
        return (
          <ComplementQuestions
            onBack={() => update({ analysisPhase: "pending" })}
            onNext={() => update({ analysisPhase: "review" })}
          />
        );

      case "review":
        return (
          <ComplementReview
            onBack={() => update({ analysisPhase: "questions" })}
            onSend={() => update({ analysisPhase: "resuming" })}
          />
        );

      case "resuming":
        return (
          <AnalysisLive
            progress={progress}
            themes={themes}
            fileCount={files.length + data.extraFiles.length}
            running
            title="Analyse IA reprise"
            subtitle="Vos compléments ont été intégrés : l'IA termine l'analyse des exigences restantes."
          />
        );

      case "done":
        return (
          <AnalysisDone
            themes={themes}
            fileCount={files.length + data.extraFiles.length}
            onSeeResults={() => router.push("/analyse/rapport")}
          />
        );
    }
  })();

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-4 xl:px-10">
      {body}
    </div>
  );
}

/** Anime la progression et déclenche le passage à la phase suivante. */
function useProgress(
  phase: ReturnType<typeof useWizard>["data"]["analysisPhase"],
  update: ReturnType<typeof useWizard>["update"],
) {
  const animated = phase === "running" || phase === "resuming";
  const from = phase === "resuming" ? PAUSE_AT : 0;
  const to = phase === "resuming" ? 100 : PAUSE_AT;
  const duration = phase === "resuming" ? RESUME_MS : RUN_MS;

  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!animated) return;

    const started = Date.now();
    const id = setInterval(() => {
      const ratio = Math.min(1, (Date.now() - started) / duration);
      setValue(Math.round(from + (to - from) * ratio));
      if (ratio === 1) {
        clearInterval(id);
        update(
          phase === "resuming"
            ? { analysisPhase: "done", completedAt: Date.now() }
            : { analysisPhase: "pending" },
        );
      }
    }, 120);

    return () => clearInterval(id);
  }, [animated, from, to, duration, phase, update]);

  if (phase === "pending") return PAUSE_AT;
  if (phase === "done") return 100;
  // borné à la plage de la phase courante (cas d'un retour en arrière)
  return Math.min(Math.max(value, from), to);
}

/* ------------------------------------------------------------------ */
/* 4b — Compléments nécessaires                                        */
/* ------------------------------------------------------------------ */

function ComplementsNeeded({
  themes,
}: {
  themes: ReturnType<typeof detectThemes>;
}) {
  const { update } = useWizard();
  const byTheme = complementsByTheme();

  const stages: Stage[] = [
    { icon: FileTextIcon, label: "Lecture des documents", state: "done" },
    {
      icon: ClipboardCheckIcon,
      label: "Identification des exigences",
      state: "done",
    },
    {
      icon: SparkleIcon,
      label: "Compléments nécessaires",
      state: "current",
      hint: "En attente de vos réponses",
    },
  ];

  return (
    <>
      <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
        Compléments nécessaires
      </h1>
      <p className="mt-1 text-[14px] text-ink-500">
        L&apos;analyse a identifié quelques informations manquantes avant de
        pouvoir finaliser les résultats.
      </p>

      <div className="mt-4 grid items-stretch gap-5 lg:grid-cols-[320px_1fr]">
        <section className="flex items-center justify-center rounded-2xl border border-line bg-white p-5">
          <ProgressRing
            value={PAUSE_AT}
            label="Analyse temporairement en pause"
          />
        </section>

        <section className="rounded-2xl border border-brand-blue-100 bg-brand-blue-50/40 p-5">
          <header className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-blue-500">
              <SparkleIcon className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-display text-xl font-bold text-brand-blue-600">
                {COMPLEMENTS.length} informations à compléter
              </h2>
              <p className="mt-0.5 text-[14px] text-ink-500">
                Répondez à quelques questions rapides. Vous pourrez également
                ajouter des documents si nécessaire.
              </p>
            </div>
          </header>

          <ul className="mt-4 overflow-hidden rounded-xl border border-line bg-white">
            {byTheme.map((entry) => (
              <li key={entry.theme} className="border-line [&+li]:border-t">
                <button
                  type="button"
                  onClick={() => update({ analysisPhase: "questions" })}
                  className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-brand-blue-50/50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-500">
                    <ThemeIcon
                      theme={
                        themes.find((t) => t.id === entry.theme)?.id ??
                        entry.theme
                      }
                      className="h-5 w-5"
                    />
                  </span>
                  <span className="font-display text-[16px] font-bold text-navy-900">
                    {entry.label}
                  </span>
                  <span className="ml-auto flex items-center gap-2 text-[14px] font-semibold text-brand-blue-500">
                    <DottedCircleIcon className="h-[18px] w-[18px] animate-spin [animation-duration:2.5s]" />
                    {entry.count} complément{entry.count > 1 ? "s" : ""}
                  </span>
                  <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-300" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_320px] lg:items-start">
        <StageBar stages={stages} />

        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => update({ analysisPhase: "questions" })}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue-500 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-600"
          >
            <span className="mx-auto">Répondre aux questions</span>
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <Link
            href="/analyse"
            prefetch
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-brand-blue-500 bg-white px-6 text-[15px] font-semibold text-brand-blue-500 transition-colors hover:bg-brand-blue-50"
          >
            <FileTextIcon className="h-5 w-5" />
            Voir les documents analysés
          </Link>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 4f — Analyse terminée                                               */
/* ------------------------------------------------------------------ */

function AnalysisDone({
  themes,
  fileCount,
  onSeeResults,
}: {
  themes: ReturnType<typeof detectThemes>;
  fileCount: number;
  onSeeResults: () => void;
}) {
  return (
    <>
      {/* Le tableau de bord reste affiché, figé à 100 % : on voit ce qui a
          été analysé, et la sortie se trouve juste en dessous. */}
      <AnalysisLive
        progress={100}
        themes={themes}
        fileCount={fileCount}
        running={false}
        title="Analyse terminée"
        subtitle="Les documents et vos compléments ont été pris en compte."
      />

      <section className="mt-3 flex shrink-0 flex-col items-center gap-3.5 rounded-2xl border border-brand-blue-100 bg-brand-blue-50/50 px-6 py-6">
        <h2 className="font-display text-[clamp(1.6rem,2.2vw,2.1rem)] font-extrabold tracking-[-0.02em] text-navy-900">
          Votre analyse est prête
        </h2>
        <button
          type="button"
          onClick={onSeeResults}
          className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-navy-800 px-9 text-[17px] font-semibold text-white transition-colors hover:bg-navy-900"
        >
          Voir les résultats
          <ArrowRightIcon className="h-[22px] w-[22px]" />
        </button>
      </section>
    </>
  );
}
