import { SplitSection } from "@/components/marketing/split-section";
import { StaffVisual } from "@/components/marketing/staff-visual";
import { site } from "@/content/site";

const hl = "font-semibold text-primary";

export function StaffSection() {
  return (
    <SplitSection
      id="staff"
      tone="paper"
      eyebrow="Track attendance and staff"
      title="Attendance and staff management on autopilot"
      body={<>Do more than take a register. With <span className={hl}>registers by section</span> and <span className={hl}>staff presence</span> in one place, you see the whole institution&rsquo;s day without chasing anyone.</>}
      callout={{ title: "Take attendance and tell guardians automatically", text: "Teachers mark a class from a phone in a minute. Absences reach parents the same day, and leadership sees which registers are still missing." }}
      points={["Reminders for teachers who have not submitted", "Absence alerts to guardians the same day", "Cover arranged for absent staff in one click"]}
      cta={{ label: "Start free trial", href: `${site.appUrl}/signup`, external: true }}
      visual={<StaffVisual />}
    />
  );
}
