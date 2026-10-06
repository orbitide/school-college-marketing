import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function CtaButtons({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg" variant={inverse ? "accent" : "default"}>
        <Link href="/demo">Book a demo</Link>
      </Button>
      <Button
        asChild
        size="lg"
        variant="outline"
        className={inverse ? "border-white/40 bg-transparent text-white hover:bg-white/10" : undefined}
      >
        <a href={`${site.appUrl}/signup`}>Start free trial</a>
      </Button>
    </div>
  );
}
