"use client";

import Link from "next/link";
import { BarChart3, CalendarDays, ChevronRight, ClipboardCheck, Megaphone, UserCog, Users, type LucideIcon } from "lucide-react";
import { Band, SectionHeader } from "@/components/marketing/band";
import { CardCarousel } from "@/components/marketing/card-carousel";
import { moduleHref } from "@/content/modules";
import { cn } from "@/lib/utils";

type Card = { icon: LucideIcon; tile: string; title: string; text: string; link: string; module: string };

// TODO: review the copy with the product team.
const cards: Card[] = [
  { icon: CalendarDays, tile: "bg-primary-soft text-primary", title: "Timetable", text: "Build the weekly timetable and catch room and teacher clashes before they reach a classroom.", link: "Check the timetable", module: "Timetable" },
  { icon: ClipboardCheck, tile: "bg-primary-soft text-primary", title: "Exams and results", text: "Run exam routines, marks entry progress and published results without the paperwork.", link: "See exams and results", module: "Exams and results" },
  { icon: Megaphone, tile: "bg-primary-soft text-primary", title: "Notices and messages", text: "Publish once to a class, a section or everyone, and see how many have read it.", link: "See notices", module: "Notices and announcements" },
  { icon: UserCog, tile: "bg-primary-soft text-primary", title: "Leave and certificates", text: "Approve leave, collect documents and issue certificates with a clear trail.", link: "See leave and certificates", module: "Leave, documents and certificates" },
  { icon: Users, tile: "bg-primary-soft text-primary", title: "Teachers and staff", text: "Staff records, daily presence and cover for absent teachers in one place.", link: "See staff tools", module: "Teachers and staff" },
  { icon: BarChart3, tile: "bg-primary-soft text-primary", title: "Reports", text: "Standard and custom reports for leadership, ready to run or schedule.", link: "See reports", module: "Student, attendance, financial and academic reports" },
];

export function AdditionalFeatures() {
  return (
    <Band tone="surface" labelledBy="more-title">
      <SectionHeader id="more-title" eyebrow="Additional features" title="The only system to power up your whole institution" intro="See what else covers your day-to-day operations." />

      <div className="mt-12">
        <CardCarousel
          label="Additional features"
          items={cards.map((c) => (
            <article key={c.title} className="card flex h-full min-h-[20rem] flex-col p-7">
              <span aria-hidden className={cn("flex size-11 items-center justify-center rounded-xl", c.tile)}><c.icon className="size-5" /></span>
              <h3 className="mt-8 text-2xl font-bold tracking-tight">{c.title}</h3>
              <p className="mt-3 text-foreground/75">{c.text}</p>
              <Link href={moduleHref(c.module)} className="mt-auto inline-flex items-center gap-1.5 pt-8 font-bold text-primary hover:underline">
                {c.link} <ChevronRight className="size-4" aria-hidden />
              </Link>
            </article>
          ))}
        />
      </div>
    </Band>
  );
}
