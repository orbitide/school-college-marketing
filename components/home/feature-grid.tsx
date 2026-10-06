import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/section";
import { FeatureCard } from "@/components/shared/feature-card";
import { Button } from "@/components/ui/button";
import { features } from "@/content/features";

export function FeatureGrid() {
  return (
    <Section
      eyebrow="Modules"
      title="Everything your institution runs on"
      intro="Eight modules that work together from day one, so your team enters data once."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <FeatureCard key={f.slug} feature={f} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/features">
            Explore all features <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
