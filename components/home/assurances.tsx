import { Section } from "@/components/shared/section";
import { assurances } from "@/content/home";

export function Assurances() {
  return (
    <Section
      tone="dark"
      eyebrow="Platform"
      title="Reliable foundations for a trusted institution"
      intro="Secure, simple and supported, so your staff can focus on teaching."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {assurances.map(({ icon: Icon, title, text }) => (
          <li key={title} className="glass reveal rounded-2xl p-7 transition-colors hover:bg-white/12">
            <Icon className="size-7 text-accent" aria-hidden />
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-white/70">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
