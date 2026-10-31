import {
  BadgeCheck, BellRing, BookOpenCheck, CalendarCheck, ChartColumn, FileSpreadsheet, GraduationCap,
  Landmark, MessagesSquare, ReceiptText, School, UserPlus, Users, type LucideIcon,
} from "lucide-react";

export type Feature = { slug: string; icon: LucideIcon; name: string; summary: string; points: readonly string[] };

export const features: readonly Feature[] = [
  {
    slug: "admissions",
    icon: UserPlus,
    name: "Admissions",
    summary: "Take applications online and move each one from enquiry to enrolment without losing paperwork.",
    points: ["Online application and document upload", "A checklist per applicant, with missing items flagged", "Approve, decline and notify guardians in one place", "Approved applicants become student records automatically"],
  },
  {
    slug: "students",
    icon: Users,
    name: "Students and staff",
    summary: "One record for every student, guardian, teacher and staff member, shared by every team.",
    points: ["Profiles, guardians, documents and history together", "Classes, sections, subjects and teacher assignments", "Search, filter and export any list", "Bulk import from your existing spreadsheets"],
  },
  {
    slug: "fees",
    icon: ReceiptText,
    name: "Fees and accounts",
    summary: "Know who owes what, collect on time and give the accountant clean records.",
    points: ["Fee structures by class, with discounts and waivers", "Receipts and invoices generated automatically", "Overdue accounts in one list, with bulk reminders", "Collection and dues reports ready for audit"],
  },
  {
    slug: "attendance",
    icon: CalendarCheck,
    name: "Attendance",
    summary: "Registers marked on a phone in under a minute, with absences reaching guardians the same day.",
    points: ["Class-by-class daily attendance", "Reminders for sections not yet marked", "Automatic absence alerts to guardians", "Staff attendance and leave tracking"],
  },
  {
    slug: "exams",
    icon: BookOpenCheck,
    name: "Exams and results",
    summary: "From exam routine to published report card, with fewer transcription errors along the way.",
    points: ["Exam schedules and timetable clash checks", "Marks entry by subject teachers, with progress visible to admins", "Grading rules configured once, applied everywhere", "Report cards and result sheets, ready to print or share"],
  },
  {
    slug: "communication",
    icon: MessagesSquare,
    name: "Parent and teacher communication",
    summary: "Reach the right people once, and see who has read it.",
    points: ["Notices to a class, a section or everyone", "SMS and in-portal messages", "A parent portal that works in any mobile browser", "Direct messages between parents and teachers"],
  },
  {
    slug: "reports",
    icon: ChartColumn,
    name: "Reports and insights",
    summary: "Answers for leadership without asking someone to build a spreadsheet.",
    points: ["Attendance, fee collection and academic reports", "A management view of what needs attention today", "Filter by class, section or period", "Export to Excel or PDF"],
  },
];

export const problems = [
  { icon: FileSpreadsheet, problem: "Records scattered across spreadsheets and registers", outcome: "One shared record per student that every team reads from." },
  { icon: CalendarCheck, problem: "Attendance chased and re-typed at the end of the day", outcome: "Marked on a phone, with absences sent to parents automatically." },
  { icon: ReceiptText, problem: "Fee dues tracked by hand and followed up late", outcome: "Every due and overdue account in one list, with reminders in a click." },
  { icon: UserPlus, problem: "Admission paperwork lost between desks", outcome: "A clear pipeline where missing documents are requested for you." },
  { icon: BellRing, problem: "Notices that never reach every parent", outcome: "Publish once to the right audience and see who has read it." },
  { icon: BookOpenCheck, problem: "Result preparation that takes weeks and breeds errors", outcome: "Marks entered once, grades calculated, report cards generated." },
] as const;

export const steps = [
  { title: "Tell us about your institution", text: "Share your classes, fee structure and how you work today. We configure the system around it." },
  { title: "We import your data", text: "Bring your student and staff lists as spreadsheets. We help map and check them before anyone logs in." },
  { title: "Train staff and go live", text: "Short training for administrators and teachers, then a supported first term." },
] as const;

