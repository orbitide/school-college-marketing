import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { plans } from "@/content/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple pricing based on the number of students. Get a clear quote for your school or college.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero label="Pricing" title="Priced by the size of your institution" intro="Plans are based on student numbers. Tell us yours and we will send a clear quote with no hidden charges." />
      <Section title="Plans">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <article key={p.name} className={cn("panel flex flex-col p-6", p.highlighted && "border-primary ring-1 ring-primary")}>
              <h2 className="text-xl">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.students}</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => <li key={f} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />{f}</li>)}
              </ul>
              <Button asChild variant={p.highlighted ? "default" : "outline"} className="mt-6"><Link href="/contact">Get a quote</Link></Button>
            </article>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
