"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Card({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-white p-4 xl:p-5">
      <header className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-50 text-navy-800">
          {icon}
        </span>
        <h2 className="font-display text-[17px] font-bold text-navy-900">
          {title}
        </h2>
      </header>
      <div className="mt-3.5 grid gap-3.5">{children}</div>
    </section>
  );
}

export function Label({
  htmlFor,
  children,
  required,
  action,
}: {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <label
        htmlFor={htmlFor}
        className="text-[13.5px] font-semibold text-navy-900"
      >
        {children}
        {required && <span className="ml-1 text-danger">*</span>}
      </label>
      {action}
    </div>
  );
}

export const inputClass =
  "h-11 w-full rounded-xl border border-line bg-white px-4 text-[14.5px] text-navy-900 outline-none transition-colors placeholder:text-ink-300 focus:border-navy-500";

export function Hint({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "success";
}) {
  return (
    <p
      className={`flex items-center gap-1.5 text-[13px] ${
        tone === "success" ? "font-medium text-green-600" : "text-ink-500"
      }`}
    >
      {children}
    </p>
  );
}

/** Ferme un menu/popover au clic extérieur ou à la touche Échap. */
export function useDismiss(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return ref;
}
