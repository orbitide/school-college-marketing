import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FaqList } from "@/components/marketing/faq-list";
import { FinalCta } from "@/components/marketing/final-cta";
import { Band } from "@/components/marketing/band";
import { PageHero } from "@/components/marketing/page-hero";
import { Block } from "@/components/marketing/page-kit";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to the ${site.name} team by telephone, email or WhatsApp.`,
  alternates: { canonical: "/contact" },
};

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

export default function ContactPage() {
  const channels = [
    { icon: Phone, title: "Telephone", text: site.phone, href: `tel:${site.phone.replace(/[^+\d]/g, "")}`, cta: "Call us" },
    ...(whatsapp ? [{ icon: MessageCircle, title: "WhatsApp", text: "Message us any time and we will reply during working hours.", href: `https://wa.me/${whatsapp}`, cta: "Open WhatsApp" }] : []),
    { icon: Mail, title: "Email", text: site.email, href: `mailto:${site.email}`, cta: "Send an email" },
  ];
  return (
    <>
      <PageHero
        label="Contact"
        title="Talk to our team"
        intro="Questions about the system, pricing or multi-branch plans? We are happy to help."
        crumbs={[{ label: "Contact" }]}
        actions={<Button asChild size="xl"><Link href="/demo">Book a demo</Link></Button>}
      />

      <Block tone="surface" id="channels" eyebrow="Get in touch" title="Choose how you would like to reach us">
        <ExternalCards items={channels} />
      </Block>

      <Band tone="paper" labelledBy="visit-title">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card flex gap-4 p-6">
            <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><MapPin className="size-5" /></span>
            <div><h2 id="visit-title" className="text-lg font-bold">Where we are</h2><p className="mt-2 text-foreground/75">{site.address}</p></div>
          </div>
          {/* TODO: confirm working hours. */}
          <div className="card flex gap-4 p-6">
            <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><Clock className="size-5" /></span>
            <div><h2 className="text-lg font-bold">Working hours</h2><p className="mt-2 text-foreground/75">Hours to be confirmed. Leave a message and we will get back to you.</p></div>
          </div>
        </div>
      </Band>

      <Block tone="surface" id="demo" eyebrow="The quickest way" title="See the system with your own classes">
        <div className="card mx-auto flex max-w-3xl flex-col items-center gap-5 p-8 text-center sm:p-10">
          <p className="text-lg text-foreground/75">A short demonstration set up with your classes and fee structure is the fastest way to see whether it fits.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl"><Link href="/demo">Book a demo</Link></Button>
            <Button asChild size="xl" variant="outline"><Link href="/pricing">See pricing</Link></Button>
          </div>
        </div>
      </Block>

      <Block tone="paper" id="faq" eyebrow="Questions" title="Before you get in touch" align="left">
        <div className="max-w-3xl"><FaqList /></div>
      </Block>
      <FinalCta />
    </>
  );
}

/** Channel cards: tel, mailto and external links need plain anchors. */
function ExternalCards({ items }: { items: { icon: React.ComponentType<{ className?: string }>; title: string; text: string; href: string; cta: string }[] }) {
  return (
    <ul className={`mx-auto grid gap-5 ${items.length === 2 ? "max-w-3xl md:grid-cols-2" : "md:grid-cols-3"}`}>
      {items.map((c) => (
        <li key={c.title}>
          <a href={c.href} className="card group flex h-full flex-col p-6 transition-colors hover:border-primary">
            <span aria-hidden className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><c.icon className="size-5" /></span>
            <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
            <p className="mt-2 break-words text-foreground/75">{c.text}</p>
            <span className="mt-auto pt-5 font-semibold text-primary group-hover:underline">{c.cta}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
