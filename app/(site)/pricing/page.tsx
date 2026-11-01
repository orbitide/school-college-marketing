import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus, Headphones, GraduationCap, Smartphone, ShieldCheck } from "lucide-react";
import { Band } from "@/components/marketing/band";
import { FaqList } from "@/components/marketing/faq-list";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Block, CardGrid } from "@/components/marketing/page-kit";
import { Button } from "@/components/ui/button";
import { plans } from "@/content/pricing";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing by student range for schools and colleges. Multi-branch institutions get a custom plan.",
  alternates: { canonical: "/pricing" },
};

// TODO: confirm the real feature split between plans. This table follows the plan feature lists in content/pricing.ts.
const rows: { label: string; values: [boolean, boolean, boolean, boolean] }[] = [
  { label: "Admissions, attendance and fees", values: [true, true, true, true] },
  { label: "Exams and results", values: [true, true, true, true] },
  { label: "Parent portal", values: [true, true, true, true] },
  { label: "Notices with SMS", values: [false, true, true, true] },
  { label: "Management dashboard", values: [false, true, true, true] },
  { label: "Onboarding and staff training", values: [false, false, true, true] },
  { label: "Data import assistance", values: [false, false, true, true] },
  { label: "Dedicated account manager", values: [false, false, true, true] },
  { label: "Multiple branches", values: [false, false, false, true] },
];

const included = [
  { icon: Headphones, title: "Onboarding support", text: "Every plan includes help getting started." },
  { icon: Smartphone, title: "Works on any phone", text: "Teachers, staff and parents sign in from a browser." },
  { icon: ShieldCheck, title: "Role-based access", text: "People see only what their role allows." },
  { icon: GraduationCap, title: "Built for Bangladesh", text: "Designed around local schools and colleges." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="Pricing"
        title="Pricing that fits your institution"
        intro="Choose the plan for your student count. Every plan includes onboarding support, and multi-branch groups get a plan tailored to them."
        crumbs={[{ label: "Pricing" }]}
      />

      <Band tone="surface" labelledBy="plans-title">
        <h2 id="plans-title" className="sr-only">Plans</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.name} className={cn("card flex flex-col p-6", plan.highlighted && "border-primary ring-1 ring-primary")}>
              <p className="eyebrow h-5">{plan.highlighted ? "Most chosen" : ""}</p>
              <h3 className="mt-2 text-xl font-bold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.students}</p>
              <p className="mt-5 text-2xl font-bold">{plan.price === null ? "Custom quote" : plan.price === "TODO" ? "Request a quote" : <>&#2547; {plan.price}</>}</p>
              <p className="text-sm text-muted-foreground">{plan.price === "TODO" ? "per month, shared in your demo" : plan.note}</p>
              <ul className="mb-8 mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5"><Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />{f}</li>
                ))}
              </ul>
              <Button asChild className="mt-auto" variant={plan.highlighted ? "default" : "outline"} size="lg">
                <Link href={plan.price === null ? "/contact" : "/demo"}>{plan.price === null ? "Contact us" : "Book a demo"}</Link>
              </Button>
            </article>
          ))}
        </div>
        {/* TODO: confirm currency, billing period and any one-time setup fee. */}
        <p className="mt-6 text-center text-sm text-muted-foreground">Prices in BDT. Setup and training details are shared in your demonstration. Prefer to try it first? <a href={`${site.appUrl}/signup`} className="font-semibold text-primary hover:underline">Start a free trial</a>.</p>
      </Band>

      <Block tone="paper" id="included" eyebrow="Every plan" title="Included in every plan">
        <CardGrid cols={4} items={included} />
      </Block>

      <Block tone="surface" id="compare" eyebrow="Compare plans" title="What each plan includes">
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left">
            <caption className="sr-only">Plan comparison</caption>
            <thead>
              <tr className="border-b bg-muted/50">
                <th scope="col" className="px-5 py-4 font-semibold">Feature</th>
                {plans.map((p) => <th key={p.name} scope="col" className="px-4 py-4 text-center font-semibold">{p.name}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="px-5 py-3.5 font-medium">{r.label}</th>
                  {r.values.map((v, i) => (
                    <td key={i} className="px-4 py-3.5 text-center">
                      {v ? <Check className="mx-auto size-5 text-success" aria-label="Included" /> : <Minus className="mx-auto size-5 text-muted-foreground/50" aria-label="Not included" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Band tone="paper" labelledBy="enterprise-title">
        <div className="card grid items-center gap-6 p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow">Multi-branch groups</p>
            <h2 id="enterprise-title" className="h-section mt-3">Running several campuses?</h2>
            <p className="mt-4 text-lg text-foreground/75">Compare every branch, share settings across campuses and get a plan and onboarding tailored to your group.</p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <Button asChild size="xl"><Link href="/contact">Talk to our team</Link></Button>
            <Button asChild size="xl" variant="outline"><Link href="/resources/enterprise">See enterprise features</Link></Button>
          </div>
        </div>
      </Band>

      <Block tone="surface" id="faq" eyebrow="Questions" title="Common questions" align="left">
        <div className="max-w-3xl"><FaqList /></div>
      </Block>
      <FinalCta />
    </>
  );
}
