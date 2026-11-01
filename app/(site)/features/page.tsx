import type { Metadata } from "next";
import { CalendarClock, Megaphone, Network, Wallet, UserPlus, BarChart3, GraduationCap, ClipboardList } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { LiveDashboardPreview } from "@/components/marketing/live-preview";
import { PageHero } from "@/components/marketing/page-hero";
import { Block, CardGrid, HeroActions, Steps } from "@/components/marketing/page-kit";
import { groupHref, moduleGroups, moduleHref } from "@/content/modules";
import { Band, SectionHeader } from "@/components/marketing/band";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Features",
  description: "People, academics, administration, finance, communication and reports: everything an institution runs on, in one connected system.",
  alternates: { canonical: "/features" },
};

const groupIcon = { People: GraduationCap, Academics: CalendarClock, Administration: ClipboardList, Finance: Wallet, Communication: Megaphone, Reports: BarChart3 } as const;

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        label="Features"
        title="Everything your institution runs on, connected"
        intro="Every module reads from the same student, class and fee records, so your team enters data once and the system surfaces what needs attention."
        crumbs={[{ label: "Features" }]}
        actions={<HeroActions secondary="pricing" />}
        visual={<LiveDashboardPreview />}
      />

      <Block tone="surface" id="areas" eyebrow="Six product areas" title="Find the feature you need">
        <CardGrid items={moduleGroups.map((g) => ({ icon: groupIcon[g.title as keyof typeof groupIcon] ?? Network, title: g.title, text: g.intro, href: groupHref(g.title), cta: `Explore ${g.title.toLowerCase()}` }))} />
      </Block>

      {moduleGroups.map((g, i) => (
        <Band key={g.title} tone={i % 2 === 0 ? "paper" : "surface"} labelledBy={`g-${g.title}`}>
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-14">
            <div>
              <SectionHeader id={`g-${g.title}`} eyebrow="Product area" title={g.title} intro={g.intro} align="left" />
              <Link href={groupHref(g.title)} className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">All {g.title.toLowerCase()} features <ArrowRight className="size-4" aria-hidden /></Link>
            </div>
            <CardGrid cols={2} items={g.modules.map((m) => ({ title: m.name, text: m.summary, href: moduleHref(m.name), cta: "See the feature" }))} />
          </div>
        </Band>
      ))}

      <Block tone={moduleGroups.length % 2 === 0 ? "paper" : "surface"} id="connected" eyebrow="How it fits together" title="Enter data once, use it everywhere">
        <Steps steps={[{ title: "One record per student", text: "Profiles, guardians and documents live on a single record." }, { title: "Every module reads from it", text: "Attendance, fees, exams and notices use the same classes and students." }, { title: "See what needs attention", text: "Overdue fees, missing registers and stalled applications are surfaced with the next action beside them." }]} />
      </Block>

      <Block tone="surface" id="next" eyebrow="Next steps" title="Where to go from here">
        <CardGrid items={[{ icon: UserPlus, title: "Solutions by role", text: "See the view for administrators, teachers, students and parents.", href: "/solutions" }, { icon: Network, title: "Integrations", text: "SMS, WhatsApp, email, spreadsheets, payments and devices.", href: "/integrations" }, { icon: Wallet, title: "Pricing", text: "Plans by student count, with a custom plan for groups.", href: "/pricing" }]} />
      </Block>
      <FinalCta />
    </>
  );
}
