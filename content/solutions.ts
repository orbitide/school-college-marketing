// Solutions by role. TODO: review the copy with the product team.
export type Solution = {
  slug: string;
  name: string;
  summary: string;
  headline: string;
  intro: string;
  does: string[];
  visual: "dashboard" | "attendance" | "notices" | "fees";
  day: { time: string; title: string; text: string }[];
  modules: string[];
};

export const solutions: Solution[] = [
  {
    slug: "administrators",
    name: "Administrators",
    summary: "Approvals, finance, attendance and the problems that need a decision.",
    headline: "See what needs your attention, and act on it",
    intro: "Principals and administrators get one view of the institution: what is overdue, what is waiting for approval and what is slipping, each with the next action beside it.",
    does: ["A Needs attention list of problems, with the evidence and a button to resolve each", "Approvals for admissions, leave and certificates in one place", "Fee collection, attendance and staff presence at a glance", "Reports for the board without asking anyone to build them"],
    visual: "dashboard",
    day: [
      { time: "Morning", title: "Open the Needs attention list", text: "See overdue fees, registers not submitted and applications waiting for approval." },
      { time: "Mid-morning", title: "Send reminders in one click", text: "Chase the sections that have not marked attendance." },
      { time: "Afternoon", title: "Approve and decide", text: "Approve admissions and leave with the full picture in one panel." },
      { time: "End of day", title: "Check collection and attendance", text: "Fee collection and attendance trends are ready without asking anyone." },
    ],
    modules: ["fees-and-payments", "attendance", "admissions", "student-attendance-financial-and-academic-reports"],
  },
  {
    slug: "teachers",
    name: "Teachers",
    summary: "Classes, attendance, students to follow up and marks to enter.",
    headline: "Less admin, more time with the class",
    intro: "Teachers see today's classes, mark attendance from a phone in a minute and know which students need a follow-up, without chasing paperwork.",
    does: ["Today's timetable and class lists on any phone", "Attendance in a minute, with guardians notified of absences", "Students to follow up, with a one-click message to the parent", "Marks entry with deadlines and progress"],
    visual: "attendance",
    day: [
      { time: "Before the first bell", title: "See today's classes", text: "Timetable and class lists are on your phone." },
      { time: "First period", title: "Mark the register", text: "Attendance takes about a minute, and guardians are notified of absences." },
      { time: "During the week", title: "Follow up on students", text: "See who is slipping and message the parent in one click." },
      { time: "Exam time", title: "Enter marks", text: "Marks entry shows your deadline and progress." },
    ],
    modules: ["attendance", "timetable", "exams-and-results", "messages-and-parent-communication"],
  },
  {
    slug: "students",
    name: "Students",
    summary: "Schedule, attendance, fees, results, notices and documents.",
    headline: "Everything a student needs from the office, in one place",
    intro: "Students check their schedule, attendance, results and notices, and see which documents or fees need attention, without queuing at the office.",
    does: ["Today's schedule and the weekly timetable", "Attendance and results as they are published", "Notices from the institution and from teachers", "Documents on file, and which ones are missing"],
    visual: "notices",
    day: [
      { time: "Morning", title: "Check today's schedule", text: "See the day's classes and rooms." },
      { time: "During the term", title: "Follow attendance", text: "See your attendance as it is recorded." },
      { time: "When published", title: "See results", text: "Results appear as soon as they are published." },
      { time: "Any time", title: "Read notices and check documents", text: "Notices from the institution, and which documents are still missing." },
    ],
    modules: ["timetable", "attendance", "exams-and-results", "notices-and-announcements"],
  },
  {
    slug: "parents",
    name: "Parents",
    summary: "Your child's attendance, fees, results, notices and messages.",
    headline: "Know how your child is doing, without calling the office",
    intro: "Parents follow attendance, fees, results and notices from any phone, pay what is due and message the class teacher directly.",
    does: ["Same-day alerts when a child is absent", "Fees due, with a clear way to pay", "Results and report cards when they are published", "A direct message to the class teacher"],
    visual: "fees",
    day: [
      { time: "School morning", title: "Hear about an absence", text: "A same-day alert tells you if your child is marked absent." },
      { time: "When fees are due", title: "See what is due", text: "Fees due are shown clearly, with a way to pay." },
      { time: "After exams", title: "Read results", text: "Results and report cards arrive when published." },
      { time: "Any time", title: "Message the class teacher", text: "Messages stay attached to your child's record." },
    ],
    modules: ["attendance", "fees-and-payments", "exams-and-results", "messages-and-parent-communication"],
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);
