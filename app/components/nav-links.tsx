"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

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
  href: "/" | "/comment-ca-marche" | "/a-propos";
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      prefetch
      aria-current={active ? "page" : undefined}
      className={`relative py-1 text-[15px] transition-colors ${
        active
          ? "font-semibold text-navy-900"
          : "font-medium text-ink-700 hover:text-navy-900"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-green-500 transition-opacity ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}

export function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label="Navigation principale">
      <NavLink href="/" active={pathname === "/"}>
        Accueil
      </NavLink>
      <NavLink
        href="/comment-ca-marche"
        active={pathname === "/comment-ca-marche"}
      >
        Comment ça marche
      </NavLink>
      <NavLink href="/a-propos" active={pathname === "/a-propos"}>
        À propos
      </NavLink>
    </nav>
  );
}
