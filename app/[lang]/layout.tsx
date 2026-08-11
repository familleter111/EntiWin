import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import {
  direction,
  htmlLang,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { DictionaryProvider } from "@/lib/i18n/dictionary-provider";

// Inter (police de la maquette), auto-hébergée par next/font :
// pas d'appel réseau à Google, pas de flash de texte au chargement.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Inter ne couvre pas l'alphabet arabe : sans cette seconde police, la version
// arabe tomberait sur la police système, différente d'une machine à l'autre.
const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: {
      default: dict.meta.home.title,
      template: dict.meta.template,
    },
    description: dict.meta.home.description,
    // Chaque page annonce ses variantes : Google sert la bonne langue.
    alternates: {
      languages: {
        fr: "/",
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#122C5E",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={htmlLang[locale]}
      dir={direction(locale)}
      // Le scroll doux de globals.css est volontaire ; l'attribut indique à Next
      // de le désactiver le temps d'une navigation, pour que la restauration de
      // position soit instantanée plutôt qu'animée.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        {/* Les composants client (navigation, tunnel) lisent le dictionnaire
            ici ; les composants serveur appellent `getDictionary()` eux-mêmes. */}
        <DictionaryProvider locale={locale} common={dict.common}>
          {children}
        </DictionaryProvider>
      </body>
    </html>
  );
}
