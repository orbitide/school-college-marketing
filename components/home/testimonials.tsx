import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section aria-labelledby="voices-title" className="py-20 sm:py-28">
      <div className="container-page">
        <p className="label">From institutions</p>
        <h2 id="voices-title" className="sr-only">What school and college leaders say</h2>
        <figure className="mt-6 max-w-4xl">
          <blockquote className="font-display text-3xl italic leading-[1.2] sm:text-5xl">&ldquo;{lead.quote}&rdquo;</blockquote>
          <figcaption className="mt-6 text-[0.9375rem]">
            <span className="font-semibold">{lead.name}</span>, {lead.role}, {lead.institution}
          </figcaption>
        </figure>
        <div className="mt-14 grid border-t border-foreground md:grid-cols-2">
          {rest.map((t, i) => (
            <figure key={i} className="border-b py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <blockquote className="font-display text-xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{t.name}</span>, {t.role}, {t.institution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
