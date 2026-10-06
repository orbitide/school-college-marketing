"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Camera, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchQuestions } from "@/lib/search";

export function HomeSearch() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const query = value.trim();
  const suggestions = query.length > 1 ? searchQuestions(query).slice(0, 3) : [];

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/questions?q=${encodeURIComponent(query)}`);
        }}
        className="panel flex items-center gap-2 p-2 shadow-md focus-within:border-primary"
      >
        <Search className="ml-2 size-5 shrink-0 text-muted-foreground" aria-hidden />
        <label htmlFor="home-q" className="sr-only">Search a question, topic or subject</label>
        <input
          id="home-q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          placeholder="Search a question or topic"
          className="h-11 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
        />
        <Button type="submit" size="lg" className="shrink-0">Search</Button>
      </form>

      {suggestions.length > 0 && (
        <ul className="panel mt-2 divide-y overflow-hidden" aria-label="Matching questions">
          {suggestions.map((s) => (
            <li key={s.id}>
              <Link href={`/solve/${s.id}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-muted">
                <span className="font-medium">{s.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{s.topic}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link href={`/ask?q=${encodeURIComponent(query)}`} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-primary hover:bg-muted">
              <Sparkles className="size-4" aria-hidden /> Not what you meant? Ask this as a new question
            </Link>
          </li>
        </ul>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button asChild>
          <Link href="/ask">Ask a question</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/ask?mode=photo"><Camera /> Upload a problem</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/subjects">Browse subjects</Link>
        </Button>
      </div>
    </div>
  );
}
