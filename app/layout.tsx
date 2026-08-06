import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter (police de la maquette), auto-hébergée par next/font :
// pas d'appel réseau à Google, pas de flash de texte au chargement.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ENTI WIN — Évaluez vos documents qualité avec l'IA",
    template: "%s | ENTI WIN",
  },
  description:
    "Identifiez en quelques minutes les exigences couvertes, les écarts et les points à améliorer dans vos documents qualité pharmaceutiques.",
};

export const viewport: Viewport = {
  themeColor: "#122C5E",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white">{children}</body>
    </html>
  );
}
