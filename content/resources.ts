// Capability pages shown under "Resources". TODO: review the copy with the product team.
export type Resource = {
  slug: string;
  name: string;
  summary: string;
  headline: string;
  intro: string;
  points: string[];
  related: { label: string; href: string }[];
  benefits: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  visual: "branches" | "staff" | "attendance" | "monitoring" | "analytics" | "reports" | "tracking";
};

export const resources: Resource[] = [
  {
    slug: "enterprise",
    name: "Enterprise",
    summary: "Run several campuses from one account.",
    headline: "One view across every campus",
    intro: "Groups with more than one branch compare attendance, fee collection and admissions side by side, and set policy once.",
    points: ["Branch comparison for attendance, fees and admissions", "Shared settings with local overrides", "Roles that span branches or stay inside one", "A custom plan and onboarding for your group"],
    related: [{ label: "Pricing", href: "/pricing" }, { label: "Reports", href: "/features/student-attendance-financial-and-academic-reports" }],
    benefits: [{ title: "Compare campuses", text: "Spot the branch that needs help first." }, { title: "Set policy once", text: "Shared settings with local overrides." }, { title: "Right access for each person", text: "Roles can span branches or stay inside one." }],
    steps: [{ title: "Add your branches", text: "Each campus gets its own classes, staff and students." }, { title: "Set shared settings", text: "Fee rules, grading and templates apply across the group." }, { title: "Compare and act", text: "Branch comparisons show where to focus." }],
    visual: "branches",
  },
  {
    slug: "staff",
    name: "Staff",
    summary: "Records, daily presence and cover for absent teachers.",
    headline: "Know who is in today, and who is covering",
    intro: "Keep staff records, daily attendance and leave in one place, and arrange cover before a class is left unattended.",
    points: ["Staff records with roles, departments and class teacher assignments", "Daily presence, late and leave status", "Cover arranged in one click for absent teachers", "Leave requests approved with a clear trail"],
    related: [{ label: "Teachers and staff", href: "/features/teachers-and-staff" }],
    benefits: [{ title: "No empty classrooms", text: "Cover is arranged before the bell." }, { title: "Clear leave records", text: "Approvals leave a trail." }, { title: "A single staff view", text: "Roles, presence and assignments together." }],
    steps: [{ title: "Add staff", text: "Roles, departments and class assignments." }, { title: "Record presence daily", text: "Late and leave status included." }, { title: "Arrange cover", text: "Assign a substitute and notify them." }],
    visual: "staff",
  },
  {
    slug: "teachers",
    name: "Teachers",
    summary: "Attendance, classes and marks from a phone.",
    headline: "Tools teachers actually use",
    intro: "Teachers mark attendance, see their timetable and follow up with parents from a phone, so the register is done by the first bell.",
    points: ["Attendance in a minute per class", "Timetable, rooms and substitutions", "Marks entry with deadlines", "Messages to parents attached to the student"],
    related: [{ label: "Solutions for teachers", href: "/solutions/teachers" }],
    benefits: [{ title: "Less admin", text: "Attendance and marks from one phone." }, { title: "Better follow-up", text: "See which students need attention." }, { title: "Less paperwork", text: "Timetable and substitutions in one place." }],
    steps: [{ title: "Sign in on a phone", text: "No software to install." }, { title: "Mark the register", text: "A class takes about a minute." }, { title: "Follow up and enter marks", text: "Messages and marks attach to the student." }],
    visual: "attendance",
  },
  {
    slug: "monitoring",
    name: "Monitoring",
    summary: "See payments, registers and applications as they happen.",
    headline: "See what is happening as it happens",
    intro: "A live feed shows payments received, registers submitted and applications arriving, so problems are visible the moment they start.",
    points: ["A live activity feed across the institution", "Reminders that lead to visible results", "Alerts for sections that have not submitted attendance", "Pause the feed whenever you need to read"],
    related: [{ label: "Attendance", href: "/features/attendance" }],
    benefits: [{ title: "Problems seen early", text: "The live feed shows issues as they start." }, { title: "Reminders that work", text: "Send one and watch the count change." }, { title: "Stay in control", text: "Pause the feed whenever you need to read." }],
    steps: [{ title: "Open the live feed", text: "Payments, registers and applications as they happen." }, { title: "Spot what stalls", text: "Sections that have not submitted are flagged." }, { title: "Act from the feed", text: "Send reminders and resolve items." }],
    visual: "monitoring",
  },
  {
    slug: "analytics",
    name: "Analytics",
    summary: "Trends in attendance and fee collection.",
    headline: "Trends that lead to a decision",
    intro: "Attendance and collection trends against target show where to act, instead of a wall of numbers.",
    points: ["Attendance over time against your target", "Fee collection by month and by class", "Sections and classes that need attention first", "Every chart links to the list behind it"],
    related: [{ label: "Fees and payments", href: "/features/fees-and-payments" }],
    benefits: [{ title: "Trends, not noise", text: "Attendance and collection against target." }, { title: "Know where to act", text: "Sections and classes that need attention first." }, { title: "Charts that lead somewhere", text: "Every chart links to the list behind it." }],
    steps: [{ title: "Pick a metric", text: "Attendance or fee collection." }, { title: "Compare over time", text: "See trends by month, class or section." }, { title: "Drill into the list", text: "Open the records behind the number." }],
    visual: "analytics",
  },
  {
    slug: "reporting",
    name: "Reporting",
    summary: "Standard and custom reports for leadership.",
    headline: "Reports without the spreadsheet work",
    intro: "Run standard student, attendance, financial and academic reports in one click, or build a custom report from any field.",
    points: ["Standard reports ready to run", "Custom reports from any field", "Export to CSV for the accountant", "Scheduled reports sent to leadership"],
    related: [{ label: "Reports", href: "/features/student-attendance-financial-and-academic-reports" }, { label: "Pricing", href: "/pricing" }],
    benefits: [{ title: "Reports in one click", text: "Standard reports are ready to run." }, { title: "Flexible when you need it", text: "Custom reports from any field." }, { title: "Easy to share", text: "Export to CSV for the accountant." }],
    steps: [{ title: "Choose a report", text: "Standard or custom." }, { title: "Filter and run", text: "By class, section, period or branch." }, { title: "Export or schedule", text: "Send to leadership regularly." }],
    visual: "reports",
  },
  {
    slug: "track-management",
    name: "Track management",
    summary: "Follow applications and requests from start to decision.",
    headline: "Nothing waits in someone's notebook",
    intro: "Every application, request and document has a visible status, an owner and a next step, so progress can be tracked and nothing is lost.",
    points: ["A pipeline for admissions from application to approval", "Document checklists with missing items flagged", "Requests chased automatically", "A clear trail of who decided what"],
    related: [{ label: "Admissions", href: "/features/admissions" }],
    benefits: [{ title: "Nothing gets lost", text: "Every item has a status and an owner." }, { title: "Less chasing", text: "Missing items are requested automatically." }, { title: "A trail of decisions", text: "See who decided what and when." }],
    steps: [{ title: "Items enter the pipeline", text: "Applications and requests start at the first stage." }, { title: "Progress is tracked", text: "Stages, owners and next steps are visible." }, { title: "Decisions are recorded", text: "Outcomes are logged and families told." }],
    visual: "tracking",
  },
];

export const resourceBySlug = (slug: string) => resources.find((r) => r.slug === slug);
