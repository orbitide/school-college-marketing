"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, Lightbulb, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "@/components/app/level-badge";
import { SaveButton } from "@/components/app/save-button";
import { SubjectMark } from "@/components/app/subject-mark";
import type { Solved } from "@/content/learn/questions";
import type { Subject } from "@/content/learn/subjects";
import { cn } from "@/lib/utils";

export function SolveView({ q, subject, practiceName }: { q: Solved; subject: Subject; practiceName: string }) {
  const [hints, setHints] = useState(0);
  const [shown, setShown] = useState(0);
  const total = q.steps.length;
  const done = shown >= total;

  return (
    <div className="container-page py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href="/subjects" className="hover:text-foreground hover:underline">Subjects</Link>
        <span aria-hidden> / </span>
        <span style={{ color: subject.color }} className="font-semibold">{subject.name}</span>
        <span aria-hidden> / </span>
        {q.topic}
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-12">
        <div className="min-w-0">
          {/* Problem */}
          <section aria-labelledby="problem-title" className="panel overflow-hidden">
            <div className="h-1.5" style={{ background: subject.color }} />
            <div className="p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <SubjectMark slug={subject.slug} className="size-9" />
                  <div>
                    <h1 id="problem-title" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Problem</h1>
                    <LevelBadge level={q.level} />
                  </div>
                </div>
                <SaveButton id={q.id} />
              </div>
              <p className="math mt-5 whitespace-normal text-2xl font-semibold leading-snug sm:text-3xl">{q.statement}</p>
              <p className="mt-4 text-muted-foreground">Have a go on paper first. Use a hint if you get stuck, then work through the steps at your own pace.</p>
            </div>
          </section>

          {/* Hints */}
          <section aria-labelledby="hints-title" className="mt-8">
            <h2 id="hints-title" className="flex items-center gap-2 text-xl">
              <Lightbulb className="size-5 text-accent-text" aria-hidden /> Stuck? Take a hint
            </h2>
            <ol className="mt-4 space-y-3">
              {q.hints.slice(0, hints).map((h, i) => (
                <li key={i} className="step-in rounded-xl bg-accent-soft p-4">
                  <p className="text-sm font-semibold text-accent-text">Hint {i + 1} of {q.hints.length}</p>
                  <p className="mt-1">{h}</p>
                </li>
              ))}
            </ol>
            {hints < q.hints.length ? (
              <Button variant="outline" className="mt-3" onClick={() => setHints((n) => n + 1)}>
                {hints === 0 ? "Show a hint" : "I need another hint"}
              </Button>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">That is every hint. Ready to see the steps?</p>
            )}
          </section>

          {/* Steps */}
          <section aria-labelledby="steps-title" className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="steps-title" className="text-xl">Step by step</h2>
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {shown === 0 ? `${total} steps` : `Step ${Math.min(shown, total)} of ${total}`}
              </p>
            </div>
            <ol className="mt-4 space-y-4">
              {q.steps.slice(0, shown).map((s, i) => (
                <li key={s.title} className="step-in flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                  <div className="min-w-0 flex-1 pb-1">
                    <h3 className="font-sans text-base font-semibold tracking-normal">{s.title}</h3>
                    <p className="mt-1 text-muted-foreground">{s.body}</p>
                    {s.math && <p className="math mt-2 whitespace-pre-line rounded-lg bg-muted px-4 py-3 text-lg">{s.math}</p>}
                  </div>
                </li>
              ))}
            </ol>
            {!done && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => setShown((n) => n + 1)}>
                  {shown === 0 ? "Show the first step" : "Show the next step"} <ArrowRight />
                </Button>
                <Button variant="ghost" onClick={() => setShown(total)}>Show all steps</Button>
              </div>
            )}
          </section>

          {done && (
            <div className="step-in">
              <section aria-labelledby="answer-title" className="mt-8 rounded-2xl bg-success-soft p-5 sm:p-6">
                <h2 id="answer-title" className="flex items-center gap-2 text-base font-bold text-success">
                  <Check className="size-5" aria-hidden /> Answer
                </h2>
                <p className="math mt-1 whitespace-normal text-2xl font-semibold">{q.answer}</p>
              </section>

              <section aria-labelledby="why-title" className="mt-10">
                <h2 id="why-title" className="text-xl">Why this works</h2>
                <p className="mt-3 max-w-prose">{q.explanation}</p>
              </section>

              <section aria-labelledby="mistakes-title" className="mt-10">
                <h2 id="mistakes-title" className="flex items-center gap-2 text-xl">
                  <TriangleAlert className="size-5 text-destructive" aria-hidden /> Common mistakes
                </h2>
                <ul className="mt-3 space-y-2">
                  {q.mistakes.map((m) => (
                    <li key={m} className="flex gap-3 rounded-xl bg-destructive-soft px-4 py-3 text-[0.9375rem]">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" />
                      {m}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="alt-title" className="mt-10">
                <details className="panel group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
                    <h2 id="alt-title" className="text-lg">Another way: {q.alternative.title}</h2>
                    <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <ol className="list-decimal space-y-2 px-4 pb-5 pl-10 text-[0.9375rem]">
                    {q.alternative.steps.map((s) => (
                      <li key={s} className="math pl-1 !font-sans !text-base !whitespace-normal">{s}</li>
                    ))}
                  </ol>
                </details>
              </section>

              <section aria-labelledby="similar-title" className="mt-10">
                <h2 id="similar-title" className="text-xl">Try these similar problems</h2>
                <ul className="mt-3 space-y-2">
                  {q.similar.map((s) => (
                    <li key={s.text}>
                      <details className="panel group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                          <span className="math !whitespace-normal !text-base">{s.text}</span>
                          <span className="shrink-0 text-sm font-semibold text-primary group-open:hidden">Check answer</span>
                        </summary>
                        <p className="border-t px-4 py-3 text-sm"><span className="font-semibold text-success">Answer: </span><span className="math">{s.answer}</span></p>
                      </details>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>

        {/* Side panel */}
        <aside aria-label="About this problem" className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <p className="label">Concept</p>
            <h2 className="mt-1 text-lg">{q.concept.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{q.concept.summary}</p>
          </div>
          <div className="panel p-5">
            <p className="label">Your progress</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li className={cn("flex items-center gap-2", hints > 0 && "text-foreground")}>
                <span className={cn("flex size-5 items-center justify-center rounded-full border", hints > 0 && "border-accent bg-accent-soft")}>{hints > 0 && <Check className="size-3" aria-hidden />}</span>
                Hints used: {hints} of {q.hints.length}
              </li>
              <li className="flex items-center gap-2">
                <span className={cn("flex size-5 items-center justify-center rounded-full border", done && "border-success bg-success-soft text-success")}>{done && <Check className="size-3" aria-hidden />}</span>
                Steps seen: {shown} of {total}
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
            <p className="font-display text-lg font-semibold">Make it stick</p>
            <p className="mt-1 text-sm text-primary-foreground/80">Practise {practiceName.toLowerCase()} with a few questions at your own pace.</p>
            <Button asChild variant="inverse" className="mt-4 w-full">
              <Link href={`/practice?set=${q.practiceSet}`}>Practise this concept <ArrowRight /></Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
