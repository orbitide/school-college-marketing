"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable, type Column, type FilterDef } from "@/components/product/data-table";
import { Modal } from "@/components/product/modal";
import { Badge } from "@/components/product/ui";
import { useInitial } from "@/components/product/use-initial";
import { students, type SectionAttendance } from "@/content/product/data";
import { actions, sectionsLive, useLive } from "@/lib/live";
import { toast } from "@/lib/toast";

const pct = (s: SectionAttendance) => (s.submitted ? Math.round((s.present / s.total) * 100) : -1);

const columns: Column<SectionAttendance>[] = [
  { key: "section", header: "Section", sort: (s) => s.section, csv: (s) => s.section, cell: (s) => <span className="font-semibold">{s.section}</span> },
  { key: "teacher", header: "Class teacher", sort: (s) => s.teacher, csv: (s) => s.teacher, cell: (s) => s.teacher },
  { key: "present", header: "Present", sort: (s) => (s.submitted ? s.present : -1), csv: (s) => (s.submitted ? s.present : ""), cell: (s) => (s.submitted ? s.present : "—"), align: "right" },
  { key: "absent", header: "Absent", sort: (s) => (s.submitted ? s.absent : -1), csv: (s) => (s.submitted ? s.absent : ""), cell: (s) => (s.submitted ? s.absent : "—"), align: "right" },
  { key: "pct", header: "Rate", sort: pct, csv: (s) => (s.submitted ? `${pct(s)}%` : ""), cell: (s) => (s.submitted ? <Badge tone={pct(s) >= 92 ? "success" : "warning"}>{pct(s)}%</Badge> : "—"), align: "right" },
  { key: "status", header: "Register", sort: (s) => (s.submitted ? 1 : 0), csv: (s) => (s.submitted ? "Submitted" : "Not submitted"), cell: (s) => (s.submitted ? <Badge tone="success">Submitted</Badge> : <Badge tone="danger">Not submitted</Badge>) },
];

const filters: FilterDef<SectionAttendance>[] = [{ key: "register", label: "Register", options: [{ value: "Submitted", label: "Submitted" }, { value: "Not submitted", label: "Not submitted" }], test: (s, v) => (v === "Submitted") === s.submitted }];

export function AttendanceTable() {
  const init = useInitial(["register"]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const rows = sectionsLive(useLive());
  const open = rows.find((r) => r.section === selectedId) ?? null;
  const setOpen = (r: SectionAttendance | null) => setSelectedId(r?.section ?? null);
  const absent = open ? students.filter((s) => `${s.cls}${s.section}` === open.section && s.absentToday) : [];

  return (
    <>
      <DataTable
        rows={rows} columns={columns} getId={(s) => s.section} search={(s) => `${s.section} ${s.teacher}`} searchPlaceholder="Search by section or teacher"
        noun="sections" exportName="attendance-today" filters={filters} initialFilters={init.filters} initialQuery={init.q} onRowOpen={setOpen}
        bulkActions={[{ label: "Send reminder", confirm: (n) => `Remind the class teachers of ${n} sections to submit attendance?`, done: (n) => `Reminders sent to ${n} class teachers (demo)`, run: actions.remindSections }]}
      />
      <Modal open={!!open} onClose={() => setOpen(null)} variant="drawer" title={open ? `Section ${open.section}` : ""} description={open?.teacher}
        footer={open && !open.submitted && <Button onClick={() => { actions.remindSections([open.section]); toast(`Reminder sent to ${open.teacher} (demo)`); setOpen(null); }}>Send reminder</Button>}>
        {open && (open.submitted ? (
          <>
            <p className="text-sm text-muted-foreground">{open.present} of {open.total} present today.</p>
            <h3 className="mt-5 text-sm">Absent today ({absent.length})</h3>
            {absent.length ? (
              <ul className="mt-2 divide-y rounded-lg border text-sm">
                {absent.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <span><span className="block font-medium">{s.name}</span><span className="text-muted-foreground">Roll {s.roll}</span></span>
                    <Button size="sm" variant="outline" onClick={() => toast(`Guardian of ${s.name} notified (demo)`)}>Notify guardian</Button>
                  </li>
                ))}
              </ul>
            ) : <p className="mt-2 text-sm text-muted-foreground">Everyone is present.</p>}
          </>
        ) : (
          <p className="text-sm">The register for {open.section} has not been submitted today. Guardians are notified of absences as soon as it is.</p>
        ))}
      </Modal>
    </>
  );
}
