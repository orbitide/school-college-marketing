import { Star } from "lucide-react";
import { proof } from "@/content/proof";

export function TrustBanner() {
  return (
    <section aria-labelledby="trust-title" className="py-10 sm:py-16">
      <div className="container-page">
        <div className="on-dark rounded-3xl bg-primary-dark px-6 py-14 text-center text-primary-foreground sm:py-20">
          <p className="mx-auto inline-flex items-center gap-3 rounded-full bg-white/15 py-2 pl-3 pr-5 text-sm font-semibold">
            <Star className="size-5 fill-[#fbbf24] text-[#fbbf24]" aria-hidden />
            <span>{proof.rating.value} {proof.rating.label}</span>
          </p>
          <p className="mt-8 text-lg font-semibold italic text-[#fde68a] sm:text-xl">Simple enough for everyday staff</p>
          <h2 id="trust-title" className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">Made for schools and colleges, from one campus to many</h2>
        </div>
      </div>
    </section>
  );
}
