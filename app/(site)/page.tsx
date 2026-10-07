import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { FaqList } from "@/components/marketing/faq-list";
import { FinalCta } from "@/components/marketing/final-cta";
import { Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { audiences, features, problems, securityPractices, steps } from "@/content/marketing";

export default function Home() {
  return (
    <>
      <section className="border-b bg-surface">
        <div className="container-page py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="label">School and college management</p>
            <h1 className="mt-3 text-4xl leading-[1.08] sm:text-6xl">Run your school or college from one place.</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Admissions, attendance, fees, exams and parent communication in one secure system, so your team spends less time on paperwork and more on students.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/contact">Book a call <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/features">Explore features</Link></Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Works on any phone or laptop", "Role-based access", "Your data stays yours"].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><Check className="size-4 text-success" aria-hidden />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Section label="The problem" title="Most institutions run on a patchwork" intro="Spreadsheets, paper registers and phone calls. The cost is staff time, and the things that slip through.">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map(({ icon: Icon, problem, outcome }) => (
            <li key={problem} className="panel p-5">
              <Icon className="size-5 text-primary" aria-hidden />
              <p className="mt-3 font-semibold">{problem}</p>
              <p className="mt-2 text-sm text-muted-foreground"><span className="font-medium text-foreground">With us: </span>{outcome}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" label="Features" title="Everything your institution needs, in one system" intro="Each part works on its own and shares the same student record with the rest.">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ slug, icon: Icon, name, summary }) => (
            <li key={slug} className="panel flex flex-col p-5">
              <Icon className="size-5 text-primary" aria-hidden />
              <h3 className="mt-3 text-lg">{name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{summary}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8"><Link href="/features" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">See all features <ArrowRight className="size-4" aria-hidden /></Link></p>
      </Section>

      <Section label="Who benefits" title="Less work for staff, clearer answers for leaders" intro="Everyone gets the view and the tools that fit their role.">
        <dl className="grid divide-y rounded-xl border bg-surface sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {audiences.map(({ role, icon: Icon, text }) => (
            <div key={role} className="p-5">
              <Icon className="size-5 text-primary" aria-hidden />
              <dt className="mt-3 font-semibold">{role}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6"><Link href="/benefits" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">How you will benefit <ArrowRight className="size-4" aria-hidden /></Link></p>
      </Section>

      <Section tone="dark" label="Security" title="Student data deserves care" intro="You decide who sees what, every sensitive action is recorded, and your data remains yours.">
        <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {securityPractices.slice(0, 3).map(({ title, text }) => (
            <li key={title}>
              <p className="flex items-center gap-2 font-semibold"><ShieldCheck className="size-4" aria-hidden />{title}</p>
              <p className="mt-1 text-sm text-primary-foreground/75">{text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8"><Link href="/security" className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4">Read about security <ArrowRight className="size-4" aria-hidden /></Link></p>
      </Section>

      <Section label="Getting started" title="Live in days, with help at every step">
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="panel p-5">
              <span className="tnum text-lg font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" id="faq" label="Questions" title="Frequently asked questions">
        <div className="max-w-3xl"><FaqList limit={5} /></div>
        <p className="mt-6"><Link href="/faq" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">More questions <ArrowRight className="size-4" aria-hidden /></Link></p>
      </Section>
      <FinalCta />
    </>
  );
}
