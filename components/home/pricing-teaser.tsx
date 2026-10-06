import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PricingTeaser() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-page">
        <div className="card reveal flex flex-col items-start justify-between gap-8 p-8 sm:p-12 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Simple pricing that grows with your institution</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Plans start from a small per-student rate. Multi-branch groups get a custom plan.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg">
              <Link href="/pricing">See pricing</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/demo">Book a demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
