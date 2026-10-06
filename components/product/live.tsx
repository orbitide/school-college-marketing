"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarClock, MessageSquare, Pause, Play, UserPlus, Wallet, Zap } from "lucide-react";
import { actions, useLive, useRelativeTime, type ActivityKind } from "@/lib/live";
import { cn } from "@/lib/utils";

/** Tweens between numbers. Falls back to an instant change for reduced motion. */
export function CountUp({ value, format = (n: number) => String(n) }: { value: number; format?: (n: number) => string }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - t0) / 700);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = Math.round(start + (value - start) * eased);
      setShown(v);
      from.current = v;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className="tnum">{format(shown)}</span>;
}

export function LivePill({ className }: { className?: string }) {
  const { paused } = useLive();
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full border bg-surface py-1 pl-2.5 pr-1 text-xs font-medium", className)}>
      <span className="relative flex size-2">
        {!paused && <span className="absolute inline-flex size-full rounded-full bg-success opacity-60 motion-safe:animate-ping" />}
        <span className={cn("relative inline-flex size-2 rounded-full", paused ? "bg-border-strong" : "bg-success")} />
      </span>
      {paused ? "Paused" : "Live"}
      <button type="button" onClick={actions.togglePause} aria-label={paused ? "Resume live updates" : "Pause live updates"} className="flex size-6 items-center justify-center rounded-full hover:bg-muted">
        {paused ? <Play className="size-3" aria-hidden /> : <Pause className="size-3" aria-hidden />}
      </button>
    </span>
  );
}

const kindIcon: Record<ActivityKind, typeof Wallet> = { fee: Wallet, attendance: CalendarClock, admission: UserPlus, notice: MessageSquare, system: Zap };
const kindTone: Record<ActivityKind, string> = { fee: "bg-success-soft text-success", attendance: "bg-info-soft text-info", admission: "bg-warning-soft text-warning", notice: "bg-primary-soft text-primary", system: "bg-muted text-muted-foreground" };

export function ActivityFeed({ limit = 7 }: { limit?: number }) {
  const { activity } = useLive();
  const rel = useRelativeTime();
  return (
    <ul className="divide-y" aria-live="polite" aria-label="Live activity">
      {activity.slice(0, limit).map((a) => {
        const Icon = kindIcon[a.kind];
        return (
          <li key={a.id} className="row-in flex items-start gap-3 px-4 py-3">
            <span className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full", kindTone[a.kind])}><Icon className="size-3.5" aria-hidden /></span>
            <span className="min-w-0 flex-1 text-sm leading-snug">{a.text}</span>
            <time className="shrink-0 text-xs text-muted-foreground">{rel(a)}</time>
          </li>
        );
      })}
    </ul>
  );
}

