import type { Metadata } from "next";
import { FinalCta } from "@/components/marketing/final-cta";
import { ModuleIndex } from "@/components/marketing/module-index";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Features",
  description: "Admissions, attendance, fees, exams, parent portal and notices: every module your school or college needs.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        label="Features"
        title="Everything your institution needs, in one system"
        intro="Modules that work together, so your team enters data once and everyone stays informed."
      />
      <section aria-label="Modules" className="py-14 sm:py-20">
        <div className="container-page">
          <ModuleIndex detailed />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
