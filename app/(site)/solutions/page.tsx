import type { Metadata } from "next";
import { Building2, GraduationCap, ShieldCheck, Users, BookOpenCheck } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Block, CardGrid, HeroActions, Steps } from "@/components/marketing/page-kit";
import { LiveAttentionPreview } from "@/components/marketing/live-preview";
import { institutions } from "@/content/institutions";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description: "One platform with the right view for administrators, teachers, students and parents, and for every type of institution.",
  alternates: { canonical: "/solutions" },
};

const roleIcon = { administrators: ShieldCheck, teachers: BookOpenCheck, students: GraduationCap, parents: Users } as const;

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        label="Solutions"
        title="The right view for everyone at your institution"
        intro="Each person sees the information and actions that matter to them, and nothing else. Choose a role, or the type of institution you run."
        crumbs={[{ label: "Solutions" }]}
        actions={<HeroActions secondary="pricing" />}
        visual={<LiveAttentionPreview />}
      />
      <Block tone="surface" id="roles" eyebrow="By role" title="Built around who is using it">
        <CardGrid cols={2} items={solutions.map((s) => ({ icon: roleIcon[s.slug as keyof typeof roleIcon], title: s.name, text: `${s.summary} ${s.does[0]}.`, href: `/solutions/${s.slug}`, cta: `See the ${s.name.toLowerCase().replace(/s$/, "")} view` }))} />
      </Block>
      <Block tone="paper" id="institutions" eyebrow="By institution" title="For every kind of institution" intro="The same platform, with the features each type uses most.">
        <CardGrid items={institutions.map((i) => ({ icon: Building2, title: i.name, text: i.summary, href: `/institutions/${i.slug}`, cta: "See how it fits" }))} />
      </Block>
      <Block tone="surface" id="together" eyebrow="One platform" title="Everyone works from the same record">
        <Steps steps={[{ title: "Teachers record it", text: "Attendance and marks are entered from a phone." }, { title: "Administrators see it", text: "The Needs attention list shows what to act on." }, { title: "Families are told", text: "Parents and students see attendance, fees, results and notices." }]} />
      </Block>
      <FinalCta />
    </>
  );
}
