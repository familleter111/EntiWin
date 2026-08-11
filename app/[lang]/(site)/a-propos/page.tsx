import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "@/app/components/icons";
import { isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary, getLocale } from "@/lib/i18n/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/a-propos">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = await getDictionary(lang);
  return { title: meta.about.title, description: meta.about.description };
}

export default async function AProposPage() {
  const locale = await getLocale();
  const { about, common } = await getDictionary(locale);

  return (
    <>
      <div className="mx-auto w-full max-w-[900px] px-6 py-16 lg:py-20 xl:px-10">
        <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold leading-tight tracking-[-0.02em] text-navy-900">
          {about.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-ink-500">{about.paragraph1}</p>
        <p className="mt-5 text-lg leading-8 text-ink-500">{about.paragraph2}</p>

        <h2 className="mt-12 font-display text-2xl font-bold text-navy-900">
          {about.principlesTitle}
        </h2>
        <ul className="mt-6 grid gap-4">
          {about.principles.map((value) => (
            <li
              key={value}
              className="flex items-start gap-3 leading-7 text-ink-700"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                <CheckIcon className="h-4 w-4" strokeWidth={2.5} />
              </span>
              {value}
            </li>
          ))}
        </ul>

        <div className="card mt-12 flex flex-col items-start gap-5 border-green-100 bg-green-50 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-semibold text-navy-900">
            {about.tryPrompt}
          </p>
          <Link
            href={localePath(locale, "/analyse")}
            prefetch
            className="btn-primary shrink-0 whitespace-nowrap"
          >
            {common.cta.startAnalysis}
          </Link>
        </div>
      </div>
    </>
  );
}
