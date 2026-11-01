import type { Metadata } from "next";
import { BarChart3, Briefcase, BookOpenCheck, ClipboardCheck, LineChart, Radio, Users } from "lucide-react";
import { FaqList } from "@/components/marketing/faq-list";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Block, CardGrid, HeroActions, Steps } from "@/components/marketing/page-kit";
import { LiveActivityPreview } from "@/components/marketing/live-preview";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Capabilities that run across modules, a getting-started guide and answers to common questions.",
  alternates: { canonical: "/resources" },
};

const icon = { enterprise: Briefcase, staff: Users, teachers: BookOpenCheck, monitoring: Radio, analytics: LineChart, reporting: BarChart3, "track-management": ClipboardCheck } as const;

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        label="Resources"
        title="What the platform does for your institution"
        intro="Capabilities that run across modules: from multi-branch groups to monitoring, analytics and reporting. Plus how getting started works and answers to common questions."
        crumbs={[{ label: "Resources" }]}
        actions={<HeroActions secondary="contact" />}
        visual={<LiveActivityPreview />}
      />
      <Block tone="surface" id="capabilities" eyebrow="Capabilities" title="Explore by capability">
        <CardGrid items={resources.map((r) => ({ icon: icon[r.slug as keyof typeof icon], title: r.name, text: r.summary, href: `/resources/${r.slug}`, cta: "Learn more" }))} />
      </Block>
      <Block tone="paper" id="getting-started" eyebrow="Getting started" title="From first call to first register" intro="A typical rollout. Timings depend on your institution and are confirmed in your demo.">
        {/* TODO: confirm the rollout steps with the product and support teams. */}
        <Steps steps={[{ title: "Book a demo", text: "We walk through the system with your own classes and fee structure." }, { title: "Bring in your data", text: "Import student and staff lists from Excel or CSV, with help from our team." }, { title: "Set up classes and fees", text: "Sections, teachers, timetable and fee structure." }, { title: "Train your staff and go live", text: "Teachers start marking attendance from their phones." }]} />
      </Block>
      <Block tone="surface" id="faq" eyebrow="Questions" title="Common questions" align="left">
        <div className="max-w-3xl"><FaqList /></div>
      </Block>
      <FinalCta />
    </>
  );
}
