import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/marketing/final-cta";
import { Landing } from "@/components/marketing/landing";
import { PageHero } from "@/components/marketing/page-hero";
import { Block, CardGrid, HeroActions } from "@/components/marketing/page-kit";
import { featureBySlug, featurePages, groupBySlug } from "@/content/features";
import { groupHref, moduleGroups, moduleHref, slug } from "@/content/modules";
import { solutionBySlug } from "@/content/solutions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...moduleGroups.map((g) => ({ slug: slug(g.title) })), ...featurePages.map((f) => ({ slug: f.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = (await params).slug;
  const f = featureBySlug(s);
  const g = groupBySlug(s);
  if (f) return { title: f.name, description: f.summary, alternates: { canonical: `/features/${s}` } };
  if (g) return { title: g.title, description: g.intro, alternates: { canonical: `/features/${s}` } };
  return {};
}

export default async function FeaturePage({ params }: Props) {
  const s = (await params).slug;
  const f = featureBySlug(s);
  if (f) {
    const group = moduleGroups.find((g) => g.title === f.group)!;
    const siblings = group.modules.filter((m) => m.name !== f.name).map((m) => ({ title: m.name, text: m.summary, href: moduleHref(m.name) }));
    const roles = f.roles.map((r) => solutionBySlug(r)).filter((x) => !!x).map((r) => ({ title: r.name, text: r.summary, href: `/solutions/${r.slug}`, cta: "See the role view" }));
    return (
      <Landing
        label={`Features · ${f.group}`}
        title={f.headline}
        intro={f.intro}
        crumbs={[{ label: "Features", href: "/features" }, { label: f.group, href: groupHref(f.group) }, { label: f.name }]}
        points={f.points}
        visual={f.visual}
        benefits={f.benefits}
        steps={f.steps}
        extra={roles.length > 0 ? <Block tone="surface" id="who-uses" eyebrow="Who uses it" title="Different people, the right view" intro="Each role sees the part of this feature that matters to them."><CardGrid items={roles} cols={roles.length === 2 ? 2 : 3} /></Block> : undefined}
        related={[...siblings.slice(0, 2), { title: `All ${f.group.toLowerCase()} features`, text: group.intro, href: groupHref(f.group), cta: "See the group" }]}
        relatedTitle={`More from ${f.group}`}
        secondary="pricing"
      />
    );
  }
  const g = groupBySlug(s);
  if (!g) notFound();
  return (
    <>
      <PageHero label="Features" title={g.title} intro={g.intro} crumbs={[{ label: "Features", href: "/features" }, { label: g.title }]} actions={<HeroActions secondary="pricing" />} />
      <Block tone="surface" id="modules" eyebrow={`${g.modules.length} ${g.modules.length === 1 ? "module" : "modules"}`} title={`What is in ${g.title}`}>
        <CardGrid items={g.modules.map((m) => ({ title: m.name, text: m.summary, href: moduleHref(m.name), cta: "See the feature" }))} cols={g.modules.length >= 3 ? 3 : 2} />
      </Block>
      <Block tone="paper" id="other-groups" eyebrow="Keep exploring" title="The rest of the product">
        <CardGrid items={moduleGroups.filter((x) => x.title !== g.title).map((x) => ({ title: x.title, text: x.intro, href: groupHref(x.title), cta: "Open" }))} />
      </Block>
      <FinalCta />
    </>
  );
}
