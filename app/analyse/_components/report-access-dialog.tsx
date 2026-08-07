"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon, XIcon } from "@/app/components/icons";
import { COUNTRIES, type CountryCode } from "../_lib/wizard";
import { useWizard } from "./wizard-store";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Porte d'entrée du rapport complet : l'identité du demandeur est collectée
 * ici plutôt qu'en début de tunnel, pour que l'utilisateur voie d'abord ses
 * scores.
 */
export function ReportAccessDialog({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { data, update } = useWizard();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const complete =
    data.lastName.trim() !== "" &&
    data.firstName.trim() !== "" &&
    EMAIL.test(data.email) &&
    data.role.trim() !== "" &&
    data.phone.replace(/\D/g, "").length >= 6;

  // Le composant n'est monté qu'au clic : `document` existe forcément ici.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/25 p-4 backdrop-blur-[2px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-access-title"
        className="max-h-full w-full max-w-[760px] overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <header className="relative px-8 pt-7 text-center">
          <h2
            id="report-access-title"
            className="font-display text-[22px] font-extrabold tracking-[-0.01em] text-navy-900"
          >
            Informations pour générer le rapport
          </h2>
          <p className="mt-1.5 text-[14px] text-ink-500">
            Renseignez vos informations pour accéder au rapport complet.
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-6 top-6 rounded-lg p-1.5 text-ink-500 transition-colors hover:bg-navy-50 hover:text-navy-900"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (complete) onConfirm();
          }}
        >
          <div className="px-8 pt-5">
            <h3 className="font-display text-[15px] font-bold text-navy-900">
              Informations générales
            </h3>

            <div className="mt-3 grid gap-3.5 sm:grid-cols-2">
              <Field
                id="lastName"
                label="Nom"
                value={data.lastName}
                onChange={(lastName) => update({ lastName })}
                autoComplete="family-name"
              />
              <Field
                id="firstName"
                label="Prénom"
                value={data.firstName}
                onChange={(firstName) => update({ firstName })}
                autoComplete="given-name"
              />
            </div>

            <div className="mt-3.5 grid gap-3.5">
              <Field
                id="email"
                label="Email professionnel"
                type="email"
                value={data.email}
                onChange={(email) => update({ email })}
                autoComplete="email"
              />
              <Field
                id="role"
                label="Poste"
                value={data.role}
                onChange={(role) => update({ role })}
                autoComplete="organization-title"
              />

              <div>
                <Legend htmlFor="phone">Téléphone</Legend>
                <div className="mt-2 flex gap-3">
                  <div className="relative shrink-0">
                    <select
                      aria-label="Indicatif pays"
                      value={data.countryCode}
                      onChange={(e) =>
                        update({ countryCode: e.target.value as CountryCode })
                      }
                      className="h-12 w-[190px] appearance-none rounded-xl border border-line bg-white pl-4 pr-9 text-[14.5px] text-navy-900 outline-none transition-colors focus:border-navy-500"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.code} {country.name} {country.dial}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={data.phone}
                    onChange={(e) => update({ phone: e.target.value })}
                    className="h-12 w-full rounded-xl border border-line bg-white px-4 text-[14.5px] text-navy-900 outline-none transition-colors placeholder:text-ink-300 focus:border-navy-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-6 flex flex-wrap justify-end gap-3 border-t border-line px-8 py-5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-brand-blue-500 bg-white px-8 text-[15px] font-semibold text-brand-blue-500 transition-colors hover:bg-brand-blue-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!complete}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-blue-500 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-brand-blue-600 disabled:cursor-not-allowed disabled:bg-ink-300"
            >
              Confirmer et générer le rapport
            </button>
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */

function Legend({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[13.5px] font-semibold text-navy-900"
    >
      {children} <span className="text-danger">*</span>
    </label>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <Legend htmlFor={id}>{label}</Legend>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-4 text-[14.5px] text-navy-900 outline-none transition-colors placeholder:text-ink-300 focus:border-navy-500"
      />
    </div>
  );
}
