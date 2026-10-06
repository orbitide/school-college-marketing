import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Clock } from "lucide-react";
import { LevelBadge } from "@/components/app/level-badge";
import { MasteryBar } from "@/components/app/mastery-bar";
import { SavedList } from "@/components/app/saved-list";
import { Button } from "@/components/ui/button";
import { questionById } from "@/content/learn/questions";
import { subjectBySlug } from "@/content/learn/subjects";
import { askedQuestions, continueLearning, exams, mastery, recentPractice, recommended, student } from "@/content/learn/student";

export const metadata: Metadata = {
  title: "My learning",
  description: "Continue learning, see your progress by topic and plan what to practise next.",
  alternates: { canonical: "/dashboard" },
};

const h2 = "text-xl sm:text-2xl";

export default function DashboardPage() {
  const cont = questionById(continueLearning.questionId)!;
  const contSubject = subjectBySlug(cont.subject)!;

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-3xl sm:text-4xl">Hi {student.name}, ready to carry on?</h1>
        <p className="text-sm text-muted-foreground">Sample student data</p>
      </div>

      {/* Continue */}
      <section aria-labelledby="continue-title" className="on-dark mt-6 overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8">
        <p className="label">Continue learning</p>
        <h2 id="continue-title" className="mt-2 text-2xl sm:text-3xl">{continueLearning.topic}</h2>
        <p className="mt-1 text-primary-foreground/80">{cont.title}</p>
        <div className="mt-4 max-w-md">
          <div className="h-2 overflow-hidden rounded-full bg-primary-foreground/25" role="meter" aria-label="Progress through this solution" aria-valuenow={continueLearning.stepsDone} aria-valuemin={0} aria-valuemax={continueLearning.stepsTotal}>
            <div className="h-full rounded-full bg-accent" style={{ width: `${(continueLearning.stepsDone / continueLearning.stepsTotal) * 100}%` }} />
          </div>
          <p className="mt-1.5 text-sm text-primary-foreground/80">Step {continueLearning.stepsDone} of {continueLearning.stepsTotal} in {contSubject.name}</p>
        </div>
        <Button asChild variant="inverse" size="lg" className="mt-5"><Link href={`/solve/${cont.id}`}>Continue <ArrowRight /></Link></Button>
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div className="space-y-10">
          {/* Topics */}
          <section aria-labelledby="topics-title">
            <h2 id="topics-title" className={h2}>Topics you are practising</h2>
            <ul className="mt-4 divide-y border-y">
              {mastery.map((m) => {
                const s = subjectBySlug(m.subject)!;
                return (
                  <li key={m.topic} className="py-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <span><span className="font-semibold">{m.topic}</span> <span className="text-sm text-muted-foreground">· {s.name}</span></span>
                      <span className="tnum font-semibold" style={{ color: s.color }}>{m.percent}%</span>
                    </div>
                    <div className="mt-2"><MasteryBar percent={m.percent} color={s.color} label={m.topic} /></div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{m.note}</p>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Asked */}
          <section id="history" aria-labelledby="asked-title" className="scroll-mt-24">
            <h2 id="asked-title" className={h2}>Questions you have asked</h2>
            <ul className="mt-4 divide-y border-y">
              {askedQuestions.map((a) => (
                <li key={a.id}>
                  <Link href={`/solve/${a.id}`} className="flex items-center justify-between gap-4 py-3.5 hover:text-primary">
                    <span>
                      <span className="block font-medium">{a.title}</span>
                      <span className="text-sm text-muted-foreground">{a.when}</span>
                    </span>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${a.status === "Solved" ? "bg-success-soft text-success" : "bg-accent-soft text-accent-text"}`}>{a.status}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Recently solved */}
          <section aria-labelledby="solved-title">
            <h2 id="solved-title" className={h2}>Recently solved in practice</h2>
            <ul className="mt-4 divide-y border-y">
              {recentPractice.map((r) => (
                <li key={r.name} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="flex items-center gap-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-success-soft text-success"><Check className="size-3.5" aria-hidden /></span>
                    <span className="font-medium">{r.name}</span>
                  </span>
                  <span className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">{r.score}</span> correct · {r.when}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-10">
          {/* Recommended */}
          <section aria-labelledby="rec-title">
            <h2 id="rec-title" className={h2}>Recommended practice</h2>
            <ul className="mt-4 space-y-3">
              {recommended.map((r) => (
                <li key={r.title} className="panel p-4">
                  <p className="font-semibold">{r.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{r.reason}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <LevelBadge level={r.level} />
                    <Link href={`/practice?set=${r.setId}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Practise <ArrowRight className="size-4" aria-hidden /></Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Exams */}
          <section id="exams" aria-labelledby="exams-title" className="scroll-mt-24">
            <h2 id="exams-title" className={h2}>Upcoming exams</h2>
            <ul className="mt-4 divide-y border-y">
              {exams.map((e) => {
                const s = subjectBySlug(e.subject)!;
                return (
                  <li key={e.name} className="flex gap-3 py-3.5">
                    <Clock className="mt-1 size-4 shrink-0" style={{ color: s.color }} aria-hidden />
                    <div>
                      <p className="font-semibold">{e.name}</p>
                      <p className="text-sm text-muted-foreground">{e.date} · {e.topics}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">Shared by your school or college.</p>
          </section>

          {/* Saved */}
          <section id="saved" aria-labelledby="saved-title" className="scroll-mt-24">
            <h2 id="saved-title" className={h2}>Saved problems</h2>
            <div className="mt-4 border-y py-1"><SavedList /></div>
          </section>
        </div>
      </div>
    </div>
  );
}
