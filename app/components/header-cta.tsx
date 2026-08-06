"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Le CTA n'a de sens que sur la page d'accueil : dès qu'on est ailleurs —
 * et en particulier dans le tunnel d'analyse — il disparaît de l'en-tête.
 */
export function HeaderCta({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <Link href="/analyse" prefetch className={className}>
      Lancer mon analyse
    </Link>
  );
}
