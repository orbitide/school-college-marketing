import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/marketing/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to the ${site.name} team by telephone, email or WhatsApp.`,
  alternates: { canonical: "/contact" },
};

const items = [
  { label: "Telephone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Address", value: site.address },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero label="Contact" title="Contact us" intro="Questions about the system, pricing or multi-branch plans? We are happy to help." />
      <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-12">
        <dl className="panel divide-y lg:col-span-7">
          {items.map((item) => (
            <div key={item.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[10rem_1fr]">
              <dt className="label self-center">{item.label}</dt>
              <dd className="text-lg font-medium">
                {"href" in item ? <a href={item.href} className="link-underline">{item.value}</a> : item.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-lg text-muted-foreground">The quickest way to see the system is a short demonstration with your own classes and fee structure.</p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/demo">Book a demo</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
