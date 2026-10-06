"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable, type Column, type FilterDef } from "@/components/product/data-table";
import { Modal } from "@/components/product/modal";
import { Avatar, Badge, type Tone } from "@/components/product/ui";
import { useInitial } from "@/components/product/use-initial";
import { staff, type StaffMember } from "@/content/product/data";
import { actions, useLive } from "@/lib/live";
import { toast } from "@/lib/toast";

const tone: Record<StaffMember["today"], Tone> = { Present: "success", Late: "warning", "On leave": "info", Absent: "danger" };
const departments = [...new Set(staff.map((s) => s.department))];

const columns: Column<StaffMember>[] = [
  { key: "name", header: "Name", sort: (s) => s.name, csv: (s) => s.name, cell: (s) => (
    <span className="flex items-center gap-3"><Avatar name={s.name} /><span><span className="block font-medium">{s.name}</span><span className="font-mono text-xs text-muted-foreground">{s.id}</span></span></span>
  ) },
  { key: "role", header: "Role", sort: (s) => s.role, csv: (s) => s.role, cell: (s) => s.role },
  { key: "dept", header: "Department", sort: (s) => s.department, csv: (s) => s.department, cell: (s) => s.department },
  { key: "ct", header: "Class teacher of", sort: (s) => s.classTeacherOf ?? "", csv: (s) => s.classTeacherOf ?? "", cell: (s) => s.classTeacherOf ?? <span className="text-muted-foreground">—</span> },
  { key: "today", header: "Today", sort: (s) => s.today, csv: (s) => s.today, cell: (s) => <Badge tone={tone[s.today]}>{s.today}</Badge> },
];

const filters: FilterDef<StaffMember>[] = [
  { key: "department", label: "Department", options: departments.map((d) => ({ value: d, label: d })), test: (s, v) => s.department === v },
  { key: "status", label: "Today", options: ["Present", "Late", "On leave", "Absent"].map((d) => ({ value: d, label: d })), test: (s, v) => s.today === v },
];

export function StaffTable() {
  const init = useInitial(["department", "status"]);
  const [open, setOpen] = useState<StaffMember | null>(null);
  const covered = useLive().cover;
  return (
    <>
      <DataTable
        rows={staff} columns={columns} getId={(s) => s.id} search={(s) => `${s.name} ${s.id} ${s.role}`} searchPlaceholder="Search by name, ID or role"
        noun="staff members" exportName="staff" filters={filters} initialFilters={init.filters} initialQuery={init.q} onRowOpen={setOpen}
        bulkActions={[{ label: "Send message", confirm: (n) => `Send a message to ${n} staff members?`, done: (n) => `Message sent to ${n} staff members (demo)` }]}
      />
      <Modal open={!!open} onClose={() => setOpen(null)} variant="drawer" title={open?.name ?? ""} description={open?.role}
        footer={open && open.today !== "Present" && (covered.includes(open.id) ? <span className="text-sm font-medium text-success">Cover arranged</span> : <Button onClick={() => { actions.coverStaff(open.id); toast(`Cover requested for ${open.name} (demo)`); setOpen(null); }}>Arrange cover</Button>)}>
        {open && (
          <dl className="divide-y text-sm">
            {[["ID", open.id], ["Department", open.department], ["Class teacher of", open.classTeacherOf ?? "None"], ["Today", <Badge key="b" tone={tone[open.today]}>{open.today}</Badge>]].map(([k, v]) => (
              <div key={String(k)} className="flex items-center justify-between py-3"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
          </dl>
        )}
      </Modal>
    </>
  );
}
