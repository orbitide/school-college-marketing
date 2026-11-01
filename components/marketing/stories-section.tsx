"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Band, SectionHeader } from "@/components/marketing/band";
import { CampusGroupScene, CollegeScene, SchoolScene } from "@/components/marketing/illustrations";
import { stories } from "@/content/proof";
import { cn } from "@/lib/utils";

const scenes = [<SchoolScene key="s" />, <CollegeScene key="c" />, <CampusGroupScene key="g" />];

/** Customer stories carousel. The stories are placeholders until real ones are added to content/proof.ts. */
export function StoriesSection() {
  const [i, setI] = useState(0);
  const s = stories[i];
  const go = (n: number) => setI((n + stories.length) % stories.length);

  return (
    <Band tone="paper" labelledBy="stories-title">
      <SectionHeader id="stories-title" eyebrow="Customer stories" title="How institutions like yours are winning" />

        <div role="group" aria-roledescription="carousel" aria-label="Customer stories" className="mt-12">
          <article className="grid overflow-hidden card md:grid-cols-[0.9fr_1.1fr]" aria-live="polite">
            <div aria-hidden className="relative min-h-56 bg-primary-soft md:min-h-[26rem]">
              <div className="absolute inset-0">{scenes[i % scenes.length]}</div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="w-fit rounded-md bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary">{s.tag}</span>
              <blockquote className="mt-5 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">&ldquo;{s.quote}&rdquo;</blockquote>
              {s.rating ? (
                <p className="mt-5 flex gap-1" aria-label={`${s.rating} out of 5 stars`}>{Array.from({ length: s.rating }).map((_, n) => <Star key={n} className="size-6 fill-accent text-accent" aria-hidden />)}</p>
              ) : null}
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                <p><span className="block text-lg font-bold">{s.name}</span><span className="text-muted-foreground">{s.role}</span></p>
                <span aria-hidden className="rounded-lg border border-dashed border-foreground/25 px-4 py-2 text-xs font-medium text-muted-foreground">Institution logo</span>
              </div>
              {s.href && <Link href={s.href} className="mt-6 inline-flex h-11 w-fit items-center rounded-md border border-border-strong bg-surface px-5 text-sm font-semibold hover:bg-muted">Read more</Link>}
            </div>
          </article>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button type="button" aria-label="Previous story" onClick={() => go(i - 1)} className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-ring"><ChevronLeft className="size-5" aria-hidden /></button>
            <div className="flex items-center" role="group" aria-label="Choose a story">
              {stories.map((_, n) => <button key={n} type="button" aria-label={`Story ${n + 1} of ${stories.length}`} aria-current={n === i} onClick={() => setI(n)} className="group flex h-6 min-w-6 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className={cn("block h-2 rounded-full transition-all", n === i ? "w-6 bg-primary" : "w-2 bg-primary/30 group-hover:bg-primary/50")} /></button>)}
            </div>
            <button type="button" aria-label="Next story" onClick={() => go(i + 1)} className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-ring"><ChevronRight className="size-5" aria-hidden /></button>
          </div>
        </div>
    </Band>
  );
}
