import type { SVGProps } from "react";

/** Mini-drapeaux inline (aucune image à télécharger). */
type FlagProps = SVGProps<SVGSVGElement>;

function frame(props: FlagProps) {
  return {
    viewBox: "0 0 24 16",
    role: "presentation" as const,
    ...props,
  };
}

export function FlagTN(props: FlagProps) {
  return (
    <svg {...frame(props)}>
      <rect width="24" height="16" rx="2" fill="#E70013" />
      <circle cx="12" cy="8" r="5" fill="#fff" />
      <circle cx="12.6" cy="8" r="3.4" fill="#E70013" />
      <circle cx="13.9" cy="8" r="2.7" fill="#fff" />
      <path
        d="m13.9 5.9.7 1.4 1.5.2-1.1 1.1.3 1.5-1.4-.7-1.3.7.2-1.5-1-1.1 1.5-.2.6-1.4Z"
        fill="#E70013"
      />
    </svg>
  );
}

export function FlagFR(props: FlagProps) {
  return (
    <svg {...frame(props)}>
      <rect width="24" height="16" rx="2" fill="#fff" />
      <path d="M0 2a2 2 0 0 1 2-2h6v16H2a2 2 0 0 1-2-2V2Z" fill="#0055A4" />
      <path d="M16 0h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6V0Z" fill="#EF4135" />
    </svg>
  );
}

export function FlagMA(props: FlagProps) {
  return (
    <svg {...frame(props)}>
      <rect width="24" height="16" rx="2" fill="#C1272D" />
      <path
        d="m12 4.2 1.7 3.5 3.8.4-2.8 2.5.8 3.6L12 12.3 8.5 14.2l.8-3.6-2.8-2.5 3.8-.4L12 4.2Z"
        fill="none"
        stroke="#006233"
        strokeWidth="1.1"
      />
    </svg>
  );
}

export function FlagDZ(props: FlagProps) {
  return (
    <svg {...frame(props)}>
      <rect width="24" height="16" rx="2" fill="#fff" />
      <path d="M0 2a2 2 0 0 1 2-2h10v16H2a2 2 0 0 1-2-2V2Z" fill="#006233" />
      <circle cx="13" cy="8" r="4" fill="#D21034" />
      <circle cx="14.4" cy="8" r="3.2" fill="#fff" />
      <path
        d="m15.6 6.4.5 1.1 1.2.1-.9.8.3 1.2-1.1-.6-1.1.6.3-1.2-.9-.8 1.2-.1.5-1.1Z"
        fill="#D21034"
      />
    </svg>
  );
}

export function FlagBE(props: FlagProps) {
  return (
    <svg {...frame(props)}>
      <rect width="24" height="16" rx="2" fill="#FDDA24" />
      <path d="M0 2a2 2 0 0 1 2-2h6v16H2a2 2 0 0 1-2-2V2Z" fill="#000" />
      <path d="M16 0h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6V0Z" fill="#EF3340" />
    </svg>
  );
}

export function FlagCH(props: FlagProps) {
  return (
    <svg {...frame(props)}>
      <rect width="24" height="16" rx="2" fill="#D52B1E" />
      <path d="M10.6 4h2.8v2.6H16v2.8h-2.6V12h-2.8V9.4H8V6.6h2.6V4Z" fill="#fff" />
    </svg>
  );
}
