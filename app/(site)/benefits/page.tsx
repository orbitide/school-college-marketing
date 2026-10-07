import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { audiences, problems } from "@/content/marketing";

export const metadata: Metadata = {
  title: "Benefits",
  description: "The problems school and college management software solves, and how principals, staff, teachers and parents benefit.",
  alternates: { canonical: "/benefits" },
};

const gains = [
  ["Time back", "Less re-typing, collating and chasing, so staff spend hours on students instead of paperwork."],
  ["Fewer leaks in fee collection", "Dues and overdue accounts are visible, and follow-up is quick and consistent."],
  ["Fewer errors", "Data is entered once and reused, instead of copied between registers and spreadsheets."],
  ["Better parent relationships", "Parents hear from you promptly and can check attendance, fees and results themselves."],
  ["Clearer decisions", "Leaders see attendance, collections and admissions without waiting for a report."],
] as const;

export default function BenefitsPage() {
  return (
    <>
      <PageHero label="Benefits" title="From daily friction to a calmer institution" intro="What changes once your records, fees and communication live in one place." />
      <Section title="The problem, and the outcome" intro="Problems we hear from schools and colleges, and what changes.">
        <ul className="divide-y rounded-xl border bg-surface">
          {problems.map(({ problem, outcome }) => (
            <li key={problem} className="grid gap-2 p-5 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
              <p className="text-muted-foreground">{problem}</p>
              <ArrowRight className="hidden size-4 text-primary md:block" aria-hidden />
              <p className="font-medium">{outcome}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="muted" label="What you gain" title="Where you will notice the difference">
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {gains.map(([t, d]) => (
            <div key={t}><dt className="font-semibold">{t}</dt><dd className="mt-1 text-sm text-muted-foreground">{d}</dd></div>
          ))}
        </dl>
      </Section>
      <Section label="Who benefits" title="A better day for everyone involved">
        <dl className="grid divide-y rounded-xl border bg-surface sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {audiences.map(({ role, icon: Icon, text }) => (
            <div key={role} className="p-5"><Icon className="size-5 text-primary" aria-hidden /><dt className="mt-3 font-semibold">{role}</dt><dd className="mt-1 text-sm text-muted-foreground">{text}</dd></div>
          ))}
        </dl>
      </Section>
      <FinalCta />
    </>
  );
}
