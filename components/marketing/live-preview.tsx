"use client";

import { AttentionList, type AttentionItem } from "@/components/product/attention";
import { ActivityFeed, CountUp, LivePill } from "@/components/product/live";
import { StatStrip } from "@/components/product/ui";
import { ProductFrame } from "@/components/marketing/previews";
import { attendanceTrend, institution, taka } from "@/content/product/data";
import { actions, overviewLive, useLive } from "@/lib/live";

/** The real dashboard, running on the same simulated live data as the demo app. */
export function LiveDashboardPreview() {
  const live = useLive();
  const o = overviewLive(live);
  const items: AttentionItem[] = [
    o.pendingApprovals > 0 && { id: "1", severity: "high", title: `${o.pendingApprovals} applications awaiting approval`, detail: "A decision is needed so families can be told.", action: "Review applications", href: "/app/admissions?stage=Pending+approval" },
    o.overdueCount > 0 && { id: "2", severity: "high", title: `${o.overdueCount} overdue fee payments`, detail: `${taka(o.overdueAmount)} outstanding.`, action: "Review payments", href: "/app/fees?status=Overdue" },
    o.notSubmitted.length > 0 && { id: "3", severity: "high", title: `Attendance not submitted for ${o.notSubmitted.length} sections`, detail: o.notSubmitted.map((s) => s.section).join(", "), action: o.notSubmitted.every((s) => live.reminded.includes(s.section)) ? "Reminder sent" : "Send reminder", run: () => actions.remindSections(o.notSubmitted.map((s) => s.section)), done: "Reminder sent to class teachers" },
    o.conflicts > 0 && { id: "4", severity: "medium", title: `${o.conflicts} timetable conflicts detected`, detail: "Room 204, Monday 10:00 AM, and one teacher booked twice.", action: "Resolve conflicts", href: "/app/timetable" },
  ].filter(Boolean) as AttentionItem[];

  return (
    <ProductFrame title={`Dashboard · ${institution.name}`} href="/app/dashboard" live={<LivePill />}>
      <div className="space-y-3">
        <StatStrip items={[
          { label: "Students present", value: <CountUp value={o.present} />, note: `${o.submittedSections} of ${o.totalSections} sections recorded`, spark: attendanceTrend.slice(-8) },
          { label: "Students absent", value: <CountUp value={o.absent} /> },
          { label: "Pending fees", value: <CountUp value={o.unpaidAmount} format={taka} />, note: `${o.overdueCount} overdue` },
          { label: "Staff present", value: <><CountUp value={o.staffPresent} /> of {o.staffTotal}</> },
        ]} />
        <div className="grid gap-3 lg:grid-cols-[1.35fr_1fr]">
          <div className="panel">
            <p className="border-b px-4 py-3 text-sm font-semibold">Needs attention</p>
            {items.length ? <AttentionList items={items} /> : <p className="px-4 py-10 text-center text-sm text-muted-foreground">All clear.</p>}
          </div>
          <div className="panel hidden lg:block">
            <p className="border-b px-4 py-3 text-sm font-semibold">Live activity</p>
            <ActivityFeed limit={5} />
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}

export function LiveActivityPreview() {
  return (
    <ProductFrame title="Live activity" href="/app/dashboard" live={<LivePill />}>
      <div className="panel"><ActivityFeed limit={6} /></div>
    </ProductFrame>
  );
}
