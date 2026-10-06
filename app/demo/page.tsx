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
    <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold sm:text-5xl">Book a free demo</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Tell us a little about your institution and we will show you how the system fits.
        </p>
        <ul className="mt-6 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
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
