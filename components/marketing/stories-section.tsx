"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
    <section aria-labelledby="stories-title" className="bg-[linear-gradient(135deg,#ebe9fb_0%,#e6f0fb_50%,#dff7f0_100%)] py-16 sm:py-24">
      <div className="container-page">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-base font-semibold text-primary sm:text-lg">Customer stories</p>
          <h2 id="stories-title" className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">How institutions like yours are winning</h2>
        </header>

        <div role="group" aria-roledescription="carousel" aria-label="Customer stories" className="mt-12">
          <article className="grid overflow-hidden rounded-2xl border border-primary/25 bg-white md:grid-cols-[0.9fr_1.1fr]" aria-live="polite">
            <div aria-hidden className="relative min-h-56 bg-[linear-gradient(160deg,#dbe6f5,#e4efe9)] md:min-h-[26rem]">
              <div className="absolute inset-0">{scenes[i % scenes.length]}</div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="w-fit rounded-md bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary">{s.tag}</span>
              <blockquote className="mt-5 text-2xl font-bold leading-snug tracking-tight sm:text-3xl">&ldquo;{s.quote}&rdquo;</blockquote>
              {s.rating ? (
                <p className="mt-5 flex gap-1" aria-label={`${s.rating} out of 5 stars`}>{Array.from({ length: s.rating }).map((_, n) => <Star key={n} className="size-6 fill-[#fbbf24] text-[#fbbf24]" aria-hidden />)}</p>
              ) : null}
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                <p><span className="block text-lg font-bold">{s.name}</span><span className="text-muted-foreground">{s.role}</span></p>
                <span aria-hidden className="rounded-lg border border-dashed border-foreground/25 px-4 py-2 text-xs font-medium text-muted-foreground">Institution logo</span>
              </div>
              {s.href && <Link href={s.href} className="mt-6 inline-flex h-11 w-fit items-center rounded-lg border border-primary/60 px-6 text-sm font-bold text-primary hover:bg-primary-soft">Read more</Link>}
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
      </div>
    </section>
  );
}
