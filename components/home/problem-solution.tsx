import { Section } from "@/components/shared/section";

// TODO: validate pains with customer interviews.
const pains = [
  { pain: "Fees go uncollected", fix: "Automatic dues, reminders and receipts so nothing slips through." },
  { pain: "Results take weeks", fix: "Enter marks once and publish accurate results and report cards fast." },
  { pain: "Parents are always calling", fix: "A parent portal and instant alerts answer questions before they are asked." },
] as const;

export function ProblemSolution() {
  return (
    <Section title="Stop chasing paper, registers and phone calls" intro="The daily work of running an institution should not depend on spreadsheets and notebooks.">
      <ul className="grid gap-6 md:grid-cols-3">
        {pains.map((p) => (
          <li key={p.pain} className="rounded-xl border p-6">
            <h3 className="text-lg font-semibold text-destructive">{p.pain}</h3>
            <p className="mt-3 text-muted-foreground">{p.fix}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
