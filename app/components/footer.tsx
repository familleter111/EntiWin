import Link from "next/link";
import { Logo } from "./icons";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-white">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-6 py-10 xl:px-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <Logo className="h-8 w-8" />
          <div>
            <p className="font-display text-lg font-extrabold tracking-tight text-navy-900">
              ENTI WiN
            </p>
            <p className="text-sm text-ink-500">
              Évaluation qualité assistée par IA
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-ink-500">
          <Link href="/" prefetch className="hover:text-navy-900">
            Accueil
          </Link>
          <Link
            href="/comment-ca-marche"
            prefetch
            className="hover:text-navy-900"
          >
            Comment ça marche
          </Link>
          <Link href="/a-propos" prefetch className="hover:text-navy-900">
            À propos
          </Link>
          <Link href="/analyse" prefetch className="hover:text-navy-900">
            Lancer mon analyse
          </Link>
        </nav>

        <p className="text-sm text-ink-300">
          © {new Date().getFullYear()} ENTI WIN. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
