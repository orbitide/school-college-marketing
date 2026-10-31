"use client";

import { CalendarCheck, ClipboardCheck, Wallet } from "lucide-react";
import { CountUp } from "@/components/product/live";
import { Badge } from "@/components/product/ui";
import { students } from "@/content/product/data";
import { overviewLive, sectionsLive, useLive } from "@/lib/live";
import { cn } from "@/lib/utils";

const tints = ["bg-primary-soft text-primary", "bg-warning-soft text-warning", "bg-success-soft text-success", "bg-info-soft text-info"] as const;

function Initials({ name, tint = 0, className }: { name: string; tint?: number; className?: string }) {
  const text = name.replace(/^(Mr|Ms|Mrs)\.\s/, "").split(" ").map((p) => p[0]).slice(0, 2).join("");
  return <span aria-hidden className={cn("flex shrink-0 items-center justify-center rounded-full text-xs font-semibold", tints[tint % tints.length], className)}>{text}</span>;
}

/** Person bubble with a status pill hanging below it. */
function Bubble({ name, tint, pill, tone }: { name: string; tint: number; pill: React.ReactNode; tone: "success" | "danger" }) {
  return (
    <div className="hidden shrink-0 flex-col items-center sm:flex" aria-hidden>
      <Initials name={name} tint={tint} className="size-12 ring-4 ring-white shadow-sm" />
      <span className={cn("-mt-1.5 rounded-md px-2 py-0.5 text-[0.6875rem] font-bold text-white shadow-sm", tone === "success" ? "bg-success" : "bg-danger")}>{pill}</span>
    </div>
  );
}

/** Donut of today's attendance, with its labels around it. */
function AttendanceDonut({ present, absent, unrecorded }: { present: number; absent: number; unrecorded: number }) {
  const total = present + absent + unrecorded;
  const r = 38, c = 2 * Math.PI * r;
  const seg = [
    { v: present, color: "var(--primary)" },
    { v: absent, color: "var(--warning)" },
    { v: unrecorded, color: "var(--border-strong)" },
  ];
  let offset = 0;
  return (
    <div className="relative mx-auto h-[8.5rem] w-full max-w-[15rem]">
      <svg viewBox="0 0 100 100" className="absolute left-1/2 top-1/2 size-[6.75rem] -translate-x-1/2 -translate-y-1/2 -rotate-90" role="img" aria-label={`Attendance today: ${present} present, ${absent} absent, ${unrecorded} not yet recorded`}>
        {seg.map((s, i) => {
          const len = (s.v / total) * c;
          const el = <circle key={i} cx="50" cy="50" r={r} fill="none" stroke={s.color} strokeWidth="13" strokeDasharray={`${Math.max(len - 1.5, 0)} ${c}`} strokeDashoffset={-offset} className="transition-[stroke-dasharray,stroke-dashoffset] duration-700" />;
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-xl font-semibold leading-none"><CountUp value={present} /></p>
        <p className="mt-0.5 text-[0.625rem] text-muted-foreground">present</p>
      </div>
      <span className="absolute left-0 top-1 flex items-center gap-1 text-[0.6875rem] font-medium"><i className="size-2 rounded-full bg-primary" />Present</span>
      <span className="absolute right-0 top-3 flex items-center gap-1 text-[0.6875rem] font-medium"><i className="size-2 rounded-full bg-warning" />Absent</span>
      <span className="absolute bottom-0 right-0 flex items-center gap-1 text-[0.6875rem] font-medium"><i className="size-2 rounded-full bg-border-strong" />Not recorded</span>
    </div>
  );
}

/** Cluster of product cards for the home hero. Runs on the same simulated live data as the rest of the site. */
export function HeroVisual() {
  const live = useLive();
  const o = overviewLive(live);
  const sections = sectionsLive(live);
  const rate = o.present + o.absent ? Math.round((o.present / (o.present + o.absent)) * 100) : 0;
  const unrecorded = Math.max(students.length - o.present - o.absent, 0);
  const rows = ["7A", "8B"].map((k, i) => ({ s: sections.find((x) => x.section === k)!, tint: i + 1 }));

  const attention = [
    { icon: ClipboardCheck, label: "Applications awaiting approval", n: o.pendingApprovals, dot: "bg-warning" },
    { icon: Wallet, label: "Overdue fee payments", n: o.overdueCount, dot: "bg-danger" },
    { icon: CalendarCheck, label: "Registers not submitted", n: o.notSubmitted.length, dot: "bg-danger" },
  ];

  return (
    <div className="relative rounded-[1.75rem] border border-white/70 bg-white/45 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="w-full max-w-[16.5rem] rounded-xl bg-surface p-3 shadow-sm ring-1 ring-black/5">
          <p className="mb-1 text-xs font-semibold text-muted-foreground">Attendance today</p>
          <AttendanceDonut present={o.present} absent={o.absent} unrecorded={unrecorded} />
        </div>
        <Bubble name="Salma Khatun" tint={0} pill={`${rate}% present`} tone="success" />
      </div>

      <ul className="mt-4 divide-y rounded-xl bg-surface px-3 shadow-sm ring-1 ring-black/5 sm:w-[92%]">
        {rows.map(({ s, tint }) => (
          <li key={s.section} className="flex items-center gap-3 py-3">
            <Initials name={s.teacher} tint={tint} className="size-9" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold">{s.teacher}</span>
              <span className="text-xs text-muted-foreground">Class teacher · {s.section}</span>
            </span>
            <span className="hidden text-xs tabular-nums text-muted-foreground sm:block">{s.submitted ? "08:41" : "--:--"}</span>
            {s.submitted
              ? <Badge tone="success" className="rounded-full px-2.5">Submitted</Badge>
              : <Badge tone={live.reminded.includes(s.section) ? "warning" : "danger"} className="rounded-full px-2.5">{live.reminded.includes(s.section) ? "Reminded" : "Not submitted"}</Badge>}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between gap-4">
        <ul className="w-full max-w-[19rem] divide-y rounded-xl bg-surface px-3 shadow-sm ring-1 ring-black/5">
          {attention.map((a) => (
            <li key={a.label} className="flex items-center gap-3 py-2.5">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.8125rem] font-semibold">{a.label}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><i className={cn("size-1.5 rounded-full", a.n > 0 ? a.dot : "bg-success")} />{a.n > 0 ? "Needs attention" : "All clear"}</span>
              </span>
              <span className="text-sm font-semibold tabular-nums"><CountUp value={a.n} /></span>
              <span aria-hidden className="flex size-7 items-center justify-center rounded-md bg-primary-soft text-primary"><a.icon className="size-3.5" /></span>
            </li>
          ))}
        </ul>
        <Bubble name="Rubel Mia" tint={1} pill={`${o.overdueCount} overdue`} tone="danger" />
      </div>
      <p className="sr-only">Sample data from a fictional institution. Updates are simulated.</p>
    </div>
  );
}
