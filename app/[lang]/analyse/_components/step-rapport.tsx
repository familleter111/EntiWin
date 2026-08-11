"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangleIcon,
  ArrowDownIcon,
  CheckCircleIcon,
  CheckCircleSolidIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  DownloadIcon,
  EyeIcon,
  FileTextIcon,
  FileTypeIcon,
  FolderIcon,
  InfoIcon,
  LightbulbIcon,
  PieIcon,
  SearchIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "@/app/components/icons";
import { DEMO_FILES, THEME_LABEL, type ThemeId } from "../_lib/documents";
import {
  LEVEL_LABEL,
  PRIORITY_LABEL,
  topRecommendations,
} from "../_lib/recommendations";
import {
  COVERAGE,
  REQUIREMENTS,
  STATUS_LABEL,
  requirementStats,
  themeStats,
  type ReqStatus,
  type Stats,
} from "../_lib/requirements";
import { Density } from "./density";
import { ReportAccessDialog } from "./report-access-dialog";
import { localePath, type Locale } from "@/lib/i18n/config";
import { useLocale, useTunnel } from "@/lib/i18n/dictionary-provider";
import { formatDate } from "@/lib/i18n/format";
import { format, plural } from "@/lib/i18n/interpolate";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { useWizard } from "./wizard-store";

const PAGE_SIZE = 10;

const THEMES: ThemeId[] = ["deviations", "documentaire"];

const STATUS_DOT: Record<ReqStatus, string> = {
  couverte: "bg-green-500",
  partielle: "bg-brand-blue-500",
  "non-identifiee": "bg-danger",
};

const STATUS_TEXT: Record<ReqStatus, string> = {
  couverte: "text-green-600",
  partielle: "text-brand-blue-600",
  "non-identifiee": "text-danger",
};

export function StepRapport() {
  const { data, update } = useWizard();
  const [dialog, setDialog] = useState(false);

  if (!data.reportGenerated) {
    return (
      <>
        <ReportOverview onGenerate={() => setDialog(true)} />
        {dialog && (
          <ReportAccessDialog
            onClose={() => setDialog(false)}
            onConfirm={() => {
              update({ reportGenerated: true, generatedAt: Date.now() });
              setDialog(false);
            }}
          />
        )}
      </>
    );
  }

  return <FullReport />;
}

/* ------------------------------------------------------------------ */
/* Avant génération : les scores, sans le détail                       */
/* ------------------------------------------------------------------ */

