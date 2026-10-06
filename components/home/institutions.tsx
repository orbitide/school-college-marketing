import { Section } from "@/components/editorial/section";
import { institutionTypes } from "@/content/home";

export function Institutions() {
  return (
    <Section
      layout="split"
      label="Who it is for"
      title="From first grade to college"
      intro="The same system adapts to the size and stage of your institution."
    >
      <dl className="border-t-2 border-foreground">
        {institutionTypes.map((t) => (
          <div key={t.name} className="grid gap-1 border-b py-5 sm:grid-cols-[15rem_1fr] sm:gap-8 sm:py-6">
            <dt className="font-display text-2xl">{t.name}</dt>
            <dd className="text-muted-foreground">{t.covers}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
