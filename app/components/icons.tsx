import type { SVGProps } from "react";

/**
 * Icônes inline (aucune librairie externe, aucun JS côté client) :
 * elles partent dans le HTML rendu au build, donc zéro requête réseau.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.7 10.4 11.2 6 9.6 10.4 8 12 3.5Z" />
      <path d="M18.5 15.5 19.2 17.3 21 18l-1.8.7-.7 1.8-.7-1.8L16 18l1.8-.7.7-1.8Z" />
    </svg>
  );
}

export function CloudUploadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 18a4 4 0 0 1-.4-7.98A5.5 5.5 0 0 1 17.4 9.2 3.9 3.9 0 0 1 17 18" />
      <path d="M12 12v7" />
      <path d="m9 14.5 3-3 3 3" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10.4 9.2 14.8 12l-4.4 2.8V9.2Z" />
    </svg>
  );
}

export function ChipIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="7.5" y="7.5" width="9" height="9" rx="2" />
      <path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21M6 6l1.8 1.8M16.2 16.2 18 18M18 6l-1.8 1.8M7.8 16.2 6 18" />
    </svg>
  );
}

export function BrainIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M11.5 5.2a2.9 2.9 0 0 0-5 1.9 2.7 2.7 0 0 0-1.7 2.6c0 .9.4 1.7 1.1 2.2a2.9 2.9 0 0 0 1.9 4.5 2.7 2.7 0 0 0 3.7 2V5.2Z" />
      <path d="M13.5 7.5h2.8v3h2.2M13.5 12h3.4M13.5 16.5h2.8v-2.6" />
      <circle cx="19.3" cy="10.5" r="1.1" />
      <circle cx="17.6" cy="12" r="1.1" />
      <circle cx="18.4" cy="17.2" r="1.1" />
      <path d="M17.4 17.2h-1.1" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function UserCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="8.5" r="3.5" />
      <path d="M4.5 20a6.5 6.5 0 0 1 11.2-4.5" />
      <path d="m15.5 18.5 1.7 1.7 3.3-3.6" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 12h17M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6.5 9.5 5.5 5 5.5-5" />
    </svg>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6.5 14.5 5.5-5 5.5 5" />
    </svg>
  );
}

export function TrendingUpIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19V6M4 19h16" />
      <path d="M8 15.5v-3M12 15.5V9.5M16 15.5V7" />
      <path d="M14.5 4.5H20V10" />
      <path d="m20 4.5-6.5 6.5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15" />
      <path d="m14 6.5 5.5 5.5-5.5 5.5" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function RocketIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 4.5c3.4-1.4 6-1 6-1s.4 2.6-1 6c-1.2 2.9-3.4 5-5.6 6.4l-3.8-3.8c1.4-2.2 3.5-4.4 6.4-5.6" />
      <path d="M9.1 12.1 7 12l-2 2 2.6 1M11.9 14.9 12 17l-2 2-1-2.6" />
      <circle cx="14.9" cy="9.1" r="1.4" />
      <path d="M6.5 17.5 4 20" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 19.5a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function BankIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 9.5 12 5l8.5 4.5" />
      <path d="M5.5 9.5v8M9.5 9.5v8M14.5 9.5v8M18.5 9.5v8" />
      <path d="M3.5 19.5h17" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function SearchSparkleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m15 15 4.5 4.5" />
      <path d="M18 3.5 18.7 5.3 20.5 6l-1.8.7-.7 1.8-.7-1.8L15.5 6l1.8-.7L18 3.5Z" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="10.5" width="14" height="9" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 1 1 7 0v2.5" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.4 12.2 2.5 2.5 4.7-5" />
    </svg>
  );
}

/** Pastille verte pleine avec une coche blanche (résultat de recherche). */
export function CheckCircleSolidIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="m7.2 12.3 3.2 3.2 6.4-6.8"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9.5 6.5 5.5 5.5-5.5 5.5" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 6.5h15M9.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v1.5" />
      <path d="M6.5 6.5 7.3 19a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-12.5" />
      <path d="M10.5 10v6.5M13.5 10v6.5" />
    </svg>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 15.5V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M4.5 14v4.5a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V14" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M19.5 12h-15" />
      <path d="m10 6.5-5.5 5.5 5.5 5.5" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 19.5v-15" />
      <path d="m6.5 10 5.5-5.5 5.5 5.5" />
    </svg>
  );
}

export function FileTextIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V7.5L14 3.5Z" />
      <path d="M13.8 3.7V8h4.1" />
      <path d="M9 12.5h6M9 16h4.5" />
    </svg>
  );
}

export function BooksIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4.5" width="4" height="15" rx="1" />
      <rect x="10" y="4.5" width="4" height="15" rx="1" />
      <path d="m16.4 5.6 3.1.8-3.2 12.6-3-.8 3.1-12.6Z" />
    </svg>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7.5A1.5 1.5 0 0 1 5 6h4l2 2.5h8a1.5 1.5 0 0 1 1.5 1.5v7.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-10Z" />
    </svg>
  );
}

export function ClipboardCheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 4.5H7.5A1.5 1.5 0 0 0 6 6v13a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V6a1.5 1.5 0 0 0-1.5-1.5H15" />
      <rect x="9" y="2.8" width="6" height="3.4" rx="1.2" />
      <path d="m9.5 13 2 2 3.5-4" />
    </svg>
  );
}

export function BarsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 19.5h15" />
      <path d="M7.5 19.5v-6M12 19.5V8M16.5 19.5v-9" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.4" />
      <path d="M3.5 9.5h17M8 3.5V6.5M16 3.5V6.5" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function PieIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.7"
        opacity="0.35"
      />
      <path
        d="M12 4a8 8 0 0 1 8 8h-8V4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function XCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m9.5 9.5 5 5M14.5 9.5l-5 5" />
    </svg>
  );
}

