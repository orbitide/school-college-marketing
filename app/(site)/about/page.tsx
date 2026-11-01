import type { Metadata } from "next";
import { Compass, Handshake, MessageSquareHeart, Smartphone } from "lucide-react";
import { Band } from "@/components/marketing/band";
import { FinalCta } from "@/components/marketing/final-cta";
import { CampusGroupScene } from "@/components/marketing/illustrations";
import { PageHero } from "@/components/marketing/page-hero";
import { Block, CardGrid, HeroActions, Steps } from "@/components/marketing/page-kit";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} builds simple, reliable management software for schools and colleges in Bangladesh.`,
  alternates: { canonical: "/about" },
};

// TODO: replace with the real company story, team and founding year once available. Nothing here claims customers, awards or numbers.
const values = [
  { icon: Compass, title: "Built for Bangladesh", text: "Designed around how local schools and colleges actually work, from fee collection to result publishing." },
  { icon: Smartphone, title: "Simple by default", text: "If a teacher cannot learn it in an afternoon, we keep working on it." },
  { icon: MessageSquareHeart, title: "Support you can reach", text: "Real people on the telephone and WhatsApp, in your language." },
  { icon: Handshake, title: "Honest about what we do", text: "We show the product with your own data and tell you plainly what fits." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="Software that gives educators their time back"
        intro={`${site.name} helps school and college leaders spend less time on administration and more on students.`}
        crumbs={[{ label: "About" }]}
        actions={<HeroActions secondary="contact" />}
        visual={<div aria-hidden className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-primary-soft"><div className="absolute inset-0"><CampusGroupScene /></div></div>}
      />

      <Band tone="surface" labelledBy="mission-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Our mission</p>
            <h2 id="mission-title" className="h-section mt-3">Make running an institution calmer</h2>
          </div>
          <div className="space-y-5 text-lg text-foreground/80">
            <p>Most institutions run on a patchwork of registers, spreadsheets and phone calls. Problems surface late, usually when someone complains.</p>
            <p>We build one system that holds the records, shows what needs attention and helps you resolve it, so leaders can act early and teachers can get on with teaching.</p>
          </div>
        </div>
      </Band>

      <Block tone="paper" id="values" eyebrow="What we believe" title="Principles behind the product">
        <CardGrid cols={4} items={values} />
      </Block>

      <Block tone="surface" id="approach" eyebrow="How we work with you" title="From first conversation to first register">
        <Steps steps={[{ title: "Listen", text: "We start with how your institution runs today." }, { title: "Show", text: "A demo set up with your own classes and fee structure." }, { title: "Set up", text: "We help import your data and configure the system." }, { title: "Support", text: "Training for staff and a team you can reach afterwards." }]} />
      </Block>
      <FinalCta />
    </>
  );
}
