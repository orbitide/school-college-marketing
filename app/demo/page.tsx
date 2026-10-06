import type { Metadata } from "next";
import { Check } from "lucide-react";
import { DemoForm } from "@/components/demo/demo-form";

export const metadata: Metadata = {
  title: "Book a demo",
  description: "See the school management system in action. Book a free demonstration for your school or college.",
  alternates: { canonical: "/demo" },
};

const points = ["A walkthrough built around your institution", "Answers to your questions about setup and pricing", "No obligation, around 30 minutes"];

export default function DemoPage() {
  return (
    <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <p className="label">Demonstration</p>
        <h1 className="mt-3 text-4xl leading-[1.05] sm:text-6xl">Book a free demonstrationnstration</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Tell us a little about your institution and we will show you how the system fits.
        </p>
        <ul className="mt-8 space-y-3 border-t-2 border-foreground pt-6">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative lg:col-span-7">
        <DemoForm />
      </div>
    </div>
  );
}
