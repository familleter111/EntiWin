"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { localePath, stripLocale } from "@/lib/i18n/config";
import { useCommon, useLocale } from "@/lib/i18n/dictionary-provider";

/**
 * Seul composant client de la navigation (quelques octets de JS).
 * `prefetch` est actif par défaut sur <Link> : la page suivante est déjà
 * en cache mémoire quand l'utilisateur clique -> transition instantanée.
 */
function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      prefetch
      aria-current={active ? "page" : undefined}
      className={`relative py-1 text-[14.5px] transition-colors ${
        active
          ? "font-semibold text-navy-900"
          : "font-medium text-ink-500 hover:text-navy-900"
      }`}
    >
      {children}
      {/* Filet d'un pixel et demi en marine plutôt qu'une barre verte de deux :
          le repère reste lisible sans être l'élément le plus voyant de la page. */}
      <span
        className={`absolute -bottom-1 start-0 h-[1.5px] w-full rounded-full bg-navy-900 transition-opacity ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}

export function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const locale = useLocale();
  const { nav } = useCommon();

  // La comparaison se fait sur la route sans préfixe : `/en/a-propos` et
  // `/a-propos` désignent la même page, dans deux langues.
  const current = stripLocale(pathname);

  const items = [
    { path: "/", label: nav.home },
    { path: "/comment-ca-marche", label: nav.howItWorks },
    { path: "/a-propos", label: nav.about },
  ];

  return (
    <nav className={className} aria-label={nav.ariaLabel}>
      {items.map(({ path, label }) => (
        <NavLink
          key={path}
          href={localePath(locale, path)}
          active={current === path}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
