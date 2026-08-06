"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangleIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  CheckCircleSolidIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  ClockIcon,
  DownloadIcon,
  FileTypeIcon,
  InfoIcon,
  LightbulbIcon,
  MinusIcon,
  PieIcon,
  SearchIcon,
  ShareIcon,
  ShieldCheckIcon,
  SparkleIcon,
  XCircleIcon,
} from "@/app/components/icons";
import { DEMO_FILES } from "../_lib/documents";
import { complianceScore } from "../_lib/recommendations";
import {
  CRITICALITIES,
  REQUIREMENTS,
  STATUS_LABEL,
  requirementStats,
  type ReqCriticality,
  type ReqStatus,
} from "../_lib/requirements";
import { useWizard } from "./wizard-store";

const PAGE_SIZE = 10;

/** Pastilles de statut — vert couvert, bleu partiel, rouge non identifié. */
const STATUS_STYLE: Record<ReqStatus, string> = {
  couverte: "border-green-100 bg-green-50 text-green-600",
  partielle: "border-brand-blue-100 bg-brand-blue-50 text-brand-blue-600",
  "non-identifiee": "border-danger/25 bg-danger/5 text-danger",
};

const CRITICALITY_STYLE: Record<ReqCriticality, string> = {
  Élevée: "border-danger/25 bg-danger/5 text-danger",
  Moyenne: "border-brand-blue-100 bg-brand-blue-50 text-brand-blue-600",
  Faible: "border-line bg-surface text-ink-500",
};

function StatusChip({ status }: { status: ReqStatus }) {
  const Icon =
    status === "couverte"
      ? CheckCircleIcon
      : status === "partielle"
        ? PieIcon
        : XCircleIcon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 text-[12.5px] font-semibold ${STATUS_STYLE[status]}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {STATUS_LABEL[status]}
    </span>
  );
}

function CriticalityChip({ value }: { value: ReqCriticality }) {
  const Icon =
    value === "Élevée"
      ? ArrowUpIcon
      : value === "Moyenne"
        ? ClockIcon
        : MinusIcon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border px-2 py-0.5 text-[12.5px] font-semibold ${CRITICALITY_STYLE[value]}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {value}
    </span>
  );
}

