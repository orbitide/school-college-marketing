import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LevelBadge } from "@/components/app/level-badge";
import { SubjectMark } from "@/components/app/subject-mark";
import { subjects } from "@/content/learn/subjects";

export const metadata: Metadata = {
  title: "Subjects",
  description: "Browse every subject and topic: mathematics, physics, chemistry, biology, English, computer science, accounting and economics.",
  alternates: { canonical: "/subjects" },
};

export default function SubjectsPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-3xl sm:text-4xl">Subjects</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">Choose a subject to see its topics. Each topic has worked questions and a practice set.</p>

      <div className="mt-8 divide-y border-y">
        {subjects.map((s) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="grid gap-5 py-8 md:grid-cols-[18rem_1fr] md:gap-10">
            <div className="flex items-start gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: s.soft }}>
                <SubjectMark slug={s.slug} className="size-9" />
              </span>
              <div>
                <h2 id={`${s.slug}-title`} className="text-2xl" style={{ color: s.color }}>{s.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
              </div>
            </div>
            <ul className="divide-y rounded-xl border bg-surface">
              {s.topics.map((t) => (
                <li key={t.name}>
                  <Link href={`/questions?subject=${s.slug}&q=${encodeURIComponent(t.name)}`} className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-muted">
                    <span className="font-medium">{t.name}</span>
                    <span className="flex items-center gap-4">
                      <LevelBadge level={t.level} />
                      <ArrowRight className="size-4 text-primary" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
