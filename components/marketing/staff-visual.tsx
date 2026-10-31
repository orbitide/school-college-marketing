"use client";

import { Check, Play } from "lucide-react";
import { CountUp } from "@/components/product/live";
import { Ring } from "@/components/marketing/solve-visual";
import { staff, students } from "@/content/product/data";
import { overviewLive, sectionsLive, useLive } from "@/lib/live";
import { cn } from "@/lib/utils";

const card = "rounded-xl bg-surface shadow-sm ring-1 ring-black/5";
const tints = ["bg-primary-soft text-primary", "bg-warning-soft text-warning", "bg-success-soft text-success", "bg-info-soft text-info"] as const;

const classes = [
  ["Class 9B attendance", "Room 204", "08:30"],
  ["Class 7A attendance", "Room 201", "08:40"],
  ["Class 8B attendance", "Room 305", "08:45"],
  ["Class 10A attendance", "Room 110", "08:50"],
] as const;

/** Task panel with floating cards, on the simulated live data. */
export function StaffVisual() {
  const live = useLive();
  const o = overviewLive(live);
  const secs = sectionsLive(live);
  const submitted = secs.filter((s) => s.submitted).map((s) => ({ ...s, pct: Math.round((s.present / s.total) * 100) })).sort((a, b) => b.pct - a.pct);
  const top = submitted.length >= 3 ? [submitted[0], submitted[Math.floor(submitted.length / 2)], submitted[submitted.length - 1]] : submitted;
  const registers = Math.round((o.submittedSections / o.totalSections) * 100);
  const away = staff.filter((m) => m.today === "Absent" || m.today === "On leave").length;
  const late = staff.filter((m) => m.today === "Late").length;
  const present = staff.length - away - late;
  const covered = away > 0 && o.staffAway === 0;

  return (
    <figure>
      <div className="relative rounded-[1.75rem] bg-white/50 p-4 pb-4 ring-1 ring-white/70 sm:p-6">
        <div className={cn(card, "grid gap-4 p-4 sm:grid-cols-[1.25fr_1fr]")}>
          <div>
            <p className="text-sm font-semibold">My classes</p>
            <div className="mt-2 flex gap-2 text-[0.6875rem] font-semibold"><span className="rounded bg-primary px-2 py-0.5 text-primary-foreground">To do</span><span className="rounded border px-2 py-0.5 text-muted-foreground">Completed</span></div>
            <ul className="mt-3 space-y-2">
              {classes.map(([t, r, time]) => {
                const key = t.split(" ")[1];
                const ok = !!secs.find((s) => s.section === key)?.submitted;
                return (
                  <li key={t} className="flex items-center gap-3 rounded-lg border p-2.5">
                    <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold">{t}</span><span className="text-[0.6875rem] text-muted-foreground">{r}</span></span>
                    <span className="text-[0.6875rem] tabular-nums text-muted-foreground">{time}</span>
                    <span aria-hidden className={cn("flex size-6 items-center justify-center rounded-full", ok ? "bg-success text-white" : "bg-muted text-muted-foreground")}>{ok ? <Check className="size-3" /> : <Play className="size-3" />}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Registers today</p>
            <div className="rounded-lg border-2 border-primary/70 p-3 text-center">
              <p className="text-3xl font-bold tabular-nums"><CountUp value={o.submittedSections} />/{o.totalSections}</p>
              <p className="text-[0.6875rem] text-muted-foreground">sections submitted</p>
            </div>
            <div className="flex justify-around gap-2">
              <Ring percent={registers} color="var(--primary)" label="Registers" />
              <Ring percent={o.present + o.absent ? Math.round((o.present / (o.present + o.absent)) * 100) : 0} color="#f5a623" label="Present" />
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:-mt-8 sm:ml-[-1.5rem] sm:grid-cols-[1fr_1fr] sm:pt-0 lg:ml-[-2.5rem]">
          <div className={cn(card, "p-3.5")}>
            <p className="text-xs font-semibold">Top sections</p>
            <ul className="mt-2 space-y-2">
              {top.map((s, i) => (
                <li key={s.section} className="flex items-center gap-2.5">
                  <span aria-hidden className={cn("flex size-7 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold", tints[i % tints.length])}>{s.section}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted"><span className={cn("block h-full rounded-full transition-[width] duration-700", s.pct >= 92 ? "bg-success" : s.pct >= 85 ? "bg-warning" : "bg-danger")} style={{ width: `${s.pct}%` }} /></span>
                  <span className="w-9 text-right text-[0.6875rem] font-semibold tabular-nums">{s.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={cn(card, "p-3.5")}>
            <div className="flex items-center justify-between"><p className="text-xs font-semibold">Staff today</p><span className={cn("rounded border px-2 py-0.5 text-[0.6875rem] font-semibold", covered ? "border-success/50 bg-success-soft text-success" : "border-warning/50 bg-warning-soft text-warning")}>{covered ? "Covered" : "Cover needed"}</span></div>
            <span aria-hidden className="mt-3 flex -space-x-1">
              {staff.slice(0, 6).map((m, i) => <span key={m.id} className={cn("flex size-7 items-center justify-center rounded-full text-[0.625rem] font-bold ring-2 ring-white", tints[i % tints.length])}>{m.name.replace(/^(Mr|Ms)\.\s/, "").split(" ").map((p) => p[0]).join("")}</span>)}
            </span>
            <div className="mt-3 flex h-1.5 gap-1" role="img" aria-label={`${present} present, ${late} late, ${away} away`}>
              <span className="rounded-full bg-success" style={{ flex: present }} /><span className="rounded-full bg-warning" style={{ flex: Math.max(late, 0.0001) }} /><span className="rounded-full bg-danger" style={{ flex: Math.max(away, 0.0001) }} />
            </div>
            <p className="mt-1.5 text-[0.6875rem] text-muted-foreground">{present} present · {late} late · {away} away</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground">Sample data from a fictional institution ({students.length} students). Updates are simulated.</figcaption>
    </figure>
  );
}
