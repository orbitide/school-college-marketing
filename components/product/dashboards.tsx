"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminDashboard } from "@/components/product/admin-dashboard";
import { AttentionList } from "@/components/product/attention";
import { Avatar, Badge, PageHeader, Panel, StatStrip } from "@/components/product/ui";
import { Button } from "@/components/ui/button";
import { attendanceBySection, institution, notices, periods, students, taka, timetable9A } from "@/content/product/data";
import { toast } from "@/lib/toast";
import { useRole } from "@/lib/role";
import { cn } from "@/lib/utils";

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

