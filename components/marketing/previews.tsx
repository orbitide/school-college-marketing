import Link from "next/link";
import { Check, X } from "lucide-react";
import { AttentionList, type AttentionItem } from "@/components/product/attention";
import { Badge, StatStrip } from "@/components/product/ui";
import { applications, attendanceBySection, docsComplete, feeRecords, institution, notices, overview as o, requiredDocs, taka } from "@/content/product/data";

/** Window frame for real product UI. Content is the same sample data the demo app uses. */
export function ProductFrame({ title, href, children, className }: { title: string; href?: string; children: React.ReactNode; className?: string }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl border border-border-strong bg-background shadow-md">
        <div className="flex items-center gap-2 border-b bg-surface px-4 py-2.5">
          <span aria-hidden className="flex gap-1.5"><i className="size-2.5 rounded-full bg-border-strong" /><i className="size-2.5 rounded-full bg-border-strong" /><i className="size-2.5 rounded-full bg-border-strong" /></span>
          <span className="ml-2 truncate text-xs font-medium text-muted-foreground">{title}</span>
          {href && <Link href={href} className="ml-auto shrink-0 text-xs font-semibold text-primary hover:underline">Open in the demo app</Link>}
        </div>
        <div className="p-3 sm:p-4">{children}</div>
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground">Sample data from a fictional institution.</figcaption>
    </figure>
  );
}

const heroItems: AttentionItem[] = [
  { id: "1", severity: "high", title: `${o.pendingApprovals} applications awaiting approval`, detail: "A decision is needed so families can be told.", action: "Review applications", href: "/app/admissions?stage=Pending+approval" },
  { id: "2", severity: "high", title: `${o.overdueCount} overdue fee payments`, detail: `${taka(o.overdueAmount)} outstanding.`, action: "Review payments", href: "/app/fees?status=Overdue" },
  { id: "3", severity: "high", title: `Attendance not submitted for ${o.notSubmitted.length} sections`, detail: o.notSubmitted.map((s) => s.section).join(", "), action: "Send reminder", href: "/app/attendance?register=Not+submitted" },
  { id: "4", severity: "medium", title: "2 timetable conflicts detected", detail: "Room 204, Monday 10:00 AM, and one teacher booked twice.", action: "Resolve conflicts", href: "/app/timetable" },
];

export function DashboardPreview() {
  return (
    <ProductFrame title={`Dashboard · ${institution.name}`} href="/app/dashboard">
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
    <ProductFrame title="Fees and payments" href="/app/fees?status=Overdue">
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
    <ProductFrame title="Attendance · Today" href="/app/attendance">
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
    <ProductFrame title={`Admissions · ${a.applicant}`} href="/app/admissions?docs=Incomplete">
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
    <ProductFrame title="Notices" href="/app/notices">
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
