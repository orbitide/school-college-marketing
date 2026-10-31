"use client";

import { CalendarDays, Check } from "lucide-react";
import { Avatar } from "@/components/product/ui";
import { CountUp } from "@/components/product/live";
import { applications as baseApps, docsComplete, requiredDocs, type Stage } from "@/content/product/data";
import { actions, applicationsLive, useLive } from "@/lib/live";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const pill: Record<Stage, [string, string]> = {
  Applied: ["New", "bg-info-soft text-info"],
  "Under review": ["In review", "bg-success-soft text-success"],
  "Documents pending": ["Docs missing", "bg-[#ffe9d6] text-[#97430a]"],
  Interview: ["Interview", "bg-info-soft text-info"],
  "Pending approval": ["Pending", "bg-[#fbf0b5] text-[#7a6200]"],
  Approved: ["Approved", "bg-success-soft text-success"],
  Rejected: ["Declined", "bg-danger-soft text-danger"],
};
// Fixed rows, so an approved applicant stays in the table and changes to "Approved".
const rowIds = [...baseApps.filter((a) => a.stage === "Pending approval").slice(0, 3), ...baseApps.filter((a) => a.stage === "Documents pending").slice(0, 1), ...baseApps.filter((a) => a.stage === "Approved").slice(0, 1)].map((a) => a.id);
const docCount = (a: ReturnType<typeof applicationsLive>[number]) => requiredDocs.filter((d) => a.docs[d]).length;

/** Admissions table with an approval card, on the simulated live data. */
export function AdmissionsVisual() {
  const live = useLive();
  const apps = applicationsLive(live);
  const pending = apps.filter((a) => a.stage === "Pending approval");
  const rows = rowIds.map((id) => apps.find((a) => a.id === id)!);
  const next = pending[0];

  return (
    <figure>
      <div className="relative rounded-[1.75rem] bg-[linear-gradient(135deg,#eef0fb,#e6f1f3)] p-4 pb-32 ring-1 ring-white/70 sm:p-7 sm:pb-28">
        <div className="rounded-xl bg-surface p-4 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            <p className="text-base font-bold">Admissions</p>
            <span className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[0.6875rem] font-semibold text-muted-foreground"><CalendarDays className="size-3.5 text-primary" aria-hidden />OCT 2026</span>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[22rem] text-xs">
              <thead><tr className="bg-muted/70 text-left text-muted-foreground"><th className="rounded-l-md px-2.5 py-2 font-medium">Applicant</th><th className="px-2.5 py-2 font-medium">Class</th><th className="px-2.5 py-2 font-medium">Stage</th><th className="rounded-r-md px-2.5 py-2 text-right font-medium">Docs</th></tr></thead>
              <tbody>
                {rows.map((a) => (
                  <tr key={a.id} className="border-b last:border-b-0">
                    <th scope="row" className="px-2.5 py-2.5 text-left font-semibold">{a.applicant}</th>
                    <td className="px-2.5 py-2.5 text-muted-foreground">Class {a.appliedClass}</td>
                    <td className="px-2.5 py-2.5"><span className={cn("rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold", pill[a.stage][1])}>{pill[a.stage][0]}</span></td>
                    <td className="px-2.5 py-2.5 text-right font-semibold tabular-nums">{docsComplete(a) ? "4 of 4" : `${docCount(a)} of 4`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[0.6875rem] text-muted-foreground"><CountUp value={pending.length} /> awaiting your decision</p>
        </div>

        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-primary/25 bg-surface p-3.5 shadow-md sm:inset-x-auto sm:right-7 sm:w-[19rem]" role="status" aria-live="polite">
          {next ? (
            <>
              <div className="flex items-center gap-3">
                <Avatar name={next.guardian} className="size-10" />
                <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold">{next.guardian}</span><span className="block truncate text-xs text-muted-foreground">Guardian of {next.applicant}</span></span>
                <span className="rounded-full border border-primary/40 px-3 py-1 text-[0.6875rem] font-semibold text-primary">Details</span>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg border p-2.5">
                <span><span className="block text-xs font-bold tabular-nums">11:00 AM to 11:30 AM</span><span className="text-[0.6875rem] text-muted-foreground">Interview complete</span></span>
                <button
                  type="button"
                  onClick={() => { actions.setStage(next.id, "Approved"); toast(`${next.applicant} approved. The family has been notified (demo)`); }}
                  className="rounded-full bg-gradient-to-r from-primary to-[#2b7a8c] px-4 py-1.5 text-xs font-semibold text-white shadow-sm outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Approve
                </button>
              </div>
            </>
          ) : (
            <p className="flex items-center gap-2.5 py-1 text-sm font-semibold"><span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-success-soft text-success"><Check className="size-4" /></span>All decisions made. Families have been notified.</p>
          )}
        </div>
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground">Sample data from a fictional institution. Try Approve: updates are simulated.</figcaption>
    </figure>
  );
}
