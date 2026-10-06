import { Section } from "@/components/shared/section";
import { institutionTypes } from "@/content/home";

export function Institutions() {
  return (
    <Section
      tone="muted"
      eyebrow="Built for every level"
      title="One platform, from first grade to college"
      intro="Whatever your size or stage, the system adapts to how your institution already works."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {institutionTypes.map(({ icon: Icon, name, text }) => (
          <li key={name} className="card card-hover reveal p-7">
            <Icon className="size-7 text-gold-text" aria-hidden />
            <h3 className="mt-5 text-lg font-semibold">{name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
