import { Section } from "@/components/editorial/section";
import { steps } from "@/content/home";

export function HowItWorks() {
  return (
    <Section layout="split" label="Getting started" title="Up and running in three steps" className="bg-paper">
      <ol className="border-t-2 border-foreground">
        {steps.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-b py-6 sm:grid-cols-[5rem_1fr]">
            <span className="tnum font-display text-5xl leading-none text-accent">{i + 1}</span>
            <div>
              <h3 className="text-2xl">{s.title}</h3>
              <p className="mt-1.5 text-muted-foreground">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
