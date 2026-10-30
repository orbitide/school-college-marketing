// Solutions by role. TODO: review the copy with the product team.
export type Solution = {
  slug: string;
  name: string;
  summary: string;
  headline: string;
  intro: string;
  does: string[];
  demoRole: "admin" | "teacher" | "student" | "parent";
  visual: "dashboard" | "attendance" | "notices" | "fees";
};

export const solutions: Solution[] = [
  {
    slug: "administrators",
    name: "Administrators",
    summary: "Approvals, finance, attendance and the problems that need a decision.",
    headline: "See what needs your attention, and act on it",
    intro: "Principals and administrators get one view of the institution: what is overdue, what is waiting for approval and what is slipping, each with the next action beside it.",
    does: ["A Needs attention list of problems, with the evidence and a button to resolve each", "Approvals for admissions, leave and certificates in one place", "Fee collection, attendance and staff presence at a glance", "Reports for the board without asking anyone to build them"],
    demoRole: "admin",
    visual: "dashboard",
  },
  {
    slug: "teachers",
    name: "Teachers",
    summary: "Classes, attendance, students to follow up and marks to enter.",
    headline: "Less admin, more time with the class",
    intro: "Teachers see today's classes, mark attendance from a phone in a minute and know which students need a follow-up, without chasing paperwork.",
    does: ["Today's timetable and class lists on any phone", "Attendance in a minute, with guardians notified of absences", "Students to follow up, with a one-click message to the parent", "Marks entry with deadlines and progress"],
    demoRole: "teacher",
    visual: "attendance",
  },
  {
    slug: "students",
    name: "Students",
    summary: "Schedule, attendance, fees, results, notices and documents.",
    headline: "Everything a student needs from the office, in one place",
    intro: "Students check their schedule, attendance, results and notices, and see which documents or fees need attention, without queuing at the office.",
    does: ["Today's schedule and the weekly timetable", "Attendance and results as they are published", "Notices from the institution and from teachers", "Documents on file, and which ones are missing"],
    demoRole: "student",
    visual: "notices",
  },
  {
    slug: "parents",
    name: "Parents",
    summary: "Your child's attendance, fees, results, notices and messages.",
    headline: "Know how your child is doing, without calling the office",
    intro: "Parents follow attendance, fees, results and notices from any phone, pay what is due and message the class teacher directly.",
    does: ["Same-day alerts when a child is absent", "Fees due, with a clear way to pay", "Results and report cards when they are published", "A direct message to the class teacher"],
    demoRole: "parent",
    visual: "fees",
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);
