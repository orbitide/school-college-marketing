// Capability pages shown under "Resources". TODO: review the copy with the product team.
export type Resource = {
  slug: string;
  name: string;
  summary: string;
  headline: string;
  intro: string;
  points: string[];
  related: { label: string; href: string }[];
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
    related: [{ label: "Pricing", href: "/pricing" }, { label: "Reports", href: "/features#reports" }],
    visual: "branches",
  },
  {
    slug: "staff",
    name: "Staff",
    summary: "Records, daily presence and cover for absent teachers.",
    headline: "Know who is in today, and who is covering",
    intro: "Keep staff records, daily attendance and leave in one place, and arrange cover before a class is left unattended.",
    points: ["Staff records with roles, departments and class teacher assignments", "Daily presence, late and leave status", "Cover arranged in one click for absent teachers", "Leave requests approved with a clear trail"],
    related: [{ label: "Teachers and staff", href: "/features#teachers-and-staff" }, { label: "Open in the demo app", href: "/app/staff" }],
    visual: "staff",
  },
  {
    slug: "teachers",
    name: "Teachers",
    summary: "Attendance, classes and marks from a phone.",
    headline: "Tools teachers actually use",
    intro: "Teachers mark attendance, see their timetable and follow up with parents from a phone, so the register is done by the first bell.",
    points: ["Attendance in a minute per class", "Timetable, rooms and substitutions", "Marks entry with deadlines", "Messages to parents attached to the student"],
    related: [{ label: "Solutions for teachers", href: "/solutions/teachers" }, { label: "Open in the demo app", href: "/app/attendance" }],
    visual: "attendance",
  },
  {
    slug: "monitoring",
    name: "Monitoring",
    summary: "See payments, registers and applications as they happen.",
    headline: "See what is happening as it happens",
    intro: "A live feed shows payments received, registers submitted and applications arriving, so problems are visible the moment they start.",
    points: ["A live activity feed across the institution", "Reminders that lead to visible results", "Alerts for sections that have not submitted attendance", "Pause the feed whenever you need to read"],
    related: [{ label: "Try the live demo", href: "/app/dashboard" }, { label: "Attendance", href: "/features#attendance" }],
    visual: "monitoring",
  },
  {
    slug: "analytics",
    name: "Analytics",
    summary: "Trends in attendance and fee collection.",
    headline: "Trends that lead to a decision",
    intro: "Attendance and collection trends against target show where to act, instead of a wall of numbers.",
    points: ["Attendance over time against your target", "Fee collection by month and by class", "Sections and classes that need attention first", "Every chart links to the list behind it"],
    related: [{ label: "Fees and payments", href: "/features#fees-and-payments" }, { label: "Open in the demo app", href: "/app/dashboard" }],
    visual: "analytics",
  },
  {
    slug: "reporting",
    name: "Reporting",
    summary: "Standard and custom reports for leadership.",
    headline: "Reports without the spreadsheet work",
    intro: "Run standard student, attendance, financial and academic reports in one click, or build a custom report from any field.",
    points: ["Standard reports ready to run", "Custom reports from any field", "Export to CSV for the accountant", "Scheduled reports sent to leadership"],
    related: [{ label: "Reports", href: "/features#reports" }, { label: "Pricing", href: "/pricing" }],
    visual: "reports",
  },
  {
    slug: "track-management",
    name: "Track management",
    summary: "Follow applications and requests from start to decision.",
    headline: "Nothing waits in someone's notebook",
    intro: "Every application, request and document has a visible status, an owner and a next step, so progress can be tracked and nothing is lost.",
    points: ["A pipeline for admissions from application to approval", "Document checklists with missing items flagged", "Requests chased automatically", "A clear trail of who decided what"],
    related: [{ label: "Admissions", href: "/features#admissions" }, { label: "Open in the demo app", href: "/app/admissions" }],
    visual: "tracking",
  },
];

export const resourceBySlug = (slug: string) => resources.find((r) => r.slug === slug);
