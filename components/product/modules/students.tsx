"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, type Column, type FilterDef } from "@/components/product/data-table";
import { Modal } from "@/components/product/modal";
import { Avatar, Badge, type Tone } from "@/components/product/ui";
import { useInitial } from "@/components/product/use-initial";
import { taka, type Student } from "@/content/product/data";
import { studentsLive, useLive } from "@/lib/live";
import { toast } from "@/lib/toast";

const feeTone: Record<string, Tone> = { Paid: "success", Due: "warning", Overdue: "danger" };
const attTone = (n: number): Tone => (n >= 92 ? "success" : n >= 85 ? "warning" : "danger");

const columns: Column<Student>[] = [
  { key: "name", header: "Student", sort: (s) => s.name, csv: (s) => s.name, cell: (s) => (
    <span className="flex items-center gap-3"><Avatar name={s.name} /><span><span className="block font-medium">{s.name}</span><span className="font-mono text-xs text-muted-foreground">{s.id}</span></span></span>
  ) },
  { key: "class", header: "Class", sort: (s) => s.cls * 10 + (s.section === "A" ? 0 : 1), csv: (s) => `${s.cls}${s.section}`, cell: (s) => `${s.cls}${s.section}` },
  { key: "roll", header: "Roll", sort: (s) => s.roll, csv: (s) => s.roll, cell: (s) => s.roll, align: "right" },
  { key: "guardian", header: "Guardian", sort: (s) => s.guardian, csv: (s) => s.guardian, cell: (s) => s.guardian },
  { key: "phone", header: "Phone", csv: (s) => s.phone, cell: (s) => <span className="font-mono text-xs">{s.phone}</span>, hidden: true },
  { key: "attendance", header: "Attendance", sort: (s) => s.attendance, csv: (s) => `${s.attendance}%`, cell: (s) => <Badge tone={attTone(s.attendance)}>{s.attendance}%</Badge> },
  { key: "fees", header: "Fees", sort: (s) => s.feeStatus, csv: (s) => s.feeStatus, cell: (s) => <Badge tone={feeTone[s.feeStatus]}>{s.feeStatus}</Badge> },
  { key: "today", header: "Today", sort: (s) => (s.absentToday ? 1 : 0), csv: (s) => (s.absentToday ? "Absent" : "Present"), cell: (s) => (s.absentToday ? <Badge tone="danger">Absent</Badge> : <span className="text-muted-foreground">Present</span>) },
];

const filters: FilterDef<Student>[] = [
  { key: "class", label: "Class", options: [6, 7, 8, 9, 10].map((c) => ({ value: String(c), label: `Class ${c}` })), test: (s, v) => String(s.cls) === v },
  { key: "section", label: "Section", options: ["A", "B"].map((c) => ({ value: c, label: c })), test: (s, v) => s.section === v },
  { key: "fees", label: "Fees", options: ["Paid", "Due", "Overdue"].map((c) => ({ value: c, label: c })), test: (s, v) => s.feeStatus === v },
  { key: "attendance", label: "Attendance", options: [{ value: "Absent today", label: "Absent today" }, { value: "Below 85%", label: "Below 85% this term" }], test: (s, v) => (v === "Absent today" ? s.absentToday : s.attendance < 85) },
];

export function StudentsTable() {
  const init = useInitial(["class", "section", "fees", "attendance"]);
  const [open, setOpen] = useState<Student | null>(null);
  const rows = studentsLive(useLive());

  return (
    <>
      <DataTable
        rows={rows}
        columns={columns}
        getId={(s) => s.id}
        search={(s) => `${s.name} ${s.id} ${s.guardian}`}
        searchPlaceholder="Search by name, ID or guardian"
        noun="students"
        exportName="students"
        filters={filters}
        initialFilters={init.filters}
        initialQuery={init.q}
        onRowOpen={setOpen}
        bulkActions={[
          { label: "Message guardians", confirm: (n) => `Send a message to the guardians of ${n} students?`, done: (n) => `Message sent to ${n} guardians (demo)` },
          { label: "Add to a group", confirm: (n) => `Add ${n} students to a student group?`, done: (n) => `${n} students added to the group (demo)` },
        ]}
      />
      <Modal
        open={!!open}
        onClose={() => setOpen(null)}
        variant="drawer"
        title={open?.name ?? ""}
        description={open ? `${open.id} · Class ${open.cls}${open.section}, roll ${open.roll}` : ""}
        footer={open && (
          <>
            <Button variant="outline" onClick={() => toast(`Message sent to ${open.guardian} (demo)`)}><Mail /> Message guardian</Button>
            <Button asChild><Link href={`/app/fees?q=${open.id}`}>View fee account</Link></Button>
          </>
        )}
      >
        {open && (
          <dl className="divide-y text-sm">
            {[
              ["Guardian", open.guardian],
              ["Phone", open.phone],
              ["Attendance this term", <Badge key="a" tone={attTone(open.attendance)}>{open.attendance}%</Badge>],
              ["Today", open.absentToday ? <Badge key="t" tone="danger">Absent</Badge> : "Present"],
              ["Fees", <Badge key="f" tone={feeTone[open.feeStatus]}>{open.feeStatus}</Badge>],
              ["Monthly tuition", taka(open.tuition)],
              ["Months owed", String(open.monthsOwed)],
            ].map(([k, v]) => (
              <div key={String(k)} className="flex items-center justify-between gap-4 py-3"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
          </dl>
        )}
      </Modal>
    </>
  );
}
