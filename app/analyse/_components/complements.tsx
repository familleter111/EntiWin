"use client";

import { useRef } from "react";
import {
  ArrowLeftIcon,
  CheckCircleSolidIcon,
  DottedCircleIcon,
  FileTextIcon,
  InfoIcon,
  PencilIcon,
  QuestionIcon,
  RocketIcon,
  UploadIcon,
} from "@/app/components/icons";
import { ANSWER_LABEL, COMPLEMENTS } from "../_lib/complements";
import { ACCEPTED_EXTENSIONS, kindOf } from "../_lib/documents";
import { ThemeIcon } from "./analysis-ui";
import { useWizard } from "./wizard-store";
import type { Answer } from "./wizard-store";

const CHOICES: Answer[] = ["oui", "non", "nsp"];

/* ------------------------------------------------------------------ */
/* 4c — Questions complémentaires                                      */
/* ------------------------------------------------------------------ */

export function ComplementQuestions({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { data, update } = useWizard();
  const answered = COMPLEMENTS.filter((c) => data.answers[c.id]).length;
  const complete = answered === COMPLEMENTS.length;

  function answer(id: string, value: Answer) {
    update((prev) => ({ answers: { ...prev.answers, [id]: value } }));
  }

  function attach(id: string, name: string) {
    update((prev) => ({ answerFiles: { ...prev.answerFiles, [id]: name } }));
  }

  return (
    <>
      <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
        Questions complémentaires
      </h1>
      <p className="mt-1 text-[14px] text-ink-500">
        Quelques réponses suffisent pour compléter l&apos;analyse.
      </p>

      <p className="mt-2.5 inline-flex w-fit items-center gap-2 rounded-full bg-brand-blue-50 px-3.5 py-1.5 text-[13.5px] font-semibold text-brand-blue-600">
        <DottedCircleIcon className="h-4 w-4" />
        {COMPLEMENTS.length} questions rapides
      </p>

      <section className="mt-3 rounded-2xl border border-line bg-white p-4">
        <header className="flex items-center gap-4">
          <span className="text-[14px] font-semibold text-navy-900">
            {answered} sur {COMPLEMENTS.length}
          </span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
            <span
              className="block h-full rounded-full bg-brand-blue-500 transition-[width] duration-300"
              style={{ width: `${(answered / COMPLEMENTS.length) * 100}%` }}
            />
          </span>
        </header>

        <ul className="mt-3 grid gap-2.5">
          {COMPLEMENTS.map((complement) => (
            <li
              key={complement.id}
              className="grid items-center gap-4 rounded-xl border border-line bg-white p-3 lg:grid-cols-[1fr_auto_260px]"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-500">
                  <ThemeIcon theme={complement.theme} className="h-5 w-5" />
                </span>
                <div>
                  <span className="inline-flex rounded-md bg-surface px-2 py-0.5 text-[12px] font-medium text-ink-500">
                    {complement.themeLabel}
                  </span>
                  <p className="mt-1 text-[14.5px] font-semibold leading-5 text-navy-900">
                    {complement.question}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {CHOICES.map((choice) => {
                  const active = data.answers[complement.id] === choice;
                  return (
                    <button
                      key={choice}
                      type="button"
                      aria-pressed={active}
                      onClick={() => answer(complement.id, choice)}
                      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-[14px] font-semibold transition-colors ${
                        active
                          ? "border-navy-800 bg-navy-800 text-white"
                          : "border-line bg-white text-navy-900 hover:bg-navy-50"
                      }`}
                    >
                      {ANSWER_LABEL[choice]}
                      {active && (
                        <CheckCircleSolidIcon className="h-4 w-4 text-green-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* min-w-0 en cascade : sans lui, un nom de fichier long impose
                  sa largeur min-content et fait deborder la colonne. */}
              <div className="grid min-w-0 gap-2">
                <FilePicker
                  label="Ajouter un fichier (optionnel)"
                  onPick={(name) => attach(complement.id, name)}
                />
                {data.answerFiles[complement.id] && (
                  <span className="flex min-w-0 items-center gap-2.5 rounded-lg border border-line bg-white px-3 py-2 text-[13.5px] text-navy-900">
                    <FileTextIcon className="h-[18px] w-[18px] shrink-0 text-ink-500" />
                    <span
                      className="min-w-0 flex-1 truncate"
                      title={data.answerFiles[complement.id]}
                    >
                      {data.answerFiles[complement.id]}
                    </span>
                    <CheckCircleSolidIcon className="h-[18px] w-[18px] shrink-0 text-green-500" />
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-3 flex items-center justify-center gap-2 text-[13.5px] text-ink-500">
          <InfoIcon className="h-4 w-4" />
          Les fichiers sont facultatifs et servent uniquement à compléter vos
          réponses.
        </p>
      </section>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row lg:mt-auto lg:pt-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-white px-8 text-[15px] font-semibold text-navy-900 transition-colors hover:border-navy-200 hover:bg-navy-50"
        >
          Retour
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!complete}
          className="ml-auto inline-flex h-12 items-center justify-center rounded-xl bg-navy-800 px-8 text-[15px] font-semibold text-white transition-colors hover:bg-navy-900 disabled:cursor-not-allowed disabled:bg-ink-300"
        >
          Vérifier mes réponses
        </button>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 4d — Vérifiez vos compléments                                       */
/* ------------------------------------------------------------------ */

export function ComplementReview({
  onBack,
  onSend,
}: {
  onBack: () => void;
  onSend: () => void;
}) {
  const { data, update } = useWizard();

  function addExtra(name: string, size: number) {
    update((prev) => ({
      extraFiles: [...prev.extraFiles, { name, size, kind: kindOf(name) }],
    }));
  }

  return (
    <>
      <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
        Vérifiez vos compléments
      </h1>
      <p className="mt-1 text-[14px] text-ink-500">
        Relisez vos réponses avant de reprendre l&apos;analyse.
      </p>

      <section className="mt-3 rounded-2xl border border-line bg-white p-4">
        <h2 className="font-display text-lg font-bold text-navy-900">
          Résumé des réponses
        </h2>

        <ul className="mt-2">
          {COMPLEMENTS.map((complement) => {
            const value = data.answers[complement.id];
            const file = data.answerFiles[complement.id];

            return (
              <li
                key={complement.id}
                className="grid items-center gap-4 border-t border-line py-2.5 lg:grid-cols-[1fr_150px_1fr_100px]"
              >
                <span className="text-[14.5px] font-semibold text-navy-900">
                  {complement.summary}
                </span>

                {value === "nsp" || !value ? (
                  <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-surface px-3 py-1.5 text-[13.5px] font-medium text-ink-500">
                    <QuestionIcon className="h-4 w-4" />
                    {value ? ANSWER_LABEL[value] : "Sans réponse"}
                  </span>
                ) : (
                  <span className="inline-flex w-fit items-center gap-2 rounded-lg bg-green-50 px-3 py-1.5 text-[13.5px] font-semibold text-green-600">
                    <CheckCircleSolidIcon className="h-4 w-4 text-green-500" />
                    {ANSWER_LABEL[value]}
                  </span>
                )}

                <span
                  className={`flex min-w-0 items-center gap-2.5 text-[14px] ${
                    file ? "text-navy-900" : "text-ink-300"
                  }`}
                >
                  <FileTextIcon className="h-[18px] w-[18px] shrink-0" />
                  <span className="min-w-0 truncate" title={file}>
                    {file ?? "Aucun fichier"}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-2 justify-self-end text-[14px] font-semibold text-brand-blue-500 hover:underline"
                >
                  <PencilIcon className="h-4 w-4" />
                  Modifier
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-3 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white p-4">
        <div>
          <h2 className="font-display text-[16px] font-bold text-navy-900">
            Ajouter un document complémentaire
          </h2>
          <p className="text-[13.5px] text-ink-500">PDF, DOCX, XLSX</p>
        </div>
        <div className="ml-auto grid min-w-0 max-w-full gap-2">
          <FilePicker
            label="Ajouter un fichier"
            onPick={(name, size) => addExtra(name, size)}
          />
          {data.extraFiles.map((file) => (
            <span
              key={file.name}
              className="flex min-w-0 items-center gap-2.5 rounded-lg border border-line px-3 py-2 text-[13.5px] text-navy-900"
            >
              <FileTextIcon className="h-[18px] w-[18px] shrink-0 text-ink-500" />
              <span className="min-w-0 flex-1 truncate" title={file.name}>
                {file.name}
              </span>
              <CheckCircleSolidIcon className="h-[18px] w-[18px] shrink-0 text-green-500" />
            </span>
          ))}
        </div>
      </section>

      <p className="mt-3 flex items-center gap-3 rounded-xl border border-brand-blue-100 bg-brand-blue-50/60 px-4 py-3 text-[14px] font-medium text-brand-blue-600">
        <InfoIcon className="h-5 w-5 shrink-0" />
        Ces réponses et documents seront intégrés à l&apos;analyse en cours.
      </p>

      <div className="mt-4 flex flex-col justify-center gap-4 rounded-2xl border border-line bg-white p-3 sm:flex-row lg:mt-auto">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-brand-blue-500 bg-white px-8 text-[15px] font-semibold text-brand-blue-500 transition-colors hover:bg-brand-blue-50"
        >
          <ArrowLeftIcon className="h-[18px] w-[18px]" />
          Retour aux questions
        </button>
        <button
          type="button"
          onClick={onSend}
          className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-brand-blue-500 px-8 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-600"
        >
          <RocketIcon className="h-5 w-5" />
          Envoyer et reprendre l&apos;analyse
        </button>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function FilePicker({
  label,
  onPick,
}: {
  label: string;
  onPick: (name: string, size: number) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-brand-blue-500 bg-white px-4 text-[13.5px] font-semibold text-brand-blue-500 transition-colors hover:bg-brand-blue-50"
      >
        <UploadIcon className="h-[18px] w-[18px]" />
        {label}
      </button>
      <input
        ref={ref}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(",")}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPick(file.name, file.size);
          e.target.value = "";
        }}
      />
    </>
  );
}
