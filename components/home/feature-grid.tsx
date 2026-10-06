import Link from "next/link";
import { Section } from "@/components/shared/section";
import { FeatureCard } from "@/components/shared/feature-card";
import { Button } from "@/components/ui/button";
import { features, homeFeatureSlugs } from "@/content/features";

export function FeatureGrid() {
  const items = features.filter((f) => (homeFeatureSlugs as readonly string[]).includes(f.slug));
  return (
    <Section muted title="Everything your institution runs on" intro="Six core modules that work together from day one.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <FeatureCard key={f.slug} feature={f} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/features">Explore all features</Link>
        </Button>
      </div>
    </Section>
  );
}
