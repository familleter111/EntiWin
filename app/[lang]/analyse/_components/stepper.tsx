"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckIcon } from "@/app/components/icons";
import { localePath, stripLocale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/dictionary-provider";
import { WIZARD_STEPS } from "../_lib/wizard";
import { useWizard } from "./wizard-store";

/**
 * Fil des 5 étapes : étapes franchies en vert, étape courante en bleu marine,
 * étapes à venir en gris. L'étape courante est déduite de l'URL.
 */
export function Stepper() {
  const pathname = usePathname();
  const locale = useLocale();
  const { data } = useWizard();
  // La comparaison se fait sur la route sans préfixe de langue.
  const route = stripLocale(pathname);
  const current = Math.max(
    0,
    WIZARD_STEPS.findIndex((s) => s.href === route),
  );

  // Étape 4 : bleue pendant le travail de l'IA, verte une fois l'analyse finie.
  const onAnalysis = route === "/analyse/analyse-ia";
  const analysisDone = onAnalysis && data.analysisPhase === "done";

  return (
    <nav
      aria-label="Progression de l'analyse"
      className="shrink-0 border-b border-line bg-white"
    >
      <ol className="mx-auto flex max-w-[1500px] items-start gap-0 overflow-x-auto px-6 pb-2.5 pt-3 xl:px-10">
        {WIZARD_STEPS.map((step, i) => {
          const done = i < current || (i === current && analysisDone);
          const active = i === current && !analysisDone;
          const blue = i === current && onAnalysis;

          const label = (
            <>
              {i + 1}. {step.label}
            </>
          );

          return (
            <li
              key={step.href}
              className="flex min-w-[110px] flex-1 flex-col items-center"
            >
              <div className="flex w-full items-center">
                {/* trait gauche : vert si l'étape précédente est franchie */}
                <span
                  className={`h-0.5 flex-1 rounded-full ${
                    i === 0
                      ? "bg-transparent"
                      : i <= current - 1
                        ? "bg-green-500"
                        : i === current
                          ? blue
                            ? "bg-brand-blue-500"
                            : "bg-navy-800"
                          : "bg-line"
                  }`}
                />

                <span
                  aria-current={active ? "step" : undefined}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-semibold transition-colors ${
                    done
                      ? "border-green-500 bg-green-500 text-white"
                      : active && blue
                        ? "border-brand-blue-500 bg-brand-blue-500 text-white"
                        : active
                          ? "border-navy-800 bg-navy-800 text-white"
                          : "border-line bg-white text-ink-300"
                  }`}
                >
                  {done ? (
                    <CheckIcon className="h-4 w-4" strokeWidth={2.6} />
                  ) : (
                    i + 1
                  )}
                </span>

                {/* trait droit */}
                <span
                  className={`h-0.5 flex-1 rounded-full ${
                    i === WIZARD_STEPS.length - 1
                      ? "bg-transparent"
                      : i < current
                        ? "bg-green-500"
                        : i === current
                          ? analysisDone
                            ? "bg-line"
                            : blue
                              ? "bg-brand-blue-500"
                              : "bg-navy-800"
                          : "bg-line"
                  }`}
                />
              </div>

              {done && !blue ? (
                <Link
                  href={localePath(locale, step.href)}
                  prefetch
                  className="mt-2 whitespace-nowrap text-[12.5px] font-medium text-green-600 hover:underline"
                >
                  {label}
                </Link>
              ) : (
                <span
                  className={`mt-2 whitespace-nowrap text-[12.5px] ${
                    blue
                      ? "font-semibold text-brand-blue-500"
                      : active
                        ? "font-semibold text-navy-900"
                        : "text-ink-300"
                  }`}
                >
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
