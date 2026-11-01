import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landing } from "@/components/marketing/landing";
import { Block, CardGrid } from "@/components/marketing/page-kit";
import { featureBySlug } from "@/content/features";
import { moduleHref } from "@/content/modules";
import { solutionBySlug, solutions } from "@/content/solutions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = solutionBySlug((await params).slug);
  return s ? { title: `Solutions for ${s.name.toLowerCase()}`, description: s.summary, alternates: { canonical: `/solutions/${s.slug}` } } : {};
}

export default async function SolutionPage({ params }: Props) {
  const s = solutionBySlug((await params).slug);
  if (!s) notFound();
  const modules = s.modules.map((m) => featureBySlug(m)).filter((x) => !!x).map((m) => ({ title: m.name, text: m.summary, href: moduleHref(m.name), cta: "See the feature" }));
  const others = solutions.filter((x) => x.slug !== s.slug).map((x) => ({ title: x.name, text: x.summary, href: `/solutions/${x.slug}`, cta: "See the role view" }));
  return (
    <Landing
      label={`Solutions · ${s.name}`}
      title={s.headline}
      intro={s.intro}
      crumbs={[{ label: "Solutions", href: "/solutions" }, { label: s.name }]}
      points={s.does}
      visual={s.visual}
      stepsEyebrow="A typical day"
      stepsTitle={`A typical day for ${s.name.toLowerCase()}`}
      steps={s.day.map((d) => ({ title: d.title, text: `${d.time}: ${d.text}` }))}
      extra={<Block tone="paper" id="modules" eyebrow="Features used" title={`What ${s.name.toLowerCase()} use most`}><CardGrid items={modules} cols={4} /></Block>}
      related={others}
      relatedTitle="See the view for other roles"
      secondary="pricing"
    />
  );
}
