import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { Button } from "@/components/ui/button";

export type LandingProps = {
  label: string;
  title: string;
  intro: string;
  points: string[];
  related?: { label: string; href: string }[];
};

/** Shared layout for the Solutions and Resources pages. */
export function Landing({ label, title, intro, points, related }: LandingProps) {
  return (
    <>
      <PageHero label={label} title={title} intro={intro} />
      <section className="py-12 sm:py-16">
        <div className="container-page max-w-3xl">
          <div>
            <h2 className="text-xl">What you get</h2>
            <ul className="mt-4 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />{p}</li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/contact">Book a call <ArrowRight /></Link></Button>
            </div>
            {related && related.length > 0 && (
              <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                {related.map((r) => <Link key={r.href} href={r.href} className="font-semibold text-primary hover:underline">{r.label}</Link>)}
              </p>
            )}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

export function IndexGrid({ items, basePath }: { items: { slug: string; name: string; summary: string }[]; basePath: string }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((i) => (
            <li key={i.slug}>
              <Link href={`${basePath}/${i.slug}`} className="panel group flex h-full items-start justify-between gap-4 p-5 transition-colors hover:border-primary">
                <span><span className="block text-lg font-semibold">{i.name}</span><span className="mt-1 block text-muted-foreground">{i.summary}</span></span>
                <ArrowRight className="mt-1.5 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
