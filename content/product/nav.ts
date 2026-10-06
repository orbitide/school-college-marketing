import {
  Award, BarChart3, Bell, BookOpen, CalendarClock, CalendarDays, ClipboardCheck, FileText, GraduationCap, LayoutDashboard, MessageSquare,
  Receipt, School, Settings, UserPlus, Users, Wallet, Contact, FileSpreadsheet, Megaphone, UserCog,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/lib/role";

export type NavItem = { label: string; href: string; icon: LucideIcon; roles: Role[]; built: boolean };
export type NavGroup = { title: string; items: NavItem[] };

const all: Role[] = ["admin", "teacher", "student", "parent"];
const staffRoles: Role[] = ["admin", "teacher"];

export const navGroups: NavGroup[] = [
  { title: "Overview", items: [{ label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard, roles: all, built: true }] },
  {
    title: "People",
    items: [
      { label: "Students", href: "/app/students", icon: GraduationCap, roles: staffRoles, built: true },
      { label: "Teachers and staff", href: "/app/staff", icon: Users, roles: ["admin"], built: true },
      { label: "Parents", href: "/app/parents", icon: Contact, roles: ["admin"], built: false },
    ],
  },
  {
    title: "Academics",
    items: [
      { label: "Classes", href: "/app/classes", icon: School, roles: staffRoles, built: false },
      { label: "Subjects", href: "/app/subjects", icon: BookOpen, roles: staffRoles, built: false },
      { label: "Timetable", href: "/app/timetable", icon: CalendarDays, roles: ["admin", "teacher", "student"], built: true },
      { label: "Exams", href: "/app/exams", icon: ClipboardCheck, roles: staffRoles, built: false },
      { label: "Results", href: "/app/results", icon: Award, roles: ["admin", "teacher", "student", "parent"], built: false },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "Admissions", href: "/app/admissions", icon: UserPlus, roles: ["admin"], built: true },
      { label: "Attendance", href: "/app/attendance", icon: CalendarClock, roles: ["admin", "teacher", "student", "parent"], built: true },
      { label: "Leave", href: "/app/leave", icon: UserCog, roles: ["admin", "teacher"], built: false },
      { label: "Documents", href: "/app/documents", icon: FileText, roles: ["admin", "student"], built: false },
      { label: "Certificates", href: "/app/certificates", icon: Award, roles: ["admin", "student"], built: false },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Fees and payments", href: "/app/fees", icon: Wallet, roles: ["admin", "student", "parent"], built: true },
      { label: "Invoices", href: "/app/invoices", icon: Receipt, roles: ["admin"], built: false },
      { label: "Financial reports", href: "/app/reports", icon: FileSpreadsheet, roles: ["admin"], built: false },
    ],
  },
  {
    title: "Communication",
    items: [
      { label: "Notices", href: "/app/notices", icon: Bell, roles: all, built: true },
      { label: "Messages", href: "/app/messages", icon: MessageSquare, roles: all, built: false },
      { label: "Parent communication", href: "/app/parent-communication", icon: Megaphone, roles: staffRoles, built: false },
    ],
  },
  { title: "Reports", items: [{ label: "Reports", href: "/app/reports", icon: BarChart3, roles: staffRoles, built: false }] },
  { title: "Institution", items: [{ label: "Settings", href: "/app/settings", icon: Settings, roles: ["admin"], built: false }] },
];

/** Pages that are in the navigation but not built in this prototype. */
export const placeholders: Record<string, { title: string; summary: string; does: string[] }> = {
  parents: { title: "Parents", summary: "Guardian records linked to their children.", does: ["Keep contact details and relationships in one record", "See which parents have not read a notice", "Message a guardian directly"] },
  classes: { title: "Classes", summary: "Classes, sections, class teachers and rooms.", does: ["Create and restructure sections each year", "Assign class teachers and rooms", "See class strength and who is over capacity"] },
  subjects: { title: "Subjects", summary: "The subjects taught in each class and who teaches them.", does: ["Map subjects to classes and teachers", "Set marks distribution per subject", "Spot subjects with no teacher assigned"] },
  exams: { title: "Exams", summary: "Examination schedules, rooms and invigilation.", does: ["Build the exam routine without clashes", "Assign rooms and invigilators", "Open and close marks entry per class"] },
  results: { title: "Results", summary: "Marks, grades and published results.", does: ["Review marks entry progress by teacher", "Publish results to parents and students", "Print marksheets and tabulation sheets"] },
  leave: { title: "Leave", summary: "Leave requests for staff and students.", does: ["Approve or decline in one click", "See who is away on any day", "Arrange cover for absent teachers"] },
  documents: { title: "Documents", summary: "Student and staff documents.", does: ["Collect documents once and reuse them", "Chase missing documents automatically", "Keep a clear audit trail"] },
  certificates: { title: "Certificates", summary: "Transfer, character and study certificates.", does: ["Issue from templates with one click", "Track who requested and who approved", "Keep a register of every certificate"] },
  invoices: { title: "Invoices", summary: "Fee invoices and receipts.", does: ["Generate invoices for a class or the whole institution", "Reissue and cancel with a reason", "Print and email receipts"] },
  messages: { title: "Messages", summary: "Direct messages between staff, students and parents.", does: ["Keep conversations attached to the student", "Route questions to the right teacher", "See what is unanswered"] },
  "parent-communication": { title: "Parent communication", summary: "Bulk SMS and portal messages to guardians.", does: ["Target by class, section or fee status", "Schedule messages", "See delivery and read status"] },
  reports: { title: "Reports", summary: "Student, attendance, financial and academic reports, plus custom reports.", does: ["Run standard reports in one click", "Build a custom report from any field", "Schedule reports to leadership"] },
  settings: { title: "Institution settings", summary: "Institution profile, academic year, roles and permissions.", does: ["Set up the academic year and terms", "Control who can see and change what", "Configure fees, grading and notices"] },
};
