import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Band } from "@/components/marketing/band";

export type Crumb = { label: string; href?: string };

/** Breadcrumb trail shown above inner-page headings. */
export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li><Link href="/" className="hover:text-foreground hover:underline">Home</Link></li>
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" aria-hidden />
            {c.href && i < items.length - 1 ? <Link href={c.href} className="hover:text-foreground hover:underline">{c.label}</Link> : <span aria-current={i === items.length - 1 ? "page" : undefined} className="font-medium text-foreground">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Hero for every inner page: eyebrow, h1, intro, optional actions and an optional product visual on the right.
 * Uses the same soft blue wash as the home page hero.
 */
export function PageHero({ label, title, intro, crumbs, actions, visual }: { label?: string; title: string; intro?: string; crumbs?: Crumb[]; actions?: React.ReactNode; visual?: React.ReactNode }) {
  return (
    <Band tone="wash" className="pb-12 pt-10 sm:pb-16 sm:pt-14">
      {crumbs && <Crumbs items={crumbs} />}
      <div className={visual ? "grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14" : undefined}>
        <div className={visual ? undefined : "max-w-3xl"}>
          {label && <p className="eyebrow">{label}</p>}
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-foreground/75">{intro}</p>}
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
        {visual && <div className="min-w-0">{visual}</div>}
      </div>
    </Band>
  );
}
