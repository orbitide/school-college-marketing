import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Feature } from "@/content/features";

export function FeatureCard({ feature, detailed = false }: { feature: Feature; detailed?: boolean }) {
  const Icon = feature.icon;
  return (
    <article className="flex flex-col rounded-xl border bg-background p-6">
      <span className="inline-flex size-11 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-4 text-xl font-semibold">{feature.name}</h3>
      <p className="mt-2 text-muted-foreground">{feature.benefit}</p>
      {detailed && (
        <ul className="mt-4 space-y-2 text-sm">
          {feature.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/demo"
        className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-primary hover:underline"
      >
        See it in a demo <ArrowRight className="size-4" aria-hidden />
      </Link>
    </article>
  );
}