export function StepRapport() {
  const { data } = useWizard();
  const files = data.files.length > 0 ? data.files : DEMO_FILES;
  const stats = requirementStats();
  const score = complianceScore();

  const [query, setQuery] = useState("");
  const [criticality, setCriticality] = useState<ReqCriticality | "">("");
  const [status, setStatus] = useState<ReqStatus | "">("");
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(REQUIREMENTS[0].id);

  const filtered = useMemo(
    () =>
      REQUIREMENTS.filter(
        (r) =>
          (criticality === "" || r.criticality === criticality) &&
          (status === "" || r.status === status) &&
          (query.trim() === "" ||
            r.label.toLowerCase().includes(query.trim().toLowerCase())),
      ),
    [query, criticality, status],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const rows = filtered.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);
  const selected =
    REQUIREMENTS.find((r) => r.id === selectedId) ?? REQUIREMENTS[0];

  function resetPage<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value);
      setPage(0);
    };
  }

  function share() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "Rapport d'analyse ENTI WIN", url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
    }
  }

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-4 xl:px-10 lg:h-full">
      {/* ---------------- Entête ---------------- */}
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
            Rapport d&apos;analyse
          </h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-3">
            <span className="flex min-w-0 items-center gap-2 text-[14px] text-navy-900">
              <FileTypeIcon kind={files[0].kind} className="h-5 w-4 shrink-0" />
              <span className="min-w-0 max-w-[280px] truncate" title={files[0].name}>
                {files[0].name}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-green-100 bg-green-50 px-2 py-1 text-[12.5px] font-semibold text-green-600">
              <CheckCircleSolidIcon className="h-3.5 w-3.5 text-green-500" />
              Analyse terminée
            </span>
            <AnalysisDate at={data.completedAt} />
          </div>
        </div>

        <div className="ml-auto flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-11 items-center gap-2.5 rounded-xl border border-line bg-white px-5 text-[14.5px] font-semibold text-navy-900 transition-colors hover:border-navy-200 hover:bg-navy-50"
          >
            <DownloadIcon className="h-[18px] w-[18px]" />
            Télécharger le rapport
          </button>
          <button
            type="button"
            onClick={share}
            className="inline-flex h-11 items-center gap-2.5 rounded-xl bg-navy-800 px-5 text-[14.5px] font-semibold text-white transition-colors hover:bg-navy-900"
          >
            <ShareIcon className="h-[18px] w-[18px]" />
            Partager le rapport
          </button>
        </div>
      </div>

      {/* ---------------- Indicateurs ---------------- */}
      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,380px)_1fr]">
        <ScoreCard score={score} />

        <ul className="grid divide-line rounded-2xl border border-line bg-white sm:grid-cols-3 lg:grid-cols-5 lg:divide-x">
        <StatTile
          icon={<ClipboardCheckIcon className="h-6 w-6" />}
          tone="navy"
          value={stats.total}
          label="Exigences"
        />
        <StatTile
          icon={<CheckCircleIcon className="h-6 w-6" />}
          tone="green"
          value={stats.couvertes}
          label="Couvertes"
        />
        <StatTile
          icon={<PieIcon className="h-6 w-6" />}
          tone="blue"
          value={stats.partielles}
          label="Partielles"
        />
        <StatTile
          icon={<XCircleIcon className="h-6 w-6" />}
          tone="danger"
          value={stats.nonIdentifiees}
          label="Non identifiées"
        />
        <StatTile
          icon={<AlertTriangleIcon className="h-6 w-6" />}
          tone="blue"
          value={stats.critiques}
          label="Points critiques"
        />
        </ul>
      </div>

      {/* ---------------- Tableau + détail ---------------- */}
      {/* grid-rows figées : les deux cartes prennent la hauteur disponible
          au lieu de pousser la page vers le bas */}
      <div className="mt-3 grid min-h-0 flex-1 gap-4 lg:grid-cols-[1fr_minmax(0,420px)] lg:grid-rows-[minmax(0,1fr)]">
        {/* ----- Résultats par exigence ----- */}
        <section className="flex min-h-0 flex-col rounded-2xl border border-line bg-white p-4">
          <h2 className="font-display text-[17px] font-bold text-navy-900">
            Résultats par exigence
          </h2>

          <div className="mt-3 flex flex-wrap gap-3">
            <label className="relative min-w-[220px] flex-1">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
              <input
                value={query}
                onChange={(e) => resetPage(setQuery)(e.target.value)}
                placeholder="Rechercher une exigence…"
                aria-label="Rechercher une exigence"
                className="h-10 w-full rounded-lg border border-line bg-white pl-10 pr-3 text-[14px] text-navy-900 outline-none transition-colors placeholder:text-ink-300 focus:border-navy-500"
              />
            </label>

            <Select
              value={criticality}
              onChange={(v) => resetPage(setCriticality)(v as ReqCriticality | "")}
              label="Filtrer par criticité"
              placeholder="Toutes les criticités"
              options={CRITICALITIES.map((c) => ({ value: c, label: c }))}
            />
            <Select
              value={status}
              onChange={(v) => resetPage(setStatus)(v as ReqStatus | "")}
              label="Filtrer par statut"
              placeholder="Tous les statuts"
              options={(Object.keys(STATUS_LABEL) as ReqStatus[]).map((s) => ({
                value: s,
                label: STATUS_LABEL[s],
              }))}
            />
          </div>

          <div className="mt-2.5 min-h-0 flex-1 overflow-y-auto">
            <table className="w-full border-collapse text-left">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-line text-[12.5px] text-ink-500">
                  <th className="w-10 pb-1.5 font-medium">#</th>
                  <th className="pb-1.5 font-medium">Exigence</th>
                  <th className="w-[190px] pb-1.5 font-medium">Statut</th>
                  <th className="w-[120px] pb-1.5 font-medium">Criticité</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((requirement) => {
                  const active = requirement.id === selected.id;
                  return (
                    <tr
                      key={requirement.id}
                      onClick={() => setSelectedId(requirement.id)}
                      className={`cursor-pointer border-b border-line/70 transition-colors last:border-0 ${
                        active ? "bg-brand-blue-50/70" : "hover:bg-surface"
                      }`}
                    >
                      <td
                        className={`py-1 text-[13px] ${
                          active
                            ? "border-l-2 border-brand-blue-500 pl-2 font-semibold text-brand-blue-600"
                            : "pl-2.5 text-ink-500"
                        }`}
                      >
                        {requirement.id}
                      </td>
                      <td className="py-1 pr-3">
                        <button
                          type="button"
                          onClick={() => setSelectedId(requirement.id)}
                          className={`text-left text-[13.5px] leading-5 ${
                            active
                              ? "font-semibold text-navy-900"
                              : "text-navy-900"
                          }`}
                        >
                          {requirement.label}
                        </button>
                      </td>
                      <td className="py-1 pr-3">
                        <StatusChip status={requirement.status} />
                      </td>
                      <td className="py-1">
                        <CriticalityChip value={requirement.criticality} />
                      </td>
                    </tr>
                  );
                })}

                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-10 text-center text-[14px] text-ink-500"
                    >
                      Aucune exigence ne correspond à ces filtres.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="mt-1.5 flex flex-wrap items-center gap-3 border-t border-line pt-2">
            <p className="text-[13px] text-ink-500">
              {filtered.length === 0
                ? "Aucune exigence"
                : `Affichage ${current * PAGE_SIZE + 1} à ${Math.min(
                    (current + 1) * PAGE_SIZE,
                    filtered.length,
                  )} sur ${filtered.length} exigences`}
            </p>

            <div className="ml-auto flex items-center gap-1.5">
              <PagerButton
                label="Page précédente"
                disabled={current === 0}
                onClick={() => setPage(current - 1)}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </PagerButton>

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

              <PagerButton
                label="Page suivante"
                disabled={current >= pageCount - 1}
                onClick={() => setPage(current + 1)}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </PagerButton>
            </div>
          </footer>
        </section>

        {/* ----- Détail de l'exigence ----- */}
        <section className="flex min-h-0 flex-col overflow-y-auto rounded-2xl border border-line bg-white p-4">
          <header className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue-500 text-[13px] font-bold text-white">
              {selected.id}
            </span>
            <h2 className="font-display text-[16px] font-bold leading-5 text-navy-900">
              {selected.label}
            </h2>
          </header>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-ink-500">
            <span className="flex items-center gap-2">
              Statut :
              <StatusChip status={selected.status} />
            </span>
            <span className="flex items-center gap-2">
              Criticité :
              <CriticalityChip value={selected.criticality} />
            </span>
          </div>

          <div className="mt-2.5 grid gap-0">
            <DetailBlock
              icon={<SearchIcon className="h-[18px] w-[18px]" />}
              tone="blue"
              title="Preuve dans le document"
              connector
            >
              {selected.evidence ? (
                <>
                  <p className="italic leading-5 text-ink-700">
                    «&nbsp;{selected.evidence.quote}&nbsp;»
                  </p>
                  <p className="mt-1.5 text-[12.5px] font-medium text-ink-500">
                    {selected.evidence.source}
                  </p>
                </>
              ) : (
                <p className="leading-5 text-ink-500">
                  Aucune preuve détectée dans les documents fournis.
                </p>
              )}
            </DetailBlock>

            <DetailBlock
              icon={<AlertTriangleIcon className="h-[18px] w-[18px]" />}
              tone="warn"
              title="Éléments manquants"
              connector
            >
              {selected.missing.length > 0 ? (
                <ul className="grid gap-1">
                  {selected.missing.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 leading-5 text-ink-700 before:text-ink-300 before:content-['•']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="leading-5 text-ink-700">
                  Aucun élément manquant relevé.
                </p>
              )}
            </DetailBlock>

            <DetailBlock
              icon={<LightbulbIcon className="h-[18px] w-[18px]" />}
              tone="green"
              title="Recommandation"
            >
              <p className="leading-5 text-ink-700">
                {selected.recommendation}
              </p>
            </DetailBlock>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-3 border-t border-line pt-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-navy-800">
              <ShieldCheckIcon className="h-5 w-5" />
            </span>
            <p className="text-[14px] font-semibold text-navy-900">
              Niveau de confiance : {selected.confidence} %
            </p>
          </div>

          <Link
            href="/analyse/recommandations"
            prefetch
            className="mt-3 inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-navy-800 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-navy-900"
          >
            <SparkleIcon className="h-5 w-5" />
            Voir les recommandations IA
            <ArrowRightIcon className="ml-auto h-5 w-5" />
          </Link>
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Score de conformité : couverture pondérée des exigences. */
function ScoreCard({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 44;

  return (
    <section className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
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

      <div className="min-w-0">
        <p className="font-display text-[17px] font-bold text-navy-900">
          Score de conformité
        </p>
        <p className="mt-0.5 text-[13.5px] leading-5 text-ink-500">
          Couverture pondérée
          <br />
          des exigences
        </p>
        <p className="mt-2 flex items-start gap-1.5 text-[12px] leading-4 text-ink-500">
          <InfoIcon className="mt-px h-3.5 w-3.5 shrink-0" />
          Couvert = 100 % • Partiel = 50 % • Non identifié = 0 %
        </p>
      </div>
    </section>
  );
}

function StatTile({
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
    <li className="flex items-center gap-3 px-4 py-2.5">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${styles[tone]}`}
      >
        {icon}
      </span>
      <span>
        <span className="block font-display text-[24px] font-extrabold leading-none text-navy-900">
          {value}
        </span>
        <span className="mt-1 block text-[13px] text-ink-500">{label}</span>
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
        className="h-10 appearance-none rounded-lg border border-line bg-white pl-3.5 pr-9 text-[13.5px] font-medium text-navy-900 outline-none transition-colors hover:border-navy-200 focus:border-navy-500"
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
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white text-navy-900 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:text-ink-300 disabled:hover:bg-white"
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
      badge: "bg-brand-blue-50 text-brand-blue-500",
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
    <div className="grid grid-cols-[36px_1fr] gap-3">
      <div className="flex flex-col items-center">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.badge}`}
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

      <div className={`rounded-xl border p-2.5 ${style.card} ${connector ? "mb-1.5" : ""}`}>
        <p className={`text-[13.5px] font-bold ${style.title}`}>{title}</p>
        <div className="mt-1.5 text-[13px]">{children}</div>
      </div>
    </div>
  );
}

/** Date de fin d'analyse — rendue seulement après hydratation. */
function AnalysisDate({ at }: { at: number }) {
  if (!at) return null;

  const date = new Date(at);
  const jour = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
  const heure = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return (
    <span className="text-[13px] text-ink-500">
      {jour} à {heure}
    </span>
  );
}
