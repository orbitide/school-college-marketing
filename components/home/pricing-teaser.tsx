import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PricingTeaser() {
  return (
    <section className="border-t py-16 sm:py-20">
      <div className="container-page grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <p className="label">Pricing</p>
          <h2 className="mt-3 text-3xl leading-[1.1] sm:text-4xl">A simple rate by student range, with a custom plan for multi-branch groups.</h2>
        </div>
        <p className="lg:col-span-4 lg:text-right">
          <Link href="/pricing" className="link-underline inline-flex items-center gap-2 text-lg font-semibold text-primary">
            See pricing <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
