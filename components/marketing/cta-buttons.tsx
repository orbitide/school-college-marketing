import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaButtons({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg" variant={inverse ? "inverse" : "default"}>
        <Link href="/contact">Book a call <ArrowRight /></Link>
      </Button>
      <Button asChild size="lg" variant={inverse ? "outline-inverse" : "outline"}>
        <Link href="/features">Explore features</Link>
      </Button>
    </div>
  );
}
