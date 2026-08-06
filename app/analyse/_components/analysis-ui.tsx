"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";
import {
  BarsIcon,
  BooksIcon,
  CheckCircleSolidIcon,
  ChevronRightIcon,
  ClockIcon,
  DottedCircleIcon,
  FileTextIcon,
} from "@/app/components/icons";
import type { DetectedTheme } from "../_lib/documents";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** Anneau de progression (bleu pendant l'analyse, vert une fois terminée). */
export function ProgressRing({
  value,
  label,
  done = false,
}: {
  value: number;
  label: string;
  done?: boolean;
}) {
  const circumference = 2 * Math.PI * 52;
  const color = done ? "var(--color-green-500)" : "var(--color-brand-blue-500)";

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[150px] w-[150px]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={done ? "var(--color-green-50)" : "var(--color-brand-blue-50)"}
            strokeWidth="12"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - value / 100)}
            className="transition-[stroke-dashoffset] duration-150 ease-linear"
          />
        </svg>
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          {done && (
            <CheckCircleSolidIcon className="h-7 w-7 text-green-500" />
          )}
          <span
            className={`font-display text-[32px] font-extrabold ${
              done ? "text-green-500" : "text-brand-blue-500"
            }`}
          >
            {value} %
          </span>
        </span>
      </div>
      <p className="mt-2 text-center text-[14px] font-semibold text-navy-900">
        {label}
      </p>
    </div>
  );
}

export function ThemeIcon({
  theme,
  className,
}: {
  theme: DetectedTheme["id"];
  className?: string;
}) {
  return theme === "deviations" ? (
    <FileTextIcon className={className} />
  ) : (
    <BooksIcon className={className} />
  );
}

/** Ligne « thème → état » de la colonne droite. */
export function ThemeStatusRow({
  theme,
  left,
  right,
}: {
  theme: DetectedTheme;
  left: ReactNode;
  right?: ReactNode;
}) {
  return (
    <li className="flex flex-wrap items-center gap-4 border-line py-2 [&+&]:border-t">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-500">
        <ThemeIcon theme={theme.id} className="h-5 w-5" />
      </span>
      <span className="font-display text-[16px] font-bold text-navy-900">
        {theme.label}
      </span>
      <span className="ml-auto flex items-center gap-2 text-[14px] font-semibold text-green-600">
        {left}
      </span>
      {right && (
        <span className="flex w-40 items-center gap-2 text-[14px] font-semibold">
          {right}
        </span>
      )}
    </li>
  );
}

export const StatusDone = (
  <>
    <CheckCircleSolidIcon className="h-[18px] w-[18px] text-green-500" />
  </>
);

export function StatusRunning({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-brand-blue-500">
      <DottedCircleIcon className="h-[18px] w-[18px] animate-spin [animation-duration:2.5s]" />
      {label}
    </span>
  );
}

export function StatusWaiting({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2 text-ink-500">
      <ClockIcon className="h-[18px] w-[18px]" />
      {label}
    </span>
  );
}

export type Stage = {
  icon: Icon;
  label: string;
  state: "done" | "current" | "todo";
  /** Texte d'état personnalisé (sinon Terminé / En cours / À venir). */
  hint?: string;
};

/** Bandeau des phases internes de l'analyse. */
export function StageBar({ stages }: { stages: Stage[] }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-4">
      <ol
        className="grid gap-3 lg:items-stretch lg:gap-0"
        style={{
          gridTemplateColumns:
            stages.length > 1
              ? `repeat(${stages.length - 1}, 1fr auto) 1fr`
              : "1fr",
        }}
      >
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const { state } = stage;

          return (
            <li key={stage.label} className="contents">
              <div
                className={`flex h-full items-center gap-3 rounded-xl border p-3 ${
                  state === "current"
                    ? "border-brand-blue-100 bg-brand-blue-50/40"
                    : "border-line bg-white"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    state === "done"
                      ? "bg-green-50 text-green-500"
                      : state === "current"
                        ? "bg-brand-blue-50 text-brand-blue-500"
                        : "bg-surface text-ink-300"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-navy-900">
                    {stage.label}
                  </p>
                  <p
                    className={`mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold ${
                      state === "done"
                        ? "text-green-600"
                        : state === "current"
                          ? "text-brand-blue-500"
                          : "text-ink-300"
                    }`}
                  >
                    {state === "done" && (
                      <>
                        <CheckCircleSolidIcon className="h-4 w-4 text-green-500" />
                        {stage.hint ?? "Terminé"}
                      </>
                    )}
                    {state === "current" && (
                      <>
                        <DottedCircleIcon className="h-4 w-4 animate-spin [animation-duration:2.5s]" />
                        {stage.hint ?? "En cours"}
                      </>
                    )}
                    {state === "todo" && (
                      <>
                        <ClockIcon className="h-4 w-4" />
                        {stage.hint ?? "À venir"}
                      </>
                    )}
                  </p>
                </div>
              </div>

              {i < stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden items-center px-2 text-ink-300 lg:flex"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export const STAGE_ICONS = {
  read: FileTextIcon,
  requirements: BarsIcon,
} as const;
