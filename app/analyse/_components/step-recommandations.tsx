"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  CheckCircleSolidIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  ClockIcon,
  DownloadIcon,
  EyeIcon,
  MinusIcon,
  ShieldCheckIcon,
  SparkleIcon,
  XCircleIcon,
} from "@/app/components/icons";
import { THEME_LABEL, type ThemeId } from "../_lib/documents";
import {
  PRIORITY_HINT,
  PRIORITY_LABEL,
  RECOMMENDATIONS,
  complianceScore,
  priorityCounts,
  type Priority,
} from "../_lib/recommendations";
import { requirementStats } from "../_lib/requirements";
import { useWizard } from "./wizard-store";

const PRIORITY_STYLE: Record<Priority, string> = {
  elevee: "border-danger/25 bg-danger/5 text-danger",
  ameliorer: "border-brand-blue-100 bg-brand-blue-50 text-brand-blue-600",
  surveiller: "border-line bg-surface text-ink-500",
};

const PRIORITY_ICON: Record<Priority, typeof ArrowUpIcon> = {
  elevee: ArrowUpIcon,
  ameliorer: MinusIcon,
  surveiller: EyeIcon,
};

const PAGE_SIZE = 6;

export function StepRecommandations() {
  const { data, update } = useWizard();
  const stats = requirementStats();
  const score = complianceScore();
  const counts = priorityCounts();

  const [priority, setPriority] = useState<Priority | "">("");
  const [theme, setTheme] = useState<ThemeId | "">("");
  const [page, setPage] = useState(0);

  const list = useMemo(
    () =>
      RECOMMENDATIONS.filter(
        (r) =>
          (priority === "" || r.priority === priority) &&
          (theme === "" || r.theme === theme),
      ),
    [priority, theme],
  );

  // même principe que le tableau du rapport : on pagine plutôt que de faire
  // défiler la carte
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const rows = list.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  const plan = data.planItems;

  function togglePlan(id: string) {
    update((prev) => ({
      planItems: prev.planItems.includes(id)
        ? prev.planItems.filter((item) => item !== id)
        : [...prev.planItems, id],
    }));
  }

  function download(rows: typeof RECOMMENDATIONS, filename: string) {
    const csv = [
      "Priorite;Action;Exigence associee;Theme;Detail",
      ...rows.map((r) =>
        [
          PRIORITY_LABEL[r.priority],
          r.title,
          r.requirement,
          r.themeLabel,
          r.detail,
        ]
          .map((cell) => `"${cell.replace(/"/g, '""')}"`)
          .join(";"),
      ),
    ].join("\r\n");

    const url = URL.createObjectURL(
      new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-4 xl:px-10 lg:h-full">
      {/* ---------------- Entête ---------------- */}
      <div className="flex flex-wrap items-start gap-4">
        <div>
          <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
            Recommandations IA
          </h1>
          <p className="mt-1 text-[14px] text-ink-500">
            Actions proposées à partir des écarts identifiés dans votre analyse.
          </p>
        </div>

        <div className="ml-auto flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() =>
              download(RECOMMENDATIONS, "entiwin-recommandations.csv")
            }
            className="inline-flex h-11 items-center gap-2.5 rounded-xl border border-line bg-white px-5 text-[14.5px] font-semibold text-navy-900 transition-colors hover:border-navy-200 hover:bg-navy-50"
          >
            <DownloadIcon className="h-[18px] w-[18px]" />
            Télécharger les recommandations
          </button>
          <button
            type="button"
            disabled={plan.length === 0}
            onClick={() =>
              download(
                RECOMMENDATIONS.filter((r) => plan.includes(r.id)),
                "entiwin-plan-action.csv",
              )
            }
            title={
              plan.length === 0
                ? "Cochez au moins une action à ajouter au plan"
                : undefined
            }
            className="inline-flex h-11 items-center gap-2.5 rounded-xl bg-navy-800 px-5 text-[14.5px] font-semibold text-white transition-colors hover:bg-navy-900 disabled:cursor-not-allowed disabled:bg-ink-300"
          >
            <DownloadIcon className="h-[18px] w-[18px]" />
            Exporter le plan
            {plan.length > 0 && (
              <span className="rounded-md bg-white/20 px-1.5 text-[12.5px]">
                {plan.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ---------------- Indicateurs ---------------- */}
      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          icon={<ShieldCheckIcon className="h-6 w-6" />}
          tone="blue"
          value={`${score} %`}
          label="Score de conformité"
        />
        <StatTile
          icon={<XCircleIcon className="h-6 w-6" />}
          tone="danger"
          value={stats.critiques}
          label="Points critiques"
        />
        <StatTile
          icon={<ClipboardCheckIcon className="h-6 w-6" />}
          tone="navy"
          value={stats.nonIdentifiees}
          label="Exigences non identifiées"
        />
        <StatTile
          icon={<ClockIcon className="h-6 w-6" />}
          tone="blue"
          value={stats.partielles}
          label="Exigences partiellement couvertes"
        />
      </ul>

      {/* ---------------- Plan + priorisation ---------------- */}
      {/* grid-rows figées : la liste défile dans sa carte plutôt que de
          pousser la page vers le bas */}
      <div className="mt-3 grid min-h-0 flex-1 gap-4 lg:grid-cols-[1fr_minmax(0,380px)] lg:grid-rows-[minmax(0,1fr)]">
        <section className="flex min-h-0 flex-col rounded-2xl border border-line bg-white p-4">
          <h2 className="font-display text-[17px] font-bold text-navy-900">
            Plan d&apos;amélioration recommandé
          </h2>

          <ul className="mt-2 min-h-0 flex-1">
            {rows.map((reco, i) => {
              const checked = plan.includes(reco.id);
              const Icon = PRIORITY_ICON[reco.priority];

              return (
                <li
                  key={reco.id}
                  className="grid items-center gap-4 border-t border-line py-1.5 first:border-t-0 lg:grid-cols-[1fr_auto_auto]"
                >
                  <div className="flex min-w-0 items-start gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-500">
                      <SparkleIcon className="h-4 w-4" />
                    </span>
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue-500 text-[11px] font-bold text-white">
                      {current * PAGE_SIZE + i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 text-[14px] font-bold leading-5 text-navy-900">
                        {reco.title}
                        <span className="rounded-md border border-brand-blue-100 bg-brand-blue-50 px-2 py-0.5 text-[12px] font-medium text-brand-blue-600">
                          {reco.requirement}
                        </span>
                      </p>
                      <p
                        className="mt-0.5 truncate text-[12.5px] leading-4 text-ink-500"
                        title={reco.detail}
                      >
                        {reco.detail}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-lg border px-3 text-[12.5px] font-semibold ${PRIORITY_STYLE[reco.priority]}`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {PRIORITY_LABEL[reco.priority]}
                  </span>

                  <label className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap border-line pl-4 text-[13px] text-ink-500 lg:border-l">
                    <span
                      className={`flex h-[18px] w-[18px] items-center justify-center rounded border transition-colors ${
                        checked
                          ? "border-navy-800 bg-navy-800 text-white"
                          : "border-line bg-white"
                      }`}
                    >
                      {checked && <CheckIcon className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePlan(reco.id)}
                      className="sr-only"
                    />
                    Ajouter au plan d&apos;action
                  </label>
                </li>
              );
            })}

            {list.length === 0 && (
              <li className="py-10 text-center text-[14px] text-ink-500">
                Aucune action ne correspond à ces filtres.
              </li>
            )}
          </ul>

          <footer className="mt-1.5 flex flex-wrap items-center gap-3 border-t border-line pt-2">
            <p className="text-[13px] text-ink-500">
              {list.length === 0
                ? "Aucune action"
                : `Affichage ${current * PAGE_SIZE + 1} à ${Math.min(
                    (current + 1) * PAGE_SIZE,
                    list.length,
                  )} sur ${list.length} actions`}
            </p>

            {pageCount > 1 && (
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Page précédente"
                  disabled={current === 0}
                  onClick={() => setPage(current - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white text-navy-900 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:text-ink-300 disabled:hover:bg-white"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                {Array.from({ length: pageCount }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    aria-current={i === current ? "page" : undefined}
                    className={`h-8 w-8 rounded-lg border text-[13px] font-semibold transition-colors ${
                      i === current
                        ? "border-navy-800 bg-navy-800 text-white"
                        : "border-line bg-white text-navy-900 hover:bg-navy-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Page suivante"
                  disabled={current >= pageCount - 1}
                  onClick={() => setPage(current + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white text-navy-900 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:text-ink-300 disabled:hover:bg-white"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </footer>
        </section>

        <div className="grid min-h-0 content-start gap-3">
          <section className="rounded-2xl border border-line bg-white p-4">
            <h2 className="font-display text-[17px] font-bold text-navy-900">
              Priorisation IA
            </h2>
            <ul className="mt-2">
              {counts.map(({ priority: p, count }) => {
                const Icon = PRIORITY_ICON[p];
                return (
                  <li
                    key={p}
                    className="flex items-center gap-3 border-t border-line py-2.5 first:border-t-0"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        p === "elevee"
                          ? "bg-brand-blue-500 text-white"
                          : p === "ameliorer"
                            ? "bg-brand-blue-50 text-brand-blue-500"
                            : "bg-surface text-ink-500"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-bold text-navy-900">
                        {p === "elevee" ? "Élevée" : PRIORITY_LABEL[p]}
                      </span>
                      <span className="block text-[12.5px] text-ink-500">
                        {PRIORITY_HINT[p]}
                      </span>
                    </span>
                    <span className="ml-auto rounded-md bg-surface px-2.5 py-1 text-[13px] font-semibold text-navy-900">
                      {count}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-2xl border border-line bg-white p-4">
            <h2 className="font-display text-[17px] font-bold text-navy-900">
              Filtres
            </h2>
            <div className="mt-2.5 grid gap-2.5">
              <Select
                label="Filtrer par priorité"
                value={priority}
                onChange={(v) => setPriority(v as Priority | "")}
                placeholder="Toutes les priorités"
                options={counts.map(({ priority: p }) => ({
                  value: p,
                  label: PRIORITY_LABEL[p],
                }))}
              />
              <Select
                label="Filtrer par thème"
                value={theme}
                onChange={(v) => setTheme(v as ThemeId | "")}
                placeholder="Tous les thèmes"
                options={(Object.keys(THEME_LABEL) as ThemeId[]).map((t) => ({
                  value: t,
                  label: THEME_LABEL[t],
                }))}
              />
            </div>
          </section>
        </div>
      </div>

      {/* ---------------- Navigation ---------------- */}
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <Link
          href="/analyse/rapport"
          prefetch
          className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-line bg-white px-6 text-[15px] font-semibold text-navy-900 transition-colors hover:border-navy-200 hover:bg-navy-50"
        >
          <ArrowLeftIcon className="h-[18px] w-[18px]" />
          Retour au rapport
        </Link>

        {data.finalized ? (
          <span className="ml-auto inline-flex h-12 items-center gap-2.5 rounded-xl border border-green-300 bg-green-50 px-6 text-[15px] font-semibold text-green-600">
            <CheckCircleSolidIcon className="h-5 w-5 text-green-500" />
            Analyse finalisée
          </span>
        ) : (
          <button
            type="button"
            onClick={() => update({ finalized: true })}
            className="ml-auto inline-flex h-12 items-center gap-2.5 rounded-xl bg-brand-blue-500 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-600"
          >
            <SparkleIcon className="h-5 w-5" />
            Finaliser mon analyse
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function StatTile({
  icon,
  tone,
  value,
  label,
}: {
  icon: React.ReactNode;
  tone: "navy" | "blue" | "danger";
  value: number | string;
  label: string;
}) {
  const styles = {
    navy: "bg-navy-50 text-navy-800",
    blue: "bg-brand-blue-50 text-brand-blue-500",
    danger: "bg-danger/10 text-danger",
  } as const;

  return (
    <li className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${styles[tone]}`}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[24px] font-extrabold leading-none text-navy-900">
          {value}
        </span>
        <span className="mt-1 block text-[13px] leading-4 text-ink-500">
          {label}
        </span>
      </span>
    </li>
  );
}

function Select({
  value,
  onChange,
  label,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full appearance-none rounded-lg border border-line bg-white pl-3.5 pr-9 text-[14px] font-medium text-navy-900 outline-none transition-colors hover:border-navy-200 focus:border-navy-500"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
    </div>
  );
}
