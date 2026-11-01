import { AdmissionsVisual } from "@/components/marketing/admissions-visual";
import { SplitSection } from "@/components/marketing/split-section";

const hl = "font-semibold text-primary";

export function AdmissionsSection() {
  return (
    <SplitSection
      id="admissions"
      tone="surface"
      reverse
      eyebrow="Admissions and approvals"
      title="Decide on time, with every document in place"
      body={<>Stop drowning in folders, phone calls and &ldquo;where is this application?&rdquo; questions. Move applicants from enquiry to enrolment with a clear <span className={hl}>admissions pipeline</span> and checklists that chase missing documents for you.</>}
      callout={{ title: "Applications that keep moving", text: <>Forget manual <span className={hl}>status tracking</span>. Every applicant has a stage, a document checklist and a next step, so nothing waits in someone&rsquo;s notebook.</> }}
      points={["Document requests sent to guardians in one click", "Approvals with the full picture in one panel", "Every decision recorded, and families notified"]}
      cta={{ label: "Take me on a tour", href: "/demo" }}
      visual={<AdmissionsVisual />}
    />
  );
}
