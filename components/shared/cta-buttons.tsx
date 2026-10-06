import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function CtaButtons({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg" variant="accent">
        <Link href="/demo">
          Book a demo
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      <Button asChild size="lg" variant={inverse ? "glass" : "outline"}>
        <a href={`${site.appUrl}/signup`}>Start free trial</a>
      </Button>
    </div>
  );
}
