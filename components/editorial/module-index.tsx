import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { features } from "@/content/features";

/** Prospectus-style contents list of the product modules. */
export function ModuleIndex({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="grid border-t border-foreground lg:grid-cols-2 lg:gap-x-16">
      {features.map((f, i) => (
        <li key={f.slug} className="flex gap-5 border-b py-7 sm:gap-7">
          <span className="tnum w-8 shrink-0 pt-1 font-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
          <article className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl">{f.name}</h3>
              <span className="label !text-muted-foreground">{f.audience}</span>
            </div>
            <p className="mt-2 text-muted-foreground">{f.benefit}</p>
            {detailed && (
              <ul className="mt-4 space-y-1.5 text-[0.9375rem]">
                {f.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <Link href="/demo" className="link-underline mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              See it in a demo <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </article>
        </li>
      ))}
    </ol>
  );
}
