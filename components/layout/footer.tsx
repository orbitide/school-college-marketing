import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { nav, site } from "@/content/site";

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <GraduationCap className="size-6 text-primary" aria-hidden />
            {site.name}
          </Link>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Product</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {[...nav, { href: "/demo", label: "Book a demo" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-foreground">
                {site.email}
              </a>
            </li>
            <li>{site.phone}</li>
            <li>{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex gap-4">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
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
