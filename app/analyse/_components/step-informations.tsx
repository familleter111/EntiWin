"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import {
  BankIcon,
  CheckCircleIcon,
  CheckCircleSolidIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  LockIcon,
  SearchSparkleIcon,
  UserIcon,
  XIcon,
} from "@/app/components/icons";
import {
  COUNTRIES,
  SECTORS,
  SUB_SECTORS,
  searchCompany,
  type CompanyMatch,
  type CountryCode,
  type Sector,
} from "../_lib/wizard";
import { Card, Hint, Label, inputClass, useDismiss } from "./form-ui";
import { useWizard } from "./wizard-store";

export function StepInformations() {
  const { data, update } = useWizard();
  const [modal, setModal] = useState<"closed" | "loading" | "found" | "empty">(
    "closed",
  );
  const [match, setMatch] = useState<CompanyMatch | null>(null);

  const subSectorOptions = data.sector ? SUB_SECTORS[data.sector] : [];

  async function runSearch() {
    setModal("loading");
    const found = await searchCompany(data.organisation);
    setMatch(found);
    setModal(found ? "found" : "empty");
  }

  function confirmCompany() {
    if (!match) return;
    update({
      organisation: match.name,
      companyConfirmed: true,
      sector: match.sector,
      subSectors: match.subSectors,
      subSectorsAuto: true,
    });
    setModal("closed");
  }

  function rejectCompany() {
    update({ companyConfirmed: false, subSectorsAuto: false });
    setModal("closed");
  }

  const complete =
    data.lastName.trim() !== "" &&
    data.firstName.trim() !== "" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    data.role.trim() !== "" &&
    data.phone.replace(/\D/g, "").length >= 6 &&
    data.organisation.trim() !== "" &&
    /^\d{9}$/.test(data.rne) &&
    data.sector !== "" &&
    data.subSectors.length > 0;

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-4 xl:px-10">
      <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
        Vos informations
      </h1>
      <p className="mt-1 text-[14px] text-ink-500">
        Ces informations permettent d&apos;identifier le répondant et de
        personnaliser l&apos;analyse.
      </p>

      <div className="mt-4 grid items-start gap-5 lg:grid-cols-2">
        {/* ---------- Informations générales ---------- */}
        <Card icon={<UserIcon className="h-5 w-5" />} title="Informations générales">
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="nom" required>
                Nom
              </Label>
              <input
                id="nom"
                className={inputClass}
                placeholder="Votre nom"
                autoComplete="family-name"
                value={data.lastName}
                onChange={(e) => update({ lastName: e.target.value })}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="prenom" required>
                Prénom
              </Label>
              <input
                id="prenom"
                className={inputClass}
                placeholder="Votre prénom"
                autoComplete="given-name"
                value={data.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="email" required>
              Email professionnel
            </Label>
            <input
              id="email"
              type="email"
              className={inputClass}
              placeholder="prenom.nom@entreprise.com"
              autoComplete="email"
              value={data.email}
              onChange={(e) => update({ email: e.target.value })}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="poste" required>
              Poste
            </Label>
            <input
              id="poste"
              className={inputClass}
              placeholder="Responsable Qualité"
              autoComplete="organization-title"
              value={data.role}
              onChange={(e) => update({ role: e.target.value })}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="tel" required>
              Téléphone
            </Label>
            <div className="flex gap-3">
              <CountrySelect
                value={data.countryCode}
                onChange={(countryCode) => update({ countryCode })}
              />
              <input
                id="tel"
                type="tel"
                inputMode="tel"
                className={`${inputClass} flex-1`}
                placeholder="22 123 456"
                autoComplete="tel-national"
                value={data.phone}
                onChange={(e) => update({ phone: e.target.value })}
              />
            </div>
          </div>
        </Card>

        {/* ---------- Organisation ---------- */}
        <Card icon={<BankIcon className="h-5 w-5" />} title="Organisation">
          <div className="grid gap-1.5">
            <Label htmlFor="organisation" required>
              Nom de l&apos;organisation
            </Label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="organisation"
                className={`${inputClass} flex-1`}
                placeholder="Laboratoire Démo Tunisie"
                autoComplete="organization"
                value={data.organisation}
                onChange={(e) =>
                  update({
                    organisation: e.target.value,
                    companyConfirmed: false,
                    subSectorsAuto: false,
                  })
                }
              />
              {!data.companyConfirmed && (
                <button
                  type="button"
                  onClick={runSearch}
                  disabled={data.organisation.trim().length < 3}
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-blue-500 px-5 text-[14.5px] font-semibold text-white transition-colors hover:bg-brand-blue-600 disabled:cursor-not-allowed disabled:bg-brand-blue-500/40"
                >
                  <SearchSparkleIcon className="h-[18px] w-[18px]" />
                  Rechercher l&apos;entreprise
                </button>
              )}
            </div>

            {data.companyConfirmed ? (
              <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg border border-green-300 bg-white px-3 py-1.5 text-[13px] font-semibold text-green-600">
                <CheckCircleIcon className="h-[18px] w-[18px]" />
                Entreprise confirmée
              </span>
            ) : (
              <Hint>
                Recherchez votre entreprise pour préremplir les informations de
                l&apos;organisation.
              </Hint>
            )}
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="rne" required>
                RNE
              </Label>
              <input
                id="rne"
                inputMode="numeric"
                maxLength={9}
                className={inputClass}
                placeholder={data.companyConfirmed ? "9 chiffres" : ""}
                value={data.rne}
                onChange={(e) =>
                  update({ rne: e.target.value.replace(/\D/g, "").slice(0, 9) })
                }
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="secteur" required>
                Secteur
              </Label>
              <div className="relative">
                {/* Seul « Pharmaceutique » est ouvert : les autres secteurs
                    restent visibles mais grisés et non sélectionnables. */}
                <select
                  id="secteur"
                  className={`${inputClass} appearance-none pr-10 ${
                    data.sector === "" ? "text-ink-300" : ""
                  }`}
                  value={data.sector}
                  onChange={(e) =>
                    update({
                      sector: e.target.value as Sector,
                      subSectors: [],
                      subSectorsAuto: false,
                    })
                  }
                >
                  <option value="" disabled>
                    Sélectionnez un secteur
                  </option>
                  {SECTORS.map((s) => (
                    <option
                      key={s}
                      value={s}
                      disabled={s !== "Pharmaceutique"}
                      className={
                        s === "Pharmaceutique" ? "text-navy-900" : "text-ink-300"
                      }
                    >
                      {s}
                      {s !== "Pharmaceutique" ? " — bientôt disponible" : ""}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
              </div>
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label
              required
              action={
                data.companyConfirmed && data.subSectorsAuto ? (
                  <button
                    type="button"
                    onClick={() => update({ subSectorsAuto: false })}
                    className="rounded-lg border border-brand-blue-500 px-3 py-1 text-[13px] font-semibold text-brand-blue-500 transition-colors hover:bg-brand-blue-50"
                  >
                    Modifier
                  </button>
                ) : null
              }
            >
              Sous-secteur
            </Label>

            {!data.companyConfirmed ? (
              <>
                <Hint>
                  Les sous-secteurs seront proposés après confirmation de
                  l&apos;entreprise.
                </Hint>
                <div className="flex h-12 items-center justify-between rounded-xl border border-line bg-surface px-4 text-[15px] text-ink-300">
                  En attente de la recherche de l&apos;entreprise
                  <LockIcon className="h-[18px] w-[18px]" />
                </div>
              </>
            ) : (
              <>
                {data.subSectorsAuto && (
                  <Hint>
                    Sélection automatique à partir des informations de
                    l&apos;entreprise
                  </Hint>
                )}
                <SubSectorSelect
                  options={subSectorOptions}
                  selected={data.subSectors}
                  onChange={(subSectors) =>
                    update({ subSectors, subSectorsAuto: false })
                  }
                />
                {data.subSectorsAuto && (
                  <Hint tone="success">
                    <CheckCircleIcon className="h-4 w-4" />
                    Sous-secteurs renseignés automatiquement
                  </Hint>
                )}
              </>
            )}
          </div>
        </Card>
      </div>

      {/* ---------- Barre de continuation ---------- */}
      <div className="mt-4 lg:mt-auto lg:pt-4">
        {complete ? (
          <Link
            href="/analyse/documents"
            prefetch
            className="flex h-13 w-full items-center justify-center rounded-xl bg-navy-800 px-6 text-[16px] font-semibold text-white transition-colors hover:bg-navy-900"
          >
            <span className="mx-auto">Continuer vers les documents</span>
            <ChevronRightIcon className="h-5 w-5" />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="flex h-14 w-full cursor-not-allowed items-center justify-center rounded-xl bg-[#eceff4] px-6 text-[16px] font-semibold text-ink-300"
          >
            <span className="mx-auto">Continuer vers les documents</span>
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* La modale est montée sur <body> : elle échappe ainsi à la mise à
          l'échelle du tunnel et reste centrée sur l'écran. */}
      {modal !== "closed" &&
        createPortal(
          <CompanyModal
            state={modal}
            match={match}
            onClose={() => setModal("closed")}
            onConfirm={confirmCompany}
            onReject={rejectCompany}
          />,
          document.body,
        )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sélecteur d'indicatif téléphonique                                  */
/* ------------------------------------------------------------------ */

function CountrySelect({
  value,
  onChange,
}: {
  value: CountryCode;
  onChange: (code: CountryCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss(open, close);
  const country = COUNTRIES.find((c) => c.code === value) ?? COUNTRIES[0];
  const { Flag } = country;

  return (
    <div ref={ref} className="relative w-[215px] shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`${inputClass} flex items-center gap-2 px-3 text-left`}
      >
        <Flag className="h-4 w-6 shrink-0 rounded-[3px]" />
        <span className="whitespace-nowrap text-[13.5px]">
          {country.code} {country.name}
        </span>
        <span className="ml-auto flex items-center gap-1 whitespace-nowrap text-[13.5px] text-ink-500">
          {country.dial}
          <ChevronDownIcon className="h-4 w-4" />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-14 z-30 w-full overflow-hidden rounded-xl border border-line bg-white py-1 shadow-lg shadow-navy-900/10"
        >
          {COUNTRIES.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                role="option"
                aria-selected={c.code === value}
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[14px] hover:bg-navy-50 ${
                  c.code === value ? "text-navy-900" : "text-ink-700"
                }`}
              >
                <c.Flag className="h-4 w-6 shrink-0 rounded-[3px]" />
                {c.code} {c.name}
                <span className="ml-auto text-ink-500">{c.dial}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Multi-sélection des sous-secteurs                                   */
/* ------------------------------------------------------------------ */

function SubSectorSelect({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss(open, close);

  function toggle(option: string) {
    onChange(
      selected.includes(option)
        ? selected.filter((s) => s !== option)
        : [...selected, option],
    );
  }

  return (
    <div ref={ref} className="relative">
      <div
        className={`flex min-h-12 w-full flex-wrap items-center gap-2 rounded-xl border bg-white px-3 py-2 ${
          open ? "border-brand-blue-500" : "border-line"
        }`}
      >
        {selected.length === 0 && (
          <span className="px-1 text-[15px] text-ink-300">
            Sélectionnez un ou plusieurs sous-secteurs
          </span>
        )}

        {selected.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-blue-100 bg-brand-blue-50 px-2.5 py-1.5 text-[13.5px] font-medium text-brand-blue-600"
          >
            {s}
            <button
              type="button"
              aria-label={`Retirer ${s}`}
              onClick={() => toggle(s)}
              className="text-brand-blue-500 hover:text-navy-900"
            >
              <XIcon className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}

        <span className="ml-auto flex items-center gap-1 pl-2">
          {selected.length > 0 && (
            <>
              <button
                type="button"
                aria-label="Tout effacer"
                onClick={() => onChange([])}
                className="p-1 text-ink-300 hover:text-navy-900"
              >
                <XIcon className="h-4 w-4" />
              </button>
              <span className="h-5 w-px bg-line" />
            </>
          )}
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label="Ouvrir la liste des sous-secteurs"
            onClick={() => setOpen((o) => !o)}
            className="p-1 text-ink-500 hover:text-navy-900"
          >
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </span>
      </div>

      {open && (
        <ul
          role="listbox"
          aria-multiselectable="true"
          // s'ouvre vers le haut : la liste reste dans l'écran
          className="absolute bottom-[calc(100%+6px)] left-0 z-30 max-h-60 w-full overflow-y-auto rounded-xl border border-line bg-white py-1 shadow-lg shadow-navy-900/10"
        >
          {options.map((option) => {
            const active = selected.includes(option);
            return (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => toggle(option)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[14.5px] hover:bg-navy-50 ${
                    active
                      ? "font-medium text-brand-blue-600"
                      : "text-ink-700"
                  }`}
                >
                  {option}
                  {active && <CheckIcon className="h-4 w-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Modale de recherche d'entreprise                                    */
/* ------------------------------------------------------------------ */

function CompanyModal({
  state,
  match,
  onClose,
  onConfirm,
  onReject,
}: {
  state: "loading" | "found" | "empty";
  match: CompanyMatch | null;
  onClose: () => void;
  onConfirm: () => void;
  onReject: () => void;
}) {
  const ref = useDismiss(true, onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/40 p-4 backdrop-blur-[2px]">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="company-modal-title"
        className="w-full max-w-[760px] rounded-2xl bg-white p-7 shadow-2xl shadow-navy-900/20 xl:p-8"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-500">
            <SearchSparkleIcon className="h-7 w-7" />
          </span>
          <div className="pt-1">
            <h2
              id="company-modal-title"
              className="font-display text-2xl font-bold text-navy-900"
            >
              Recherche de l&apos;entreprise
            </h2>
            <p className="mt-1 text-[15px] text-ink-500">
              Vérifiez les informations trouvées avant de confirmer.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="ml-auto rounded-lg p-1.5 text-ink-500 hover:bg-navy-50 hover:text-navy-900"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {state === "loading" && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-surface px-6 py-10 text-ink-500">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-blue-100 border-t-brand-blue-500" />
            Recherche en cours…
          </div>
        )}

        {state === "empty" && (
          <div className="mt-6 rounded-xl border border-line bg-surface px-6 py-8 text-ink-500">
            Aucune entreprise trouvée. Vérifiez l&apos;orthographe ou saisissez
            les informations manuellement.
          </div>
        )}

        {state === "found" && match && (
          <div className="mt-6 rounded-xl border border-green-100 bg-green-50/50 p-6">
            <div className="flex items-start gap-3.5">
              <CheckCircleSolidIcon className="h-8 w-8 shrink-0 text-green-500" />
              <div>
                <p className="text-lg font-bold text-green-600">
                  Entreprise trouvée
                </p>
                <p className="mt-2 font-semibold text-navy-900">{match.name}</p>
                <p className="mt-2 text-[14.5px] text-ink-500">
                  Pays : {match.country}
                </p>
                <p className="text-[14.5px] text-ink-500">
                  Secteur proposé : {match.sector}
                </p>

                <hr className="my-4 border-green-100" />

                <p className="text-[14.5px] font-semibold text-navy-900">
                  Sous-secteurs proposés
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {match.subSectors.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-brand-blue-100 bg-white px-3 py-1.5 text-[13.5px] font-medium text-brand-blue-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {state !== "loading" && (
          <>
            <p className="mt-4 text-[13.5px] text-ink-500">
              Ces informations seront appliquées au formulaire après
              confirmation.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={onReject}
                className="h-13 rounded-xl border border-line bg-white px-6 py-3.5 text-[15px] font-semibold text-navy-900 transition-colors hover:border-navy-200 hover:bg-navy-50"
              >
                Ce n&apos;est pas mon entreprise
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={state !== "found"}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-800 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-navy-900 disabled:cursor-not-allowed disabled:bg-ink-300"
              >
                <CheckIcon className="h-[18px] w-[18px]" />
                Confirmer cette entreprise
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
