import Image from "next/image";
import Link from "next/link";
import { FlagTN } from "./flags";
import {
  ChevronRightIcon,
  LinkedinIcon,
  Logo,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "./icons";
import { localePath, type Locale } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";
import type { Dictionary } from "@/lib/i18n/dictionaries/fr";

/**
 * Pied de page repris de la maquette Industry X.0 (fond sombre, colonnes de
 * liens, bandeau de contact), recoloré avec la palette ENTI WIN : le marine du
 * logo pour le fond, le vert d'accent à la place de l'or.
 *
 * Zéro JS côté client : tout est rendu au build, comme le reste du site.
 */

type ContactEntry = {
  icon: (props: { className?: string }) => React.ReactElement;
  label: string;
  lines: string[];
  href: string;
  /** Ouvre dans un nouvel onglet (destination hors du site). */
  external?: boolean;
};

const SOCIAL_LINKEDIN = "https://tn.linkedin.com/company/industryx0";
const MAPS_URL = "https://share.google/xUu9QReMfePJMR8Yw";
const PHONE = "+216 90 199 823";
const EMAIL = "contact@industryx0.pro";

export async function Footer() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);
  const t = dict.footer;

  const sections = buildSections(locale, t);

  const contacts: ContactEntry[] = [
    {
      icon: MapPinIcon,
      label: t.contact.address,
      lines: [t.contact.addressLine1, t.contact.addressLine2],
      href: MAPS_URL,
      external: true,
    },
    {
      icon: PhoneIcon,
      label: t.contact.phone,
      lines: [PHONE],
      href: "tel:+21690199823",
    },
    {
      icon: MailIcon,
      label: t.contact.email,
      lines: [EMAIL],
      href: `mailto:${EMAIL}`,
    },
  ];

  return (
    <footer
      id="pied-de-page"
      className="relative mt-auto overflow-hidden bg-navy-950 text-white"
    >
      {/* Filet lumineux : marque la coupure avec le blanc des pages */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
      />
      {/* Halos d'ambiance, en CSS pur (pas d'animation, pas de script) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-24 -top-24 h-72 w-72 rounded-full bg-green-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -end-24 h-80 w-80 rounded-full bg-navy-500/25 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 py-12 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Marque */}
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2.5">
                <Logo className="h-9 w-9 shrink-0 text-white" />
                <div>
                  <p className="font-display text-xl font-extrabold tracking-tight text-white">
                    {dict.common.brand}
                  </p>
                  <p className="text-[13px] text-white/55">{t.tagline}</p>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="hidden h-8 w-px bg-white/15 sm:block"
              />

              {/* Signature éditeur. Le logo d'origine est gris anthracite,
                  illisible ici : `industry-x0-light.png` en éclaircit les gris
                  et conserve l'or, ce qui évite la pastille blanche. */}
              <span className="flex items-center gap-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                  {t.solutionBy}
                </span>
                <Image
                  src="/industry-x0-light.png"
                  alt="Industry X.O"
                  width={1200}
                  height={445}
                  className="h-auto w-[165px]"
                />
              </span>
            </div>

            <p className="mt-6 max-w-xl text-[13px] leading-7 text-white/60">
              {t.description}
            </p>
          </div>

          {/* Colonnes de liens */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title}>
                <div className="mb-5">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-white">
                    {section.title}
                  </h2>
                  <div className="mt-2 h-[2px] w-8 rounded-full bg-green-400" />
                </div>

                <ul>
                  {section.items.map((item) => (
                    <li key={item.label}>
                      {item.href ? (
                        <FooterLink href={item.href}>{item.label}</FooterLink>
                      ) : (
                        <span className="flex items-center gap-2 text-sm text-white/35">
                          <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-green-500/50 rtl:rotate-180" />
                          {item.label}
                        </span>
                      )}
                      <div
                        aria-hidden="true"
                        className="my-3 h-px w-full bg-white/10"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bandeau de contact */}
        <div className="mt-10 grid gap-5 rounded-[20px] border border-white/10 bg-white/[0.03] p-5 lg:grid-cols-4">
          {contacts.map(({ icon: Icon, label, lines, href, external }, index) => (
            <div
              key={label}
              className={index > 0 ? "lg:border-s lg:border-white/10 lg:ps-5" : ""}
            >
              {/* Toute la cellule est cliquable, icône comprise : viser une
                  pastille de 48 px est plus simple qu'une ligne de texte. */}
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noreferrer" }
                  : undefined)}
                className="group flex items-center gap-4"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-green-400/25 bg-green-400/10 transition-colors group-hover:border-green-400/50 group-hover:bg-green-400/20">
                  <Icon className="h-[18px] w-[18px] text-green-300" />
                </span>
                <span>
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-green-300">
                    {label}
                  </span>
                  <span
                    dir="ltr"
                    className="block text-start text-sm leading-6 text-white/75 transition-colors group-hover:text-white"
                  >
                    {lines.map((line, i) => (
                      <span key={line}>
                        {line}
                        {i < lines.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </span>
              </a>
            </div>
          ))}

          <div className="lg:border-s lg:border-white/10 lg:ps-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-green-300">
              {t.contact.follow}
            </p>
            <div className="flex gap-3">
              <a
                href={SOCIAL_LINKEDIN}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-white/60 transition-colors hover:border-green-400/40 hover:bg-green-400/10 hover:text-green-300"
              >
                <LinkedinIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-center md:flex-row">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} ENTI WIN — {t.rights}
          </p>
          <div className="flex items-center gap-3 text-xs text-white/45">
            <span className="flex items-center gap-2">
              {t.startupAct}
              <FlagTN className="h-3.5 w-[21px] rounded-[3px] ring-1 ring-white/15" />
            </span>
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-white/25"
            />
            <span>{t.designedIn}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Colonnes de liens : les trois entrées « Légal » n'ont pas encore de page. */
function buildSections(locale: Locale, t: Dictionary["footer"]) {
  const to = (path: string) => localePath(locale, path);

  return [
    {
      title: t.columns.product,
      items: [
        { label: t.links.howItWorks, href: to("/comment-ca-marche") },
        { label: t.links.startAnalysis, href: to("/analyse") },
        { label: t.links.sampleReport, href: to("/rapport") },
      ],
    },
    {
      title: t.columns.company,
      items: [
        { label: t.links.home, href: to("/") },
        { label: t.links.about, href: to("/a-propos") },
        { label: t.links.contact, href: `mailto:${EMAIL}` },
      ],
    },
    {
      title: t.columns.legal,
      items: [
        { label: t.links.privacy, href: undefined },
        { label: t.links.terms, href: undefined },
        { label: t.links.cookies, href: undefined },
      ],
    },
  ];
}

/** Lien de colonne : chevron vert qui avance au survol. */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const className =
    "group flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-white";
  const chevron = (
    <ChevronRightIcon className="h-3.5 w-3.5 shrink-0 text-green-400 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
  );

  // mailto: / tel: ne sont pas des routes internes : <Link> n'a rien à préparer.
  if (href.includes(":")) {
    return (
      <a href={href} className={className}>
        {chevron}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} prefetch className={className}>
      {chevron}
      <span>{children}</span>
    </Link>
  );
}
