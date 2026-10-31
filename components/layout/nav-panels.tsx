import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { features } from "@/content/marketing";
import { resources } from "@/content/resources";
import { solutions } from "@/content/solutions";

const footerLink = "inline-flex items-center gap-1.5 font-semibold text-primary hover:underline";
const footerMuted = "font-medium text-muted-foreground hover:text-foreground hover:underline";
const itemLink = "-mx-2 block rounded-md px-2 py-1.5 hover:bg-primary-soft";

function Footer({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-sm">{children}</div>;
}

export function FeaturesPanel() {
  return (
    <>
      <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <li key={f.slug}>
            <Link href={`/features#${f.slug}`} className={itemLink}>
              <span className="block text-sm font-semibold">{f.name}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{f.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Footer>
        <Link href="/features" className={footerLink}>See all features <ArrowRight className="size-4" aria-hidden /></Link>
        <Link href="/security" className={footerMuted}>Security and privacy</Link>
      </Footer>
    </>
  );
}

export function SolutionsPanel() {
  return (
    <>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">By role</p>
      <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.map((s) => (
          <li key={s.slug}>
            <Link href={`/solutions/${s.slug}`} className={itemLink}>
              <span className="block text-sm font-semibold">{s.name}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{s.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Footer>
        <Link href="/solutions" className={footerLink}>See all solutions <ArrowRight className="size-4" aria-hidden /></Link>
        <Link href="/benefits" className={footerMuted}>How you will benefit</Link>
      </Footer>
    </>
  );
}

export function ResourcesPanel() {
  return (
    <>
      <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((r) => (
          <li key={r.slug}>
            <Link href={`/resources/${r.slug}`} className={itemLink}>
              <span className="block text-sm font-semibold">{r.name}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{r.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Footer>
        <Link href="/resources" className={footerLink}>All resources <ArrowRight className="size-4" aria-hidden /></Link>
        <Link href="/pricing" className={footerMuted}>Pricing</Link>
      </Footer>
    </>
  );
}
