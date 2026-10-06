import { ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/section";
import { pains } from "@/content/home";

export function ProblemSolution() {
  return (
    <Section
      id="about"
      eyebrow="Why institutions switch"
      title="Less chasing paper, registers and phone calls"
      intro="The daily work of running an institution should not depend on spreadsheets and notebooks."
    >
      <ul className="grid gap-6 md:grid-cols-3">
        {pains.map((p, i) => (
          <li key={p.pain} className="card reveal p-8">
            <span className="font-display text-5xl font-semibold text-accent/60">0{i + 1}</span>
            <h3 className="mt-4 text-xl font-semibold">{p.pain}</h3>
            <p className="mt-3 flex items-start gap-2 text-muted-foreground">
              <ArrowRight className="mt-1 size-4 shrink-0 text-gold-text" aria-hidden />
              {p.fix}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
