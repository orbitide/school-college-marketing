import Link from "next/link";
import { Wordmark } from "@/components/layout/wordmark";
import { nav, site } from "@/content/site";

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

export function Footer() {
  return (
    <footer className="on-dark bg-[#16231f] text-primary-foreground/80">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark inverse />
          <p className="mt-5 max-w-sm font-display text-xl italic leading-snug text-primary-foreground">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
          <h2 className="label">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {[...nav, { href: "/demo", label: "Book a demonstration" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline">{item.label}</Link>
              </li>
            ))}
            <li>
              <a href={`${site.appUrl}/login`} className="link-underline">Parent and student portal</a>
            </li>
          </ul>
        </nav>
        <div className="lg:col-span-3">
          <h2 className="label">Contact</h2>
          <ul className="mt-4 space-y-2.5">
            <li><a href={`mailto:${site.email}`} className="link-underline">{site.email}</a></li>
            <li>{site.phone}</li>
            <li>{site.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-primary-foreground/60 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex gap-6">
            {legal.map((item) => (
              <li key={item.href}><Link href={item.href} className="link-underline">{item.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
