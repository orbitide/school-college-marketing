import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolveView } from "@/components/app/solve-view";
import { practiceById } from "@/content/learn/practice";
import { questionById, questions } from "@/content/learn/questions";
import { subjectBySlug } from "@/content/learn/subjects";

export function generateStaticParams() {
  return questions.map((q) => ({ id: q.id }));
}

export async function generateMetadata({ params }: PageProps<"/solve/[id]">): Promise<Metadata> {
  const { id } = await params;
  const q = questionById(id);
  if (!q) return {};
  return { title: q.title, description: `Step-by-step solution, hints, common mistakes and practice for ${q.topic}.`, alternates: { canonical: `/solve/${id}` } };
}

export default async function SolvePage({ params }: PageProps<"/solve/[id]">) {
  const { id } = await params;
  const q = questionById(id);
  const subject = q && subjectBySlug(q.subject);
  if (!q || !subject) notFound();
  return <SolveView q={q} subject={subject} practiceName={practiceById(q.practiceSet)?.name ?? q.topic} />;
}
