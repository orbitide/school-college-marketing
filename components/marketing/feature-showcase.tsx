"use client";

import { useId, useRef, useState } from "react";
import { BellRing, CalendarCheck, ClipboardCheck, Megaphone, MousePointerClick, Radio, Send, ShieldAlert, Users, Wallet, FileCheck2, Mail, Eye, type LucideIcon } from "lucide-react";
import { LiveAttentionPreview } from "@/components/marketing/live-preview";
import { AdmissionsPreview, AttendancePreview, FeesPreview, NoticesPreview } from "@/components/marketing/previews";
import { cn } from "@/lib/utils";

type Item = { icon: LucideIcon; title: string; text: string; note: [string, string] };
type Tab = { id: string; label: string; items: Item[]; visual: React.ReactNode };

// TODO: review the copy with the product team.
const tabs: Tab[] = [
  {
    id: "attention",
    label: "Needs attention",
    items: [
      { icon: ShieldAlert, title: "Problems, ranked", text: "See what needs a decision first, with the evidence beside it.", note: ["Reminder sent", "Class teachers get a nudge, and the list updates when they submit."] },
      { icon: MousePointerClick, title: "Fix it from the same row", text: "Send a reminder, approve or resolve without opening three screens.", note: ["Application approved", "The family is notified and the count drops."] },
      { icon: Radio, title: "Live as it happens", text: "Payments, registers and applications update the numbers in real time.", note: ["Payment received", "The overdue count changes the moment it arrives."] },
    ],
    visual: <LiveAttentionPreview />,
  },
  {
    id: "fees",
    label: "Fees and payments",
    items: [
      { icon: Wallet, title: "Overdue at a glance", text: "Filter to who owes what, by class, with days late.", note: ["Class 10 owes the most", "Filter by class to see where to follow up first."] },
      { icon: Send, title: "Bulk reminders", text: "Select accounts and send one reminder, with a confirmation step.", note: ["3 reminders sent", "Guardians are notified and payments appear in the feed."] },
      { icon: FileCheck2, title: "Record and export", text: "Record payments as they arrive and export for the accountant.", note: ["Exported to CSV", "The accountant gets the list in one click."] },
    ],
    visual: <FeesPreview />,
  },
  {
    id: "attendance",
    label: "Attendance",
    items: [
      { icon: CalendarCheck, title: "Registers by section", text: "See which classes have submitted today, and which have not.", note: ["4 sections not submitted", "7A, 8B, 9B and 10A are still to mark today."] },
      { icon: BellRing, title: "Reminders to teachers", text: "One click to chase the registers still missing.", note: ["Reminder sent", "Class teachers get a nudge to submit."] },
      { icon: Users, title: "Absence alerts", text: "Guardians hear about an absence the same day.", note: ["Guardian notified", "Absences go to parents as soon as the register is submitted."] },
    ],
    visual: <AttendancePreview />,
  },
  {
    id: "admissions",
    label: "Admissions",
    items: [
      { icon: ClipboardCheck, title: "A clear pipeline", text: "Every applicant has a stage, from application to approval.", note: ["7 awaiting approval", "Interviews are complete and decisions are due."] },
      { icon: FileCheck2, title: "Document checklists", text: "Missing documents are flagged and requested from the guardian.", note: ["Document requested", "The guardian is asked for exactly what is missing."] },
      { icon: Send, title: "Approve with context", text: "Decide with the full picture in one panel.", note: ["Application approved", "The family is notified in one click."] },
    ],
    visual: <AdmissionsPreview />,
  },
  {
    id: "communication",
    label: "Communication",
    items: [
      { icon: Megaphone, title: "Targeted notices", text: "Send to a class, a section or everyone.", note: ["Sent to Classes 9 and 10", "Only the families who need it get it."] },
      { icon: Mail, title: "Drafts and scheduling", text: "Prepare ahead and publish when it suits.", note: ["Scheduled for 12 Oct", "Drafts publish when you choose."] },
      { icon: Eye, title: "Read counts", text: "See how many people actually read it.", note: ["1,102 of 1,160 read", "Know that the exam routine reached families."] },
    ],
    visual: <NoticesPreview />,
  },
];

export function FeatureShowcase() {
  const [active, setActive] = useState(0);
  const [item, setItem] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active];

  const select = (i: number) => { setActive(i); setItem(0); };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="showcase-title" className="relative overflow-hidden border-b bg-[linear-gradient(135deg,#e3f3ee_0%,#e4f0f4_45%,#e9effa_100%)] py-16 sm:py-24">
      <div className="container-page">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-base font-semibold text-primary sm:text-lg">Stay on top of every day</p>
          <h2 id="showcase-title" className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">Complete operations system for schools and colleges</h2>
        </header>

        <div role="tablist" aria-label="Product areas" className="scroll-none -mx-5 mt-10 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              id={`${uid}-tab-${t.id}`}
              aria-selected={active === i}
              aria-controls={`${uid}-panel`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "shrink-0 rounded-xl border px-5 py-4 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-3 sm:text-base",
                active === i ? "border-transparent bg-gradient-to-r from-primary to-[#2b7a8c] text-white shadow-md" : "border-white/80 bg-white/50 text-foreground/80 hover:bg-white/80",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab.id}`} className="mt-5 rounded-[1.75rem] border border-white/80 bg-white/45 p-3 sm:p-5">
          <div className="grid gap-5 rounded-2xl bg-white/70 p-4 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <ul className="flex flex-col gap-3 lg:justify-start">
              {tab.items.map((it, i) => {
                const on = item === i;
                return (
                  <li key={it.title}>
                    <button
                      type="button"
                      onClick={() => setItem(i)}
                      aria-pressed={on}
                      className={cn("w-full rounded-xl border-2 p-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring", on ? "border-primary bg-white shadow-sm" : "border-transparent bg-white/60 hover:bg-white")}
                    >
                      <span className="flex items-center gap-3">
                        <span aria-hidden className={cn("flex size-8 items-center justify-center rounded-lg", on ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary")}><it.icon className="size-4" /></span>
                        <span className="text-lg font-semibold">{it.title}</span>
                      </span>
                      <span className="mt-1.5 block pl-11 text-muted-foreground">{it.text}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="relative min-w-0 rounded-2xl bg-[linear-gradient(135deg,#eef3fb_0%,#f3f7ee_55%,#fdf6e6_100%)] p-3 sm:p-6 lg:pb-24">
              {tab.visual}
              <div className="mt-3 flex items-start gap-3 rounded-xl border bg-surface p-3.5 shadow-md lg:absolute lg:bottom-4 lg:right-6 lg:mt-0 lg:w-72" role="status">
                <span aria-hidden className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-success-soft text-success"><BellRing className="size-4" /></span>
                <span><span className="block text-sm font-semibold">{tab.items[item].note[0]}</span><span className="text-xs text-muted-foreground">{tab.items[item].note[1]}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
