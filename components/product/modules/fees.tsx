"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable, type Column, type FilterDef } from "@/components/product/data-table";
import { Modal } from "@/components/product/modal";
import { Badge, type Tone } from "@/components/product/ui";
import { useInitial } from "@/components/product/use-initial";
import { taka, type FeeRecord } from "@/content/product/data";
import { actions, feesLive, useLive } from "@/lib/live";
import { toast } from "@/lib/toast";

const tone: Record<string, Tone> = { Paid: "success", Due: "warning", Overdue: "danger" };

type Row = FeeRecord & { reminded: boolean };
const columns: Column<Row>[] = [
  { key: "invoice", header: "Invoice", sort: (f) => f.invoice, csv: (f) => f.invoice, cell: (f) => <span className="font-mono text-xs">{f.invoice}</span> },
  { key: "student", header: "Student", sort: (f) => f.student, csv: (f) => f.student, cell: (f) => <span><span className="block font-medium">{f.student}</span><span className="font-mono text-xs text-muted-foreground">{f.studentId}</span></span> },
  { key: "class", header: "Class", sort: (f) => f.cls, csv: (f) => `${f.cls}${f.section}`, cell: (f) => `${f.cls}${f.section}` },
  { key: "amount", header: "Amount", sort: (f) => f.amount, csv: (f) => f.amount, cell: (f) => taka(f.amount), align: "right" },
  { key: "due", header: "Due date", sort: (f) => f.dueDate, csv: (f) => f.dueDate, cell: (f) => f.dueDate },
  { key: "late", header: "Days late", sort: (f) => f.daysOverdue, csv: (f) => f.daysOverdue, cell: (f) => (f.daysOverdue ? f.daysOverdue : "—"), align: "right" },
  { key: "status", header: "Status", sort: (f) => f.status, csv: (f) => f.status, cell: (f) => <span className="flex items-center gap-1.5"><Badge tone={tone[f.status]}>{f.status}</Badge>{f.reminded && f.status !== "Paid" && <span className="text-xs text-muted-foreground">Reminded</span>}</span> },
];

const filters: FilterDef<Row>[] = [
  { key: "status", label: "Status", options: ["Overdue", "Due", "Paid"].map((s) => ({ value: s, label: s })), test: (f, v) => f.status === v },
  { key: "class", label: "Class", options: [6, 7, 8, 9, 10].map((c) => ({ value: String(c), label: `Class ${c}` })), test: (f, v) => String(f.cls) === v },
];

export function FeesTable() {
  const init = useInitial(["status", "class"]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const rows = feesLive(useLive());
  const open = rows.find((r) => r.invoice === selectedId) ?? null;
  const setOpen = (r: Row | null) => setSelectedId(r?.invoice ?? null);
  return (
    <>
      <DataTable
        rows={rows} columns={columns} getId={(f) => f.invoice} search={(f) => `${f.student} ${f.invoice} ${f.studentId}`} searchPlaceholder="Search by student, ID or invoice"
        noun="invoices" exportName="outstanding-fees" filters={filters} initialFilters={init.filters} initialQuery={init.q} onRowOpen={setOpen}
        bulkActions={[
          { label: "Send reminder", confirm: (n) => `Send a fee reminder to the guardians of ${n} students?`, done: (n) => `Fee reminders sent to ${n} guardians (demo)`, run: actions.remindInvoices },
          { label: "Record payment", confirm: (n) => `Record a full payment for ${n} invoices?`, done: (n) => `${n} payments recorded`, run: actions.recordPayments },
        ]}
      />
      <Modal open={!!open} onClose={() => setOpen(null)} variant="drawer" title={open?.invoice ?? ""} description={open ? `${open.student} · Class ${open.cls}${open.section}` : ""}
        footer={open && (<>{open.status !== "Paid" ? (<><Button variant="outline" onClick={() => { actions.remindInvoices([open.invoice]); toast(`Reminder sent for ${open.invoice} (demo)`); setOpen(null); }}>Send reminder</Button><Button onClick={() => { actions.recordPayments([open.invoice]); toast(`Payment recorded for ${open.invoice}`); setOpen(null); }}>Record payment</Button></>) : <span className="text-sm font-medium text-success">Paid in full</span>}</>)}>
        {open && (
          <dl className="divide-y text-sm">
            {[["Amount", taka(open.amount)], ["Due date", open.dueDate], ["Days late", open.daysOverdue ? String(open.daysOverdue) : "Not late"], ["Status", <Badge key="s" tone={tone[open.status]}>{open.status}</Badge>]].map(([k, v]) => (
              <div key={String(k)} className="flex items-center justify-between py-3"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
            ))}
          </dl>
        )}
      </Modal>
    </>
  );
}
