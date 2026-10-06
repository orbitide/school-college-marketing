import type { Metadata } from "next";
import { FeatureCard } from "@/components/shared/feature-card";
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
      <section className="bg-gradient-to-b from-secondary/60 to-background pb-8 pt-12 sm:pt-16">
        <div className="container-page max-w-3xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Everything your institution needs, in one system</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Modules that work together, so your team enters data once and everyone stays informed.
          </p>
        </div>
      </section>
      <section aria-label="Modules" className="py-12">
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
