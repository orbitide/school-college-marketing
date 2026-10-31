import { Check, X } from "lucide-react";
import { AttentionList, type AttentionItem } from "@/components/product/attention";
import { StackedBars, TrendChart } from "@/components/product/charts";
import { Avatar, Badge, StatStrip } from "@/components/product/ui";
import { applications, attendanceBySection, attendanceTrend, docsComplete, feeMonthsBase, feeRecords, institution, notices, overview as o, requiredDocs, staff, taka, trendLabels } from "@/content/product/data";

/** Window frame for real product UI. Content is the same sample data the demo app uses. */
export function ProductFrame({ title, live, children, className }: { title: string; live?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl border border-border-strong bg-background shadow-md">
        <div className="flex items-center gap-2 border-b bg-surface px-4 py-2.5">
          <span aria-hidden className="flex gap-1.5"><i className="size-2.5 rounded-full bg-border-strong" /><i className="size-2.5 rounded-full bg-border-strong" /><i className="size-2.5 rounded-full bg-border-strong" /></span>
          <span className="ml-2 truncate text-xs font-medium text-muted-foreground">{title}</span>
          <span className="ml-auto flex shrink-0 items-center gap-3">{live}</span>
        </div>
        <div className="p-3 sm:p-4">{children}</div>
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground">Sample data from a fictional institution. Updates are simulated.</figcaption>
    </figure>
  );
}

const heroItems: AttentionItem[] = [
  { id: "1", severity: "high", title: `${o.pendingApprovals} applications awaiting approval`, detail: "A decision is needed so families can be told.", action: "Review applications", static: true },
  { id: "2", severity: "high", title: `${o.overdueCount} overdue fee payments`, detail: `${taka(o.overdueAmount)} outstanding.`, action: "Review payments", static: true },
  { id: "3", severity: "high", title: `Attendance not submitted for ${o.notSubmitted.length} sections`, detail: o.notSubmitted.map((s) => s.section).join(", "), action: "Send reminder", static: true },
  { id: "4", severity: "medium", title: "2 timetable conflicts detected", detail: "Room 204, Monday 10:00 AM, and one teacher booked twice.", action: "Resolve conflicts", static: true },
];

export function DashboardPreview() {
  return (
    <ProductFrame title={`Dashboard · ${institution.name}`}>
      <div className="space-y-3">
        <StatStrip items={[
          { label: "Students present", value: String(o.present), note: `${o.submittedSections} of ${o.totalSections} sections recorded` },
          { label: "Students absent", value: String(o.absent) },
          { label: "Pending fees", value: taka(o.pendingFees) },
          { label: "Staff present", value: `${o.staffTotal - o.staffAbsent} of ${o.staffTotal}` },
        ]} />
        <div className="panel">
          <p className="border-b px-4 py-3 text-sm font-semibold">Needs attention</p>
          <AttentionList items={heroItems} />
        </div>
      </div>
    </ProductFrame>
  );
}

