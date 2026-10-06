import type { Metadata } from "next";
import { FeatureCard } from "@/components/shared/feature-card";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCta } from "@/components/home/final-cta";
import { features } from "@/content/features";

export const metadata: Metadata = {
  title: "Features",
  description: "Admissions, attendance, fees, exams, parent portal and notices: every module your school or college needs.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything your institution needs, in one system"
        intro="Modules that work together, so your team enters data once and everyone stays informed."
      />
      <section aria-label="Modules" className="py-16 sm:py-24">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <FeatureCard key={f.slug} feature={f} detailed />
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
