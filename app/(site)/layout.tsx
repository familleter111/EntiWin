import { Header } from "@/app/components/header";

/** Pages vitrine : en-tête standard. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
