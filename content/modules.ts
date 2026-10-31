// Product map shown on the website. Keep in step with the application navigation (content/product/nav.ts).
/** Anchor id used by the Features page and its dropdown menu. */
export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export type Module = { name: string; summary: string };
export type ModuleGroup = { title: string; intro: string; modules: Module[] };

export const moduleGroups: ModuleGroup[] = [
  {
    title: "People",
    intro: "One record for every student, teacher, staff member and guardian.",
    modules: [
      { name: "Students", summary: "Profiles, guardians, documents and history in one place. Search, filter and export any list." },
      { name: "Teachers and staff", summary: "Staff records, daily attendance and who is away today." },
      { name: "Parents", summary: "Guardian contacts linked to their children, with message history." },
    ],
  },
  {
    title: "Academics",
    intro: "Classes, timetables and exams without the clashes.",
    modules: [
      { name: "Classes and subjects", summary: "Sections, class teachers, rooms and subject assignments." },
      { name: "Timetable", summary: "Build the weekly timetable and catch room and teacher conflicts before they reach a classroom." },
      { name: "Exams and results", summary: "Exam routines, marks entry progress, grading and published results." },
    ],
  },
  {
    title: "Administration",
    intro: "The daily operational work, with the exceptions surfaced for you.",
    modules: [
      { name: "Admissions", summary: "Applications, document checklists and approvals in a clear pipeline." },
      { name: "Attendance", summary: "Class-by-class attendance, with reminders for sections not yet marked." },
      { name: "Leave, documents and certificates", summary: "Requests, approvals, document collection and certificate issue." },
    ],
  },
  {
    title: "Finance",
    intro: "Know who owes what, and follow up without a spreadsheet.",
    modules: [
      { name: "Fees and payments", summary: "Dues, payments and receipts, with overdue accounts a click away." },
      { name: "Invoices and financial reports", summary: "Generate invoices for a class or the whole institution and track collection." },
    ],
  },
  {
    title: "Communication",
    intro: "Reach the right people once, and see who has read it.",
    modules: [
      { name: "Notices and announcements", summary: "Publish or schedule a notice to a class, a section or everyone." },
      { name: "Messages and parent communication", summary: "Direct messages and bulk SMS targeted by class or fee status." },
    ],
  },
  {
    title: "Reports",
    intro: "Answers for leadership, without asking someone to build them.",
    modules: [{ name: "Student, attendance, financial and academic reports", summary: "Standard reports in one click, and custom reports from any field." }],
  },
];
