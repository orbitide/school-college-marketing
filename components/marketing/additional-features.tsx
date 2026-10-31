"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, ClipboardCheck, Megaphone, UserCog, Users, BarChart3, type LucideIcon } from "lucide-react";
import { slug } from "@/content/modules";
import { cn } from "@/lib/utils";

type Card = { icon: LucideIcon; tile: string; title: string; text: string; link: string; module: string };

// TODO: review the copy with the product team.
const cards: Card[] = [
  { icon: CalendarDays, tile: "bg-[#ffc2d6] text-white", title: "Timetable", text: "Build the weekly timetable and catch room and teacher clashes before they reach a classroom.", link: "Check the timetable", module: "Timetable" },
  { icon: ClipboardCheck, tile: "bg-[#c9b6ff] text-white", title: "Exams and results", text: "Run exam routines, marks entry progress and published results without the paperwork.", link: "See exams and results", module: "Exams and results" },
  { icon: Megaphone, tile: "bg-[#b9defb] text-white", title: "Notices and messages", text: "Publish once to a class, a section or everyone, and see how many have read it.", link: "See notices", module: "Notices and announcements" },
  { icon: UserCog, tile: "bg-[#ffd9a0] text-white", title: "Leave and certificates", text: "Approve leave, collect documents and issue certificates with a clear trail.", link: "See leave and certificates", module: "Leave, documents and certificates" },
  { icon: Users, tile: "bg-[#a9e5d3] text-white", title: "Teachers and staff", text: "Staff records, daily presence and cover for absent teachers in one place.", link: "See staff tools", module: "Teachers and staff" },
  { icon: BarChart3, tile: "bg-[#bcc8f5] text-white", title: "Reports", text: "Standard and custom reports for leadership, ready to run or schedule.", link: "See reports", module: "Student, attendance, financial and academic reports" },
];

export function AdditionalFeatures() {
  const track = useRef<HTMLUListElement>(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const go = (p: number) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: Math.max(0, Math.min(p, pages - 1)) * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section aria-labelledby="more-title" className="relative overflow-hidden bg-[radial-gradient(60rem_28rem_at_50%_58%,#dde6fa,transparent_70%),radial-gradient(30rem_20rem_at_8%_30%,#e3f3ee,transparent),#fff] py-16 sm:py-24">
      <div className="container-page">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-base font-semibold text-primary sm:text-lg">Additional features</p>
          <h2 id="more-title" className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">The only system to power up your whole institution</h2>
          <p className="mt-4 text-lg text-muted-foreground">See what else covers your day-to-day operations.</p>
        </header>

        <div role="group" aria-roledescription="carousel" aria-label="Additional features" className="mt-12">
          <ul
            ref={track}
            onScroll={measure}
            className="scroll-none flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
            tabIndex={-1}
          >
            {cards.map((c) => (
              <li key={c.title} className="min-w-0 shrink-0 basis-full snap-start sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]">
                <article className="flex h-full min-h-[22rem] flex-col rounded-3xl bg-white/85 p-7 shadow-sm ring-1 ring-black/5">
                  <span aria-hidden className={cn("flex size-11 items-center justify-center rounded-xl", c.tile)}><c.icon className="size-5" /></span>
                  <h3 className="mt-10 text-2xl font-bold tracking-tight">{c.title}</h3>
                  <p className="mt-4 text-foreground/75">{c.text}</p>
                  <Link href={`/features#${slug(c.module)}`} className="mt-auto inline-flex items-center gap-1.5 pt-8 font-bold text-primary hover:underline">
                    {c.link} <ChevronRight className="size-4" aria-hidden />
                  </Link>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button type="button" aria-label="Previous features" onClick={() => go(page - 1)} disabled={page <= 0} className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40">
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <div className="flex items-center gap-1.5" role="group" aria-label="Choose a page">
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} type="button" aria-label={`Page ${i + 1} of ${pages}`} aria-current={i === page} onClick={() => go(i)} className={cn("h-2 rounded-full transition-all", i === page ? "w-6 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50")} />
              ))}
            </div>
            <button type="button" aria-label="Next features" onClick={() => go(page + 1)} disabled={page >= pages - 1} className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40">
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
