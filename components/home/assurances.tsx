import { Section } from "@/components/editorial/section";
import { assurances } from "@/content/home";

export function Assurances() {
  return (
    <Section tone="dark" layout="split" label="Foundations" title="Dependable and private" intro="So your staff can concentrate on teaching.">
      <dl className="grid gap-x-12 border-t border-primary-foreground/40 sm:grid-cols-2">
        {assurances.map((a) => (
          <div key={a.title} className="border-b border-primary-foreground/20 py-6">
            <dt className="font-display text-2xl">{a.title}</dt>
            <dd className="mt-2 text-primary-foreground/75">{a.text}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