export const audiences = [
  { role: "Principals and owners", icon: Landmark, text: "See attendance, collections and admissions at a glance, and spot problems before they grow." },
  { role: "Administrators and accountants", icon: ReceiptText, text: "Spend less time collating and chasing. Receipts, dues and reports come from one source." },
  { role: "Teachers", icon: GraduationCap, text: "Mark attendance and enter marks in minutes, then get back to teaching." },
  { role: "Parents", icon: MessagesSquare, text: "Attendance, fees, results and notices on a phone, without calling the office." },
] as const;

export const solutions = [
  {
    slug: "schools",
    icon: School,
    name: "For schools",
    intro: "Primary and secondary schools, including English-medium and madrasa institutions.",
    needs: ["Class and section management from nursery to the final year", "Monthly fee collection with sibling discounts and waivers", "Daily attendance with same-day alerts to guardians", "Term exams, report cards and parent communication"],
  },
  {
    slug: "colleges",
    icon: GraduationCap,
    name: "For colleges",
    intro: "Higher secondary and degree colleges with larger cohorts and more varied schedules.",
    needs: ["Admissions with merit lists and document verification", "Groups, subjects and electives per student", "Semester or term fees, installments and dues", "Result processing across subjects and examiners"],
  },
  {
    slug: "groups",
    icon: Landmark,
    name: "For multi-branch groups",
    intro: "Institutions running several campuses under one management.",
    needs: ["One view across branches, with separate access per campus", "Consistent fee and grading rules where you want them", "Group-level reports for leadership", "Custom onboarding for each branch"],
  },
] as const;

export const securityPractices = [
  { icon: BadgeCheck, title: "Role-based access", text: "Each person sees only what their role needs. Teachers see their classes, accountants see fees, parents see their own children. Administrators decide who gets what." },
  { icon: BellRing, title: "Audit trail", text: "Sensitive actions such as fee edits, mark changes and permission updates are recorded with who did them and when." },
  { icon: Landmark, title: "Encryption", text: "Data is encrypted in transit over HTTPS and encrypted at rest on the servers that store it." },
  { icon: FileSpreadsheet, title: "Backups and recovery", text: "Data is backed up regularly so a failure does not mean lost records. Ask us for the current backup schedule and recovery process." },
  { icon: Users, title: "Your data stays yours", text: "Your institution owns its data. We never sell it or use it for advertising, and you can export it at any time." },
  { icon: School, title: "Protection for student information", text: "Student and guardian details are treated as sensitive. Access is limited, and staff accounts can be removed the day someone leaves." },
] as const;

export const faqs = [
  { q: "Who is this system for?", a: "Schools and colleges in Bangladesh, from a single small institution to groups with several branches." },
  { q: "What problems does it solve?", a: "It replaces scattered spreadsheets and registers with one system for admissions, attendance, fees, exams and parent communication, so staff spend less time on paperwork and fewer things slip through." },
  { q: "How long does setup take?", a: "Most institutions are up and running within a few days to a couple of weeks, depending on how much data needs importing. We help import student data and train your staff." },
  { q: "Can we move our existing data across?", a: "Yes. Send us your student, staff and fee lists as spreadsheets. We map and check them with you before go-live." },
  { q: "Can parents use it on their phones?", a: "Yes. The parent portal works in any mobile browser, so there is nothing to install." },
  { q: "Is our data safe?", a: "Access is role-based, sensitive actions are logged, and data is encrypted in transit and at rest. Your institution owns its data and we never sell it. See the Security page for details." },
  { q: "Can we export our data if we leave?", a: "Yes. Your data belongs to your institution, and you can export it at any time." },
  { q: "Do you support multiple branches?", a: "Yes. Contact us and we will set up access and reporting for each campus." },
  { q: "How is pricing decided?", a: "By the number of students. Talk to us and we will give you a clear quote with no hidden charges." },
] as const;
