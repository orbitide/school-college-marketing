import Link from "next/link";
import { Wordmark } from "@/components/layout/wordmark";
import { institutionNav, site } from "@/content/site";

const learn = [
  { href: "/ask", label: "Ask a question" },
  { href: "/questions", label: "Search questions" },
  { href: "/subjects", label: "Subjects" },
  { href: "/practice", label: "Practice" },
  { href: "/dashboard", label: "My learning" },
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
          <li key={i.href}>
            <Link href={i.href} className="hover:text-foreground hover:underline">{i.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mb-16 border-t bg-muted/50 md:mb-0">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Wordmark />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{site.tagline}</p>
        </div>
        <Column title="Learn" items={learn} />
        <Column title="For institutions" items={institutionNav} />
        <Column title="Company" items={company} />
      </div>
      <div className="border-t">
        <p className="container-page py-5 text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