export function FeesPreview() {
  const rows = feeRecords.filter((f) => f.status === "Overdue").slice(0, 5);
  return (
    <ProductFrame title="Fees and payments">
      <div className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b bg-primary-soft px-3 py-2 text-sm"><span className="font-semibold text-primary">3 selected</span><span className="rounded-md bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Send reminder</span></div>
        <table className="w-full text-sm">
          <thead><tr className="border-b bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground"><th scope="col" className="w-8 px-3 py-2"><span className="sr-only">Selected</span></th><th className="px-3 py-2 font-semibold">Student</th><th className="hidden px-3 py-2 font-semibold sm:table-cell">Class</th><th className="px-3 py-2 text-right font-semibold">Amount</th><th className="px-3 py-2 font-semibold">Status</th></tr></thead>
          <tbody>
            {rows.map((f, i) => (
              <tr key={f.invoice} className={i < 3 ? "border-b bg-primary-soft/50" : "border-b last:border-b-0"}>
                <td className="px-3 py-2.5"><span aria-hidden className={`flex size-4 items-center justify-center rounded border ${i < 3 ? "border-primary bg-primary text-primary-foreground" : "border-border-strong"}`}>{i < 3 && <Check className="size-3" />}</span></td>
                <td className="px-3 py-2.5 font-medium">{f.student}</td>
                <td className="hidden px-3 py-2.5 sm:table-cell">{f.cls}{f.section}</td>
                <td className="tnum px-3 py-2.5 text-right">{taka(f.amount)}</td>
                <td className="px-3 py-2.5"><Badge tone="danger">{f.daysOverdue} days late</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProductFrame>
  );
}

export function AttendancePreview() {
  return (
    <ProductFrame title="Attendance · Today">
      <ul className="panel divide-y text-sm">
        {attendanceBySection.slice(0, 7).map((s) => (
          <li key={s.section} className="flex items-center gap-3 px-3 py-2.5">
            <span className="w-8 font-semibold">{s.section}</span>
            <span className="flex-1 text-muted-foreground">{s.teacher}</span>
            {s.submitted ? <span className="tnum text-muted-foreground">{s.present}/{s.total}</span> : <Badge tone="danger">Not submitted</Badge>}
          </li>
        ))}
      </ul>
    </ProductFrame>
  );
}

export function AdmissionsPreview() {
  const a = applications.find((x) => x.stage === "Documents pending")!;
  return (
    <ProductFrame title={`Admissions · ${a.applicant}`}>
      <div className="panel p-4 text-sm">
        <div className="flex items-center justify-between"><p className="font-semibold">{a.applicant} <span className="font-mono text-xs font-normal text-muted-foreground">{a.id}</span></p><Badge tone="warning">Documents pending</Badge></div>
        <ul className="mt-3 divide-y rounded-lg border">
          {requiredDocs.map((d) => (
            <li key={d} className="flex items-center justify-between px-3 py-2">{d}{a.docs[d] ? <span className="flex items-center gap-1 font-medium text-success"><Check className="size-4" aria-hidden /> Received</span> : <span className="flex items-center gap-1 font-medium text-danger"><X className="size-4" aria-hidden /> Missing</span>}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">{docsComplete(a) ? "Ready for review" : "Request missing documents from the guardian in one click."}</p>
      </div>
    </ProductFrame>
  );
}

export function NoticesPreview() {
  return (
    <ProductFrame title="Notices">
      <ul className="panel divide-y text-sm">
        {notices.slice(0, 4).map((n) => (
          <li key={n.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
            <span className="min-w-0"><span className="block truncate font-medium">{n.title}</span><span className="text-xs text-muted-foreground">{n.audience} · {n.reach}</span></span>
            <Badge tone={n.status === "Published" ? "success" : n.status === "Scheduled" ? "warning" : "neutral"}>{n.status}</Badge>
          </li>
        ))}
      </ul>
    </ProductFrame>
  );
}

/* ---- previews for the Resources pages (sample data) ---- */
const branches = [
  { name: "Greenfield, Dhanmondi", students: 1240, attendance: 93.1, owed: 14 },
  { name: "Greenfield, Uttara", students: 980, attendance: 91.4, owed: 22 },
  { name: "Greenfield, Chattogram", students: 760, attendance: 94.2, owed: 9 },
] as const;

export function BranchesPreview() {
  return (
    <ProductFrame title="Enterprise · Branch comparison">
      <table className="panel w-full text-sm">
        <thead><tr className="border-b bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground"><th className="px-3 py-2 font-semibold">Branch</th><th className="px-3 py-2 text-right font-semibold">Students</th><th className="px-3 py-2 text-right font-semibold">Attendance</th><th className="hidden px-3 py-2 text-right font-semibold sm:table-cell">Fees owed</th></tr></thead>
        <tbody>
          {branches.map((b) => (
            <tr key={b.name} className="border-b last:border-b-0">
              <th scope="row" className="px-3 py-2.5 text-left font-medium">{b.name}</th>
              <td className="tnum px-3 py-2.5 text-right">{b.students.toLocaleString("en-US")}</td>
              <td className="px-3 py-2.5 text-right"><Badge tone={b.attendance >= 92 ? "success" : "warning"}>{b.attendance}%</Badge></td>
              <td className="tnum hidden px-3 py-2.5 text-right text-muted-foreground sm:table-cell">{b.owed}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ProductFrame>
  );
}

export function StaffPreview() {
  const rows = staff.slice(0, 7);
  const tone = { Present: "success", Late: "warning", "On leave": "info", Absent: "danger" } as const;
  return (
    <ProductFrame title="Teachers and staff">
      <ul className="panel divide-y text-sm">
        {rows.map((m) => (
          <li key={m.id} className="flex items-center gap-3 px-3 py-2.5">
            <Avatar name={m.name} />
            <span className="min-w-0 flex-1"><span className="block truncate font-medium">{m.name}</span><span className="text-xs text-muted-foreground">{m.role}</span></span>
            <Badge tone={tone[m.today]}>{m.today}</Badge>
          </li>
        ))}
      </ul>
    </ProductFrame>
  );
}

export function AnalyticsPreview() {
  return (
    <ProductFrame title="Analytics">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="panel p-4"><p className="mb-3 text-sm font-semibold">Attendance, last 14 school days</p><TrendChart data={[...attendanceTrend, 92.5]} labels={[...trendLabels, "Today"]} target={92} label="Attendance rate" /></div>
        <div className="panel p-4"><p className="mb-3 text-sm font-semibold">Fee collection by month</p><StackedBars data={[...feeMonthsBase, { label: "Oct", collected: 324000, outstanding: 196000 }]} format={taka} /></div>
      </div>
    </ProductFrame>
  );
}

export function ReportsPreview() {
  const rows = [["Student report", "Profiles, guardians and documents"], ["Attendance report", "By section, class or student"], ["Financial report", "Collection, dues and receipts"], ["Academic report", "Marks, grades and results"], ["Custom report", "Any field, saved and scheduled"]];
  return (
    <ProductFrame title="Reports">
      <ul className="panel divide-y text-sm">
        {rows.map(([n, d]) => (
          <li key={n} className="flex items-center gap-3 px-3 py-2.5">
            <span className="min-w-0 flex-1"><span className="block font-medium">{n}</span><span className="text-xs text-muted-foreground">{d}</span></span>
            <span className="rounded-md border px-2.5 py-1 text-xs font-semibold">Run</span>
            <span className="hidden rounded-md border px-2.5 py-1 text-xs font-semibold sm:inline">Schedule</span>
          </li>
        ))}
      </ul>
    </ProductFrame>
  );
}
