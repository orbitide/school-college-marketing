import type { Metadata } from "next";
import { Fingerprint, FileSpreadsheet, Mail, MessageCircle, MessageSquareText, Wallet } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { IntegrationsSection } from "@/components/marketing/integrations-section";
import { PageHero } from "@/components/marketing/page-hero";
import { Block, CardGrid, HeroActions, Steps } from "@/components/marketing/page-kit";
import { FaqList } from "@/components/marketing/faq-list";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect messaging, spreadsheets, payments and attendance devices to your institution's records.",
  alternates: { canonical: "/integrations" },
};

// TODO: confirm each channel and how it works with the product team before launch.
const channels = [
  { icon: MessageSquareText, title: "SMS", text: "Send absence alerts, fee reminders and notices to guardians by SMS.", href: "/features/messages-and-parent-communication", cta: "See messaging" },
  { icon: MessageCircle, title: "WhatsApp", text: "Reach parents on the app they already use, with templates for common messages.", href: "/features/messages-and-parent-communication", cta: "See messaging" },
  { icon: Mail, title: "Email", text: "Send notices and receipts to guardians and staff by email.", href: "/features/notices-and-announcements", cta: "See notices" },
  { icon: FileSpreadsheet, title: "Excel and CSV", text: "Import student lists and export fee and attendance data for your accountant.", href: "/features/students", cta: "See student records" },
  { icon: Wallet, title: "Payments", text: "Record fee payments against the right student, with a receipt.", href: "/features/fees-and-payments", cta: "See fees" },
  { icon: Fingerprint, title: "Biometric devices", text: "Bring attendance from biometric devices into the same registers.", href: "/features/attendance", cta: "See attendance" },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        label="Integrations"
        title="Connect the channels you already use"
        intro="Messages, spreadsheets, payments and attendance devices connect to the same student and fee records, so nothing is typed twice."
        crumbs={[{ label: "Integrations" }]}
        actions={<HeroActions secondary="contact" />}
      />
      <Block tone="surface" id="channels" eyebrow="Channels" title="What connects, and where it is used">
        <CardGrid items={channels} />
      </Block>
      <IntegrationsSection />
      <Block tone="paper" id="setup" eyebrow="Getting connected" title="How integrations are set up">
        <Steps steps={[{ title: "Tell us what you use", text: "In your demo we note the channels and devices your institution relies on." }, { title: "We help you connect them", text: "Our team helps configure each channel with your data." }, { title: "Use them from the same screens", text: "Messages, payments and attendance flow into the records you already use." }]} />
      </Block>
      <Block tone="surface" id="faq" eyebrow="Questions" title="Common questions" align="left">
        <div className="max-w-3xl"><FaqList /></div>
      </Block>
      <FinalCta />
    </>
  );
}
