import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { securityPractices } from "@/content/marketing";

export const metadata: Metadata = {
  title: "Security and privacy",
  description: "How we protect student and staff data: role-based access, audit trail, encryption, backups, and data ownership.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      <PageHero label="Security and privacy" title="Your students' data, handled with care" intro="Schools hold sensitive information about children and families. This is how we protect it, and what we will tell you plainly." />
      <Section title="How we protect your data">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {securityPractices.map(({ icon: Icon, title, text }) => (
            <li key={title} className="panel p-5">
              <Icon className="size-5 text-primary" aria-hidden />
              <h3 className="mt-3 text-lg">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="muted" label="Our commitments" title="What we promise">
        <ul className="max-w-3xl list-disc space-y-2 pl-5 text-muted-foreground marker:text-primary">
          <li>We do not sell student or staff data, or use it for advertising.</li>
          <li>Your institution can export its data at any time.</li>
          <li>We tell you promptly if we learn that your data has been affected by a security incident.</li>
          <li>We will answer security questions in writing before you sign.</li>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">See our <Link href="/privacy" className="link-underline">Privacy Policy</Link> for how we handle information collected through this website.</p>
      </Section>
      <FinalCta title="Questions about security? Let's talk." />
    </>
  );
}
