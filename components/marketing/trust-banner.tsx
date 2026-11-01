import { Star } from "lucide-react";
import { Band } from "@/components/marketing/band";
import { proof } from "@/content/proof";

export function TrustBanner() {
  return (
    <Band tone="paper" labelledBy="trust-title" className="py-12 sm:py-16">
      <div className="on-dark rounded-2xl bg-primary-dark px-6 py-14 text-center text-primary-foreground sm:py-20">
        <p className="mx-auto inline-flex items-center gap-3 rounded-full bg-white/15 py-2 pl-3 pr-5 text-sm font-semibold">
          <Star className="size-5 fill-accent text-accent" aria-hidden />
          <span>{proof.rating.value} {proof.rating.label}</span>
        </p>
        <p className="eyebrow mt-8 italic sm:text-lg">Simple enough for everyday staff</p>
        <h2 id="trust-title" className="h-section mx-auto mt-3 max-w-3xl">Made for schools and colleges, from one campus to many</h2>
      </div>
    </Band>
  );
}
