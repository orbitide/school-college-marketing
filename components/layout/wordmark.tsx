import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** Typographic wordmark. TODO: replace with the final logo. */
export function Wordmark({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 text-lg font-semibold tracking-tight text-foreground", className)}>
      <span aria-hidden className={cn("flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground", markClassName)}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
      </span>
      {site.name}
    </Link>
  );
}
