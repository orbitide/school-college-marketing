import Link from "next/link";
import { Wordmark } from "@/components/layout/wordmark";
import { institutions } from "@/content/institutions";
import { groupHref, moduleGroups } from "@/content/modules";
import { resources } from "@/content/resources";
import { site, social } from "@/content/site";

type L = { href: string; label: string; external?: boolean };

const product: L[] = [
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/integrations", label: "Integrations" },
  { href: "/pricing", label: "Pricing" },
  { href: `${site.appUrl}/signup`, label: "Start free trial", external: true },
  { href: `${site.appUrl}/login`, label: "Sign in", external: true },
];
const features: L[] = moduleGroups.map((g) => ({ href: groupHref(g.title), label: g.title }));
const institutionLinks: L[] = [...institutions.map((i) => ({ href: `/institutions/${i.slug}`, label: i.name })), { href: "/institutions", label: "All institutions" }];
const resourceLinks: L[] = [...resources.map((r) => ({ href: `/resources/${r.slug}`, label: r.name })), { href: "/resources", label: "All resources" }];
const company: L[] = [
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
  { href: "/demo", label: "Book a demo" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];
const legal: L[] = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

type Icon = (props: { className?: string }) => React.ReactElement;
const svg = (path: React.ReactNode, fill = true): Icon => function SocialIcon({ className }) {
  return <svg viewBox="0 0 24 24" aria-hidden className={className} fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{path}</svg>;
};
const socials: { key: keyof typeof social; label: string; icon: Icon }[] = [
  { key: "facebook", label: "Facebook", icon: svg(<path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8S15.6 3.5 14.3 3.5c-2.7 0-4.4 1.6-4.4 4.5v2.5H7v3.3h2.9V22z" />) },
  { key: "x", label: "X", icon: svg(<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.97 6.817H1.675l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />) },
  { key: "youtube", label: "YouTube", icon: svg(<><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9.5 5 2.5-5 2.5z" /></>, false) },
  { key: "instagram", label: "Instagram", icon: svg(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" /></>, false) },
  { key: "linkedin", label: "LinkedIn", icon: svg(<><rect x="3" y="9" width="4" height="12" /><circle cx="5" cy="5" r="2" /><path d="M10 9h4v2c.7-1.3 2-2.2 3.8-2.2 3 0 4.2 1.9 4.2 5V21h-4v-6c0-1.4-.6-2.4-2-2.4S14 13.600 14 15v6h-4z" /></>, false) },
];

function Column({ title, items }: { title: string; items: L[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-white/60">{title}</h2>
      <ul className="mt-4 space-y-3 text-[0.9375rem] text-white/85">
        {items.map((i) => (
          <li key={i.label}>
            {i.external ? <a href={i.href} className="hover:text-white hover:underline">{i.label}</a> : <Link href={i.href} className="hover:text-white hover:underline">{i.label}</Link>}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const active = socials.filter((s) => social[s.key]);
  return (
    <footer className="on-dark bg-primary-dark text-white">
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_3fr] lg:gap-12">
        <div>
          <Wordmark onDark />
          <p className="mt-3 max-w-xs text-white/75">{site.tagline}</p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-white/60">Sales</p>
          <p className="mt-1 text-lg font-semibold">{site.phone}</p>
          <p className="text-white/80">{site.email}</p>
          {active.length > 0 && (
            <ul className="mt-6 flex gap-4">
              {active.map((s) => (
                <li key={s.key}><a href={social[s.key]} aria-label={s.label} className="flex size-10 items-center justify-center rounded-md bg-white/10 text-white hover:bg-white/20"><s.icon className="size-5" /></a></li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-5">
          <Column title="Product" items={product} />
          <Column title="Features" items={features} />
          <Column title="Institutions" items={institutionLinks} />
          <Column title="Company" items={company} />
          <Column title="Resources" items={resourceLinks} />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white hover:underline">{l.label}</Link></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
