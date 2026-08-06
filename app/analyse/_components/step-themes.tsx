"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BooksIcon,
  FileTextIcon,
  FileTypeIcon,
  SparkleIcon,
} from "@/app/components/icons";
import { DEMO_FILES, detectThemes } from "../_lib/documents";
import { useWizard } from "./wizard-store";

export function StepThemes() {
  const router = useRouter();
  const { data, update } = useWizard();
  const files = data.files.length > 0 ? data.files : DEMO_FILES;
  const themes = detectThemes(files);

  // Confirmer relance toujours l'analyse depuis le début.
  function startAnalysis() {
    update({ analysisPhase: "running" });
    router.push("/analyse/analyse-ia");
  }

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-4 xl:px-10">
      <div className="flex flex-wrap items-start gap-4">
        <div>
          <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
            Thèmes détectés par l&apos;IA
          </h1>
          <p className="mt-1 text-[14px] text-ink-500">
            ENTI WIN a analysé les fichiers chargés et les a regroupés par thème.
          </p>
        </div>

        <p className="ml-auto inline-flex items-center gap-2.5 rounded-xl bg-brand-blue-50 px-4 py-2.5 text-[14px] font-semibold text-brand-blue-600">
          <SparkleIcon className="h-[18px] w-[18px]" />
          {files.length} fichier{files.length > 1 ? "s" : ""} analysé
          {files.length > 1 ? "s" : ""}
          <span className="text-brand-blue-500/60">•</span>
          {themes.length} thème{themes.length > 1 ? "s" : ""} détecté
          {themes.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-2">
        {themes.map((theme) => (
          <section
            key={theme.id}
            className="rounded-2xl border border-line bg-white p-5"
          >
            <header className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-800">
                {theme.id === "deviations" ? (
                  <FileTextIcon className="h-5 w-5" />
                ) : (
                  <BooksIcon className="h-5 w-5" />
                )}
              </span>
              <h2 className="font-display text-lg font-bold text-navy-900">
                {theme.label}
              </h2>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-brand-blue-50 px-3 py-1.5 text-[13px] font-semibold text-brand-blue-600">
                <SparkleIcon className="h-4 w-4" />
                Détecté
              </span>
            </header>

            <ul className="mt-4 grid gap-2.5">
              {theme.files.length === 0 && (
                <li className="rounded-xl border border-dashed border-line px-4 py-3 text-[14px] text-ink-500">
                  Aucun document spécifique rattaché — l&apos;IA évaluera ce
                  thème à partir des fichiers fournis.
                </li>
              )}
              {theme.files.map((file) => (
                <li
                  key={file.name}
                  className="flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-3"
                >
                  <FileTypeIcon kind={file.kind} className="h-7 w-6 shrink-0" />
                  <span className="min-w-0 flex-1 truncate text-[14px] text-navy-900">
                    {file.name}
                  </span>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-ink-300" />
                  <span className="w-[45%] shrink-0 text-[14px] text-navy-900">
                    {file.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-5 text-center text-[14px] text-ink-500 lg:mt-auto lg:pt-4">
        Vérifiez les thèmes détectés avant de lancer l&apos;analyse.
      </p>

      <div className="mt-4 flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/analyse/documents"
          prefetch
          className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-navy-800 bg-white px-6 text-[15px] font-semibold text-navy-900 transition-colors hover:bg-navy-50"
        >
          <ArrowLeftIcon className="h-[18px] w-[18px]" />
          Retour aux documents
        </Link>
        <button
          type="button"
          onClick={startAnalysis}
          className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-brand-blue-500 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-600"
        >
          <SparkleIcon className="h-5 w-5" />
          Confirmer les thèmes et lancer l&apos;analyse IA
        </button>
      </div>
    </div>
  );
}
