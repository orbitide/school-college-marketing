"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { LevelBadge } from "@/components/app/level-badge";
import { SaveButton } from "@/components/app/save-button";
import { SubjectMark } from "@/components/app/subject-mark";
import { questions } from "@/content/learn/questions";
import { subjectBySlug, subjects, type Level } from "@/content/learn/subjects";
import { useSaved } from "@/lib/saved";
import { searchQuestions } from "@/lib/search";
import { cn } from "@/lib/utils";

const levels: Level[] = ["Easy", "Medium", "Hard"];

export function QuestionsBrowser() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [subject, setSubject] = useState(params.get("subject") ?? "");
  const [level, setLevel] = useState<Level | "">("");
  const [onlySaved, setOnlySaved] = useState(false);
  const { ids } = useSaved();

  const results = useMemo(
    () => searchQuestions(q).filter((x) => (!subject || x.subject === subject) && (!level || x.level === level) && (!onlySaved || ids.includes(x.id))),
    [q, subject, level, onlySaved, ids],
  );

  const chip = (on: boolean) => cn("shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors", on ? "border-primary bg-primary text-primary-foreground" : "bg-surface hover:border-primary");

  return (
    <div>
      <div role="search" className="panel flex items-center gap-2 p-2 focus-within:border-primary">
        <Search className="ml-2 size-5 text-muted-foreground" aria-hidden />
        <label htmlFor="browse-q" className="sr-only">Search questions</label>
        <input id="browse-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by question, topic or concept" className="h-11 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground" />
        {q && (
          <button type="button" aria-label="Clear search" onClick={() => setQ("")} className="rounded-lg p-2 hover:bg-muted"><X className="size-4" aria-hidden /></button>
        )}
      </div>

      <div className="scroll-none -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by subject">
        <button type="button" className={chip(subject === "")} aria-pressed={subject === ""} onClick={() => setSubject("")}>All subjects</button>
        {subjects.map((s) => (
          <button key={s.slug} type="button" className={chip(subject === s.slug)} aria-pressed={subject === s.slug} onClick={() => setSubject(subject === s.slug ? "" : s.slug)}>
            {s.name}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by difficulty">
        <span className="text-sm text-muted-foreground">Difficulty</span>
        {levels.map((l) => (
          <button key={l} type="button" className={chip(level === l)} aria-pressed={level === l} onClick={() => setLevel(level === l ? "" : l)}>{l}</button>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-border sm:block" aria-hidden />
        <button type="button" className={chip(onlySaved)} aria-pressed={onlySaved} onClick={() => setOnlySaved((v) => !v)}>Saved only</button>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {results.length} of {questions.length} worked questions
      </p>

      {results.length > 0 ? (
        <ul className="mt-3 divide-y border-y">
          {results.map((x) => {
            const s = subjectBySlug(x.subject)!;
            return (
              <li key={x.id} className="flex items-center gap-4 py-4">
                <SubjectMark slug={x.subject} className="size-10 shrink-0" />
                <Link href={`/solve/${x.id}`} className="min-w-0 flex-1 group">
                  <span className="block font-semibold group-hover:text-primary">{x.title}</span>
                  <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-muted-foreground">
                    <span style={{ color: s.color }} className="font-semibold">{s.name}</span>
                    <span>{x.topic}</span>
                    <LevelBadge level={x.level} />
                  </span>
                </Link>
                <SaveButton id={x.id} compact />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="panel mt-4 p-6 text-center">
          <p className="font-display text-xl font-semibold">Nothing here yet</p>
          <p className="mt-1 text-muted-foreground">Try fewer filters, or ask it as a new question.</p>
          <Link href={`/ask${q ? `?q=${encodeURIComponent(q)}` : ""}`} className="link-underline mt-3 inline-block font-semibold text-primary">Ask your question</Link>
        </div>
      )}
    </div>
  );
}
