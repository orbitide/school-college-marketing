import Link from "next/link";
import { site } from "@/content/site";

/** Typographic wordmark. TODO: replace with the institution crest/logo. */
export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span
        aria-hidden
        className={`flex size-9 items-center justify-center border-2 font-display text-xl leading-none ${inverse ? "border-primary-foreground" : "border-primary text-primary"}`}
      >
        S
      </span>
      <span className={`font-display text-2xl tracking-tight ${inverse ? "text-primary-foreground" : "text-primary"}`}>{site.name}</span>
    </Link>
  );
}
