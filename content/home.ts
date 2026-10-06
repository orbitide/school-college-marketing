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

export const institutionTypes = [
  { name: "Kindergarten and primary", covers: "Daily attendance, fee tracking and short parent updates for younger classes." },
  { name: "Secondary schools", covers: "Classes and sections, examinations, marksheets and result publishing." },
  { name: "Colleges", covers: "Admissions, group and subject handling, and board-ready result records." },
  { name: "Multi-branch groups", covers: "One view across every campus, on a plan tailored to your group." },
] as const;

export const assurances = [
  { title: "Works on any phone", text: "Teachers and parents use a normal mobile browser. Nothing to install." },
  { title: "Role-based access", text: "Admins, teachers, accountants and parents each see only what they should." },
  { title: "Multi-branch ready", text: "Run several campuses from one account with shared reporting." },
  { title: "Support you can reach", text: "Onboarding, staff training and help by phone and WhatsApp." },
] as const;

export const steps = [
  { title: "Book a demo", text: "We walk through the system using your institution's real needs." },
  { title: "We set you up", text: "We import your students and staff and train your team." },
  { title: "Go live", text: "Start taking attendance and collecting fees, with support whenever you need it." },
] as const;
