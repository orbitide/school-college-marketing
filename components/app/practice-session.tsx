"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Lightbulb, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "@/components/app/level-badge";
import { practiceSets, type PracticeSet } from "@/content/learn/practice";
import { subjectBySlug } from "@/content/learn/subjects";
import { cn } from "@/lib/utils";

function Session({ set, onExit }: { set: PracticeSet; onExit: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hint, setHint] = useState(false);
  const [score, setScore] = useState(0);
  const total = set.questions.length;
  const subject = subjectBySlug(set.subject);

  if (i >= total) {
    return (
      <div className="panel step-in p-6 text-center sm:p-10" role="status">
        <p className="label">Set complete</p>
        <p className="mt-2 font-display text-5xl font-bold text-primary">{score} / {total}</p>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          {score === total ? "Spot on. Try a harder set next." : "Good work. Review the explanations you missed, then try the set again."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button onClick={() => { setI(0); setPicked(null); setChecked(false); setScore(0); setHint(false); }}><RotateCcw /> Try again</Button>
          <Button variant="outline" onClick={onExit}>Choose another set</Button>
        </div>
      </div>
    );
  }

  const q = set.questions[i];
  const correct = picked === q.answer;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <button type="button" onClick={onExit} className="text-sm font-semibold text-primary hover:underline">&larr; All sets</button>
        <p className="text-sm text-muted-foreground" aria-live="polite">Question {i + 1} of {total}</p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={i} aria-valuemin={0} aria-valuemax={total} aria-label="Set progress">
        <div className="h-full rounded-full" style={{ width: `${(i / total) * 100}%`, background: subject?.color }} />
      </div>

      <section key={i} aria-labelledby="prompt" className="panel step-in mt-5 p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <p className="label" style={{ color: subject?.color }}>{set.name}</p>
          <LevelBadge level={q.level} />
        </div>
        <h2 id="prompt" className="math mt-3 whitespace-normal font-sans text-xl font-semibold leading-snug sm:text-2xl">{q.prompt}</h2>

        <ul className="mt-5 grid gap-2.5">
          {q.options.map((o, idx) => {
            const isPicked = picked === idx;
            const isAnswer = checked && idx === q.answer;
            return (
              <li key={o}>
                <button
                  type="button"
                  disabled={checked}
                  onClick={() => setPicked(idx)}
                  className={cn(
                    "pressable flex w-full items-center gap-3 rounded-xl border bg-surface px-4 py-3.5 text-left text-base outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isPicked && !checked && "border-primary bg-primary-soft",
                    checked && isAnswer && "border-success bg-success-soft",
                    checked && isPicked && !correct && "border-destructive bg-destructive-soft",
                  )}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold" aria-hidden>
                    {checked && isAnswer ? <Check className="size-4 text-success" /> : checked && isPicked ? <X className="size-4 text-destructive" /> : String.fromCharCode(65 + idx)}
                  </span>
                  <span className="math !whitespace-normal !text-base">{o}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {!checked && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button size="lg" disabled={picked === null} onClick={() => { if (picked === q.answer) setScore((n) => n + 1); setChecked(true); setHint(false); }}>
              Check answer
            </Button>
            <Button variant="ghost" onClick={() => setHint((h) => !h)}><Lightbulb /> {hint ? "Hide hint" : "Need a hint?"}</Button>
          </div>
        )}
        {hint && !checked && <p className="step-in mt-3 rounded-xl bg-accent-soft p-3 text-[0.9375rem]"><span className="font-semibold text-accent-text">Hint: </span>{q.hint}</p>}

        {checked && (
          <div className="step-in mt-5" role="status">
            <p className={cn("font-semibold", correct ? "text-success" : "text-destructive")}>{correct ? "That is right." : "Not quite. Here is why:"}</p>
            <p className="math mt-1 whitespace-normal !text-base">{q.explanation}</p>
            <Button className="mt-4" size="lg" onClick={() => { setI((n) => n + 1); setPicked(null); setChecked(false); }}>
              {i + 1 === total ? "See my result" : "Next question"} <ArrowRight />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

export function PracticeSessions() {
  const initialSet = useSearchParams().get("set");
  const [active, setActive] = useState<string | null>(practiceSets.some((p) => p.id === initialSet) ? initialSet : null);
  const set = practiceSets.find((p) => p.id === active);

  if (set) return <Session key={set.id} set={set} onExit={() => setActive(null)} />;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {practiceSets.map((p) => {
        const s = subjectBySlug(p.subject)!;
        return (
          <li key={p.id}>
            <button type="button" onClick={() => setActive(p.id)} className="panel pressable flex w-full items-center gap-4 p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="w-1.5 self-stretch rounded-full" style={{ background: s.color }} aria-hidden />
              <span className="flex-1">
                <span className="block text-sm font-semibold" style={{ color: s.color }}>{s.name}</span>
                <span className="block font-display text-lg font-semibold">{p.name}</span>
                <span className="text-sm text-muted-foreground">{p.questions.length} questions</span>
              </span>
              <ArrowRight className="size-5 text-primary" aria-hidden />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
