"use client";

import Link from "next/link";
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  BarsIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClipboardCheckIcon,
  DownloadIcon,
  FileTypeIcon,
  LinkIcon,
  Logo,
  PieIcon,
  SparkleIcon,
  XCircleIcon,
} from "@/app/components/icons";
import {
  CriticalityChip,
  StatusChip,
} from "../../analyse/_components/requirement-chips";
import { useWizard } from "../../analyse/_components/wizard-store";
import { localePath, type Locale } from "@/lib/i18n/config";
import { useLocale, useTunnel } from "@/lib/i18n/dictionary-provider";
import { formatDate } from "@/lib/i18n/format";
import { format } from "@/lib/i18n/interpolate";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";
import { DEMO_FILES } from "../../analyse/_lib/documents";
import {
  complianceScore,
  topRecommendations,
} from "../../analyse/_lib/recommendations";
import {
  REQUIREMENTS,
  requirementStats,
} from "../../analyse/_lib/requirements";

/** Exigences tenant sur la première feuille, sous le bloc de score. */
const ROWS_FIRST_SHEET = 14;

const TOTAL_SHEETS = 2;

/** Une vignette par action mise en avant, dans l'ordre de la synthèse. */
const RECO_ICONS = [SparkleIcon, BarsIcon, LinkIcon];

