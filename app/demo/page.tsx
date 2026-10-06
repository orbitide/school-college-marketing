import type { Metadata } from "next";
import { Check } from "lucide-react";
import { DemoForm } from "@/components/demo/demo-form";

export const metadata: Metadata = {
  title: "Book a demo",
  description: "See the school management system in action. Book a free demo for your school or college.",
  alternates: { canonical: "/demo" },
};

const points = ["A walkthrough built around your institution", "Answers to your questions about setup and pricing", "No obligation, around 30 minutes"];

export default function DemoPage() {
  return (
    <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
      <div>
        <p className="eyebrow">Demo</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Book a free demo</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Tell us a little about your institution and we will show you how the system fits.
        </p>
        <ul className="mt-6 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/25 text-gold-text"><Check className="size-3.5" aria-hidden /></span>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <DemoForm />
      </div>
    </div>
  );
}
