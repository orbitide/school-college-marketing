"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/product/modal";
import { Badge, Panel } from "@/components/product/ui";
import { periods, timetable9A, timetableConflicts, weekDays } from "@/content/product/data";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export function TimetableView() {
  const [resolved, setResolved] = useState<string[]>([]);
  const [open, setOpen] = useState<(typeof timetableConflicts)[number] | null>(null);
  const [choice, setChoice] = useState(0);
  const left = timetableConflicts.filter((c) => !resolved.includes(c.id));

  return (
    <div className="space-y-6">
      <Panel title="Conflicts" action={left.length ? <Badge tone="danger">{left.length} to resolve</Badge> : <Badge tone="success">All clear</Badge>}>
        {left.length ? (
          <ul className="divide-y">
            {left.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center gap-3 px-4 py-3.5">
                <div className="min-w-0 flex-1 basis-60"><p className="font-semibold">{c.title}</p><p className="text-sm text-muted-foreground">{c.detail}</p></div>
                <Button variant="outline" size="sm" onClick={() => { setChoice(0); setOpen(c); }}>Resolve conflict</Button>
              </li>
            ))}
          </ul>
        ) : <p className="px-4 py-6 text-sm text-muted-foreground">No conflicts. The timetable is ready to publish.</p>}
      </Panel>

      <Panel title="Class 9A: weekly timetable">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="w-16 px-3 py-2.5 text-left font-semibold">Day</th>
                {periods.map((p) => <th key={p} scope="col" className="px-3 py-2.5 text-left font-semibold">{p}</th>)}
              </tr>
            </thead>
            <tbody>
              {weekDays.map((d, di) => (
                <tr key={d} className="border-b last:border-b-0">
                  <th scope="row" className="px-3 py-2.5 text-left font-semibold">{d}</th>
                  {timetable9A[di].map((c, pi) => {
                    const bad = c.conflict && !resolved.includes("C-1");
                    return (
                      <td key={pi} className={cn("px-3 py-2.5 align-top", bad && "bg-danger-soft")}>
                        <span className="block font-medium">{c.subject}</span>
                        <span className="text-xs text-muted-foreground">{c.room}</span>
                        {bad && <span className="mt-1 block text-xs font-semibold text-danger">Room clash</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Modal
        open={!!open}
        onClose={() => setOpen(null)}
        title={open?.title ?? ""}
        description={open?.detail}
        footer={<><Button variant="outline" onClick={() => setOpen(null)}>Cancel</Button><Button onClick={() => { if (open) { setResolved((r) => [...r, open.id]); toast("Conflict resolved. Affected teachers have been notified (demo)"); } setOpen(null); }}>Apply fix</Button></>}
      >
        <fieldset>
          <legend className="text-sm font-medium">Choose a fix</legend>
          <div className="mt-2 space-y-2">
            {open?.fix.map((f, i) => (
              <label key={f} className={cn("flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm", choice === i && "border-primary bg-primary-soft")}>
                <input type="radio" name="fix" checked={choice === i} onChange={() => setChoice(i)} className="mt-0.5 accent-[var(--primary)]" />
                {f}
              </label>
            ))}
          </div>
        </fieldset>
      </Modal>
    </div>
  );
}
