import Link from "next/link";
import { site } from "@/content/site";

/** Typographic wordmark. TODO: replace with the final logo. */
export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-display text-xl font-bold tracking-tight ${inverse ? "text-primary-foreground" : "text-primary"}`}>
      <span aria-hidden className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
      </span>
      {site.name}
    </Link>
  );
}
