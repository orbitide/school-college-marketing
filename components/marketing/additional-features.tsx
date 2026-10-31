"use client";

import Link from "next/link";
import { BarChart3, CalendarDays, ChevronRight, ClipboardCheck, Megaphone, UserCog, Users, type LucideIcon } from "lucide-react";
import { CardCarousel } from "@/components/marketing/card-carousel";
import { slug } from "@/content/modules";
import { cn } from "@/lib/utils";

type Card = { icon: LucideIcon; tile: string; title: string; text: string; link: string; module: string };

// TODO: review the copy with the product team.
const cards: Card[] = [
  { icon: CalendarDays, tile: "bg-[#ffc2d6] text-white", title: "Timetable", text: "Build the weekly timetable and catch room and teacher clashes before they reach a classroom.", link: "Check the timetable", module: "Timetable" },
  { icon: ClipboardCheck, tile: "bg-[#c9b6ff] text-white", title: "Exams and results", text: "Run exam routines, marks entry progress and published results without the paperwork.", link: "See exams and results", module: "Exams and results" },
  { icon: Megaphone, tile: "bg-[#b9defb] text-white", title: "Notices and messages", text: "Publish once to a class, a section or everyone, and see how many have read it.", link: "See notices", module: "Notices and announcements" },
  { icon: UserCog, tile: "bg-[#ffd9a0] text-white", title: "Leave and certificates", text: "Approve leave, collect documents and issue certificates with a clear trail.", link: "See leave and certificates", module: "Leave, documents and certificates" },
  { icon: Users, tile: "bg-[#a9e5d3] text-white", title: "Teachers and staff", text: "Staff records, daily presence and cover for absent teachers in one place.", link: "See staff tools", module: "Teachers and staff" },
  { icon: BarChart3, tile: "bg-[#bcc8f5] text-white", title: "Reports", text: "Standard and custom reports for leadership, ready to run or schedule.", link: "See reports", module: "Student, attendance, financial and academic reports" },
];

export function AdditionalFeatures() {
  return (
    <section aria-labelledby="more-title" className="relative overflow-hidden bg-[radial-gradient(60rem_28rem_at_50%_58%,#dde6fa,transparent_70%),radial-gradient(30rem_20rem_at_8%_30%,#e3f3ee,transparent),#fff] py-16 sm:py-24">
      <div className="container-page">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-base font-semibold text-primary sm:text-lg">Additional features</p>
          <h2 id="more-title" className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">The only system to power up your whole institution</h2>
          <p className="mt-4 text-lg text-muted-foreground">See what else covers your day-to-day operations.</p>
        </header>

        <div className="mt-12">
          <CardCarousel
            label="Additional features"
            items={cards.map((c) => (
              <article key={c.title} className="flex h-full min-h-[22rem] flex-col rounded-3xl bg-white/85 p-7 shadow-sm ring-1 ring-black/5">
                <span aria-hidden className={cn("flex size-11 items-center justify-center rounded-xl", c.tile)}><c.icon className="size-5" /></span>
                <h3 className="mt-10 text-2xl font-bold tracking-tight">{c.title}</h3>
                <p className="mt-4 text-foreground/75">{c.text}</p>
                <Link href={`/features#${slug(c.module)}`} className="mt-auto inline-flex items-center gap-1.5 pt-8 font-bold text-primary hover:underline">
                  {c.link} <ChevronRight className="size-4" aria-hidden />
                </Link>
              </article>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
