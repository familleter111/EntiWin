"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  CheckCircleSolidIcon,
  FileTypeIcon,
  SparkleIcon,
  TrashIcon,
  UploadIcon,
} from "@/app/components/icons";
import {
  ACCEPTED_EXTENSIONS,
  formatSize,
  kindOf,
  type UploadedFile,
} from "../_lib/documents";
import { useWizard } from "./wizard-store";

export function StepDocuments() {
  const { data, update } = useWizard();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function addFiles(list: FileList | null) {
    if (!list) return;

    const incoming: UploadedFile[] = [...list]
      .filter((f) =>
        ACCEPTED_EXTENSIONS.some((ext) => f.name.toLowerCase().endsWith(ext)),
      )
      .map((f) => ({ name: f.name, size: f.size, kind: kindOf(f.name) }));

    // pas de doublon sur le couple nom + taille
    update((prev) => {
      const merged = [...prev.files];
      for (const file of incoming) {
        if (!merged.some((f) => f.name === file.name && f.size === file.size))
          merged.push(file);
      }
      return { files: merged };
    });
  }

  function removeFile(index: number) {
    update((prev) => ({ files: prev.files.filter((_, i) => i !== index) }));
  }

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-4 xl:px-10">
      <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
        Chargez vos documents
      </h1>
      <p className="mt-1 max-w-[105ch] text-[14px] leading-6 text-ink-500">
        Exemples de documents : procédure de gestion des déviations, procédure
        CAPA, formulaire ou modèle de déviation, procédure de Change Control,
        SOP approuvée, rapport d&apos;audit, réclamation qualité, rapport
        APR/PQR…
      </p>

      {/* ---------- Zone de dépôt ---------- */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`mt-3 shrink-0 cursor-pointer rounded-xl border-2 border-dashed px-6 py-4 text-center transition-colors ${
          dragging
            ? "border-brand-blue-500 bg-brand-blue-50"
            : "border-navy-800/45 bg-white/40 hover:bg-white"
        }`}
      >
        <UploadIcon className="mx-auto h-7 w-7 text-navy-900" />
        <p className="mt-1.5 font-display text-[16px] font-bold text-navy-900">
          Déposez vos fichiers ici
        </p>
        <p className="mt-0.5 text-[13.5px] text-ink-500">
          ou cliquez pour parcourir vos fichiers
        </p>
        <p className="text-[13.5px] text-ink-500">PDF, DOCX, XLSX</p>
        <span className="mt-2.5 inline-flex h-10 items-center rounded-xl border border-navy-800 bg-white px-5 text-[14px] font-semibold text-navy-900 transition-colors hover:bg-navy-50">
          Sélectionner des fichiers
        </span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_EXTENSIONS.join(",")}
          className="sr-only"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {/* ---------- Fichiers chargés ---------- */}
      {data.files.length > 0 && (
        <ul className="mt-3 min-h-0 flex-1 overflow-y-auto">
          {data.files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="mt-2 flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-2 first:mt-0"
            >
              <FileTypeIcon kind={file.kind} className="h-7 w-6 shrink-0" />
              <span className="min-w-0 flex-1 truncate text-[14.5px] text-navy-900">
                {file.name}
              </span>
              <span className="w-24 shrink-0 text-right text-[14px] text-ink-500">
                {formatSize(file.size)}
              </span>
              <span className="flex w-28 shrink-0 items-center gap-2 text-[14px] font-semibold text-green-600">
                <CheckCircleSolidIcon className="h-[18px] w-[18px] text-green-500" />
                Prêt
              </span>
              <button
                type="button"
                aria-label={`Retirer ${file.name}`}
                onClick={() => removeFile(i)}
                className="shrink-0 rounded-lg p-1.5 text-ink-500 transition-colors hover:bg-navy-50 hover:text-navy-900"
              >
                <TrashIcon className="h-[18px] w-[18px]" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ---------- Actions ---------- */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-auto lg:pt-4">
        <p className="text-[14px] text-ink-500">
          {data.files.length === 0
            ? "Aucun fichier ajouté"
            : `${data.files.length} fichier${data.files.length > 1 ? "s" : ""} ajouté${
                data.files.length > 1 ? "s" : ""
              }`}
        </p>

        <div className="flex flex-col gap-3 sm:ml-auto sm:flex-row">
          {data.files.length > 0 ? (
            <Link
              href="/analyse/themes"
              prefetch
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-brand-blue-500 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-600"
            >
              <SparkleIcon className="h-5 w-5" />
              Détecter les thèmes avec l&apos;IA
            </Link>
          ) : (
            <span className="inline-flex h-12 cursor-not-allowed items-center justify-center gap-2.5 rounded-xl bg-brand-blue-500/40 px-6 text-[15px] font-semibold text-white">
              <SparkleIcon className="h-5 w-5" />
              Détecter les thèmes avec l&apos;IA
            </span>
          )}

          <Link
            href="/analyse"
            prefetch
            className="inline-flex h-12 items-center justify-center rounded-xl border border-line bg-white px-8 text-[15px] font-semibold text-navy-900 transition-colors hover:border-navy-200 hover:bg-navy-50"
          >
            Retour
          </Link>
        </div>
      </div>
    </div>
  );
}
