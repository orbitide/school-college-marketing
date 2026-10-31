import { Star } from "lucide-react";
import { CardCarousel } from "@/components/marketing/card-carousel";
import { reviews } from "@/content/proof";

export function ReviewsSection() {
  return (
    <section aria-labelledby="reviews-title" className="bg-[linear-gradient(135deg,#d4f5ea_0%,#d9e9f6_55%,#e6e0fb_100%)] py-16 sm:py-24">
      <div className="container-page">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-base font-semibold text-primary">Reviews</p>
          <h2 id="reviews-title" className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">See why institutions love SchoolSuite</h2>
        </header>
        <div className="mt-12">
          <CardCarousel
            label="Reviews"
            items={reviews.map((r, i) => (
              <article key={i} className="flex h-full min-h-[26rem] flex-col rounded-2xl bg-white p-7 shadow-sm">
                <h3 className="text-2xl font-bold leading-tight tracking-tight">{r.title}</h3>
                <p className="mt-4 text-foreground/75">{r.body}</p>
                <div className="mt-auto pt-8">
                  {r.rating ? <p className="mb-4 flex gap-1" aria-label={`${r.rating} out of 5 stars`}>{Array.from({ length: r.rating }).map((_, n) => <Star key={n} className="size-5 fill-[#fbbf24] text-[#fbbf24]" aria-hidden />)}</p> : null}
                  <p className="font-bold">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.role}</p>
                </div>
              </article>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
