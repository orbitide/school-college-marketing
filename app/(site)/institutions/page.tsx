import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Block, CardGrid, HeroActions } from "@/components/marketing/page-kit";
import { LiveDashboardPreview } from "@/components/marketing/live-preview";
import { institutions } from "@/content/institutions";

export const metadata: Metadata = {
  title: "Institutions",
  description: "Kindergartens, schools, colleges, madrasas, coaching centres and multi-branch groups: the same platform, tuned to how each runs.",
  alternates: { canonical: "/institutions" },
};

export default function InstitutionsPage() {
  return (
    <>
      <PageHero
        label="Institutions"
        title="Built for institutions that value time and trust"
        intro="Kindergartens, schools, colleges, madrasas, coaching centres and multi-branch groups. The same platform, with the features each type uses most."
        crumbs={[{ label: "Institutions" }]}
        actions={<HeroActions secondary="pricing" />}
        visual={<LiveDashboardPreview />}
      />
      <Block tone="surface" id="types" eyebrow="Choose your institution" title="Find the fit for how you run">
        <CardGrid items={institutions.map((i) => ({ icon: Building2, title: i.name, text: i.summary, href: `/institutions/${i.slug}`, cta: "See how it fits" }))} />
      </Block>
      <FinalCta />
    </>
  );
}
