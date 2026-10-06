import { Section } from "@/components/shared/section";

const steps = [
  { title: "Book a demo", text: "We show you the system using your institution's real needs." },
  { title: "We set you up", text: "We import your students and staff and train your team." },
  { title: "Go live", text: "Start taking attendance and collecting fees, with support whenever you need it." },
] as const;

export function HowItWorks() {
  return (
    <Section title="Up and running in three steps">
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-xl border p-6">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground" aria-hidden>
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
