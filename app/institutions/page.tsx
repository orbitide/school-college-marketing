import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/marketing/faq-list";
import { FinalCta } from "@/components/marketing/final-cta";
import { ModuleIndex } from "@/components/marketing/module-index";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { JsonLd } from "@/components/shared/json-ld";
import { faqPageLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "For schools and colleges",
  description: "Run admissions, attendance, fees and exams, and bring your courses, notices and question banks to your students.",
  alternates: { canonical: "/institutions" },
};

const offer = [
  ["Courses", "Organise subjects and topics the way your syllabus does."],
  ["Teachers", "Teachers answer questions, set work and see who needs help."],
  ["Assignments", "Set tasks and follow submissions without paper."],
  ["Notices", "Publish once; students and parents see it in their feed."],
  ["Exam information", "Routines, results and marksheets in one place."],
  ["Study materials", "Share notes and resources by class and subject."],
  ["Question banks", "Build your own bank of questions and worked solutions."],
  ["Student groups", "Create groups by class, section or club."],
] as const;

export default function InstitutionsPage() {
  return (
    <>
      <JsonLd data={faqPageLd} />
      <PageHero
        label="For schools and colleges"
        title="Your institution, supporting every student's study"
        intro="The same platform students use to learn also runs the office: admissions, attendance, fees and exams. Students stay at the centre."
      />
      <div className="container-page flex flex-col gap-3 py-8 sm:flex-row">
        <Button asChild size="lg"><Link href="/demo">Book a demonstration <ArrowRight /></Link></Button>
        <Button asChild size="lg" variant="outline"><Link href="/pricing">See pricing</Link></Button>
      </div>

      <Section layout="split" label="What you can provide" title="Give students more than a timetable">
        <dl className="grid border-t sm:grid-cols-2 sm:gap-x-10">
          {offer.map(([t, d]) => (
            <div key={t} className="border-b py-5">
              <dt className="font-display text-lg font-semibold">{t}</dt>
              <dd className="mt-1 text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="Administration" title="Eight modules, one record" intro="Your team enters data once. Every module reads from the same student, class and fee records.">
        <ModuleIndex />
      </Section>

      <Section layout="split" label="Questions" title="Frequently asked questions">
        <FaqList />
      </Section>
      <FinalCta />
    </>
  );
}
