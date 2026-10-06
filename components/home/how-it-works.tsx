import { Section } from "@/components/shared/section";
import { steps } from "@/content/home";

export function HowItWorks() {
  return (
    <Section eyebrow="Getting started" title="Up and running in three steps">
      <ol className="relative mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
        <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent md:block" />
        {steps.map((s, i) => (
          <li key={s.title} className="reveal relative text-center">
            <span className="relative mx-auto flex size-12 items-center justify-center rounded-full bg-primary font-display text-lg font-semibold text-accent shadow-soft ring-8 ring-background">
              {i + 1}
            </span>
            <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
