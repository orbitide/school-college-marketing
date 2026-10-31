import type { Metadata } from "next";
import { FaqList } from "@/components/marketing/faq-list";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { faqPageLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about setup, data, security, parents and pricing.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageLd} />
      <PageHero label="FAQ" title="Frequently asked questions" intro="Can't find your answer? Book a call and ask us directly." />
      <div className="container-page max-w-3xl py-14 sm:py-20"><FaqList /></div>
      <FinalCta />
    </>
  );
}
