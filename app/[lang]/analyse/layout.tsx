import { Header } from "@/app/components/header";
import { Stepper } from "./_components/stepper";

/** Tunnel d'analyse : en-tête applicatif + fil des 7 étapes. */
export default function AnalyseLayout({
  children,
}: LayoutProps<"/[lang]/analyse">) {
  return (
    // Chaque étape tient dans un écran : hauteur figée sur desktop.
    <div className="flex flex-1 flex-col lg:h-dvh lg:flex-none lg:overflow-hidden">
      {/* wizard-scale réduit l'échelle de tout le tunnel (en-tête compris)
          sur les écrans bas — l'équivalent d'un zoom navigateur automatique. */}
      <div className="wizard-scale flex h-full min-h-0 flex-1 flex-col">
        <Header variant="app" />
        <Stepper />
        {/* overflow-y-auto : filet de sécurité, rien n'est jamais rogné. */}
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
}
