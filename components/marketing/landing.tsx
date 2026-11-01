import Link from "next/link";
import { BellRing, Clock, ShieldCheck, Sparkles, Zap, Users, ArrowRight, type LucideIcon } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { LiveActivityPreview, LiveDashboardPreview } from "@/components/marketing/live-preview";
import { PageHero, type Crumb } from "@/components/marketing/page-hero";
import { Block, CardGrid, CheckList, HeroActions, Steps, type Card } from "@/components/marketing/page-kit";
import { AdmissionsPreview, AnalyticsPreview, AttendancePreview, BranchesPreview, FeesPreview, NoticesPreview, ReportsPreview, StaffPreview } from "@/components/marketing/previews";

const visuals = {
  dashboard: <LiveDashboardPreview />,
  attendance: <AttendancePreview />,
  notices: <NoticesPreview />,
  fees: <FeesPreview />,
  branches: <BranchesPreview />,
  staff: <StaffPreview />,
  monitoring: <LiveActivityPreview />,
  analytics: <AnalyticsPreview />,
  reports: <ReportsPreview />,
  tracking: <AdmissionsPreview />,
} as const;

export type VisualKey = keyof typeof visuals;
const benefitIcons: LucideIcon[] = [Clock, Zap, ShieldCheck, Users, BellRing, Sparkles];

export type LandingProps = {
  label: string;
  title: string;
  intro: string;
  crumbs: Crumb[];
  points: string[];
  visual: VisualKey;
  benefits?: readonly { title: string; text: string }[];
  steps?: readonly { title: string; text: string }[];
  benefitsEyebrow?: string;
  benefitsTitle?: string;
  stepsEyebrow?: string;
  stepsTitle?: string;
  /** Extra band between "How it works" and the related links. */
  extra?: React.ReactNode;
  related?: Card[];
  relatedTitle?: string;
  secondary?: "trial" | "pricing" | "contact";
};

/** Template for every detail page: hero with product visual, what you get, benefits, how it works, related links. */
export function Landing({ label, title, intro, crumbs, points, visual, benefits, benefitsEyebrow = "Why it matters", benefitsTitle = "What changes for your team", steps, stepsEyebrow = "How it works", stepsTitle = "From setup to daily use", extra, related, relatedTitle = "Keep exploring", secondary }: LandingProps) {
  return (
    <>
      <PageHero label={label} title={title} intro={intro} crumbs={crumbs} actions={<HeroActions secondary={secondary} />} visual={visuals[visual]} />
      <Block tone="surface" id="what-you-get" eyebrow="What you get" title="Built to handle the real work">
        <CheckList items={points} />
      </Block>
      {benefits && (
        <Block tone="paper" id="benefits" eyebrow={benefitsEyebrow} title={benefitsTitle}>
          <CardGrid items={benefits.map((b, i) => ({ ...b, icon: benefitIcons[i % benefitIcons.length] }))} />
        </Block>
      )}
      {steps && (
        <Block tone={benefits ? "surface" : "paper"} id="how-it-works" eyebrow={stepsEyebrow} title={stepsTitle}>
          <Steps steps={steps} />
        </Block>
      )}
      {extra}
      {related && related.length > 0 && (
        <Block tone="paper" id="related" eyebrow="Related" title={relatedTitle}>
          <CardGrid items={related.map((r) => ({ ...r, cta: r.cta ?? "Learn more" }))} />
        </Block>
      )}
      <FinalCta />
    </>
  );
}

/** Simple list of links to child pages. */
export function IndexGrid({ items, basePath }: { items: { slug: string; name: string; summary: string }[]; basePath: string }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((i) => (
        <li key={i.slug}>
          <Link href={`${basePath}/${i.slug}`} className="card group flex h-full items-start justify-between gap-4 p-5 transition-colors hover:border-primary">
            <span><span className="block text-lg font-semibold">{i.name}</span><span className="mt-1 block text-muted-foreground">{i.summary}</span></span>
            <ArrowRight className="mt-1.5 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
