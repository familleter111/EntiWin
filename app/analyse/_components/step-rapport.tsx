"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircleIcon,
  ArrowUpIcon,
  BooksIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  DownloadIcon,
  FileTextIcon,
  FolderIcon,
  LinkIcon,
  MinusCircleIcon,
  PieIcon,
  ShareIcon,
} from "@/app/components/icons";
import { DEMO_FILES } from "../_lib/documents";
import { PRIORITIES, REPORT_THEMES } from "../_lib/results";
import { useWizard } from "./wizard-store";

const RECO_ICONS = [ClipboardCheckIcon, LinkIcon, FileTextIcon];

const PRIORITY_TONE = {
  red: "border-danger/25 bg-danger/5 text-danger",
  orange: "border-warn/30 bg-warn/10 text-warn",
  blue: "border-brand-blue-100 bg-brand-blue-50 text-brand-blue-600",
} as const;

export function StepRapport() {
  const { data } = useWizard();
  const files = data.files.length > 0 ? data.files : DEMO_FILES;
  const [open, setOpen] = useState<string>(REPORT_THEMES[0].id);

  function share() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "Rapport ENTI WIN", url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
    }
  }

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-4 xl:px-10">
      <div className="flex flex-wrap items-start gap-4">
        <div>
          <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
            Rapport &amp; recommandations
          </h1>
          <p className="mt-1 text-[14px] text-ink-500">
            Synthèse des constats issus de l&apos;analyse de vos documents.
          </p>
        </div>

        <div className="ml-auto flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-navy-800 bg-white px-5 text-[15px] font-semibold text-navy-900 transition-colors hover:bg-navy-50"
          >
            <DownloadIcon className="h-5 w-5" />
            Télécharger le rapport PDF
          </button>
          <button
            type="button"
            onClick={share}
            className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-navy-800 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-navy-900"
          >
            <ShareIcon className="h-5 w-5" />
            Partager le rapport
          </button>
        </div>
      </div>

      <div className="mt-4 grid min-h-0 gap-4 lg:grid-cols-[1fr_340px]">
        {/* ---------- Constats par thème ---------- */}
        <div className="grid content-start gap-3">
          {REPORT_THEMES.map((theme) => {
            const expanded = open === theme.id;

            return (
              <section
                key={theme.id}
                className="rounded-2xl border border-line bg-white p-4"
              >
                <header className="flex flex-wrap items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-800">
                    {theme.id === "deviations" ? (
                      <FolderIcon className="h-5 w-5" />
                    ) : (
                      <BooksIcon className="h-5 w-5" />
                    )}
                  </span>
                  <h2 className="font-display text-lg font-bold text-navy-900">
                    {theme.label}
                  </h2>

                  <span className="flex flex-wrap items-center gap-3 text-[13.5px] text-ink-500">
                    <span className="flex items-center gap-1.5">
                      <CheckCircleIcon className="h-[18px] w-[18px] text-green-500" />
                      {theme.covered} couvertes
                    </span>
                    <span className="text-ink-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <PieIcon className="h-[18px] w-[18px] text-brand-blue-500" />
                      {theme.partial} partiellement couvertes
                    </span>
                    <span className="text-ink-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <AlertCircleIcon className="h-[18px] w-[18px] text-danger" />
                      {theme.missing} non identifiée
                      {theme.missing > 1 ? "s" : ""}
                    </span>
                  </span>

                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setOpen(expanded ? "" : theme.id)}
                    className="ml-auto rounded-lg border border-line p-2 text-navy-900 transition-colors hover:bg-navy-50"
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </header>

                {expanded && (
                  <div className="mt-3 rounded-xl border border-line p-3">
                    <h3 className="text-[14.5px] font-semibold text-navy-900">
                      Recommandations prioritaires
                    </h3>
                    <ul className="mt-2.5 grid gap-2.5">
                      {theme.recommendations.map((reco, i) => {
                        const Icon = RECO_ICONS[i % RECO_ICONS.length];
                        return (
                          <li
                            key={reco}
                            className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-2.5 text-[14px] text-navy-900"
                          >
                            <Icon className="h-5 w-5 shrink-0 text-navy-800" />
                            {reco}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* ---------- Priorités ---------- */}
        <div className="grid content-start gap-4">
          <section className="rounded-2xl border border-line bg-white p-4">
            <h2 className="font-display text-lg font-bold text-navy-900">
              Priorités
            </h2>
            <ul className="mt-3 grid gap-2.5">
              {PRIORITIES.map((priority) => (
                <li
                  key={priority.label}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${PRIORITY_TONE[priority.tone]}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70">
                    {priority.tone === "red" && (
                      <AlertCircleIcon className="h-5 w-5" />
                    )}
                    {priority.tone === "orange" && (
                      <ArrowUpIcon className="h-5 w-5" />
                    )}
                    {priority.tone === "blue" && (
                      <MinusCircleIcon className="h-5 w-5" />
                    )}
                  </span>
                  <span>
                    <span className="text-[14.5px] font-bold">
                      {priority.label} ({priority.count})
                    </span>
                    <span className="block text-[13px] text-ink-500">
                      {priority.hint}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-navy-800">
              <FileTextIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[14.5px] font-semibold text-navy-900">
                Documents analysés
              </p>
              <p className="font-display text-2xl font-extrabold text-navy-900">
                {files.length}
              </p>
              <p className="text-[13px] text-ink-500">fichiers</p>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-4 lg:mt-auto lg:pt-4">
        <Link
          href="/analyse/suivi"
          prefetch
          className="flex h-13 w-full items-center justify-center rounded-xl bg-navy-800 px-6 text-[16px] font-semibold text-white transition-colors hover:bg-navy-900"
        >
          <span className="mx-auto">Continuer vers le suivi</span>
          <ChevronRightIcon className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
