"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Band, SectionHeader } from "@/components/marketing/band";
import { tabBase, tabOff, tabOn } from "@/components/marketing/tab-styles";
import { CampusGroupScene, CoachingScene, CollegeScene, KindergartenScene, MadrasaScene, SchoolScene } from "@/components/marketing/illustrations";
import { cn } from "@/lib/utils";

// TODO: confirm the institution types and the feature lists with the product team.
const tabs = [
  { id: "kindergartens", label: "Kindergartens", title: "For kindergartens", text: "Keep daily attendance, short parent updates and simple fee records for young learners.", features: ["Daily attendance", "Notices to parents", "Fee tracking and receipts", "Student profiles", "Simple reports"], href: "/features/attendance", scene: <KindergartenScene /> },
  { id: "schools", label: "Schools", title: "For schools", text: "Run classes, exams and fees from one system, with guardians kept informed every day.", features: ["Classes and sections", "Attendance with absence alerts", "Fees and receipts", "Exams and results", "Notices and parent messages"], href: "/solutions/administrators", scene: <SchoolScene /> },
  { id: "colleges", label: "Colleges", title: "For colleges", text: "Handle admissions, groups and subjects, and keep board-ready result records.", features: ["Admissions pipeline", "Groups and subjects", "Results and marksheets", "Student documents", "Reports for leadership"], href: "/features/admissions", scene: <CollegeScene /> },
  { id: "madrasas", label: "Madrasas", title: "For madrasas", text: "Keep student records, attendance, fees and notices organised in one place.", features: ["Student records", "Attendance", "Fees and receipts", "Notices", "Reports"], href: "/features/students", scene: <MadrasaScene /> },
  { id: "coaching", label: "Coaching centres", title: "For coaching centres", text: "Track batches, attendance and fee dues without spreadsheets.", features: ["Class and batch lists", "Attendance", "Fee dues and reminders", "Notices to students", "Reports"], href: "/features/fees-and-payments", scene: <CoachingScene /> },
  { id: "groups", label: "Multi-branch groups", title: "For multi-branch groups", text: "Compare every campus and manage them all from one account.", features: ["Branch comparison", "Shared settings with local control", "Roles across branches", "Consolidated reports", "Custom onboarding"], href: "/resources/enterprise", scene: <CampusGroupScene /> },
] as const;

export function InstitutionsSection() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const t = tabs[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <Band tone="paper" id="institution-types" labelledBy="institutions-title">
      <SectionHeader id="institutions-title" eyebrow="Institution types" title="Built for institutions that value time and trust" />

      <div role="tablist" aria-label="Institution types" className="scroll-none -mx-5 mt-10 flex gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
        {tabs.map((x, i) => (
          <button
            key={x.id}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            id={`${uid}-tab-${x.id}`}
            aria-selected={active === i}
            aria-controls={`${uid}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(tabBase, active === i ? tabOn : tabOff)}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${t.id}`} className="card mt-6 grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{t.title}</h3>
          <p className="mt-4 text-lg text-foreground/80">{t.text}</p>
          <p className="mt-5 font-semibold">Popular features:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-foreground/80 marker:text-primary">
            {t.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <Link href={t.href} className="mt-6 inline-flex items-center gap-1.5 font-bold text-primary hover:underline">See how it works <ChevronRight className="size-4" aria-hidden /></Link>
        </div>
        <div aria-hidden className="relative aspect-[4/3] overflow-hidden rounded-xl bg-primary-soft">
          <div className="absolute inset-0">{t.scene}</div>
        </div>
      </div>
    </Band>
  );
}
