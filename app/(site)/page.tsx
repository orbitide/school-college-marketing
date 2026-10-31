import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqList } from "@/components/marketing/faq-list";
import { FinalCta } from "@/components/marketing/final-cta";
import { Hero } from "@/components/marketing/hero";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { SolveSection } from "@/components/marketing/solve-section";
import { WhyChoose } from "@/components/marketing/why-choose";
import { Section } from "@/components/marketing/section";
import { JsonLd } from "@/components/shared/json-ld";
import { moduleGroups } from "@/content/modules";
import { faqPageLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";

const problems = [
  ["Too many spreadsheets", "One record per student, shared by every team."],
  ["Manual attendance", "Marked on a phone; absences reach parents at once."],
  ["Scattered fee records", "Every due, payment and overdue account in one list."],
  ["Slow admission processing", "A clear pipeline, with missing documents chased for you."],
  ["Communication gaps", "Publish once and see who has read it."],
  ["Too much administrative work", "The system finds the problems and proposes the fix."],
] as const;

const roles = [
  ["Administrator", "Approvals, finance, attendance, reports and the problems that need attention."],
  ["Teacher", "Today's classes, attendance, students to follow up and marks to enter."],
  ["Student", "Schedule, attendance, fees due, results, notices and documents."],
  ["Parent", "Your child's attendance, fees, results and notices, and a way to message the teacher."],
] as const;

export default function Home() {
  return (
    <>
      <JsonLd data={faqPageLd} />
      <Hero />
      <FeatureShowcase />
      <WhyChoose />
      <SolveSection />

      <Section label="The problem" title="Sound familiar?" intro="Most institutions run on a patchwork. The cost is time, and the things that slip through.">
        <ul className="grid divide-y rounded-xl border bg-surface sm:grid-cols-2 sm:divide-x-0 lg:grid-cols-3">
          {problems.map(([p, s], i) => (
            <li key={p} className={cn("p-5", i % 3 !== 0 && "lg:border-l", i % 2 !== 0 && "sm:border-l lg:border-l", i >= 3 && "lg:border-t", i >= 2 && "sm:border-t lg:border-t-0", i >= 3 && "lg:border-t")}>
              <p className="font-semibold">{p}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="Roles" title="The right view for everyone" intro="Each person sees the information and actions that matter to them, and nothing else.">
        <dl className="grid divide-y rounded-xl border bg-surface sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {roles.map(([r, d]) => (
            <div key={r} className="p-5">
              <dt className="font-semibold">{r}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="muted" label="Everything in one system" title="Built around how institutions actually work">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {moduleGroups.map((g) => (
            <div key={g.title}>
              <h3 className="text-base">{g.title}</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {g.modules.map((m) => <li key={m.name}>{m.name}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8"><Link href="/features" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">Explore the product <ArrowRight className="size-4" aria-hidden /></Link></p>
      </Section>

      <Section id="faq" label="Questions" title="Frequently asked questions">
        <div className="max-w-3xl"><FaqList /></div>
      </Section>
      <FinalCta />
    </>
  );
}
