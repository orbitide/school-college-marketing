import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to the ${site.name} team by phone, email or WhatsApp.`,
  alternates: { canonical: "/contact" },
};

const items = [
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Address", value: site.address },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Contact us" intro="Questions about the system, pricing or multi-branch plans? We are happy to help." />
      <div className="container-page max-w-2xl py-16 sm:py-24">
        <ul className="space-y-4">
          {items.map(({ icon: Icon, label, value, ...rest }) => (
            <li key={label} className="card card-hover flex items-center gap-4 p-5">
              <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary"><Icon className="size-5" aria-hidden /></span>
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                {"href" in rest ? (
                  <a href={rest.href} className="font-semibold hover:underline">{value}</a>
                ) : (
                  <p className="font-semibold">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Button asChild size="lg" variant="accent">
            <Link href="/demo">Book a demo</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
