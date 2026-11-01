import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landing } from "@/components/marketing/landing";
import { resourceBySlug, resources } from "@/content/resources";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resourceBySlug((await params).slug);
  return r ? { title: r.name, description: r.summary, alternates: { canonical: `/resources/${r.slug}` } } : {};
}

export default async function ResourcePage({ params }: Props) {
  const r = resourceBySlug((await params).slug);
  if (!r) notFound();
  const others = resources.filter((x) => x.slug !== r.slug).slice(0, 3).map((x) => ({ title: x.name, text: x.summary, href: `/resources/${x.slug}`, cta: "Learn more" }));
  const linked = r.related.map((l) => ({ title: l.label, text: "Related in the product", href: l.href, cta: "Open" }));
  return (
    <Landing
      label={`Resources · ${r.name}`}
      title={r.headline}
      intro={r.intro}
      crumbs={[{ label: "Resources", href: "/resources" }, { label: r.name }]}
      points={r.points}
      visual={r.visual}
      benefits={r.benefits}
      steps={r.steps}
      related={[...linked, ...others].slice(0, 3)}
      secondary="pricing"
    />
  );
}
