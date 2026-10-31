"use client";

import { Avatar } from "@/components/product/ui";
import { sectionsLive, useLive } from "@/lib/live";

/** Two register cards drawn over the photo, on the simulated live data. */
export function PlatformCards() {
  const live = useLive();
  const secs = sectionsLive(live);
  const rows = ["9A", "6B"].map((k) => secs.find((s) => s.section === k)!);
  return (
    <div className="absolute inset-x-3 bottom-3 space-y-2 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[min(100%-2.5rem,24rem)]">
      {rows.map((s) => {
        const pct = Math.round((s.present / s.total) * 100);
        return (
          <div key={s.section} className="rounded-xl border bg-surface/95 p-3 text-[0.6875rem] shadow-md">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] items-start gap-2">
              <span className="flex items-center gap-2"><Avatar name={s.teacher} className="size-8" /><span className="min-w-0"><span className="block truncate text-xs font-bold">{s.teacher.replace(/^(Mr|Ms)\.\s/, "")}</span><span className="text-muted-foreground">Class teacher</span></span></span>
              <span><span className="block font-bold">11 Oct 2026</span><span className="text-muted-foreground">Sunday</span></span>
              <span><span className="block font-bold">{s.section}</span><span className="text-muted-foreground">Section</span></span>
            </div>
            <div className="mt-2 grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2">
              <span className="flex items-center gap-2"><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"><span className="block h-full rounded-full bg-primary transition-[width] duration-700" style={{ width: `${pct}%` }} /></span><span className="font-semibold tabular-nums">{pct}%</span></span>
              <span><span className="block font-bold tabular-nums">{s.present} of {s.total}</span><span className="text-muted-foreground">Present</span></span>
              <span><span className="block font-bold tabular-nums text-[#97430a]">{s.absent}</span><span className="text-muted-foreground">Absent</span></span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
