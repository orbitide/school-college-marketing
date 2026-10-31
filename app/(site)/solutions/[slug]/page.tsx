import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Landing } from "@/components/marketing/landing";
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
  return (
    <Landing
      label={`Solutions · ${s.name}`}
      title={s.headline}
      intro={s.intro}
      points={s.does}
      related={[{ label: "All solutions", href: "/solutions" }]}
    />
  );
}
