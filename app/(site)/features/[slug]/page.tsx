import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/marketing/final-cta";
import { IndexGrid, Landing } from "@/components/marketing/landing";
import { PageHero } from "@/components/marketing/page-hero";
import { featureBySlug, featurePages, groupBySlug } from "@/content/features";
import { groupHref, moduleGroups, moduleHref, slug } from "@/content/modules";

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
    const siblings = moduleGroups.find((g) => g.title === f.group)!.modules.filter((m) => m.name !== f.name);
    return (
      <Landing
        label={`Product · ${f.group}`}
        title={f.headline}
        intro={f.intro}
        points={f.points}
        visual={f.visual}
        related={[{ label: `All ${f.group.toLowerCase()} features`, href: groupHref(f.group) }, ...siblings.map((m) => ({ label: m.name, href: moduleHref(m.name) })), { label: "All features", href: "/features" }]}
      />
    );
  }
  const g = groupBySlug(s);
  if (!g) notFound();
  return (
    <>
      <PageHero label="Product" title={g.title} intro={g.intro} />
      <IndexGrid items={g.modules.map((m) => ({ slug: slug(m.name), name: m.name, summary: m.summary }))} basePath="/features" />
      <p className="container-page pb-10 text-sm"><Link href="/features" className="font-semibold text-primary hover:underline">All features</Link></p>
      <FinalCta />
    </>
  );
}
