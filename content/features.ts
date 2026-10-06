import {
  BellRing, CalendarCheck, ClipboardList, FileBarChart, Users, Wallet, UserPlus, LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  slug: string;
  name: string;
  icon: LucideIcon;
  audience: string;
  benefit: string;
  bullets: readonly string[];
};

export const features: readonly Feature[] = [
  {
    slug: "admissions",
    audience: "Admin",
    name: "Admissions",
    icon: UserPlus,
    benefit: "Turn enquiries into enrolled students without paper forms.",
    bullets: ["Online application and enquiry tracking", "Fewer data-entry errors", "Student records ready on day one"],
  },
  {
    slug: "attendance",
    audience: "Teachers",
    name: "Attendance",
    icon: CalendarCheck,
    benefit: "Take attendance in seconds and let parents know instantly.",
    bullets: ["Quick class-wise marking on any phone", "Automatic absence alerts to parents", "Clear daily and monthly reports"],
  },
  {
    slug: "fees",
    audience: "Accounts",
    name: "Fees & Accounts",
    icon: Wallet,
    benefit: "Collect fees on time and always know who has paid.",
    bullets: ["Fee schedules and printable receipts", "Due reminders and defaulter lists", "Daily collection summaries"],
  },
  {
    slug: "exams",
    audience: "Teachers",
    name: "Exams & Results",
    icon: ClipboardList,
    benefit: "Publish accurate results in hours, not weeks.",
    bullets: ["Marks entry and automatic grading", "Printable report cards and marksheets", "Results shared securely with parents"],
  },
  {
    slug: "parent-portal",
    audience: "Parents",
    name: "Parent Portal",
    icon: Users,
    benefit: "Keep parents informed and cut down on phone calls to the office.",
    bullets: ["Attendance, fees and results in one place", "Mobile-friendly, no app install needed", "Direct line to the school"],
  },
  {
    slug: "notices",
    audience: "Everyone",
    name: "Notices & Communication",
    icon: BellRing,
    benefit: "Reach every parent and teacher with one message.",
    bullets: ["Send notices to a class, a section or everyone", "SMS and in-portal delivery", "Holiday and event announcements"],
  },
  {
    slug: "students-staff",
    audience: "Admin",
    name: "Students & Staff",
    icon: FileBarChart,
    benefit: "One reliable record for every student and teacher.",
    bullets: ["Digital profiles and documents", "Class, section and routine management", "Quick search and export"],
  },
  {
    slug: "dashboard",
    audience: "Leadership",
    name: "Management Dashboard",
    icon: LayoutDashboard,
    benefit: "See how your institution is doing at a glance.",
    bullets: ["Attendance and collection snapshots", "Spot problems early", "Role-based access for your team"],
  },
] as const;

// Shorter list shown in the Home feature grid.
export const homeFeatureSlugs = ["admissions", "attendance", "fees", "exams", "parent-portal", "notices"] as const;
