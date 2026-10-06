import { Section } from "@/components/shared/section";
import { stats, testimonials } from "@/content/testimonials";

export function SocialProof() {
  return (
    <Section muted title="Trusted by schools and colleges">
      <dl className="mx-auto grid max-w-3xl grid-cols-3 gap-4 text-center">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col">
            <dt className="order-2 text-sm text-muted-foreground">{s.label}</dt>
            <dd className="order-1 font-display text-3xl font-bold text-primary">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={i} className="rounded-xl border bg-background p-6">
            <blockquote className="text-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{t.name}</span>, {t.role}, {t.institution}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