function ReportOverview({ onGenerate }: { onGenerate: () => void }) {
  const { overview: t, tiles: tileLabels } = useTunnel().report;
  const stats = requirementStats();

  return (
    // « safe center » et non « center » : si le contenu dépasse, le centrage
    // s'annule au lieu de rogner le haut de l'écran.
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-4 lg:[justify-content:safe_center] xl:px-10">
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
          {t.title}
        </h1>
        <button
          type="button"
          onClick={onGenerate}
          className="ml-auto inline-flex h-12 items-center gap-2.5 rounded-xl bg-brand-blue-500 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-600"
        >
          <FileTextIcon className="h-5 w-5" />
          {t.generate}
        </button>
      </div>

      {/* ---------------- Score global ---------------- */}
      <section className="mt-3 rounded-2xl border border-brand-blue-100 bg-gradient-to-b from-brand-blue-50/70 to-white p-5">
        <header className="flex flex-wrap items-center gap-4">
          <h2 className="font-display text-[22px] font-extrabold text-navy-900">
            {t.globalScoreTitle}
          </h2>
          <span className="ml-auto inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2 text-[13.5px] font-semibold text-navy-900">
            <EyeIcon className="h-[18px] w-[18px] text-brand-blue-500" />
            {t.overview}
          </span>
        </header>

        <div className="mt-3 flex flex-wrap items-center gap-6">
          <Donut score={stats.score} size={168} caption={t.globalScoreTitle} />
          <span className="hidden h-24 w-px bg-line lg:block" />
          <ul className="flex flex-1 flex-wrap justify-around gap-4">
            {tiles(stats, tileLabels).map((tile) => (
              <StatTile key={tile.label} {...tile} />
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Scores par thème ---------------- */}
      <h2 className="mt-4 font-display text-[16px] font-bold text-navy-900">
        {t.scoresByTheme}
      </h2>
      <div className="mt-2 grid gap-4 lg:grid-cols-2">
        {THEMES.map((theme) => (
          <ThemeScoreCard key={theme} theme={theme} />
        ))}
      </div>

      <p className="mt-4 flex items-center gap-3 rounded-xl border border-brand-blue-100 bg-brand-blue-50/60 px-4 py-3 text-[14px] font-medium text-brand-blue-600">
        <InfoIcon className="h-5 w-5 shrink-0" />
        {t.ctaHint}
      </p>
    </div>
  );
}

function ThemeScoreCard({ theme }: { theme: ThemeId }) {
  const locale = useLocale();
  const { tiles: tileLabels } = useTunnel().report;
  const stats = themeStats(theme);

  return (
    <section className="rounded-2xl border border-line bg-white p-4">
      <h3 className="font-display text-[16px] font-bold text-navy-900">
        {THEME_LABEL[theme][locale]}
      </h3>
      <div className="mt-2 flex flex-wrap items-center gap-4">
        <Donut score={stats.score} size={104} />
        <span className="hidden h-16 w-px bg-line sm:block" />
        <ul className="flex flex-1 flex-wrap justify-around gap-3">
          {tiles(stats, tileLabels).map((tile) => (
            <StatTile key={tile.label} {...tile} compact />
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Après génération : le rapport complet                               */
/* ------------------------------------------------------------------ */

function FullReport() {
  const locale = useLocale();
  const { report } = useTunnel();
  const t = report.full;
  const { data } = useWizard();
  const files = data.files.length > 0 ? data.files : DEMO_FILES;

  const [tab, setTab] = useState<ThemeId | "global">("global");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(REQUIREMENTS[0].id);

  const scope = useMemo(
    () =>
      tab === "global"
        ? REQUIREMENTS
        : REQUIREMENTS.filter((r) => r.theme === tab),
    [tab],
  );

  const stats = tab === "global" ? requirementStats() : themeStats(tab);

  const filtered = useMemo(
    () =>
      scope.filter(
        (r) =>
          query.trim() === "" ||
          r.label[locale].toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [scope, query, locale],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const rows = filtered.slice(
    current * PAGE_SIZE,
    current * PAGE_SIZE + PAGE_SIZE,
  );
  const selected =
    scope.find((r) => r.id === selectedId) ?? scope[0] ?? REQUIREMENTS[0];

  function selectTab(next: ThemeId | "global") {
    setTab(next);
    setPage(0);
    const first = next === "global" ? REQUIREMENTS[0] : requirementOf(next);
    setSelectedId(first.id);
  }

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-3 xl:px-10">
      {/* Seul écran assez dense pour mériter une réduction agressive. */}
      <Density value="dense" />

      {/* ---------------- Entête ---------------- */}
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[clamp(1.4rem,1.8vw,1.75rem)] font-extrabold tracking-[-0.02em] text-navy-900">
              {t.title}
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-2.5 py-1 text-[12.5px] font-semibold text-green-600">
              <CheckCircleSolidIcon className="h-3.5 w-3.5 text-green-500" />
              {t.generatedBadge}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-[13px] text-ink-500">
            <span className="flex min-w-0 items-center gap-2">
              <FileTypeIcon kind={files[0].kind} className="h-4 w-3.5 shrink-0" />
              <span
                className="min-w-0 max-w-[320px] truncate text-navy-900"
                title={files[0].name}
              >
                {files[0].name}
              </span>
            </span>
            <GeneratedAt
              at={data.generatedAt || data.completedAt}
              locale={locale}
              t={report}
            />
          </div>
        </div>

        <Link
          href={localePath(locale, "/rapport")}
          prefetch
          className="ml-auto inline-flex h-11 items-center gap-2.5 rounded-xl bg-brand-blue-500 px-5 text-[14.5px] font-semibold text-white transition-colors hover:bg-brand-blue-600"
        >
          <DownloadIcon className="h-[18px] w-[18px]" />
          {t.downloadPdf}
        </Link>
      </div>

      {/* ---------------- Onglets ---------------- */}
      <div className="mt-2.5 flex flex-wrap gap-1 border-b border-line">
        <Tab active={tab === "global"} onClick={() => selectTab("global")}>
          {t.globalTab}
        </Tab>
        {THEMES.map((theme) => (
          <Tab
            key={theme}
            active={tab === theme}
            onClick={() => selectTab(theme)}
          >
            {THEME_LABEL[theme][locale]}
          </Tab>
        ))}
      </div>
      <p className="mt-2 text-[13px] text-ink-500">{t.tabsHint}</p>

      {/* ---------------- Indicateurs ---------------- */}
      <div className="mt-2.5 grid gap-3 lg:grid-cols-[minmax(0,390px)_1fr]">
        <section className="flex items-center gap-4 rounded-2xl border border-line bg-white p-3">
          <Donut score={stats.score} size={92} />
          <div className="min-w-0">
            <p className="font-display text-[15px] font-bold text-navy-900">
              {tab === "global"
                ? t.scoreGlobal
                : format(t.scoreOfTheme, { theme: THEME_LABEL[tab][locale] })}
            </p>
            <p className="mt-0.5 text-[12.5px] text-ink-500">
              {t.weightedCoverage}
            </p>
            <p className="mt-1 text-[11.5px] leading-4 text-ink-500">
              <Bullet className="bg-transparent ring-1 ring-ink-300" />{" "}
              {t.legendCovered} <Bullet className="bg-brand-blue-500" />{" "}
              {t.legendPartial}
              <br />
              <Bullet className="bg-danger" /> {t.legendNotIdentified}
            </p>
          </div>
        </section>

        <ul className="grid divide-line rounded-2xl border border-line bg-white sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
          {tiles(stats, report.tiles).map((tile) => (
            <StatTile key={tile.label} {...tile} row />
          ))}
        </ul>
      </div>

      {/* ---------------- Analyse ---------------- */}
      <div className="mt-3 grid min-h-0 flex-1 gap-3 lg:grid-cols-[1fr_minmax(0,460px)] lg:grid-rows-[minmax(0,1fr)]">
        <div className="flex min-h-0 flex-col gap-3">
          {/* Synthèse par thème */}
          <div className="grid shrink-0 gap-3 sm:grid-cols-2">
            {(tab === "global" ? THEMES : [tab]).map((theme) => (
              <ThemeSummary key={theme} theme={theme} />
            ))}
          </div>

          {/* Analyse détaillée */}
          <section className="flex min-h-0 flex-1 flex-col rounded-2xl border border-line bg-white p-3">
            <h2 className="font-display text-[15px] font-bold text-navy-900">
              {t.detailedAnalysis}
            </h2>

            <label className="relative mt-2 block">
              <SearchIcon className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(0);
                }}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchAria}
                className="h-9 w-full max-w-[420px] rounded-lg border border-line bg-white ps-9 pe-3 text-[13.5px] text-navy-900 outline-none transition-colors placeholder:text-ink-300 focus:border-navy-500"
              />
            </label>

            <div className="mt-2 min-h-0 flex-1 overflow-y-auto">
              <table className="w-full border-collapse text-start">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b border-line text-[12px] text-ink-500">
                    <th className="w-8 pb-1 font-medium">{t.colId}</th>
                    <th className="pb-1 font-medium">{t.colRequirement}</th>
                    <th className="w-[170px] pb-1 font-medium">
                      {t.colStatus}
                    </th>
                    <th className="w-[150px] pb-1 font-medium">
                      {t.colCoverage}
                    </th>
                    <th className="w-[70px] pb-1 text-end font-medium">
                      {t.colConfidence}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((requirement) => {
                    const active = requirement.id === selected.id;
                    const coverage = COVERAGE[requirement.status];

                    return (
                      <tr
                        key={requirement.id}
                        onClick={() => setSelectedId(requirement.id)}
                        className={`cursor-pointer border-b border-line/70 transition-colors last:border-0 ${
                          active ? "bg-brand-blue-50/70" : "hover:bg-surface"
                        }`}
                      >
                        <td
                          className={`py-1 text-[12.5px] ${
                            active
                              ? "border-s-2 border-brand-blue-500 ps-1.5 font-semibold text-brand-blue-600"
                              : "ps-2 text-ink-500"
                          }`}
                        >
                          {requirement.id}
                        </td>
                        <td className="py-1 pe-3 text-[13px] leading-[1.35] text-navy-900">
                          {requirement.label[locale]}
                        </td>
                        <td className="py-1 pe-3">
                          <span
                            className={`flex items-center gap-2 text-[12.5px] ${STATUS_TEXT[requirement.status]}`}
                          >
                            <Bullet
                              className={STATUS_DOT[requirement.status]}
                            />
                            {STATUS_LABEL[requirement.status][locale]}
                          </span>
                        </td>
                        <td className="py-1 pe-3">
                          <span className="flex items-center gap-2">
                            <span className="w-11 shrink-0 whitespace-nowrap text-[12.5px] font-semibold text-navy-900">
                              {coverage} %
                            </span>
                            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                              <span
                                className={`block h-full rounded-full ${
                                  coverage === 100
                                    ? "bg-green-500"
                                    : coverage === 50
                                      ? "bg-brand-blue-500"
                                      : "bg-danger"
                                }`}
                                style={{ width: `${Math.max(coverage, 3)}%` }}
                              />
                            </span>
                          </span>
                        </td>
                        <td className="py-1 text-end text-[12.5px] font-semibold text-navy-900">
                          {requirement.confidence} %
                        </td>
                      </tr>
                    );
                  })}

                  {rows.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-[13.5px] text-ink-500"
                      >
                        {t.noResults}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <footer className="mt-1.5 flex flex-wrap items-center gap-3 border-t border-line pt-1.5">
              <p className="text-[12.5px] text-ink-500">
                {filtered.length === 0
                  ? t.noRequirements
                  : format(t.showingRange, {
                      from: current * PAGE_SIZE + 1,
                      to: Math.min((current + 1) * PAGE_SIZE, filtered.length),
                      total: filtered.length,
                    })}
              </p>

              <div className="ml-auto flex items-center gap-1.5">
                <PagerButton
                  label={t.prevPage}
                  disabled={current === 0}
                  onClick={() => setPage(current - 1)}
                >
                  <ChevronLeftIcon className="h-4 w-4 rtl:-scale-x-100" />
                </PagerButton>

                {Array.from({ length: pageCount }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    aria-current={i === current ? "page" : undefined}
                    className={`h-7 w-7 rounded-lg border text-[12.5px] font-semibold transition-colors ${
                      i === current
                        ? "border-navy-800 bg-navy-800 text-white"
                        : "border-line bg-white text-navy-900 hover:bg-navy-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <PagerButton
                  label={t.nextPage}
                  disabled={current >= pageCount - 1}
                  onClick={() => setPage(current + 1)}
                >
                  <ChevronRightIcon className="h-4 w-4 rtl:-scale-x-100" />
                </PagerButton>
              </div>
            </footer>
          </section>
        </div>

        {/* ----- Preuve → manques → recommandation ----- */}
        <section className="flex min-h-0 flex-col overflow-y-auto rounded-2xl border border-line bg-white p-3">
          <div className="grid gap-0">
            <DetailBlock
              icon={
                <span className="text-[12px] font-bold">{selected.id}</span>
              }
              tone="blue"
              title={t.evidenceInDoc}
              connector
            >
              {selected.evidence ? (
                <>
                  <p className="italic leading-5 text-ink-700">
                    «&nbsp;{selected.evidence.quote[locale]}&nbsp;»
                  </p>
                  <p className="mt-1.5 text-[12.5px] font-medium text-ink-500">
                    {selected.evidence.source[locale]}
                  </p>
                </>
              ) : (
                <p className="leading-5 text-ink-500">{t.noEvidenceDetail}</p>
              )}
            </DetailBlock>

            <DetailBlock
              icon={<AlertTriangleIcon className="h-[18px] w-[18px]" />}
              tone="warn"
              title={t.missingElements}
              connector
            >
              {selected.missing.length > 0 ? (
                <ul className="grid gap-1">
                  {selected.missing.map((item) => (
                    <li
                      key={item[locale]}
                      className="flex gap-2 leading-5 text-ink-700 before:text-ink-300 before:content-['•']"
                    >
                      {item[locale]}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="leading-5 text-ink-700">{t.noMissingDetail}</p>
              )}
            </DetailBlock>

            <DetailBlock
              icon={<LightbulbIcon className="h-[18px] w-[18px]" />}
              tone="green"
              title={t.aiRecommendation}
            >
              <p className="leading-5 text-ink-700">
                {selected.recommendation[locale]}
              </p>
            </DetailBlock>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-3 border-t border-line pt-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-50 text-navy-800">
              <ShieldCheckIcon className="h-[18px] w-[18px]" />
            </span>
            <p className="text-[13.5px] font-semibold text-navy-900">
              {format(t.confidenceLevel, { n: selected.confidence })}
            </p>
          </div>
        </section>
      </div>

      {/* ---------------- Recommandations ---------------- */}
      <section className="mt-3 shrink-0">
        <h2 className="font-display text-[15px] font-bold text-navy-900">
          {t.recommendationsTitle}
        </h2>
        <ul className="mt-2 grid gap-3 lg:grid-cols-3">
          {topRecommendations(locale, 3, tab === "global" ? undefined : tab).map(
            (reco) => (
              <li
                key={reco.id}
                className="rounded-xl border border-line bg-white p-3"
              >
                <span
                  className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11.5px] font-semibold ${
                    reco.priority === "elevee"
                      ? "bg-danger/10 text-danger"
                      : "bg-brand-blue-50 text-brand-blue-600"
                  }`}
                >
                  <AlertTriangleIcon className="h-3.5 w-3.5" />
                  {PRIORITY_LABEL[reco.priority][locale]}
                </span>
                <p className="mt-1.5 font-display text-[13.5px] font-bold leading-[1.3] text-navy-900">
                  {reco.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-[1.4] text-ink-500">
                  {reco.detail}
                </p>
                <p className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-ink-500">
                  <span>
                    {t.impactLabel}{" "}
                    <span className="font-semibold text-navy-900">
                      {LEVEL_LABEL[reco.impact][locale]}
                    </span>
                  </span>
                  <span>
                    {t.effortLabel}{" "}
                    <span className="font-semibold text-navy-900">
                      {LEVEL_LABEL[reco.effort][locale]}
                    </span>
                  </span>
                </p>
              </li>
            ),
          )}
        </ul>
      </section>
    </div>
  );
}

function ThemeSummary({ theme }: { theme: ThemeId }) {
  const locale = useLocale();
  const stats = themeStats(theme);
  const summary = useTunnel().report.themeSummary[theme];

  return (
    <section className="flex items-start gap-3 rounded-2xl border border-line bg-white p-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
        {theme === "deviations" ? (
          <CheckCircleIcon className="h-5 w-5" />
        ) : (
          <FolderIcon className="h-5 w-5" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-3">
          <h3 className="font-display text-[14.5px] font-bold text-navy-900">
            {THEME_LABEL[theme][locale]}
          </h3>
          <span className="ml-auto font-display text-[14.5px] font-bold text-green-600">
            {stats.score} %
          </span>
        </div>
        <p className="mt-0.5 text-[12.5px] leading-[1.35] text-ink-500">
          {summary.title}
        </p>
        <p className="text-[12.5px] leading-[1.35] text-ink-500">
          {summary.detail}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function requirementOf(theme: ThemeId) {
  return REQUIREMENTS.find((r) => r.theme === theme) ?? REQUIREMENTS[0];
}

function tiles(stats: Stats, t: Dictionary["tunnel"]["report"]["tiles"]) {
  return [
    {
      icon: <ClipboardCheckIcon className="h-5 w-5" />,
      tone: "navy" as const,
      value: stats.total,
      label: t.requirements,
    },
    {
      icon: <CheckCircleIcon className="h-5 w-5" />,
      tone: "green" as const,
      value: stats.couvertes,
      label: t.covered,
    },
    {
      icon: <PieIcon className="h-5 w-5" />,
      tone: "blue" as const,
      value: stats.partielles,
      label: t.partial,
    },
    {
      icon: <XCircleIcon className="h-5 w-5" />,
      tone: "danger" as const,
      value: stats.nonIdentifiees,
      label: plural(stats.nonIdentifiees, t.notIdentified),
    },
    {
      icon: <AlertTriangleIcon className="h-5 w-5" />,
      tone: "blue" as const,
      value: stats.critiques,
      label: plural(stats.critiques, t.criticalPoints),
    },
  ];
}

function Bullet({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 shrink-0 rounded-full align-middle ${className}`}
    />
  );
}

function Donut({
  score,
  size,
  caption,
}: {
  score: number;
  size: number;
  caption?: string;
}) {
  const circumference = 2 * Math.PI * 44;
  const big = size >= 140;
  const t = useTunnel().report;

  return (
    <div
      className="relative shrink-0"
      style={{ height: size, width: size }}
      role="img"
      aria-label={format(t.scoreAriaLabel, { score })}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={big ? 8 : 9}
        />
        <circle
          cx="50"
          cy="50"
          r="44"
          fill="none"
          stroke="var(--color-green-500)"
          strokeWidth={big ? 8 : 9}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-display font-extrabold text-green-500 ${
            big ? "text-[34px]" : "text-[20px]"
          }`}
        >
          {score} %
        </span>
        {caption && (
          <span className="font-display text-[13px] font-bold text-navy-900">
            {caption}
          </span>
        )}
      </span>
    </div>
  );
}

function StatTile({
  icon,
  tone,
  value,
  label,
  compact = false,
  row = false,
}: {
  icon: React.ReactNode;
  tone: "navy" | "green" | "blue" | "danger";
  value: number;
  label: string;
  compact?: boolean;
  row?: boolean;
}) {
  const styles = {
    navy: "bg-navy-50 text-navy-800",
    green: "bg-green-50 text-green-500",
    blue: "bg-brand-blue-50 text-brand-blue-500",
    danger: "bg-danger/10 text-danger",
  } as const;

  if (row) {
    return (
      <li className="flex items-center gap-3 px-3 py-2">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${styles[tone]}`}
        >
          {icon}
        </span>
        <span>
          <span className="block font-display text-[20px] font-extrabold leading-none text-navy-900">
            {value}
          </span>
          <span className="mt-0.5 block text-[12px] text-ink-500">{label}</span>
        </span>
      </li>
    );
  }

  return (
    <li className="flex flex-col items-center gap-1">
      <span
        className={`flex items-center justify-center rounded-full ${styles[tone]} ${
          compact ? "h-9 w-9" : "h-11 w-11"
        }`}
      >
        {icon}
      </span>
      <span
        className={`font-display font-extrabold leading-none text-navy-900 ${
          compact ? "text-[20px]" : "text-[26px]"
        }`}
      >
        {value}
      </span>
      <span className="text-center text-[12px] leading-[1.2] text-ink-500">
        {label}
      </span>
    </li>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={`-mb-px border-b-2 px-4 py-2 text-[13.5px] font-semibold transition-colors ${
        active
          ? "border-brand-blue-500 text-brand-blue-600"
          : "border-transparent text-ink-500 hover:text-navy-900"
      }`}
    >
      {children}
    </button>
  );
}

function PagerButton({
  children,
  label,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-white text-navy-900 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:text-ink-300 disabled:hover:bg-white"
    >
      {children}
    </button>
  );
}

/** Bloc du parcours preuve → manques → recommandation. */
function DetailBlock({
  icon,
  tone,
  title,
  children,
  connector = false,
}: {
  icon: React.ReactNode;
  tone: "blue" | "warn" | "green";
  title: string;
  children: React.ReactNode;
  connector?: boolean;
}) {
  const styles = {
    blue: {
      badge: "bg-brand-blue-500 text-white",
      card: "border-brand-blue-100 bg-brand-blue-50/50",
      title: "text-brand-blue-600",
    },
    warn: {
      badge: "bg-warn/10 text-warn",
      card: "border-warn/25 bg-warn/5",
      title: "text-warn",
    },
    green: {
      badge: "bg-green-50 text-green-500",
      card: "border-green-100 bg-green-50/60",
      title: "text-green-600",
    },
  } as const;

  const style = styles[tone];

  return (
    <div className="grid grid-cols-[32px_1fr] gap-2.5">
      <div className="flex flex-col items-center">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${style.badge}`}
        >
          {icon}
        </span>
        {connector && (
          <span className="flex flex-1 flex-col items-center py-1 text-ink-300">
            <span className="w-px flex-1 bg-line" />
            <ArrowDownIcon className="-mt-1 h-3.5 w-3.5" />
          </span>
        )}
      </div>

      <div
        className={`rounded-xl border p-2.5 ${style.card} ${connector ? "mb-1.5" : ""}`}
      >
        <p className={`text-[13px] font-bold ${style.title}`}>{title}</p>
        <div className="mt-1 text-[12.5px]">{children}</div>
      </div>
    </div>
  );
}

/** Horodatage — rendu seulement après hydratation du store. */
function GeneratedAt({
  at,
  locale,
  t,
}: {
  at: number;
  locale: Locale;
  t: Dictionary["tunnel"]["report"];
}) {
  if (!at) return null;

  const day = formatDate(at, locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = formatDate(at, locale, { hour: "2-digit", minute: "2-digit" });

  return <span>{format(t.generatedAt, { day, time })}</span>;
}
