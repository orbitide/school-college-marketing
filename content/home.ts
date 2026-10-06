import { BookOpenCheck, Building2, GraduationCap, Landmark, Lock, Network, Smartphone, LifeBuoy, type LucideIcon } from "lucide-react";

// TODO: confirm each claim below with the product team before launch.
export const heroStats = [
  { value: "8", label: "core modules" },
  { value: "0", label: "apps for parents to install" },
  { value: "Days", label: "not months, to go live" },
  { value: "1", label: "system for the whole institution" },
] as const;

export const pains = [
  { pain: "Fees go uncollected", fix: "Automatic dues, reminders and receipts so nothing slips through." },
  { pain: "Results take weeks", fix: "Enter marks once, then publish accurate results and report cards fast." },
  { pain: "Parents keep calling", fix: "A parent portal and instant alerts answer questions before they are asked." },
] as const;

export const institutionTypes: readonly { icon: LucideIcon; name: string; text: string }[] = [
  { icon: BookOpenCheck, name: "Kindergarten & primary", text: "Simple daily attendance, fee tracking and parent updates for younger classes." },
  { icon: GraduationCap, name: "Secondary schools", text: "Class and section management, exams, marksheets and result publishing." },
  { icon: Landmark, name: "Colleges", text: "Admissions, group and subject handling, and board-ready result records." },
  { icon: Building2, name: "Multi-branch groups", text: "One view across every campus, with a plan tailored to your group." },
];

export const assurances: readonly { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Smartphone, title: "Works on any phone", text: "Teachers and parents use a normal mobile browser. Nothing to install." },
  { icon: Lock, title: "Role-based access", text: "Admins, teachers, accountants and parents each see only what they should." },
  { icon: Network, title: "Multi-branch ready", text: "Run several campuses from one account with shared reporting." },
  { icon: LifeBuoy, title: "Support you can reach", text: "Onboarding, staff training and help by phone and WhatsApp." },
];

export const steps = [
  { title: "Book a demo", text: "We walk through the system using your institution's real needs." },
  { title: "We set you up", text: "We import your students and staff and train your team." },
  { title: "Go live", text: "Start taking attendance and collecting fees, with support whenever you need it." },
] as const;
