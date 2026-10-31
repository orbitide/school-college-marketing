"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Scroll-snap carousel: 3 cards per view on desktop, 2 on tablets, 1 on phones, with arrows and page dots. */
export function CardCarousel({ items, label }: { items: React.ReactNode[]; label: string }) {
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

  const arrow = "flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary outline-none transition-colors hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40";

  return (
    <div role="group" aria-roledescription="carousel" aria-label={label}>
      <ul ref={track} onScroll={measure} className="scroll-none flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth" tabIndex={-1}>
        {items.map((item, i) => (
          <li key={i} className="min-w-0 shrink-0 basis-full snap-start sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-2.5rem)/3)]">{item}</li>
        ))}
      </ul>
      <div className="mt-8 flex items-center justify-center gap-6">
        <button type="button" aria-label={`Previous ${label.toLowerCase()}`} onClick={() => go(page - 1)} disabled={page <= 0} className={arrow}><ChevronLeft className="size-5" aria-hidden /></button>
        <div className="flex items-center" role="group" aria-label="Choose a page">
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} type="button" aria-label={`Page ${i + 1} of ${pages}`} aria-current={i === page} onClick={() => go(i)} className="group flex h-6 min-w-6 items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className={cn("block h-2 rounded-full transition-all", i === page ? "w-6 bg-primary" : "w-2 bg-primary/30 group-hover:bg-primary/50")} />
            </button>
          ))}
        </div>
        <button type="button" aria-label={`Next ${label.toLowerCase()}`} onClick={() => go(page + 1)} disabled={page >= pages - 1} className={arrow}><ChevronRight className="size-5" aria-hidden /></button>
      </div>
    </div>
  );
}
