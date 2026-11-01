import { Star } from "lucide-react";
import { Band, SectionHeader } from "@/components/marketing/band";
import { site } from "@/content/site";
import { CardCarousel } from "@/components/marketing/card-carousel";
import { reviews } from "@/content/proof";

export function ReviewsSection() {
  return (
    <Band tone="surface" labelledBy="reviews-title">
      <SectionHeader id="reviews-title" eyebrow="Reviews" title={`See why institutions love ${site.name}`} />
      <div className="mt-12">
        <CardCarousel
          label="Reviews"
          items={reviews.map((r, i) => (
            <article key={i} className="card flex h-full min-h-[22rem] flex-col p-7">
              <h3 className="text-2xl font-bold leading-tight tracking-tight">{r.title}</h3>
              <p className="mt-4 text-foreground/75">{r.body}</p>
              <div className="mt-auto pt-8">
                {r.rating ? <p className="mb-4 flex gap-1" aria-label={`${r.rating} out of 5 stars`}>{Array.from({ length: r.rating }).map((_, n) => <Star key={n} className="size-5 fill-accent text-accent" aria-hidden />)}</p> : null}
                <p className="font-bold">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.role}</p>
              </div>
            </article>
          ))}
        />
      </div>
    </Band>
  );
}
