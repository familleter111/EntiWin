"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRightIcon,
  BankIcon,
  CheckCircleSolidIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FileTextIcon,
  FileTypeIcon,
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

/**
 * Étape 1 — deux sections dépliantes : l'organisation d'abord, les documents
 * ensuite. Tant que l'organisation n'est pas renseignée, la seconde reste
 * fermée : c'est ce qui rend l'ordre évident sans texte d'explication.
 */
export function StepPreparation() {
  const { data, update } = useWizard();
  const [draft, setDraft] = useState(data.organisation);
  const [editing, setEditing] = useState(false);

  const confirmed = data.organisationConfirmed && !editing;

  function confirmOrganisation() {
    const name = draft.trim();
    if (!name) return;
    update({ organisation: name, organisationConfirmed: true });
    setEditing(false);
  }

  return (
    // « safe center » : tant que le contenu est court, il se pose au milieu de
    // l'écran plutôt que de flotter en haut d'un grand vide ; s'il dépasse, le
    // centrage s'annule au lieu de rogner le haut.
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-4 lg:[justify-content:safe_center] xl:px-10">
      <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
        Préparez votre analyse
      </h1>
      <p className="mt-1 text-[14px] text-ink-500">
        Suivez les étapes pour générer votre rapport réglementaire assisté par
        IA.
      </p>

      {/* ---------------- Organisation ---------------- */}
      {confirmed ? (
        <section className="mt-3 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white p-3.5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-navy-800">
            <BankIcon className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-[12.5px] text-ink-500">
              Organisation
            </span>
            <span className="block truncate font-display text-[17px] font-bold text-navy-900">
              {data.organisation}
            </span>
          </span>

          <span className="ml-auto flex items-center gap-2 text-[13.5px] font-semibold text-green-600">
            <CheckCircleSolidIcon className="h-[18px] w-[18px] text-green-500" />
            Organisation renseignée
          </span>
          <button
            type="button"
            onClick={() => {
              setDraft(data.organisation);
              setEditing(true);
            }}
            className="inline-flex h-10 items-center rounded-xl border border-line bg-white px-5 text-[14px] font-semibold text-navy-900 transition-colors hover:border-navy-200 hover:bg-navy-50"
          >
            Modifier
          </button>
        </section>
      ) : (
        <section className="mt-3 rounded-2xl border border-line bg-white p-4 xl:p-5">
          <header className="flex items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-navy-800">
              <BankIcon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-[17px] font-bold text-navy-900">
                Organisation
              </h2>
              <p className="mt-0.5 text-[13.5px] text-ink-500">
                Indiquez le nom de votre organisation pour commencer.
              </p>
            </div>
          </header>

          <label
            htmlFor="organisation"
            className="mt-4 block text-[13.5px] font-semibold text-navy-900"
          >
            Nom de l&apos;organisation <span className="text-danger">*</span>
          </label>
          <input
            id="organisation"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && confirmOrganisation()}
            placeholder="Nom de votre organisation"
            autoComplete="organization"
            className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-navy-900 outline-none transition-colors placeholder:text-ink-300 focus:border-navy-500"
          />

          <div className="mt-3.5 flex justify-end">
            <button
              type="button"
              onClick={confirmOrganisation}
              disabled={draft.trim() === ""}
              className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-navy-800 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-navy-900 disabled:cursor-not-allowed disabled:bg-ink-300"
            >
              Continuer
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
        </section>
      )}

      {/* ---------------- Documents ---------------- */}
      {confirmed ? (
        <DocumentsPanel />
      ) : (
        <section className="mt-3 flex items-center gap-3.5 rounded-2xl border border-line bg-white p-4 xl:p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-ink-300">
            <FileTextIcon className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-[17px] font-bold text-navy-900">
              Chargez vos documents
            </h2>
            <p className="mt-0.5 text-[13.5px] text-ink-500">
              Cette section s&apos;ouvrira après validation de l&apos;organisation.
            </p>
          </div>
          <ChevronDownIcon className="ml-auto h-5 w-5 shrink-0 text-ink-300" />
        </section>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function DocumentsPanel() {
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

  const count = data.files.length;

  return (
    <section
      className={`relative mt-5 flex flex-col rounded-2xl border-2 border-brand-blue-500 bg-white p-4 xl:p-5 ${
        // Au-delà de quelques fichiers, la liste prend la place restante et
        // défile ; en deçà, la carte s'arrête au contenu comme sur la maquette.
        count > 4 ? "min-h-0 flex-1" : ""
      }`}
    >
      {/* Pastille de liaison avec la section précédente, comme sur la maquette. */}
      <span className="absolute -top-3.5 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-brand-blue-100 bg-white text-brand-blue-500">
        <ChevronUpIcon className="h-4 w-4" />
      </span>

      <h2 className="font-display text-[19px] font-bold text-navy-900">
        Chargez vos documents
      </h2>
      <p className="mt-1 text-[13px] leading-[1.5] text-ink-500">
        Exemples de documents : procédure de gestion des déviations, procédure
        CAPA, formulaire ou modèle de déviation, procédure de Change Control,
        SOP approuvée, rapport d&apos;audit, réclamation qualité, rapport
        APR/PQR…
      </p>

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
            : "border-line bg-white hover:bg-surface"
        }`}
      >
        <UploadIcon className="mx-auto h-7 w-7 text-navy-900" />
        <p className="mt-1.5 font-display text-[15px] font-bold text-navy-900">
          Déposez vos fichiers ici
        </p>
        <p className="mt-0.5 text-[13px] text-ink-500">
          ou cliquez pour parcourir vos fichiers
        </p>
        <p className="text-[13px] text-ink-500">PDF, DOCX, XLSX</p>
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

      {count > 0 && (
        <ul className="mt-2.5 min-h-0 flex-1 overflow-y-auto">
          {data.files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="mt-2 flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-2 first:mt-0"
            >
              <FileTypeIcon kind={file.kind} className="h-7 w-6 shrink-0" />
              <span
                className="min-w-0 flex-1 truncate text-[14px] text-navy-900"
                title={file.name}
              >
                {file.name}
              </span>
              <span className="w-20 shrink-0 text-right text-[13.5px] text-ink-500">
                {formatSize(file.size)}
              </span>
              <span className="flex w-24 shrink-0 items-center gap-2 text-[13.5px] font-semibold text-green-600">
                <CheckCircleSolidIcon className="h-[18px] w-[18px] text-green-500" />
                Prêt
              </span>
              <button
                type="button"
                aria-label={`Retirer ${file.name}`}
                onClick={() => removeFile(i)}
                className="shrink-0 rounded-lg p-1.5 text-danger/80 transition-colors hover:bg-danger/10 hover:text-danger"
              >
                <TrashIcon className="h-[18px] w-[18px]" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-3 flex flex-wrap items-center gap-4">
        {count > 0 ? (
          <p className="flex items-center gap-2 text-[14px] font-semibold text-green-600">
            <CheckCircleSolidIcon className="h-[18px] w-[18px] text-green-500" />
            {count} document{count > 1 ? "s" : ""} prêt{count > 1 ? "s" : ""}{" "}
            pour l&apos;analyse
          </p>
        ) : (
          <p className="text-[14px] text-ink-500">Aucun fichier ajouté</p>
        )}

        {count > 0 ? (
          <Link
            href="/analyse/themes"
            prefetch
            className="ml-auto inline-flex h-12 items-center gap-2.5 rounded-xl bg-brand-blue-500 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-600"
          >
            Continuer vers les thèmes détectés
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        ) : (
          <span className="ml-auto inline-flex h-12 cursor-not-allowed items-center gap-2.5 rounded-xl bg-brand-blue-500/40 px-6 text-[15px] font-semibold text-white">
            Continuer vers les thèmes détectés
            <ArrowRightIcon className="h-5 w-5" />
          </span>
        )}
      </footer>
    </section>
  );
}
