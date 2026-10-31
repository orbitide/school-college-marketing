import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function CtaButtons({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button asChild size="lg" variant={inverse ? "inverse" : "default"}>
        <Link href="/demo">Book a demo <ArrowRight /></Link>
      </Button>
      <Button asChild size="lg" variant={inverse ? "outline-inverse" : "outline"}>
        <a href={`${site.appUrl}/signup`}>Start free trial</a>
      </Button>
    </div>
  );
}
