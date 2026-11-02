import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** SchoolSuite mark: an open book with a completed check, topped by an amber spark. Also used as app/icon.svg. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("size-9 shrink-0", className)}>
      <defs>
        <linearGradient id="logo-grad" x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1b3f73" />
          <stop offset="1" stopColor="#2b7a8c" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#logo-grad)" />
      <path d="M9 20c5.5-2.4 11-1.6 15 1.4V37c-4-2.8-9.5-3.6-15-1.2z" fill="#fff" />
      <path d="M39 20c-5.5-2.4-11-1.6-15 1.4V37c4-2.8 9.5-3.6 15-1.2z" fill="#fff" fillOpacity=".88" />
      <path d="M29.2 28.2l2.6 2.6 4.6-5.2" fill="none" stroke="#1b3f73" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="12.2" r="3.2" fill="#f5b82e" />
    </svg>
  );
}

/** Logo lockup: mark plus the product name. `onDark` switches the name to white. */
export function Wordmark({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const [first, ...rest] = site.name.split(/(?=[A-Z])/);
  return (
    <Link href="/" aria-label={`${site.name} home`} className={cn("flex items-center gap-2.5 text-xl font-bold tracking-tight", onDark ? "text-white" : "text-primary-dark", className)}>
      <LogoMark className={onDark ? "ring-1 ring-white/30 rounded-xl" : undefined} />
      <span>{first}<span className={onDark ? "text-[#7fd3e0]" : "text-[#2b7a8c]"}>{rest.join("")}</span></span>
    </Link>
  );
}
