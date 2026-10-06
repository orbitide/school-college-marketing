"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, type Column, type FilterDef } from "@/components/product/data-table";
import { Modal } from "@/components/product/modal";
import { Badge, type Tone } from "@/components/product/ui";
import { notices as seed, type Notice } from "@/content/product/data";
import { toast } from "@/lib/toast";

const tone: Record<Notice["status"], Tone> = { Published: "success", Scheduled: "warning", Draft: "neutral" };
const columns: Column<Notice>[] = [
  { key: "title", header: "Notice", sort: (n) => n.title, csv: (n) => n.title, cell: (n) => <span><span className="block font-medium">{n.title}</span><span className="font-mono text-xs text-muted-foreground">{n.id}</span></span> },
  { key: "audience", header: "Audience", sort: (n) => n.audience, csv: (n) => n.audience, cell: (n) => n.audience },
  { key: "status", header: "Status", sort: (n) => n.status, csv: (n) => n.status, cell: (n) => <Badge tone={tone[n.status]}>{n.status}</Badge> },
  { key: "date", header: "Date", csv: (n) => n.date, cell: (n) => n.date },
  { key: "reach", header: "Reach", csv: (n) => n.reach, cell: (n) => <span className="text-muted-foreground">{n.reach}</span> },
];
const filters: FilterDef<Notice>[] = [{ key: "status", label: "Status", options: ["Published", "Scheduled", "Draft"].map((s) => ({ value: s, label: s })), test: (n, v) => n.status === v }];
const field = "mt-1 block w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25";

export function NoticesView() {
  const [rows, setRows] = useState<Notice[]>(seed.slice());
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState("All students and parents");

  const publish = (status: "Published" | "Draft") => {
    if (!title.trim()) return;
    setRows((r) => [{ id: `N-${102 + r.length - seed.length}`, title: title.trim(), audience, status, date: "Today", reach: status === "Draft" ? "Draft" : "Sending" }, ...r]);
    toast(status === "Draft" ? "Draft saved" : `Notice published to ${audience.toLowerCase()} (demo)`);
    setTitle("");
    setComposing(false);
  };

  return (
    <>
      <div className="mb-4 flex justify-end"><Button onClick={() => setComposing(true)}><Plus /> New notice</Button></div>
      <DataTable rows={rows} columns={columns} getId={(n) => n.id} search={(n) => `${n.title} ${n.audience}`} searchPlaceholder="Search notices" noun="notices" exportName="notices" filters={filters} />
      <Modal
        open={composing}
        onClose={() => setComposing(false)}
        title="New notice"
        description="Choose who should see it. Parents and students get it in their feed."
        footer={<><Button variant="outline" onClick={() => publish("Draft")}>Save draft</Button><Button onClick={() => publish("Published")} disabled={!title.trim()}>Publish</Button></>}
      >
        <label className="block text-sm font-medium">Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={field} placeholder="e.g. Annual sports day on 2 November" />
        </label>
        <label className="mt-4 block text-sm font-medium">Audience
          <select value={audience} onChange={(e) => setAudience(e.target.value)} className={field}>
            {["All students and parents", "Parents", "Teachers", "Classes 9 to 10", "Class 10"].map((a) => <option key={a}>{a}</option>)}
          </select>
        </label>
      </Modal>
    </>
  );
}