export function AlertCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.8v5M12 15.7v.6" />
    </svg>
  );
}

export function AlertTriangleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5 21 19.5H3L12 4.5Z" />
      <path d="M12 10v4M12 16.6v.6" />
    </svg>
  );
}

export function MinusCircleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12h7" />
    </svg>
  );
}

export function ScalesIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5v15M7 19.5h10" />
      <path d="M5 8h14M12 6.2 5 8l-2 5a3.2 3.2 0 0 0 4 0l-2-5ZM12 6.2 19 8l2 5a3.2 3.2 0 0 1-4 0l2-5Z" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 17v2A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-2" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="17.5" cy="6" r="2.5" />
      <circle cx="6.5" cy="12" r="2.5" />
      <circle cx="17.5" cy="18" r="2.5" />
      <path d="m8.8 10.8 6.4-3.5M8.8 13.2l6.4 3.5" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.2-2.9-.5L4.5 20l1.3-3.4C4.7 15.5 4 14.1 4 12.5 4 8.9 7.6 6 12 6s8 2.9 8 6.5Z" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9.5" cy="8.5" r="3" />
      <path d="M3.5 19a6 6 0 0 1 12 0" />
      <path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 19a5.5 5.5 0 0 0-2-3.6" />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12a7.5 7.5 0 0 1 12.9-5.2L20 9.3" />
      <path d="M19.5 12a7.5 7.5 0 0 1-12.9 5.2L4 14.7" />
      <path d="M20 4.8v4.5h-4.5M4 19.2v-4.5h4.5" />
    </svg>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 13.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5l-1.2 1.2" />
      <path d="M14 10.5a3.5 3.5 0 0 0-5 0L6.5 13a3.5 3.5 0 0 0 5 5l1.2-1.2" />
    </svg>
  );
}

export function LightbulbIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.2 16.5a5.5 5.5 0 1 1 5.6 0v1.3a1.5 1.5 0 0 1-1.5 1.5h-2.6a1.5 1.5 0 0 1-1.5-1.5v-1.3Z" />
      <path d="M10 21h4" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.8 12S6 6.5 12 6.5 21.2 12 21.2 12 18 17.5 12 17.5 2.8 12 2.8 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 12h12" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m14.5 6.5-5.5 5.5 5.5 5.5" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5v15" />
      <path d="m6.5 14 5.5 5.5 5.5-5.5" />
    </svg>
  );
}

export function PuzzleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 4.5h2.2a1.6 1.6 0 1 1 3.2 0h2.1a1.5 1.5 0 0 1 1.5 1.5v2.1a1.6 1.6 0 1 1 0 3.2v3.2a1.5 1.5 0 0 1-1.5 1.5h-3.2a1.6 1.6 0 1 0-3.2 0H7.4a1.5 1.5 0 0 1-1.5-1.5v-3.2a1.6 1.6 0 1 1 0-3.2V6a1.5 1.5 0 0 1 1.5-1.5h2.1Z" />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.2M12 7.9v.6" />
    </svg>
  );
}

export function PencilIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15.5 5.2 18.8 8.5 8.9 18.4l-4.2.9.9-4.2L15.5 5.2Z" />
      <path d="m14 6.7 3.3 3.3" />
    </svg>
  );
}

export function QuestionIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.9 9.6a2.2 2.2 0 1 1 3 2.1c-.6.3-.9.8-.9 1.4v.4M12 16.4v.5" />
    </svg>
  );
}

/** Cercle en pointillés (compléments en attente, questions rapides). */
export function DottedCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray="0.5 5"
      />
    </svg>
  );
}

/** Icône de fichier colorée selon l'extension (PDF rouge, XLSX vert, DOCX bleu). */
export function FileTypeIcon({
  kind,
  className,
}: {
  kind: "pdf" | "xlsx" | "docx";
  className?: string;
}) {
  const color =
    kind === "pdf" ? "#dc2626" : kind === "xlsx" ? "#12a150" : "#1a63e8";
  const label = kind === "pdf" ? "PDF" : kind === "xlsx" ? "XLS" : "DOC";

  return (
    <svg viewBox="0 0 24 28" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 3.2A2.2 2.2 0 0 1 5.2 1h9.3L21 7.4v17.4A2.2 2.2 0 0 1 18.8 27H5.2A2.2 2.2 0 0 1 3 24.8V3.2Z"
        stroke={color}
        strokeWidth="1.8"
      />
      <path d="M14.3 1.4v6.2h6.3" stroke={color} strokeWidth="1.8" />
      <rect x="2" y="14" width="20" height="8" rx="1.6" fill={color} />
      <text
        x="12"
        y="20.2"
        textAnchor="middle"
        fontSize="6"
        fontWeight="700"
        fill="#fff"
        fontFamily="var(--font-inter), sans-serif"
      >
        {label}
      </text>
    </svg>
  );
}

export function Logo(props: IconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M20 3.5c9.1 0 16.5 6.9 16.5 15.4S29.1 34.3 20 34.3c-1.9 0-3.7-.3-5.4-.8l-8 3 2.3-6.4C5.4 27.3 3.5 23.3 3.5 18.9 3.5 10.4 10.9 3.5 20 3.5Z"
        stroke="var(--color-navy-900)"
        strokeWidth="3"
      />
      <circle cx="20" cy="18.9" r="6" fill="var(--color-green-500)" />
    </svg>
  );
}
