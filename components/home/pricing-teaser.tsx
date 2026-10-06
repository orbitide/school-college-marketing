import Link from "next/link";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

export function PricingTeaser() {
  return (
    <Section title="Simple pricing that grows with your institution" intro="Plans start from a small per-student rate. Multi-branch groups get a custom plan.">
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/pricing">See pricing</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/demo">Book a demo</Link>
        </Button>
      </div>
    </Section>
  );
}
