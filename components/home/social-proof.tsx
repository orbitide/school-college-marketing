import { Quote } from "lucide-react";
import { Section } from "@/components/shared/section";
import { testimonials } from "@/content/testimonials";

export function SocialProof() {
  return (
    <Section eyebrow="Testimonials" title="Trusted by school and college leaders">
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={i} className="card reveal flex flex-col p-8">
            <Quote className="size-7 text-accent" aria-hidden />
            <blockquote className="mt-4 font-display text-lg leading-snug">{t.quote}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t pt-5 text-sm">
              <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-secondary font-display font-semibold text-primary">
                {i + 1}
              </span>
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className="text-muted-foreground">{t.role}, {t.institution}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
