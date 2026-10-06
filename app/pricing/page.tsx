import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/shared/faq-list";
import { PageHero } from "@/components/shared/page-hero";
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
      <PageHero
        eyebrow="Pricing"
        title="Pricing that fits your institution"
        intro="Pick the plan for your student count. Every plan includes onboarding support."
      />
      <section aria-label="Plans" className="py-16 sm:py-24">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn("card flex flex-col p-7", plan.highlighted && "border-accent bg-gradient-to-b from-white to-[#fbf3e0] shadow-lift lg:-translate-y-2")}
            >
              {plan.highlighted && <p className="eyebrow mb-2">Most popular</p>}
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{plan.students}</p>
              <p className="mt-4 font-display text-3xl font-semibold">
                {plan.price === null ? "Contact us" : <>৳ {plan.price}</>}
              </p>
              <p className="text-sm text-muted-foreground">{plan.note}</p>
              <ul className="mb-7 mt-5 space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold-text" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-auto" variant={plan.highlighted ? "accent" : "outline"}>
                <Link href={plan.price === null ? "/contact" : "/demo"}>
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
      <Section tone="muted" eyebrow="FAQ" title="Pricing questions">
        <FaqList />
      </Section>
      <FinalCta />
    </>
  );
}
