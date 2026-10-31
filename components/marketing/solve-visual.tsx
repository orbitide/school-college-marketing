"use client";

import { AlertTriangle } from "lucide-react";
import { StackedBars } from "@/components/product/charts";
import { CountUp } from "@/components/product/live";
import { feeMonthsBase, institution, taka } from "@/content/product/data";
import { overviewLive, sectionsLive, useLive } from "@/lib/live";
import { cn } from "@/lib/utils";

const card = "rounded-xl bg-surface p-3.5 shadow-sm ring-1 ring-black/5";

export function Ring({ percent, color, label }: { percent: number; color: string; label: string }) {
  const r = 15.9;
  return (
    <div className="text-center">
      <p className="text-[0.6875rem] font-medium text-muted-foreground">{label}</p>
      <div className="relative mx-auto mt-1.5 size-[4.25rem]" role="img" aria-label={`${label}: ${percent}%`}>
        <svg viewBox="0 0 36 36" className="size-full -rotate-90">
          <circle cx="18" cy="18" r={r} fill="none" stroke="var(--muted)" strokeWidth="4.5" />
          <circle cx="18" cy="18" r={r} fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round" strokeDasharray={`${(percent / 100) * 2 * Math.PI * r} 100`} className="transition-[stroke-dasharray] duration-700" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold"><CountUp value={percent} format={(n) => `${n}%`} /></span>
      </div>
    </div>
  );
}

/** Cluster of report cards on the simulated live data. */
export function SolveVisual() {
  const live = useLive();
  const o = overviewLive(live);
  const sections = sectionsLive(live);
  const rows = ["7A", "8B", "9A"].map((k) => sections.find((s) => s.section === k)!);
  const rate = o.present + o.absent ? Math.round((o.present / (o.present + o.absent)) * 100) : 0;
  const collected = Math.max(0, 100 - Math.round((o.unpaidAmount / 520000) * 100));
  const months = [...feeMonthsBase, { label: "Oct", collected: 520000 - o.unpaidAmount, outstanding: o.unpaidAmount }];

  return (
    <figure>
      <div className="rounded-[1.75rem] bg-white/50 p-4 ring-1 ring-white/70 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_11.5rem] sm:items-center">
          <div className={card}>
            <div className="flex items-center justify-between text-xs"><p className="font-semibold">Attendance report</p><p className="rounded-md border px-2 py-0.5 text-muted-foreground">Today, {institution.today.split(",")[1].trim().slice(0, 6)}</p></div>
            <ul className="mt-2 divide-y text-xs">
              {rows.map((s) => (
                <li key={s.section} className="flex items-center gap-2 py-2">
                  <span className="min-w-0 flex-1"><span className="block font-semibold">{s.section}</span><span className="block truncate text-muted-foreground">{s.teacher}</span></span>
                  <span className="tabular-nums text-muted-foreground">{s.submitted ? "08:41" : "--:--"}</span>
                  <span className={cn("rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold", s.submitted ? "bg-success-soft text-success" : live.reminded.includes(s.section) ? "bg-warning-soft text-warning" : "bg-[#ffe9d6] text-[#97430a]")}>{s.submitted ? "Submitted" : live.reminded.includes(s.section) ? "Reminded" : "Not submitted"}</span>
                </li>
              ))}
            </ul>
          </div>

          <span aria-hidden className="hidden items-center sm:flex"><i className="h-px w-3 bg-warning" /><span className="flex size-8 items-center justify-center rounded-full bg-[#f5841f] text-white shadow-md"><AlertTriangle className="size-4" /></span><i className="h-px w-3 bg-warning" /></span>

          <div className={card}>
            <div className="flex items-center justify-between text-xs"><p className="font-semibold">Fees outstanding</p><p className="rounded-md border px-2 py-0.5 text-muted-foreground">Term</p></div>
            <p className="mt-2 text-lg font-bold text-[#97430a]"><CountUp value={o.unpaidAmount} format={taka} /></p>
            <ul className="mt-1 space-y-1 text-[0.6875rem] text-muted-foreground">
              {o.byClass.slice(-4).map((c) => (
                <li key={c.cls} className="flex justify-between"><span>Class {c.cls}</span><span className="tabular-nums"><CountUp value={c.outstanding} format={taka} /></span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className={card}>
            <p className="mb-3 text-xs font-semibold">Fee collection by month</p>
            <StackedBars data={months} format={taka} />
          </div>
          <div className="flex justify-center gap-6 sm:flex-col sm:gap-4 sm:px-2">
            <Ring percent={rate} color="var(--primary)" label="Present today" />
            <Ring percent={collected} color="#f5a623" label="Fees collected" />
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground">Sample data from a fictional institution. Updates are simulated.</figcaption>
    </figure>
  );
}
