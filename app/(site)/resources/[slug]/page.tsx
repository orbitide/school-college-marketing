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
  return (
    <Landing
      label={`Resources · ${r.name}`}
      title={r.headline}
      intro={r.intro}
      points={r.points}
      visual={r.visual}
      related={[...r.related, { label: "All resources", href: "/resources" }]}
    />
  );
}
