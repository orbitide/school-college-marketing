"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, type Column, type FilterDef } from "@/components/product/data-table";
import { Modal } from "@/components/product/modal";
import { Badge, type Tone } from "@/components/product/ui";
import { useInitial } from "@/components/product/use-initial";
import { docsComplete, requiredDocs, stages, type Application, type Stage } from "@/content/product/data";
import { actions, applicationsLive, useLive } from "@/lib/live";
import { toast } from "@/lib/toast";

const stageTone: Record<Stage, Tone> = { Applied: "info", "Under review": "info", "Documents pending": "warning", Interview: "neutral", "Pending approval": "warning", Approved: "success", Rejected: "danger" };
const docCount = (a: Application) => requiredDocs.filter((d) => a.docs[d]).length;

const columns: Column<Application>[] = [
  { key: "app", header: "Applicant", sort: (a) => a.applicant, csv: (a) => a.applicant, cell: (a) => <span><span className="block font-medium">{a.applicant}</span><span className="font-mono text-xs text-muted-foreground">{a.id}</span></span> },
  { key: "class", header: "Applying for", sort: (a) => a.appliedClass, csv: (a) => `Class ${a.appliedClass}`, cell: (a) => `Class ${a.appliedClass}` },
  { key: "guardian", header: "Guardian", sort: (a) => a.guardian, csv: (a) => a.guardian, cell: (a) => a.guardian },
  { key: "on", header: "Applied", sort: (a) => a.appliedOn, csv: (a) => a.appliedOn, cell: (a) => a.appliedOn },
  { key: "docs", header: "Documents", sort: (a) => docCount(a), csv: (a) => `${docCount(a)} of 4`, cell: (a) => (docsComplete(a) ? <Badge tone="success">Complete</Badge> : <Badge tone="warning">{docCount(a)} of 4</Badge>) },
  { key: "stage", header: "Stage", sort: (a) => stages.indexOf(a.stage), csv: (a) => a.stage, cell: (a) => <Badge tone={stageTone[a.stage]}>{a.stage}</Badge> },
];

const filters: FilterDef<Application>[] = [
  { key: "stage", label: "Stage", options: stages.map((s) => ({ value: s, label: s })), test: (a, v) => a.stage === v },
  { key: "docs", label: "Documents", options: [{ value: "Complete", label: "Complete" }, { value: "Incomplete", label: "Incomplete" }], test: (a, v) => (v === "Complete" ? docsComplete(a) : !docsComplete(a) && !["Approved", "Rejected"].includes(a.stage)) },
  { key: "class", label: "Class", options: [6, 7, 8, 9].map((c) => ({ value: String(c), label: `Class ${c}` })), test: (a, v) => String(a.appliedClass) === v },
];

export function AdmissionsTable() {
  const init = useInitial(["stage", "docs", "class"]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const rows = applicationsLive(useLive());
  const open = rows.find((r) => r.id === selectedId) ?? null;
  const setOpen = (r: Application | null) => setSelectedId(r?.id ?? null);

  const act = (msg: string) => { toast(msg); setOpen(null); };

  return (
    <>
      <DataTable
        rows={rows} columns={columns} getId={(a) => a.id} search={(a) => `${a.applicant} ${a.id} ${a.guardian}`} searchPlaceholder="Search by applicant, ID or guardian"
        noun="applications" exportName="applications" filters={filters} initialFilters={init.filters} initialQuery={init.q} onRowOpen={setOpen}
        bulkActions={[
          { label: "Request documents", confirm: (n) => `Ask the guardians of ${n} applicants to send their missing documents?`, done: (n) => `Document requests sent for ${n} applicants (demo)`, run: actions.requestDocs },
          { label: "Approve", confirm: (n) => `Approve ${n} applications? Families will be notified.`, done: (n) => `${n} applications approved`, run: (ids) => ids.forEach((id) => actions.setStage(id, "Approved")) },
        ]}
      />
      <Modal
        open={!!open}
        onClose={() => setOpen(null)}
        variant="drawer"
        title={open?.applicant ?? ""}
        description={open ? `${open.id} · Applying for Class ${open.appliedClass}` : ""}
        footer={open && (
          <>
            {!docsComplete(open) && <Button variant="outline" onClick={() => { actions.requestDocs([open.id]); act(`Document request sent to ${open.guardian} (demo)`); }}>Request missing documents</Button>}
            {open.stage === "Pending approval" && (
              <>
                <Button variant="outline" onClick={() => { actions.setStage(open.id, "Rejected"); act(`${open.applicant} declined`); }}>Decline</Button>
                <Button onClick={() => { actions.setStage(open.id, "Approved"); act(`${open.applicant} approved. The family has been notified (demo)`); }}>Approve</Button>
              </>
            )}
          </>
        )}
      >
        {open && (
          <div className="space-y-6">
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Stage</span><Badge tone={stageTone[open.stage]}>{open.stage}</Badge></div>
            <div>
              <h3 className="text-sm">Documents</h3>
              <ul className="mt-2 divide-y rounded-lg border text-sm">
                {requiredDocs.map((d) => (
                  <li key={d} className="flex items-center justify-between px-3 py-2.5">
                    {d}
                    {open.docs[d] ? <span className="flex items-center gap-1 font-medium text-success"><Check className="size-4" aria-hidden /> Received</span> : <span className="flex items-center gap-1 font-medium text-danger"><X className="size-4" aria-hidden /> Missing</span>}
                  </li>
                ))}
              </ul>
            </div>
            <dl className="divide-y text-sm">
              {[["Guardian", open.guardian], ["Applied on", open.appliedOn]].map(([k, v]) => <div key={k} className="flex justify-between py-2.5"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>)}
            </dl>
          </div>
        )}
      </Modal>
    </>
  );
}
