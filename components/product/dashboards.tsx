"use client";

import Link from "next/link";
import { useState } from "react";
import { AttentionList, type AttentionItem } from "@/components/product/attention";
import { Avatar, Badge, PageHeader, Panel, StatStrip } from "@/components/product/ui";
import { Button } from "@/components/ui/button";
import { applications, attendanceBySection, exams, feesByClass, institution, notices, overview, periods, students, taka, timetable9A } from "@/content/product/data";
import { toast } from "@/lib/toast";
import { useRole } from "@/lib/role";
import { cn } from "@/lib/utils";

const TARGET = 92;
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
const o = overview;
const lowSection = [...attendanceBySection].filter((s) => s.submitted).sort((a, b) => pct(a.present, a.total) - pct(b.present, b.total))[0];

function AdminDashboard() {
  const items: AttentionItem[] = [
    { id: "approvals", severity: "high", title: `${o.pendingApprovals} applications awaiting approval`, detail: "Interviews are complete. A decision is needed so families can be told.", action: "Review applications", href: "/app/admissions?stage=Pending+approval" },
    { id: "overdue", severity: "high", title: `${o.overdueCount} overdue fee payments`, detail: `${taka(o.overdueAmount)} outstanding. Oldest is over 40 days late.`, action: "Review payments", href: "/app/fees?status=Overdue" },
    { id: "att", severity: "high", title: `Attendance not submitted for ${o.notSubmitted.length} sections`, detail: `${o.notSubmitted.map((s) => s.section).join(", ")}. Class teachers have not marked today.`, action: "Send reminder", done: `Reminder sent to ${o.notSubmitted.length} class teachers (demo)` },
    { id: "docs", severity: "medium", title: `${o.incompleteDocs} applicants have incomplete documents`, detail: "Missing a birth certificate, marksheet, photograph or guardian ID.", action: "Review documents", href: "/app/admissions?docs=Incomplete" },
    { id: "fee10", severity: "medium", title: "Fee collection below target", detail: `Class ${o.worstFeeClass.cls}: ${o.worstFeeClass.percent}% of this term's fees are outstanding.`, action: "View details", href: `/app/fees?class=${o.worstFeeClass.cls}` },
    { id: "tt", severity: "medium", title: "2 timetable conflicts detected", detail: "Room 204 on Monday 10:00 AM, and one teacher booked twice on Tuesday.", action: "Resolve conflicts", href: "/app/timetable" },
    { id: "staff", severity: "low", title: `${o.staffAbsent} staff members away today`, detail: "Check that their classes are covered.", action: "Arrange cover", done: "Cover requests created (demo)" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Good morning, Salma"
        description={`${institution.today} · ${institution.name}`}
        actions={
          <>
            <Button asChild variant="outline"><Link href="/app/notices">Send a notice</Link></Button>
            <Button asChild><Link href="/app/admissions?stage=Pending+approval">Review approvals</Link></Button>
          </>
        }
      />

      <section aria-labelledby="overview-title">
        <h2 id="overview-title" className="mb-2 text-sm font-semibold text-muted-foreground">Today&rsquo;s overview</h2>
        <StatStrip
          items={[
            { label: "Students present", value: String(o.present), note: `${o.submittedSections} of ${o.totalSections} sections recorded`, href: "/app/attendance" },
            { label: "Students absent", value: String(o.absent), note: "View attendance issues", href: "/app/students?attendance=Absent+today" },
            { label: "Pending fees", value: taka(o.pendingFees), note: `${o.overdueCount} payments overdue`, href: "/app/fees" },
            { label: "Staff present", value: `${o.staffTotal - o.staffAbsent} of ${o.staffTotal}`, note: `${o.staffAbsent} away today`, href: "/app/staff" },
          ]}
        />
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Panel title="Needs attention" action={<Badge tone="danger">{items.filter((i) => i.severity === "high").length} high priority</Badge>}>
          <AttentionList items={items} />
        </Panel>

        <div className="space-y-6">
          <Panel title="Attendance by section" action={<Link href="/app/attendance" className="text-sm font-semibold text-primary hover:underline">View attendance issues</Link>}>
            <ul className="space-y-2.5 p-4">
              {attendanceBySection.map((s) => {
                const p = pct(s.present, s.total);
                return (
                  <li key={s.section} className="grid grid-cols-[2.5rem_1fr_3.5rem] items-center gap-3 text-sm">
                    <span className="font-semibold">{s.section}</span>
                    {s.submitted ? (
                      <span className="relative h-2 rounded-full bg-muted" role="meter" aria-label={`Section ${s.section} attendance`} aria-valuenow={p} aria-valuemin={0} aria-valuemax={100}>
                        <span className={cn("absolute inset-y-0 left-0 rounded-full", p < TARGET ? "bg-warning" : "bg-success")} style={{ width: `${p}%` }} />
                        <span aria-hidden className="absolute -inset-y-1 w-px bg-foreground/50" style={{ left: `${TARGET}%` }} />
                      </span>
                    ) : (
                      <span className="text-xs text-danger">Not submitted</span>
                    )}
                    <span className="tnum text-right text-muted-foreground">{s.submitted ? `${p}%` : "—"}</span>
                  </li>
                );
              })}
            </ul>
            <p className="border-t px-4 py-2.5 text-xs text-muted-foreground">Line marks the {TARGET}% target. Lowest recorded: {lowSection.section} at {pct(lowSection.present, lowSection.total)}%.</p>
          </Panel>

          <Panel title="Fee collection by class" action={<Link href="/app/fees" className="text-sm font-semibold text-primary hover:underline">Review dues</Link>}>
            <ul className="space-y-2.5 p-4">
              {feesByClass.map((f) => (
                <li key={f.cls} className="grid grid-cols-[4rem_1fr_6.5rem] items-center gap-3 text-sm">
                  <span className="font-semibold">Class {f.cls}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-muted" role="meter" aria-label={`Class ${f.cls} fees outstanding`} aria-valuenow={f.percent} aria-valuemin={0} aria-valuemax={100}>
                    <span className={cn("block h-full rounded-full", f.percent > 25 ? "bg-danger" : "bg-warning")} style={{ width: `${f.percent}%` }} />
                  </span>
                  <span className="tnum text-right text-muted-foreground">{f.percent}% owed</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Admissions pipeline" action={<Link href="/app/admissions" className="text-sm font-semibold text-primary hover:underline">Open admissions</Link>}>
          <dl className="grid grid-cols-2 divide-x sm:grid-cols-4">
            {[
              ["New", o.newApplications],
              ["Docs missing", o.incompleteDocs],
              ["Awaiting approval", o.pendingApprovals],
              ["Approved", applications.filter((a) => a.stage === "Approved").length],
            ].map(([k, v]) => (
              <div key={k} className="p-4">
                <dt className="text-xs text-muted-foreground">{k}</dt>
                <dd className="tnum mt-1 text-xl font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
        <Panel title="Coming up" action={<Link href="/app/notices" className="text-sm font-semibold text-primary hover:underline">All notices</Link>}>
          <ul className="divide-y">
            {exams.map((e) => (
              <li key={e.name} className="flex items-center justify-between gap-3 px-4 py-3">
                <span><span className="block font-medium">{e.name}</span><span className="text-sm text-muted-foreground">{e.dates} · {e.classes}</span></span>
                <Badge tone="info">{e.state}</Badge>
              </li>
            ))}
            {notices.filter((n) => n.status !== "Draft").slice(0, 2).map((n) => (
              <li key={n.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <span><span className="block font-medium">{n.title}</span><span className="text-sm text-muted-foreground">{n.audience}</span></span>
                <Badge tone={n.status === "Scheduled" ? "warning" : "success"}>{n.status}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function TeacherDashboard() {
  const section = attendanceBySection.find((s) => s.section === "9B")!;
  const followUp = students.filter((s) => s.cls === 9 && s.section === "B" && s.attendance < 86).slice(0, 5);
  const [tasks, setTasks] = useState([
    { id: 1, text: "Enter Class 10 model test marks (Physics)", done: false },
    { id: 2, text: "Submit attendance for 9B", done: false },
    { id: 3, text: "Reply to a parent message about homework", done: false },
  ]);
  const today = timetable9A[0];

  return (
    <div className="space-y-6">
      <PageHeader title="Good morning, Ms. Farzana" description={`${institution.today} · Class teacher of 9B`} actions={<Button asChild><Link href="/app/attendance">Take attendance</Link></Button>} />
      <AttentionList className="panel" items={[
        { id: "a", severity: "high", title: "Attendance for 9B is not submitted", detail: `${section.total} students. Parents are notified once you submit.`, action: "Take attendance", href: "/app/attendance" },
        { id: "b", severity: "medium", title: "Class 10 model test marks are due", detail: "Marks entry closes on 02 Nov.", action: "Enter marks", done: "Marks entry opened (demo)" },
      ]} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Today's classes" action={<Link href="/app/timetable" className="text-sm font-semibold text-primary hover:underline">Full timetable</Link>}>
          <ul className="divide-y">
            {today.map((p, i) => (
              <li key={i} className="flex items-center gap-4 px-4 py-3 text-sm">
                <span className="tnum w-12 text-muted-foreground">{periods[i]}</span>
                <span className="font-medium">{p.subject}</span>
                <span className="ml-auto text-muted-foreground">9B · {p.room}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Students to follow up" action={<Link href="/app/students?class=9" className="text-sm font-semibold text-primary hover:underline">My students</Link>}>
          <ul className="divide-y">
            {followUp.map((s) => (
              <li key={s.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                <Avatar name={s.name} />
                <span className="flex-1"><span className="block font-medium">{s.name}</span><span className="text-muted-foreground">Attendance {s.attendance}% this term</span></span>
                <Button variant="outline" size="sm" onClick={() => toast(`Message sent to ${s.guardian} (demo)`)}>Message parent</Button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
      <Panel title="My tasks">
        <ul className="divide-y">
          {tasks.map((t) => (
            <li key={t.id}>
              <label className="flex cursor-pointer items-center gap-3 px-4 py-3">
                <input type="checkbox" checked={t.done} onChange={() => setTasks((all) => all.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)))} className="size-4 accent-[var(--primary)]" />
                <span className={cn(t.done && "text-muted-foreground line-through")}>{t.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function StudentDashboard() {
  const me = students.find((s) => s.cls === 9 && s.section === "A" && s.roll === 3)!;
  return (
    <div className="space-y-6">
      <PageHeader title={`Hi ${me.name.split(" ")[0]}`} description={`${institution.today} · Class 9A, roll ${me.roll}`} />
      <StatStrip items={[
        { label: "Attendance this term", value: `${me.attendance}%`, href: "/app/attendance" },
        { label: "Fees due", value: taka(4800), note: "Due 20 Oct", href: "/app/fees" },
        { label: "Latest result", value: "GPA 4.50", note: "Model test" },
        { label: "Unread notices", value: "2", href: "/app/notices" },
      ]} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Today's schedule" action={<Link href="/app/timetable" className="text-sm font-semibold text-primary hover:underline">Full timetable</Link>}>
          <ul className="divide-y">
            {timetable9A[0].map((p, i) => (
              <li key={i} className="flex items-center gap-4 px-4 py-3 text-sm">
                <span className="tnum w-12 text-muted-foreground">{periods[i]}</span>
                <span className="font-medium">{p.subject}</span>
                <span className="ml-auto text-muted-foreground">{p.room}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-6">
          <AttentionList className="panel" items={[{ id: "fee", severity: "medium", title: `${taka(4800)} tuition fee due on 20 October`, detail: "Pay online or at the accounts office.", action: "Pay now", done: "Payment page opened (demo)" }]} />
          <Panel title="My documents">
            <ul className="divide-y text-sm">
              {[["Birth certificate", true], ["Previous marksheet", true], ["Photograph", true], ["Guardian ID", false]].map(([d, ok]) => (
                <li key={String(d)} className="flex items-center justify-between px-4 py-2.5">
                  {d}
                  {ok ? <Badge tone="success">On file</Badge> : <Button size="sm" variant="outline" onClick={() => toast("Upload dialog opened (demo)")}>Upload</Button>}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function ParentDashboard() {
  const child = students.find((s) => s.cls === 9 && s.section === "A" && s.roll === 3)!;
  return (
    <div className="space-y-6">
      <PageHeader title="Your child" description={`${child.name} · Class 9A`} />
      <StatStrip items={[
        { label: "Attendance this term", value: `${child.attendance}%`, href: "/app/attendance" },
        { label: "Today", value: child.absentToday ? "Absent" : "Present", note: "Recorded at 08:45" },
        { label: "Fees due", value: taka(4800), note: "Due 20 Oct", href: "/app/fees" },
        { label: "Latest result", value: "GPA 4.50", note: "Model test" },
      ]} />
      <AttentionList className="panel" items={[
        { id: "fee", severity: "medium", title: `${taka(4800)} tuition fee due on 20 October`, detail: "Pay online to avoid a late fee.", action: "Pay now", done: "Payment page opened (demo)" },
        { id: "ptm", severity: "low", title: "Parent-teacher meeting on 25 October", detail: "Confirm whether you can attend.", action: "Confirm attendance", done: "Attendance confirmed (demo)" },
      ]} />
      <Panel title="Recent notices" action={<Link href="/app/notices" className="text-sm font-semibold text-primary hover:underline">All notices</Link>}>
        <ul className="divide-y">
          {notices.filter((n) => n.status === "Published").slice(0, 3).map((n) => (
            <li key={n.id} className="flex items-center justify-between gap-3 px-4 py-3"><span className="font-medium">{n.title}</span><span className="text-sm text-muted-foreground">{n.date}</span></li>
          ))}
        </ul>
      </Panel>
      <Button variant="outline" onClick={() => toast("Message to the class teacher started (demo)")}>Message the class teacher</Button>
    </div>
  );
}

export function RoleDashboard() {
  const { role } = useRole();
  return role === "teacher" ? <TeacherDashboard /> : role === "student" ? <StudentDashboard /> : role === "parent" ? <ParentDashboard /> : <AdminDashboard />;
}

