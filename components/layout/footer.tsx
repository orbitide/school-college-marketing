import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { nav, site } from "@/content/site";

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export function Footer() {
  return (
    <footer className="on-dark bg-ink text-white/80">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold text-white">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-accent">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            {site.name}
          </Link>
          <p className="mt-4 max-w-sm text-sm text-white/65">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="eyebrow !font-sans">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[...nav, { href: "/demo", label: "Book a demo" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`${site.appUrl}/login`} className="transition-colors hover:text-white">
                Parent / student portal
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow !font-sans">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
            <li>{site.phone}</li>
            <li>{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-5">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
