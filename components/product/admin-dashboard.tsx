"use client";

import Link from "next/link";
import { AttentionList, type AttentionItem } from "@/components/product/attention";
import { StackedBars, TrendChart } from "@/components/product/charts";
import { ActivityFeed, CountUp, LivePill } from "@/components/product/live";
import { Badge, PageHeader, Panel, StatStrip } from "@/components/product/ui";
import { Button } from "@/components/ui/button";
import { attendanceTrend, exams, feeMonthsBase, institution, taka, trendLabels } from "@/content/product/data";
import { actions, allNotices, overviewLive, sectionsLive, useLive } from "@/lib/live";
import { cn } from "@/lib/utils";

const TARGET = 92;
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
const link = "text-sm font-semibold text-primary hover:underline";

export function AdminDashboard() {
  const live = useLive();
  const o = overviewLive(live);
  const sections = sectionsLive(live);
  const rate = o.present + o.absent ? Math.round((o.present / (o.present + o.absent)) * 1000) / 10 : 0;
  const trend = [...attendanceTrend, rate || attendanceTrend[attendanceTrend.length - 1]];
  const months = [...feeMonthsBase, { label: "Oct", collected: 520000 - o.unpaidAmount, outstanding: o.unpaidAmount }];
  const lowest = [...sections].filter((s) => s.submitted).sort((a, b) => pct(a.present, a.total) - pct(b.present, b.total))[0];

  const items: AttentionItem[] = [
    o.pendingApprovals > 0 && { id: "approvals", severity: "high", title: `${o.pendingApprovals} application${o.pendingApprovals === 1 ? "" : "s"} awaiting approval`, detail: "Interviews are complete. A decision is needed so families can be told.", action: "Review applications", href: "/app/admissions?stage=Pending+approval" },
    o.overdueCount > 0 && { id: "overdue", severity: "high", title: `${o.overdueCount} overdue fee payment${o.overdueCount === 1 ? "" : "s"}`, detail: `${taka(o.overdueAmount)} outstanding. Oldest is over 40 days late.`, action: "Review payments", href: "/app/fees?status=Overdue" },
    o.notSubmitted.length > 0 && { id: "att", severity: "high", title: `Attendance not submitted for ${o.notSubmitted.length} section${o.notSubmitted.length === 1 ? "" : "s"}`, detail: `${o.notSubmitted.map((s) => s.section).join(", ")}. ${o.notSubmitted.every((s) => live.reminded.includes(s.section)) ? "Reminders sent, waiting for teachers." : "Class teachers have not marked today."}`, action: o.notSubmitted.every((s) => live.reminded.includes(s.section)) ? "Reminder sent" : "Send reminder", run: () => actions.remindSections(o.notSubmitted.map((s) => s.section)), done: `Reminder sent to ${o.notSubmitted.length} class teachers` },
    o.incompleteDocs > 0 && { id: "docs", severity: "medium", title: `${o.incompleteDocs} applicants have incomplete documents`, detail: "Missing a birth certificate, marksheet, photograph or guardian ID.", action: "Review documents", href: "/app/admissions?docs=Incomplete" },
    o.worstClass.percent > 15 && { id: "fee", severity: "medium", title: "Fee collection below target", detail: `Class ${o.worstClass.cls}: ${o.worstClass.percent}% of this term's fees are outstanding.`, action: "View details", href: `/app/fees?class=${o.worstClass.cls}` },
    o.conflicts > 0 && { id: "tt", severity: "medium", title: `${o.conflicts} timetable conflict${o.conflicts === 1 ? "" : "s"} detected`, detail: "Room 204 on Monday 10:00 AM, and one teacher booked twice on Tuesday.", action: "Resolve conflicts", href: "/app/timetable" },
    o.staffAway > 0 && { id: "staff", severity: "low", title: `${o.staffAway} staff member${o.staffAway === 1 ? "" : "s"} away today`, detail: "Check that their classes are covered.", action: "Arrange cover", href: "/app/staff?status=Absent" },
  ].filter(Boolean) as AttentionItem[];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Good morning, Salma"
        description={`${institution.today} · ${institution.name}`}
        actions={<><LivePill /><Button asChild variant="outline"><Link href="/app/notices">Send a notice</Link></Button><Button asChild><Link href="/app/admissions?stage=Pending+approval">Review approvals</Link></Button></>}
      />

      <section aria-labelledby="overview-title">
        <h2 id="overview-title" className="mb-2 text-sm font-semibold text-muted-foreground">Today&rsquo;s overview</h2>
        <StatStrip
          items={[
            { label: "Students present", value: <CountUp value={o.present} />, note: `${o.submittedSections} of ${o.totalSections} sections recorded`, href: "/app/attendance", spark: trend.slice(-8) },
            { label: "Students absent", value: <CountUp value={o.absent} />, note: "View attendance issues", href: "/app/students?attendance=Absent+today" },
            { label: "Pending fees", value: <CountUp value={o.unpaidAmount} format={taka} />, note: `${o.overdueCount} payments overdue`, href: "/app/fees", spark: months.map((m) => m.outstanding) },
            { label: "Staff present", value: <><CountUp value={o.staffPresent} /> of {o.staffTotal}</>, note: `${o.staffAway} away today`, href: "/app/staff" },
          ]}
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Panel title="Needs attention" action={items.some((i) => i.severity === "high") ? <Badge tone="danger">{items.filter((i) => i.severity === "high").length} high priority</Badge> : <Badge tone="success">Nothing urgent</Badge>}>
          {items.length ? <AttentionList items={items} /> : <p className="px-4 py-10 text-center text-sm text-muted-foreground">All clear. Nothing needs your attention right now.</p>}
        </Panel>
        <Panel title="Live activity" action={<span className="text-xs text-muted-foreground">Updates as it happens</span>}>
          <ActivityFeed limit={8} />
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Attendance, last 14 school days" action={<Link href="/app/attendance" className={link}>View attendance issues</Link>}>
          <div className="p-4"><TrendChart data={trend} labels={[...trendLabels, "Today"]} target={TARGET} label="Attendance rate" /></div>
        </Panel>
        <Panel title="Fee collection by month" action={<Link href="/app/fees" className={link}>Review dues</Link>}>
          <div className="p-4"><StackedBars data={months} format={taka} /></div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Attendance by section" action={<Link href="/app/attendance" className={link}>Open</Link>}>
          <ul className="space-y-2.5 p-4">
            {sections.map((s) => {
              const p = pct(s.present, s.total);
              return (
                <li key={s.section} className="grid grid-cols-[2.5rem_1fr_3rem] items-center gap-3 text-sm">
                  <span className="font-semibold">{s.section}</span>
                  {s.submitted ? (
                    <span className="relative h-2 rounded-full bg-muted" role="meter" aria-label={`Section ${s.section} attendance`} aria-valuenow={p} aria-valuemin={0} aria-valuemax={100}>
                      <span className={cn("absolute inset-y-0 left-0 rounded-full transition-[width] duration-700", p < TARGET ? "bg-warning" : "bg-success")} style={{ width: `${p}%` }} />
                      <span aria-hidden className="absolute -inset-y-1 w-px bg-foreground/50" style={{ left: `${TARGET}%` }} />
                    </span>
                  ) : <span className={cn("text-xs", live.reminded.includes(s.section) ? "text-warning" : "text-danger")}>{live.reminded.includes(s.section) ? "Reminded" : "Not submitted"}</span>}
                  <span className="tnum text-right text-muted-foreground">{s.submitted ? `${p}%` : "—"}</span>
                </li>
              );
            })}
          </ul>
          {lowest && <p className="border-t px-4 py-2.5 text-xs text-muted-foreground">Line marks the {TARGET}% target. Lowest recorded: {lowest.section} at {pct(lowest.present, lowest.total)}%.</p>}
        </Panel>

        <Panel title="Fees outstanding by class" action={<Link href="/app/fees" className={link}>Open</Link>}>
          <ul className="space-y-2.5 p-4">
            {o.byClass.map((f) => (
              <li key={f.cls} className="grid grid-cols-[4rem_1fr_4.5rem] items-center gap-3 text-sm">
                <span className="font-semibold">Class {f.cls}</span>
                <span className="h-2 overflow-hidden rounded-full bg-muted" role="meter" aria-label={`Class ${f.cls} fees outstanding`} aria-valuenow={f.percent} aria-valuemin={0} aria-valuemax={100}>
                  <span className={cn("block h-full rounded-full transition-[width] duration-700", f.percent > 25 ? "bg-danger" : "bg-warning")} style={{ width: `${f.percent}%` }} />
                </span>
                <span className="tnum text-right text-muted-foreground">{f.percent}% owed</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Admissions" action={<Link href="/app/admissions" className={link}>Open</Link>}>
          <ul className="divide-y text-sm">
            {[
              ["New applications", o.newApplications, "/app/admissions?stage=Applied"],
              ["Documents missing", o.incompleteDocs, "/app/admissions?docs=Incomplete"],
              ["Awaiting approval", o.pendingApprovals, "/app/admissions?stage=Pending+approval"],
              ["Approved", o.approved, "/app/admissions?stage=Approved"],
            ].map(([k, v, href]) => (
              <li key={String(k)}>
                <Link href={String(href)} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50"><span>{k}</span><span className="text-lg font-semibold"><CountUp value={Number(v)} /></span></Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Coming up" action={<Link href="/app/notices" className={link}>All notices</Link>}>
        <div className="grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <ul className="divide-y">
              {exams.map((e) => (
                <li key={e.name} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span><span className="block font-medium">{e.name}</span><span className="text-sm text-muted-foreground">{e.dates} · {e.classes}</span></span>
                  <Badge tone="info">{e.state}</Badge>
                </li>
              ))}
            </ul>
            <ul className="divide-y">
              {allNotices(live).filter((n) => n.status !== "Draft").slice(0, 2).map((n) => (
                <li key={n.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span><span className="block font-medium">{n.title}</span><span className="text-sm text-muted-foreground">{n.audience}</span></span>
                  <Badge tone={n.status === "Scheduled" ? "warning" : "success"}>{n.status}</Badge>
                </li>
              ))}
            </ul>
        </div>
      </Panel>
    </div>
  );
}
