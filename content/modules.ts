// Product map shown on the website. Keep in step with the application navigation (content/product/nav.ts).
export type Module = { name: string; summary: string; demo?: string };
export type ModuleGroup = { title: string; intro: string; modules: Module[] };

export const moduleGroups: ModuleGroup[] = [
  {
    title: "People",
    intro: "One record for every student, teacher, staff member and guardian.",
    modules: [
      { name: "Students", summary: "Profiles, guardians, documents and history in one place. Search, filter and export any list.", demo: "/app/students" },
      { name: "Teachers and staff", summary: "Staff records, daily attendance and who is away today.", demo: "/app/staff" },
      { name: "Parents", summary: "Guardian contacts linked to their children, with message history." },
    ],
  },
  {
    title: "Academics",
    intro: "Classes, timetables and exams without the clashes.",
    modules: [
      { name: "Classes and subjects", summary: "Sections, class teachers, rooms and subject assignments." },
      { name: "Timetable", summary: "Build the weekly timetable and catch room and teacher conflicts before they reach a classroom.", demo: "/app/timetable" },
      { name: "Exams and results", summary: "Exam routines, marks entry progress, grading and published results." },
    ],
  },
  {
    title: "Administration",
    intro: "The daily operational work, with the exceptions surfaced for you.",
    modules: [
      { name: "Admissions", summary: "Applications, document checklists and approvals in a clear pipeline.", demo: "/app/admissions" },
      { name: "Attendance", summary: "Class-by-class attendance, with reminders for sections not yet marked.", demo: "/app/attendance" },
      { name: "Leave, documents and certificates", summary: "Requests, approvals, document collection and certificate issue." },
    ],
  },
  {
    title: "Finance",
    intro: "Know who owes what, and follow up without a spreadsheet.",
    modules: [
      { name: "Fees and payments", summary: "Dues, payments and receipts, with overdue accounts a click away.", demo: "/app/fees" },
      { name: "Invoices and financial reports", summary: "Generate invoices for a class or the whole institution and track collection." },
    ],
  },
  {
    title: "Communication",
    intro: "Reach the right people once, and see who has read it.",
    modules: [
      { name: "Notices and announcements", summary: "Publish or schedule a notice to a class, a section or everyone.", demo: "/app/notices" },
      { name: "Messages and parent communication", summary: "Direct messages and bulk SMS targeted by class or fee status." },
    ],
  },
  {
    title: "Reports",
    intro: "Answers for leadership, without asking someone to build them.",
    modules: [{ name: "Student, attendance, financial and academic reports", summary: "Standard reports in one click, and custom reports from any field." }],
  },
];
