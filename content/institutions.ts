// Institution types shown at /institutions. TODO: confirm each type and feature list with the product team.
export type Institution = {
  slug: string;
  name: string;
  title: string;
  summary: string;
  headline: string;
  intro: string;
  challenges: { title: string; text: string }[];
  features: string[];
  modules: string[];
  scene: "kindergarten" | "school" | "college" | "madrasa" | "coaching" | "group";
  visual: "dashboard" | "attendance" | "notices" | "fees" | "branches" | "tracking";
};

export const institutions: Institution[] = [
  {
    slug: "kindergartens",
    name: "Kindergartens",
    title: "For kindergartens",
    summary: "Daily attendance, short parent updates and simple fee records for young learners.",
    headline: "Simple daily routines for young learners",
    intro: "Keep daily attendance, short updates for parents and simple fee records, without the weight of a system built for a university.",
    challenges: [
      { title: "Parents want daily reassurance", text: "Short notices and same-day absence messages keep families informed." },
      { title: "Fee records scattered across notebooks", text: "Receipts and dues sit next to each child's record." },
      { title: "Small teams with little admin time", text: "A register takes a minute and the rest runs from one screen." },
    ],
    features: ["Daily attendance", "Notices to parents", "Fee tracking and receipts", "Student profiles", "Simple reports"],
    modules: ["attendance", "notices-and-announcements", "fees-and-payments", "students"],
    scene: "kindergarten",
    visual: "attendance",
  },
  {
    slug: "schools",
    name: "Schools",
    title: "For schools",
    summary: "Classes, exams and fees from one system, with guardians kept informed every day.",
    headline: "Run the whole school from one system",
    intro: "Run classes, exams and fees from one system, with guardians kept informed every day and leadership able to see what needs attention.",
    challenges: [
      { title: "Registers and fees in different places", text: "Attendance, fees and results all read from one student record." },
      { title: "Problems found late", text: "Overdue fees and unsubmitted registers are surfaced as they happen." },
      { title: "Exam season pressure", text: "Marks entry progress and results publishing are tracked in one place." },
    ],
    features: ["Classes and sections", "Attendance with absence alerts", "Fees and receipts", "Exams and results", "Notices and parent messages"],
    modules: ["attendance", "fees-and-payments", "exams-and-results", "timetable"],
    scene: "school",
    visual: "dashboard",
  },
  {
    slug: "colleges",
    name: "Colleges",
    title: "For colleges",
    summary: "Admissions, groups and subjects, and board-ready result records.",
    headline: "Admissions and results, organised",
    intro: "Handle admissions, groups and subjects, and keep board-ready result records, while students, teachers and guardians stay informed.",
    challenges: [
      { title: "A heavy admissions season", text: "A visible pipeline and document checklist keep applications moving." },
      { title: "Groups and subjects add complexity", text: "Assign subjects and teachers by group without clashes." },
      { title: "Result records must be accurate", text: "Marks entry and published results are tracked and kept together." },
    ],
    features: ["Admissions pipeline", "Groups and subjects", "Results and marksheets", "Student documents", "Reports for leadership"],
    modules: ["admissions", "classes-and-subjects", "exams-and-results", "student-attendance-financial-and-academic-reports"],
    scene: "college",
    visual: "tracking",
  },
  {
    slug: "madrasas",
    name: "Madrasas",
    title: "For madrasas",
    summary: "Student records, attendance, fees and notices organised in one place.",
    headline: "Records, attendance and fees in one place",
    intro: "Keep student records, attendance, fees and notices organised in one place, with simple reports for the management committee.",
    challenges: [
      { title: "Records kept on paper", text: "Student profiles and documents move to one searchable record." },
      { title: "Fee follow-up takes time", text: "Dues and reminders are visible by class." },
      { title: "Committees want clear reports", text: "Standard reports are one click away." },
    ],
    features: ["Student records", "Attendance", "Fees and receipts", "Notices", "Reports"],
    modules: ["students", "attendance", "fees-and-payments", "notices-and-announcements"],
    scene: "madrasa",
    visual: "fees",
  },
  {
    slug: "coaching-centres",
    name: "Coaching centres",
    title: "For coaching centres",
    summary: "Batches, attendance and fee dues without spreadsheets.",
    headline: "Batches, attendance and dues without spreadsheets",
    intro: "Track batches, attendance and fee dues without spreadsheets, and message students and guardians directly.",
    challenges: [
      { title: "Many batches, many schedules", text: "Class and batch lists keep every group organised." },
      { title: "Dues slip through", text: "Overdue accounts are flagged and reminders go out in bulk." },
      { title: "Students change often", text: "Records stay current as batches change." },
    ],
    features: ["Class and batch lists", "Attendance", "Fee dues and reminders", "Notices to students", "Reports"],
    modules: ["classes-and-subjects", "attendance", "fees-and-payments", "messages-and-parent-communication"],
    scene: "coaching",
    visual: "notices",
  },
  {
    slug: "multi-branch-groups",
    name: "Multi-branch groups",
    title: "For multi-branch groups",
    summary: "Compare every campus and manage them all from one account.",
    headline: "One view across every campus",
    intro: "Compare every campus and manage them all from one account, with shared settings and local control where you need it.",
    challenges: [
      { title: "No single view of the group", text: "Compare attendance, collection and admissions across branches." },
      { title: "Policies drift between campuses", text: "Set shared settings once, with local overrides." },
      { title: "Access needs care", text: "Roles can span branches or stay inside one." },
    ],
    features: ["Branch comparison", "Shared settings with local control", "Roles across branches", "Consolidated reports", "Custom onboarding"],
    modules: ["student-attendance-financial-and-academic-reports", "fees-and-payments", "admissions", "students"],
    scene: "group",
    visual: "branches",
  },
];

export const institutionBySlug = (s: string) => institutions.find((i) => i.slug === s);
