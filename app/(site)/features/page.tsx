import type { Metadata } from "next";
import { FinalCta } from "@/components/marketing/final-cta";
import { ModuleIndex } from "@/components/marketing/module-index";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Product",
  description: "People, academics, administration, finance, communication and reports: everything an institution runs on, in one connected system.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero label="Product" title="Everything your institution runs on, connected" intro="Every module reads from the same student, class and fee records, so your team enters data once and the system surfaces what needs attention." />
      <section aria-label="Modules" className="py-12 sm:py-16">
        <div className="container-page"><ModuleIndex /></div>
      </section>
      <FinalCta />
    </>
  );
}
