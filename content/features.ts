// One page per module (/features/<slug>). TODO: review the copy with the product team.
import { moduleGroups, slug } from "@/content/modules";
import type { LandingProps } from "@/components/marketing/landing";

type Detail = { headline: string; intro: string; points: string[]; visual: LandingProps["visual"] };

const details: Record<string, Detail> = {
  students: {
    headline: "Every student record in one place",
    intro: "Profiles, guardians, documents and history live on one record, so the office stops hunting through registers and spreadsheets.",
    points: ["Profiles with guardians, contacts and photos", "Documents on file, and which ones are still missing", "Search, filter and export any class or section list", "Admission-to-graduation history on one timeline"],
    visual: "dashboard",
  },
  "teachers-and-staff": {
    headline: "Know who is in today, and who is covering",
    intro: "Staff records, daily presence and leave sit together, so an absent teacher is covered before a class is left alone.",
    points: ["Staff records with roles, departments and class assignments", "Daily presence, late and leave status", "Cover arranged in one click", "Leave requests approved with a clear trail"],
    visual: "staff",
  },
  parents: {
    headline: "Guardians linked to their children",
    intro: "Every guardian contact is tied to the right students, so messages and fee reminders reach the right household.",
    points: ["One guardian linked to several children", "Contact details kept current in one place", "Message history per family", "A parent view of attendance, fees and results"],
    visual: "notices",
  },
  "classes-and-subjects": {
    headline: "Classes, sections and subjects, organised",
    intro: "Set up sections, class teachers, rooms and subject assignments once, and every other module uses them.",
    points: ["Sections with class teachers and rooms", "Subject assignment by class and teacher", "Class lists that update as students move", "Shared by attendance, timetable and exams"],
    visual: "tracking",
  },
  timetable: {
    headline: "A timetable without clashes",
    intro: "Build the weekly timetable and see room and teacher conflicts before they reach a classroom.",
    points: ["Weekly timetable by class, teacher and room", "Clash detection for rooms and teachers", "Today's schedule on any phone", "Changes shown to teachers and students"],
    visual: "attendance",
  },
  "exams-and-results": {
    headline: "From exam routine to published results",
    intro: "Plan exams, follow marks entry progress and publish results when they are ready, not before.",
    points: ["Exam routines by class and subject", "Marks entry progress per teacher, with deadlines", "Grading rules applied consistently", "Results published to students and parents together"],
    visual: "reports",
  },
  admissions: {
    headline: "Admissions in a clear pipeline",
    intro: "Applications, document checklists and approvals move through visible stages, so nothing waits on someone's memory.",
    points: ["Applications by stage, from new to enrolled", "Document checklist per applicant, with requests in one click", "Approvals with a clear trail", "Accepted applicants become student records"],
    visual: "tracking",
  },
  attendance: {
    headline: "Attendance marked in a minute",
    intro: "Teachers mark a class from a phone, the office sees which sections are still missing, and guardians hear about absences the same day.",
    points: ["Class-by-class registers on any phone", "Reminders for sections not yet marked", "Absence alerts to guardians", "Daily and monthly attendance reports"],
    visual: "attendance",
  },
  "leave-documents-and-certificates": {
    headline: "Requests handled, not lost",
    intro: "Leave requests, document collection and certificate issue follow one approval flow with a record of who decided what.",
    points: ["Leave requests with approve or decline", "Document collection with reminders", "Certificates issued from student records", "A trail for every decision"],
    visual: "tracking",
  },
  "fees-and-payments": {
    headline: "Know who owes what",
    intro: "Dues, payments and receipts are tracked per student, with overdue accounts a click away and reminders sent from the same screen.",
    points: ["Fee structure by class and student", "Payments recorded with printable receipts", "Overdue accounts with one-click reminders", "Collection summary for the office and leadership"],
    visual: "fees",
  },
  "invoices-and-financial-reports": {
    headline: "Invoices and collection, tracked",
    intro: "Generate invoices for a class or the whole institution, then follow collection without a spreadsheet.",
    points: ["Invoices generated in bulk by class", "Status per invoice: paid, partial, overdue", "Collection reports by period and class", "Export for your accountant"],
    visual: "fees",
  },
  "notices-and-announcements": {
    headline: "Publish once, see who read it",
    intro: "Send a notice to a class, a section or everyone, schedule it, and see who has read it.",
    points: ["Target a class, section or the whole institution", "Schedule notices ahead of time", "Read status per recipient", "A searchable notice history"],
    visual: "notices",
  },
  "messages-and-parent-communication": {
    headline: "Reach the right parents, fast",
    intro: "Message one guardian or a whole group, such as a class or everyone with fees due, and keep the history.",
    points: ["Direct messages between teachers and parents", "Bulk messages targeted by class or fee status", "Templates for common messages", "Message history per family"],
    visual: "notices",
  },
  "student-attendance-financial-and-academic-reports": {
    headline: "Answers for leadership, on demand",
    intro: "Standard reports are one click away, and custom reports can be built from any field, so no one is asked to compile them by hand.",
    points: ["Student, attendance, financial and academic reports", "Custom reports from any field", "Filter by class, section, period or branch", "Export to Excel or PDF"],
    visual: "reports",
  },
};

export type FeaturePage = Detail & { slug: string; name: string; group: string; summary: string };

export const featurePages: FeaturePage[] = moduleGroups.flatMap((g) =>
  g.modules.map((m) => {
    const d = details[slug(m.name)];
    if (!d) throw new Error(`Missing feature detail for ${m.name}`);
    return { ...d, slug: slug(m.name), name: m.name, group: g.title, summary: m.summary };
  }),
);

export const featureBySlug = (s: string) => featurePages.find((f) => f.slug === s);
export const groupBySlug = (s: string) => moduleGroups.find((g) => slug(g.title) === s);
