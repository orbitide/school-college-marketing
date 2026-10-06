import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function CtaButtons({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
      <Button asChild size="lg" variant={inverse ? "inverse" : "default"}>
        <Link href="/demo">
          Book a demonstration <ArrowRight />
        </Link>
      </Button>
      <a href={`${site.appUrl}/signup`} className="link-underline text-base font-semibold">
        Start a free trial
      </a>
    </div>
  );
}
