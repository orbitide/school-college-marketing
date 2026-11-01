import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CampusGroupScene, CollegeScene, CoachingScene, KindergartenScene, MadrasaScene, SchoolScene } from "@/components/marketing/illustrations";
import { Landing } from "@/components/marketing/landing";
import { Block, CardGrid } from "@/components/marketing/page-kit";
import { featureBySlug } from "@/content/features";
import { institutionBySlug, institutions } from "@/content/institutions";
import { moduleHref } from "@/content/modules";

type Props = { params: Promise<{ slug: string }> };

const scenes = { kindergarten: <KindergartenScene />, school: <SchoolScene />, college: <CollegeScene />, madrasa: <MadrasaScene />, coaching: <CoachingScene />, group: <CampusGroupScene /> } as const;

export function generateStaticParams() {
  return institutions.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = institutionBySlug((await params).slug);
  return i ? { title: i.title, description: i.summary, alternates: { canonical: `/institutions/${i.slug}` } } : {};
}

export default async function InstitutionPage({ params }: Props) {
  const i = institutionBySlug((await params).slug);
  if (!i) notFound();
  const modules = i.modules.map((m) => featureBySlug(m)).filter((x) => !!x).map((m) => ({ title: m.name, text: m.summary, href: moduleHref(m.name), cta: "See the feature" }));
  const others = institutions.filter((x) => x.slug !== i.slug).slice(0, 3).map((x) => ({ title: x.name, text: x.summary, href: `/institutions/${x.slug}`, cta: "See how it fits" }));
  return (
    <Landing
      label={`Institutions · ${i.name}`}
      title={i.headline}
      intro={i.intro}
      crumbs={[{ label: "Institutions", href: "/institutions" }, { label: i.name }]}
      points={i.features}
      visual={i.visual}
      benefits={i.challenges}
      benefitsEyebrow="Common challenges"
      benefitsTitle="Problems we help you solve"
      extra={
        <>
          <Block tone="surface" id="scene" eyebrow={i.title} title="Made for the way you work">
            <div aria-hidden className="relative mx-auto aspect-[16/7] max-w-4xl overflow-hidden rounded-2xl border bg-primary-soft"><div className="absolute inset-0">{scenes[i.scene]}</div></div>
          </Block>
          <Block tone="paper" id="modules" eyebrow="Features used" title={`What ${i.name.toLowerCase()} use most`}><CardGrid items={modules} cols={4} /></Block>
        </>
      }
      related={others}
      relatedTitle="Other institution types"
      secondary="pricing"
    />
  );
}
