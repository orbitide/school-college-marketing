import Link from "next/link";
import { Wordmark } from "@/components/layout/wordmark";
import { site } from "@/content/site";

const product = [
  { href: "/features", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/app/dashboard", label: "Try the demo app" },
  { href: "/demo", label: "Book a demo" },
] as const;
const company = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

function Column({ title, items }: { title: string; items: readonly { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i.href}><Link href={i.href} className="hover:text-foreground hover:underline">{i.label}</Link></li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-surface">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Wordmark />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{site.tagline}</p>
          <p className="mt-4 text-sm text-muted-foreground">{site.email} · {site.phone}</p>
        </div>
        <Column title="Product" items={product} />
        <Column title="Company" items={company} />
      </div>
      <div className="border-t">
        <p className="container-page py-5 text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
