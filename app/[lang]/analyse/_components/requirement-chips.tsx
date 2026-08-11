import {
  ArrowUpIcon,
  CheckCircleIcon,
  ClockIcon,
  MinusIcon,
  PieIcon,
  XCircleIcon,
} from "@/app/components/icons";
import type { Locale } from "@/lib/i18n/config";
import {
  CRITICALITY_LABEL,
  STATUS_LABEL,
  type ReqCriticality,
  type ReqStatus,
} from "../_lib/requirements";

/**
 * Pastilles de statut et de criticité — partagées par le rapport à l'écran et
 * par le document PDF, pour qu'un changement de couleur reste unique.
 */

const STATUS_STYLE: Record<ReqStatus, string> = {
  couverte: "border-green-100 bg-green-50 text-green-600",
  partielle: "border-brand-blue-100 bg-brand-blue-50 text-brand-blue-600",
  "non-identifiee": "border-danger/25 bg-danger/5 text-danger",
};

const CRITICALITY_STYLE: Record<ReqCriticality, string> = {
  elevee: "border-danger/25 bg-danger/5 text-danger",
  moyenne: "border-brand-blue-100 bg-brand-blue-50 text-brand-blue-600",
  faible: "border-line bg-surface text-ink-500",
};

export function StatusChip({
  status,
  locale,
  className = "px-2 py-0.5 text-[12.5px]",
}: {
  status: ReqStatus;
  locale: Locale;
  className?: string;
}) {
  const Icon =
    status === "couverte"
      ? CheckCircleIcon
      : status === "partielle"
        ? PieIcon
        : XCircleIcon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border font-semibold ${STATUS_STYLE[status]} ${className}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {STATUS_LABEL[status][locale]}
    </span>
  );
}

export function CriticalityChip({
  value,
  locale,
  className = "px-2 py-0.5 text-[12.5px]",
}: {
  value: ReqCriticality;
  locale: Locale;
  className?: string;
}) {
  const Icon =
    value === "elevee" ? ArrowUpIcon : value === "moyenne" ? ClockIcon : MinusIcon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border font-semibold ${CRITICALITY_STYLE[value]} ${className}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {CRITICALITY_LABEL[value][locale]}
    </span>
  );
}
