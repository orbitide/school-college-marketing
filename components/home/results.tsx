import { Section } from "@/components/editorial/section";
import { ResultsTable } from "@/components/editorial/results-table";

export function Results() {
  return (
    <Section
      label="Examinations and results"
      title="Results published in hours, not weeks"
      intro="Enter marks once. Grading, GPA, tabulation sheets and printable marksheets follow automatically."
      className="bg-paper"
    >
      <ResultsTable />
    </Section>
  );
}
