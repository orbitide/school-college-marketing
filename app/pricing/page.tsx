import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/shared/faq-list";
import { Section } from "@/components/shared/section";
import { FinalCta } from "@/components/home/final-cta";
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
      <section className="bg-gradient-to-b from-secondary/60 to-background pb-8 pt-12 sm:pt-16">
        <div className="container-page max-w-3xl text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">Pricing that fits your institution</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Pick the plan for your student count. Every plan includes onboarding support.
          </p>
        </div>
      </section>
      <section aria-label="Plans" className="py-12">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn("flex flex-col rounded-xl border bg-background p-6", plan.highlighted && "border-primary ring-2 ring-primary")}
            >
              {plan.highlighted && <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">Most popular</p>}
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{plan.students}</p>
              <p className="mt-4 font-display text-3xl font-bold">
                {plan.price === null ? "Contact us" : <>৳ {plan.price}</>}
              </p>
              <p className="text-sm text-muted-foreground">{plan.note}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-auto" variant={plan.highlighted ? "default" : "outline"}>
                <Link href={plan.price === null ? "/contact" : "/demo"} className="mt-6">
                  {plan.price === null ? "Contact us" : "Book a demo"}
                </Link>
              </Button>
            </article>
          ))}
        </div>
        <p className="container-page mt-6 text-center text-sm text-muted-foreground">
          {/* TODO: confirm currency, billing period and any one-time setup fee. */}
          Prices in BDT. Setup and training details are shared in your demo.
        </p>
      </section>
      <Section muted title="Pricing questions">
        <FaqList />
      </Section>
      <FinalCta />
    </>
  );
}
