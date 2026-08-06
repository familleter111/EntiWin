"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChatIcon,
  CheckCircleIcon,
  FileTextIcon,
  FolderIcon,
  RefreshIcon,
  RocketIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "@/app/components/icons";
import { DEMO_FILES, detectThemes } from "../_lib/documents";
import { useWizard } from "./wizard-store";

export function StepSuivi() {
  const router = useRouter();
  const { data, reset } = useWizard();
  const files = data.files.length > 0 ? data.files : DEMO_FILES;
  const themes = detectThemes(files);

  function newAnalysis() {
    reset();
    router.push("/analyse");
  }

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-6 py-4 xl:px-10">
      <h1 className="font-display text-[clamp(1.5rem,1.9vw,1.85rem)] font-extrabold tracking-[-0.02em] text-navy-900">
        Suivi de votre analyse
      </h1>
      <p className="mt-1 text-[14px] text-ink-500">
        Retrouvez les prochaines actions et choisissez comment poursuivre.
      </p>

      {/* ---------- Trois actions ---------- */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="flex flex-col items-center rounded-2xl border border-line bg-white p-5 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-navy-800">
            <FileTextIcon className="h-7 w-7" />
          </span>
          <h2 className="mt-3 font-display text-lg font-bold text-navy-900">
            Consulter le rapport
          </h2>
          <p className="mt-1.5 text-[14px] leading-6 text-ink-500">
            Revenez à tout moment sur les écarts, preuves et recommandations.
          </p>
          <Link
            href="/analyse/rapport"
            prefetch
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-navy-800 bg-white px-5 text-[15px] font-semibold text-navy-900 transition-colors hover:bg-navy-50"
          >
            <FileTextIcon className="h-5 w-5" />
            Ouvrir le rapport
          </Link>
        </section>

        <section className="flex flex-col items-center rounded-2xl border border-line bg-white p-5 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-50 text-navy-800">
            <UsersIcon className="h-7 w-7" />
          </span>
          <h2 className="mt-3 font-display text-lg font-bold text-navy-900">
            Demander un accompagnement
          </h2>
          <p className="mt-1.5 text-[14px] leading-6 text-ink-500">
            Échangez avec l&apos;équipe ENTI WIN sur les points prioritaires
            identifiés.
          </p>
          <a
            href="mailto:contact@entiwin.com?subject=Accompagnement%20suite%20%C3%A0%20mon%20analyse%20ENTI%20WIN"
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-navy-800 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-navy-900"
          >
            <ChatIcon className="h-5 w-5" />
            Demander un échange
          </a>
        </section>

        <section className="flex flex-col items-center rounded-2xl border border-line bg-white p-5 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-500">
            <RefreshIcon className="h-7 w-7" />
          </span>
          <h2 className="mt-3 font-display text-lg font-bold text-navy-900">
            Lancer une nouvelle analyse
          </h2>
          <p className="mt-1.5 text-[14px] leading-6 text-ink-500">
            Démarrez un nouveau parcours avec d&apos;autres documents.
          </p>
          <button
            type="button"
            onClick={newAnalysis}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-brand-blue-500 bg-white px-5 text-[15px] font-semibold text-brand-blue-500 transition-colors hover:bg-brand-blue-50"
          >
            <RocketIcon className="h-5 w-5" />
            Nouvelle analyse
          </button>
        </section>
      </div>

      {/* ---------- Récapitulatif ---------- */}
      <section className="mt-4 grid items-center gap-4 rounded-2xl border border-line bg-white p-4 lg:grid-cols-2">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-500">
            <CheckCircleIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="font-display text-[16px] font-bold text-navy-900">
              Analyse terminée
            </p>
            <p className="mt-1 flex items-center gap-2.5 text-[13.5px] text-ink-500">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-500">
                <FolderIcon className="h-[18px] w-[18px]" />
              </span>
              <span>
                Thèmes sélectionnés
                <span className="block font-semibold text-navy-900">
                  {themes.map((t) => t.label).join(", ")}
                </span>
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:border-l lg:border-line lg:pl-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-500">
            <FileTextIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[13.5px] text-ink-500">Statut</p>
            <p className="font-semibold text-green-600">Rapport disponible</p>
          </div>
        </div>
      </section>

      <p className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-[14px] text-ink-500 lg:mt-auto">
        <ShieldCheckIcon className="h-5 w-5 shrink-0 text-navy-800" />
        Vos documents restent associés à cette analyse.
      </p>
    </div>
  );
}