export function ReportDocument() {
  const locale = useLocale();
  const t = useTunnel().pdf;
  const { data } = useWizard();
  const files = data.files.length > 0 ? data.files : DEMO_FILES;
  const stats = requirementStats();
  const score = complianceScore();
  const recommendations = topRecommendations(locale);

  const firstRows = REQUIREMENTS.slice(0, ROWS_FIRST_SHEET);
  const restRows = REQUIREMENTS.slice(ROWS_FIRST_SHEET);

  return (
    <div className="min-h-dvh bg-surface">
      <Toolbar />

      <div className="flex flex-col items-center gap-8 px-4 py-8 print:gap-0 print:p-0">
        {/* ---------------- Feuille 1 ---------------- */}
        <article className="sheet">
          <Letterhead />

          <h1 className="mt-6 font-display text-[27px] font-extrabold tracking-[-0.02em] text-navy-900">
            {t.reportTitle}
          </h1>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-ink-500">
            <span className="flex min-w-0 items-center gap-2">
              <FileTypeIcon kind={files[0].kind} className="h-4 w-3.5 shrink-0" />
              <span className="min-w-0 truncate">{files[0].name}</span>
            </span>
            <span className="text-line">|</span>
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 shrink-0" />
              <AnalysisDate at={data.completedAt} locale={locale} t={t} />
            </span>
          </div>

          <ScoreBlock score={score} stats={stats} />

          <h2 className="mt-6 font-display text-[19px] font-bold text-navy-900">
            {t.synthesisTitle}
          </h2>
          <SynthesisTable rows={firstRows} className="mt-2.5" />

          <SheetFooter page={1} />
        </article>

        {/* ---------------- Feuille 2 ---------------- */}
        <article className="sheet">
          <Letterhead compact />

          <h2 className="mt-5 font-display text-[19px] font-bold text-navy-900">
            {t.synthesisTitle}{" "}
            <span className="font-semibold text-ink-500">
              {t.synthesisContinued}
            </span>
          </h2>
          <SynthesisTable rows={restRows} className="mt-2.5" />

          <h2 className="mt-6 font-display text-[19px] font-bold text-navy-900">
            {t.recommendationsTitle}
          </h2>
          <ol className="mt-3 grid gap-3">
            {recommendations.map((reco, i) => {
              const Icon = RECO_ICONS[i] ?? SparkleIcon;
              return (
                <li
                  key={reco.id}
                  className="flex items-center gap-4 rounded-xl border border-line p-3"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-500">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-navy-800 text-[13px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[14.5px] font-bold text-navy-900">
                      {reco.title}
                    </span>
                    <span className="mt-1 block text-[13px] leading-[1.45] text-ink-500">
                      {reco.detail}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>

          <SheetFooter page={2} />
        </article>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Barre d'aperçu : absente du PDF (classe `no-print`). */
function Toolbar() {
  const locale = useLocale();
  const t = useTunnel().pdf;

  return (
    <div className="no-print sticky top-0 z-10 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-3 px-6 py-3">
        <Link
          href={localePath(locale, "/analyse/rapport")}
          prefetch
          className="inline-flex h-11 items-center gap-2.5 rounded-xl border border-line bg-white px-5 text-[14.5px] font-semibold text-navy-900 transition-colors hover:border-navy-200 hover:bg-navy-50"
        >
          <ArrowLeftIcon className="h-[18px] w-[18px] rtl:-scale-x-100" />
          {t.backToReport}
        </Link>

        <p className="hidden text-[13.5px] text-ink-500 sm:block">
          {format(t.previewPages, { n: TOTAL_SHEETS })}
        </p>

        <button
          type="button"
          onClick={() => window.print()}
          className="ml-auto inline-flex h-11 items-center gap-2.5 rounded-xl bg-brand-blue-500 px-5 text-[14.5px] font-semibold text-white transition-colors hover:bg-brand-blue-600"
        >
          <DownloadIcon className="h-[18px] w-[18px]" />
          {t.downloadPdf}
        </button>
      </div>
    </div>
  );
}

/** En-tête de marque, repris en haut de chaque feuille. */
function Letterhead({ compact = false }: { compact?: boolean }) {
  const t = useTunnel().pdf;

  return (
    <header className="flex items-center gap-3">
      <Logo
        className={`shrink-0 text-navy-900 ${compact ? "h-8 w-8" : "h-11 w-11"}`}
      />
      <span
        className={`font-display font-extrabold tracking-tight text-navy-900 ${
          compact ? "text-[19px]" : "text-[26px]"
        }`}
      >
        ENTI WIN
      </span>
      <span className="max-w-[210px] text-[9.5px] font-semibold uppercase leading-tight tracking-[0.06em] text-ink-300">
        {t.brandTagline}
      </span>
    </header>
  );
}

function ScoreBlock({
  score,
  stats,
}: {
  score: number;
  stats: ReturnType<typeof requirementStats>;
}) {
  const t = useTunnel().pdf;
  const circumference = 2 * Math.PI * 44;

  return (
    <section className="mt-5 flex items-center gap-5 rounded-2xl border border-line p-4">
      <div className="relative h-[104px] w-[104px] shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="9"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="var(--color-green-500)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-[22px] font-extrabold text-green-500">
          {score} %
        </span>
      </div>

      <div className="w-[196px] shrink-0">
        <p className="whitespace-nowrap font-display text-[15.5px] font-bold text-navy-900">
          {t.scoreTitle}
        </p>
        <p className="mt-1 text-[12.5px] leading-[1.35] text-ink-500">
          {t.weightedCoverageLine1}
          <br />
          {t.weightedCoverageLine2}
        </p>
        <p className="mt-2 text-[10.5px] leading-[1.4] text-ink-500">
          {t.legendLine}
        </p>
      </div>

      <ul className="flex flex-1 divide-x divide-line">
        <PdfTile
          icon={<ClipboardCheckIcon className="h-6 w-6" />}
          tone="navy"
          value={stats.total}
          label={t.tiles.requirements}
        />
        <PdfTile
          icon={<CheckCircleIcon className="h-6 w-6" />}
          tone="green"
          value={stats.couvertes}
          label={t.tiles.covered}
        />
        <PdfTile
          icon={<PieIcon className="h-6 w-6" />}
          tone="blue"
          value={stats.partielles}
          label={t.tiles.partial}
        />
        <PdfTile
          icon={<XCircleIcon className="h-6 w-6" />}
          tone="danger"
          value={stats.nonIdentifiees}
          label={t.tiles.notIdentified}
        />
        <PdfTile
          icon={<AlertTriangleIcon className="h-6 w-6" />}
          tone="blue"
          value={stats.critiques}
          label={t.tiles.criticalPoints}
        />
      </ul>
    </section>
  );
}

function PdfTile({
  icon,
  tone,
  value,
  label,
}: {
  icon: React.ReactNode;
  tone: "navy" | "green" | "blue" | "danger";
  value: number;
  label: string;
}) {
  const styles = {
    navy: "bg-navy-50 text-navy-800",
    green: "bg-green-50 text-green-500",
    blue: "bg-brand-blue-50 text-brand-blue-500",
    danger: "bg-danger/10 text-danger",
  } as const;

  return (
    <li className="flex flex-1 flex-col items-center gap-1.5 px-1">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full ${styles[tone]}`}
      >
        {icon}
      </span>
      <span className="font-display text-[22px] font-extrabold leading-none text-navy-900">
        {value}
      </span>
      <span className="text-center text-[11.5px] leading-[1.25] text-ink-500">
        {label}
      </span>
    </li>
  );
}

function SynthesisTable({
  rows,
  className = "",
}: {
  rows: typeof REQUIREMENTS;
  className?: string;
}) {
  const locale = useLocale();
  const t = useTunnel().pdf;

  return (
    <table
      className={`w-full table-fixed border-collapse overflow-hidden rounded-lg text-start ${className}`}
    >
      <thead>
        <tr className="bg-navy-800 text-[12.5px] font-semibold text-white">
          <th className="w-[38px] px-3 py-2 font-semibold">{t.colId}</th>
          <th className="px-3 py-2 font-semibold">{t.colRequirement}</th>
          <th className="w-[175px] px-3 py-2 font-semibold">{t.colStatus}</th>
          <th className="w-[110px] px-3 py-2 font-semibold">
            {t.colCriticality}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((requirement) => (
          <tr
            key={requirement.id}
            className="border-b border-line last:border-b-0"
          >
            <td className="px-3 py-[7px] text-[12px] text-ink-500">
              {requirement.id}
            </td>
            <td className="px-3 py-[7px] text-[12.5px] leading-[1.3] text-navy-900">
              {requirement.label[locale]}
            </td>
            <td className="px-3 py-[7px]">
              <StatusChip
                status={requirement.status}
                locale={locale}
                className="px-2 py-0.5 text-[11.5px]"
              />
            </td>
            <td className="px-3 py-[7px]">
              <CriticalityChip
                value={requirement.criticality}
                locale={locale}
                className="px-2 py-0.5 text-[11.5px]"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SheetFooter({ page }: { page: number }) {
  const t = useTunnel().pdf;

  return (
    <footer className="mt-auto flex items-end justify-between border-t border-line pt-3 text-[11.5px] text-ink-500">
      <span>
        <span className="font-bold text-navy-900">{t.footerBrand}</span> —{" "}
        {t.footerSubtitle}
      </span>
      <span>{format(t.pageOf, { page, total: TOTAL_SHEETS })}</span>
    </footer>
  );
}

/** Date de fin d'analyse — rendue seulement après hydratation. */
function AnalysisDate({
  at,
  locale,
  t,
}: {
  at: number;
  locale: Locale;
  t: Dictionary["tunnel"]["pdf"];
}) {
  if (!at) return <>{t.analysisInProgress}</>;

  return (
    <>{formatDate(at, locale, { day: "numeric", month: "long", year: "numeric" })}</>
  );
}
