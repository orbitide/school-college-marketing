import type { Metadata } from "next";
import { Check } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { features } from "@/content/marketing";

export const metadata: Metadata = {
  title: "Features",
  description: "Admissions, students, fees, attendance, exams, parent communication and reports in one school and college management system.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero label="Features" title="Everything your institution runs on, in one system" intro="From the first admission enquiry to the final report card, every part shares the same student record." />
      <div className="container-page divide-y py-6">
        {features.map(({ slug, icon: Icon, name, summary, points }) => (
          <section key={slug} id={slug} aria-labelledby={`${slug}-title`} className="grid gap-6 py-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <div>
              <Icon className="size-6 text-primary" aria-hidden />
              <h2 id={`${slug}-title`} className="mt-3 text-2xl sm:text-3xl">{name}</h2>
              <p className="mt-2 text-muted-foreground">{summary}</p>
            </div>
            <ul className="space-y-2.5 self-center">
              {points.map((p) => <li key={p} className="flex gap-2.5"><Check className="mt-1 size-4 shrink-0 text-success" aria-hidden />{p}</li>)}
            </ul>
          </section>
        ))}
      </div>
      <FinalCta />
    </>
  );
}
