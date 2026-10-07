import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a call",
  description: `Talk to the ${site.name} team about your school or college. No obligation.`,
  alternates: { canonical: "/contact" },
};

const points = ["A conversation about how your institution works today", "Honest answers on setup, data import and pricing", "No obligation, around 30 minutes"];

const items = [
  { label: "Telephone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Address", value: site.address },
] as const;

export default function ContactPage() {
  return (
    <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <p className="label">Contact</p>
        <h1 className="mt-3 text-4xl leading-[1.1] sm:text-5xl">Book a call</h1>
        <p className="mt-5 text-lg text-muted-foreground">Tell us a little about your institution and we will get back to you to arrange a time.</p>
        <ul className="mt-8 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />{p}</li>
          ))}
        </ul>
        <dl className="mt-10 divide-y border-y">
          {items.map((item) => (
            <div key={item.label} className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr]">
              <dt className="label self-center">{item.label}</dt>
              <dd className="font-medium">{"href" in item ? <a href={item.href} className="link-underline">{item.value}</a> : item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative lg:col-span-7"><ContactForm /></div>
    </div>
  );
}
