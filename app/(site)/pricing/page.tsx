import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/marketing/faq-list";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { FinalCta } from "@/components/marketing/final-cta";
import { plans } from "@/content/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing by student range for schools and colleges. Multi-branch institutions get a custom plan.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="Pricing"
        title="Pricing that fits your institution"
        intro="Choose the plan for your student count. Every plan includes onboarding support."
      />
      <section aria-label="Plans" className="py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={cn(
                  "panel flex flex-col p-6",
                  plan.highlighted && "border-primary ring-1 ring-primary",
                )}
              >
                <p className="label h-4">{plan.highlighted ? "Most chosen" : ""}</p>
                <h2 className="mt-2 text-xl">{plan.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{plan.students}</p>
                <p className="mt-5 text-3xl font-semibold">
                  {plan.price === null ? "Contact us" : <>&#2547; {plan.price}</>}
                </p>
                <p className="text-sm text-muted-foreground">{plan.note}</p>
                <ul className="mb-8 mt-6 space-y-2.5 text-[0.9375rem]">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-auto" variant={plan.highlighted ? "default" : "outline"}>
                  <Link href={plan.price === null ? "/contact" : "/demo"}>{plan.price === null ? "Contact us" : "Book a demo"}</Link>
                </Button>
              </article>
            ))}
          </div>
          {/* TODO: confirm currency, billing period and any one-time setup fee. */}
          <p className="mt-6 text-sm text-muted-foreground">Prices in BDT. Setup and training details are shared in your demonstration.</p>
        </div>
      </section>
      <Section tone="muted" label="Questions" title="Common questions">
        <div className="max-w-3xl"><FaqList /></div>
      </Section>
      <FinalCta />
    </>
  );
}
