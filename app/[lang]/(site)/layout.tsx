import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";

/** Pages vitrine : en-tête standard et pied de page commun. */
export default function SiteLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <>
      <Header />
      {/*
       * Toute page vitrine réserve au minimum la hauteur de l'écran moins
       * l'en-tête : le pied de page reste sous la ligne de flottaison et ne se
       * découvre qu'au défilement, quelle que soit la taille de la fenêtre.
       */}
      <main className="flex min-h-[calc(100dvh-72px)] flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}
