// One page per module (/features/<slug>). TODO: review the copy with the product team.
import { moduleGroups, slug } from "@/content/modules";
import type { LandingProps } from "@/components/marketing/landing";

type Pair = { title: string; text: string };
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

const extras: Record<string, { benefits: Pair[]; steps: Pair[]; roles: string[] }> = {
  students: {
    benefits: [{ title: "No more lost paperwork", text: "Documents, guardians and history sit on one record anyone with access can open." }, { title: "Faster office work", text: "Search and filter any list in seconds instead of paging through registers." }, { title: "One source of truth", text: "Attendance, fees and results all read from the same student record." }],
    steps: [{ title: "Import or add students", text: "Bring in existing lists from Excel or CSV, or add students one by one." }, { title: "Link guardians and documents", text: "Attach guardians and the documents you need on file." }, { title: "Use the record everywhere", text: "Classes, fees, attendance and results pick it up automatically." }],
    roles: ["administrators", "teachers"],
  },
  "teachers-and-staff": {
    benefits: [{ title: "Know who is in", text: "Presence, late and leave status for the whole staff in one view." }, { title: "Cover before it is a problem", text: "Absent teachers are flagged so a class is never left unattended." }, { title: "Clear leave trail", text: "Requests and approvals are recorded, not remembered." }],
    steps: [{ title: "Add staff records", text: "Roles, departments and class teacher assignments." }, { title: "Mark presence daily", text: "Staff presence is recorded each day, with late and leave status." }, { title: "Arrange cover in one click", text: "Assign a substitute and the timetable follows." }],
    roles: ["administrators", "teachers"],
  },
  parents: {
    benefits: [{ title: "Messages reach the right home", text: "Each guardian is linked to their children, so nothing goes to the wrong family." }, { title: "Fewer calls to the office", text: "Parents see attendance, fees and results themselves." }, { title: "A record of every message", text: "Message history stays attached to the family." }],
    steps: [{ title: "Link guardians to students", text: "One guardian can be linked to several children." }, { title: "Share access", text: "Guardians sign in from any phone browser." }, { title: "Communicate in one place", text: "Notices, messages and fee reminders reach them directly." }],
    roles: ["parents", "administrators"],
  },
  "classes-and-subjects": {
    benefits: [{ title: "Set up once", text: "Sections, rooms and subjects feed every other module." }, { title: "Fewer clashes", text: "Teacher and room assignments are visible before the timetable is built." }, { title: "Always current", text: "Class lists update as students move between sections." }],
    steps: [{ title: "Create classes and sections", text: "Define classes, sections and rooms." }, { title: "Assign teachers and subjects", text: "Set class teachers and who teaches what." }, { title: "Enrol students", text: "Class lists flow into attendance, exams and fees." }],
    roles: ["administrators", "teachers"],
  },
  timetable: {
    benefits: [{ title: "Clashes caught early", text: "Room and teacher conflicts are flagged before they reach a classroom." }, { title: "Everyone sees the same plan", text: "Teachers and students see today's schedule on their phones." }, { title: "Changes are easy", text: "Move a period and the conflict check runs again." }],
    steps: [{ title: "Add periods and rooms", text: "Set up the weekly structure and available rooms." }, { title: "Assign classes", text: "Place classes, subjects and teachers into the grid." }, { title: "Resolve conflicts", text: "Fix flagged clashes, then publish." }],
    roles: ["administrators", "teachers", "students"],
  },
  "exams-and-results": {
    benefits: [{ title: "No chasing marks", text: "See which teachers have finished marks entry and which have not." }, { title: "Consistent grading", text: "Grading rules apply the same way to every class." }, { title: "Results on your schedule", text: "Publish when you are ready, to students and parents together." }],
    steps: [{ title: "Plan the exam routine", text: "Create exams by class and subject with dates." }, { title: "Collect marks", text: "Teachers enter marks and progress is tracked against deadlines." }, { title: "Publish results", text: "Results go live for students and parents." }],
    roles: ["administrators", "teachers", "students", "parents"],
  },
  admissions: {
    benefits: [{ title: "Nothing stalls unseen", text: "Every applicant sits at a visible stage with a next step." }, { title: "Fewer missing documents", text: "Checklists flag what is missing and ask the guardian for it." }, { title: "Decisions on record", text: "Each approval is logged with who decided." }],
    steps: [{ title: "Receive applications", text: "New applications enter the pipeline." }, { title: "Collect documents", text: "The checklist tracks what is in and what is missing." }, { title: "Approve and enrol", text: "Approved applicants become student records and families are told." }],
    roles: ["administrators"],
  },
  attendance: {
    benefits: [{ title: "A register in a minute", text: "Teachers mark from a phone, class by class." }, { title: "Guardians hear the same day", text: "Absence alerts go out as soon as the register is submitted." }, { title: "Gaps are visible", text: "See which sections have not submitted, and nudge them." }],
    steps: [{ title: "Teachers mark the register", text: "Present, absent or late for every student." }, { title: "Office sees the gaps", text: "Sections not yet marked are listed with a reminder button." }, { title: "Guardians are notified", text: "Absences reach parents and reports update." }],
    roles: ["teachers", "administrators", "parents"],
  },
  "leave-documents-and-certificates": {
    benefits: [{ title: "One approval flow", text: "Leave, documents and certificates follow the same path." }, { title: "Less chasing", text: "Reminders go out for documents still missing." }, { title: "A full trail", text: "Every decision is recorded." }],
    steps: [{ title: "Request is submitted", text: "A leave, document or certificate request enters the queue." }, { title: "Approver decides", text: "Approve or decline with a note." }, { title: "Outcome is recorded", text: "The requester is told and the trail is kept." }],
    roles: ["administrators", "students", "parents"],
  },
  "fees-and-payments": {
    benefits: [{ title: "Know who owes what", text: "Overdue accounts are one click away, by class." }, { title: "Follow-up without spreadsheets", text: "Select accounts and send reminders from the same screen." }, { title: "Cleaner collection", text: "Payments are recorded against the right student with a receipt." }],
    steps: [{ title: "Set the fee structure", text: "Fees by class and student." }, { title: "Record payments", text: "Each payment produces a receipt and updates the balance." }, { title: "Chase what is overdue", text: "Send reminders and watch collection improve." }],
    roles: ["administrators", "parents"],
  },
  "invoices-and-financial-reports": {
    benefits: [{ title: "Bulk invoicing", text: "Generate invoices for a class or the whole institution at once." }, { title: "Collection at a glance", text: "See paid, partial and overdue invoices." }, { title: "Ready for the accountant", text: "Export the numbers when you need them." }],
    steps: [{ title: "Generate invoices", text: "Choose a class or the whole institution." }, { title: "Track status", text: "Invoices move through paid, partial and overdue." }, { title: "Report and export", text: "Collection reports by period and class." }],
    roles: ["administrators"],
  },
  "notices-and-announcements": {
    benefits: [{ title: "Reach exactly who matters", text: "Target a class, section or everyone." }, { title: "Know it was read", text: "Read status per recipient." }, { title: "Plan ahead", text: "Schedule notices and keep a searchable history." }],
    steps: [{ title: "Write the notice", text: "Draft it once." }, { title: "Choose the audience", text: "A class, a section or the whole institution." }, { title: "Publish and track", text: "Send now or schedule, then see who has read it." }],
    roles: ["administrators", "teachers", "parents", "students"],
  },
  "messages-and-parent-communication": {
    benefits: [{ title: "Speak to the right group", text: "Message everyone in a class or everyone with fees due." }, { title: "Less repeating yourself", text: "Templates for the messages you send often." }, { title: "History in one place", text: "Every message stays attached to the family." }],
    steps: [{ title: "Pick recipients", text: "One guardian or a filtered group." }, { title: "Write or use a template", text: "Short messages that are easy to send." }, { title: "Send and keep the record", text: "History is saved per family." }],
    roles: ["teachers", "administrators", "parents"],
  },
  "student-attendance-financial-and-academic-reports": {
    benefits: [{ title: "Answers on demand", text: "Standard reports are one click away." }, { title: "Build your own", text: "Custom reports from any field." }, { title: "Share easily", text: "Export to Excel or PDF." }],
    steps: [{ title: "Choose a report", text: "Student, attendance, financial or academic." }, { title: "Filter it", text: "By class, section, period or branch." }, { title: "Export or schedule", text: "Share with leadership or the board." }],
    roles: ["administrators"],
  },
};

export type FeaturePage = Detail & { benefits: Pair[]; steps: Pair[]; roles: string[]; slug: string; name: string; group: string; summary: string };

export const featurePages: FeaturePage[] = moduleGroups.flatMap((g) =>
  g.modules.map((m) => {
    const d = details[slug(m.name)];
    const x = extras[slug(m.name)];
    if (!d || !x) throw new Error(`Missing feature detail for ${m.name}`);
    return { ...d, ...x, slug: slug(m.name), name: m.name, group: g.title, summary: m.summary };
  }),
);

export const featureBySlug = (s: string) => featurePages.find((f) => f.slug === s);
export const groupBySlug = (s: string) => moduleGroups.find((g) => slug(g.title) === s);
