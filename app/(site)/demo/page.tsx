import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Band } from "@/components/marketing/band";
import { DemoForm } from "@/components/demo/demo-form";
import { Crumbs } from "@/components/marketing/page-hero";
import { Block, Steps } from "@/components/marketing/page-kit";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Book a demo",
  description: "See the school management system in action. Book a free demo for your school or college.",
  alternates: { canonical: "/demo" },
};

const points = ["A walkthrough built around your institution", "Answers to your questions about setup and pricing", "No obligation, around 30 minutes"];

export default function DemoPage() {
  return (
    <>
      <Band tone="wash" className="pb-14 pt-10 sm:pt-14">
        <Crumbs items={[{ label: "Book a demo" }]} />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow">Demonstration</p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">Book a free demo</h1>
            <p className="mt-5 text-lg text-foreground/75">Tell us a little about your institution and we will show you how the system fits.</p>
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3 font-medium"><Check className="mt-1 size-4 shrink-0 text-primary" strokeWidth={3} aria-hidden />{p}</li>
              ))}
            </ul>
          </div>
          <div className="relative lg:col-span-7"><DemoForm /></div>
        </div>
      </Band>
      <Block tone="surface" id="next" eyebrow="What happens next" title="From request to walkthrough">
        <Steps steps={[{ title: "You send the form", text: "Tell us your institution type and roughly how many students you have." }, { title: "We get in touch", text: "Our team contacts you to agree a time." }, { title: "We walk you through it", text: "A short session set up with your classes and fee structure." }]} />
      </Block>
      <FinalCta />
    </>
  );
}
