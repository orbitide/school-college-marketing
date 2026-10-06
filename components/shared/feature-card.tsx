import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Feature } from "@/content/features";

export function FeatureCard({ feature, detailed = false }: { feature: Feature; detailed?: boolean }) {
  const Icon = feature.icon;
  return (
    <article className="card card-hover reveal group flex flex-col p-7">
      <div className="flex items-start justify-between">
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#2a52a0] text-white shadow-soft">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">{feature.audience}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold">{feature.name}</h3>
      <p className="mt-2 text-muted-foreground">{feature.benefit}</p>
      {detailed && (
        <ul className="mt-5 space-y-2.5 text-sm">
          {feature.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-gold-text" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/demo"
        className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary"
      >
        See it in a demo
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </Link>
    </article>
  );
}
