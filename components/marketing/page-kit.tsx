import Link from "next/link";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";
import { Band, SectionHeader, type Tone } from "@/components/marketing/band";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Primary and secondary hero actions used on most inner pages. */
export function HeroActions({ secondary = "trial" }: { secondary?: "trial" | "pricing" | "contact" }) {
  return (
    <>
      <Button asChild size="xl"><Link href="/demo">Book a demo</Link></Button>
      {secondary === "trial" && <Button asChild size="xl" variant="outline"><a href={`${site.appUrl}/signup`}>Start free trial</a></Button>}
      {secondary === "pricing" && <Button asChild size="xl" variant="outline"><Link href="/pricing">See pricing</Link></Button>}
      {secondary === "contact" && <Button asChild size="xl" variant="outline"><Link href="/contact">Talk to us</Link></Button>}
    </>
  );
}

export type Card = { icon?: LucideIcon; title: string; text: string; href?: string; cta?: string };

/** Grid of icon cards. Cards with an href are links. */
export function CardGrid({ items, cols = 3 }: { items: readonly Card[]; cols?: 2 | 3 | 4 }) {
  const grid = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <ul className={cn("grid gap-5", grid)}>
      {items.map((c) => {
        const body = (
          <>
            {c.icon && <span aria-hidden className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><c.icon className="size-5" /></span>}
            <h3 className={cn("text-lg font-bold tracking-tight", c.icon && "mt-5")}>{c.title}</h3>
            <p className="mt-2 text-foreground/75">{c.text}</p>
            {c.href && <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold text-primary">{c.cta ?? "Learn more"} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>}
          </>
        );
        return (
          <li key={c.title}>
            {c.href ? (
              <Link href={c.href} className="card group flex h-full flex-col p-6 transition-colors hover:border-primary">{body}</Link>
            ) : (
              <div className="card flex h-full flex-col p-6">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Numbered process, three or four steps. */
export function Steps({ steps }: { steps: readonly { title: string; text: string }[] }) {
  return (
    <ol className={cn("grid gap-5", steps.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3")}>
      {steps.map((s, i) => (
        <li key={s.title} className="card p-6">
          <span aria-hidden className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
          <h3 className="mt-4 text-lg font-bold tracking-tight">{s.title}</h3>
          <p className="mt-2 text-foreground/75">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Two-column checklist card. */
export function CheckList({ items, cols = 2 }: { items: readonly string[]; cols?: 1 | 2 }) {
  return (
    <ul className={cn("grid gap-3", cols === 2 && "md:grid-cols-2")}>
      {items.map((p) => (
        <li key={p} className="card flex items-start gap-3 p-4 font-medium">
          <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success"><Check className="size-3.5" strokeWidth={3} /></span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** A full-width band with a section header and content. */
export function Block({ tone = "surface", id, eyebrow, title, intro, align = "center", children }: { tone?: Tone; id: string; eyebrow?: string; title: string; intro?: string; align?: "center" | "left"; children: React.ReactNode }) {
  return (
    <Band tone={tone} labelledBy={id}>
      <SectionHeader id={id} eyebrow={eyebrow} title={title} intro={intro} align={align} />
      <div className="mt-10 sm:mt-12">{children}</div>
    </Band>
  );
}
