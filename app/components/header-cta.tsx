"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, stripLocale } from "@/lib/i18n/config";
import { useCommon, useLocale } from "@/lib/i18n/dictionary-provider";

/**
 * Le CTA accompagne toutes les pages vitrine (accueil, comment ça marche,
 * à propos). Il ne disparaît que dans le tunnel d'analyse : l'utilisateur y est
 * déjà, l'inviter à le relancer le ferait repartir de l'étape 1.
 */
export function HeaderCta({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const { cta } = useCommon();

  if (stripLocale(pathname).startsWith("/analyse")) return null;

  return (
    <Link href={localePath(locale, "/analyse")} prefetch className={className}>
      {cta.startAnalysis}
    </Link>
  );
}
