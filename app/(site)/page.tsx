import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqList } from "@/components/marketing/faq-list";
import { FinalCta } from "@/components/marketing/final-cta";
import { LiveActivityPreview, LiveDashboardPreview } from "@/components/marketing/live-preview";
import { AdmissionsPreview, AttendancePreview, FeesPreview, NoticesPreview } from "@/components/marketing/previews";
import { Section } from "@/components/marketing/section";
import { JsonLd } from "@/components/shared/json-ld";
import { Button } from "@/components/ui/button";
import { moduleGroups } from "@/content/modules";
import { overview as o, taka } from "@/content/product/data";
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

const workflows = [
  {
    label: "Live view",
    title: "See what is happening as it happens",
    text: "Payments, registers and applications appear the moment they happen. Act on a problem and the numbers on the dashboard change with it.",
    points: ["Payments received, registers submitted and applications arriving in one feed", `${o.overdueCount} overdue payments totalling ${taka(o.overdueAmount)} today, fewer by the afternoon`, "Pause the feed whenever you need to read"],
    visual: <LiveActivityPreview />,
  },
  {
    label: "Fees",
    title: "Know who owes what, and follow up in two clicks",
    text: "Filter to overdue accounts, select the ones you want and send a reminder. Record payments as they arrive. Export for the accountant.",
    points: ["Search, filter, sort and export any list", "Bulk reminders with a confirmation step", "Class-by-class collection against target"],
    visual: <FeesPreview />,
  },
  {
    label: "Attendance",
    title: "Registers done by 9 AM, not chased at noon",
    text: "See which sections have not submitted and remind the class teacher. Absences notify guardians automatically.",
    points: ["Section-by-section view for today", "One-click reminders to class teachers", "Drill into who was absent and notify guardians"],
    visual: <AttendancePreview />,
  },
  {
    label: "Admissions",
    title: "Move applicants through without losing paperwork",
    text: "Each application carries its document checklist. Ask for what is missing, then approve with the full picture in one panel.",
    points: ["Pipeline from application to approval", "Missing-document requests sent to guardians", "Approve, decline and notify in one place"],
    visual: <AdmissionsPreview />,
  },
  {
    label: "Communication",
    title: "Reach the right people once",
    text: "Publish or schedule a notice to a class, a section or everyone, and see how many have read it.",
    points: ["Audience targeting by class or role", "Drafts and scheduled notices", "Read counts so you know it landed"],
    visual: <NoticesPreview />,
  },
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
      <section className="border-b bg-surface">
        <div className="container-page pb-12 pt-12 sm:pt-20 lg:pb-16">
          <div className="max-w-3xl">
            <p className="label">School and college management</p>
            <h1 className="mt-3 text-4xl leading-[1.08] sm:text-6xl">Run your school or college from one place.</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Admissions, attendance, fees, exams and parent communication in one system that also shows what needs attention and helps you resolve it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/demo">Book a demo <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/app/dashboard">Try the demo app</Link></Button>
            </div>
          </div>
          <div className="mt-12 sm:mt-14"><LiveDashboardPreview /></div>
        </div>
      </section>

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

      <div className="border-y bg-muted/60">
        {workflows.map((w, i) => (
          <section key={w.label} aria-labelledby={`w-${i}`} className={cn("py-14 sm:py-20", i > 0 && "border-t")}>
            <div className="container-page grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div className={cn(i % 2 === 1 && "lg:order-2")}>
                <p className="label">{w.label}</p>
                <h2 id={`w-${i}`} className="mt-2 text-2xl leading-tight sm:text-3xl">{w.title}</h2>
                <p className="mt-3 text-muted-foreground">{w.text}</p>
                <ul className="mt-5 space-y-2">
                  {w.points.map((p) => (
                    <li key={p} className="flex gap-2.5"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{p}</li>
                  ))}
                </ul>
              </div>
              <div className={cn("min-w-0", i % 2 === 1 && "lg:order-1")}>{w.visual}</div>
            </div>
          </section>
        ))}
      </div>

      <Section label="Roles" title="The right view for everyone" intro="Each person sees the information and actions that matter to them, and nothing else.">
        <dl className="grid divide-y rounded-xl border bg-surface sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {roles.map(([r, d]) => (
            <div key={r} className="p-5">
              <dt className="font-semibold">{r}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{d}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-muted-foreground">
          Switch roles in the <Link href="/app/dashboard" className="font-semibold text-primary hover:underline">demo app</Link> to see each view.
        </p>
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
