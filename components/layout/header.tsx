import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/layout/nav-menu";
import { FeaturesPanel, ResourcesPanel, SolutionsPanel } from "@/components/layout/nav-panels";
import { Wordmark } from "@/components/layout/wordmark";
import { moduleGroups, slug } from "@/content/modules";
import { resources } from "@/content/resources";
import { nav, site } from "@/content/site";
import { solutions } from "@/content/solutions";

const panels = { features: <FeaturesPanel />, solutions: <SolutionsPanel />, resources: <ResourcesPanel /> } as const;

/** Sub-links shown under each dropdown item in the phone menu. */
const mobileSub: Record<string, { href: string; label: string }[]> = {
  features: moduleGroups.map((g) => ({ href: `/features#${slug(g.title)}`, label: g.title })),
  solutions: solutions.map((x) => ({ href: `/solutions/${x.slug}`, label: x.name })),
  resources: resources.map((x) => ({ href: `/resources/${x.slug}`, label: x.name })),
};

const links = nav.filter((item) => item.href !== "/contact");

export function Header() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="relative mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-4 rounded-2xl border bg-surface/95 px-4 shadow-sm backdrop-blur lg:px-6">
        <Wordmark />
        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-1">
            {links.map((item) =>
              "menu" in item ? (
                <NavMenu key={item.href} label={item.label}>{panels[item.menu]}</NavMenu>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">{item.label}</Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="mr-2 hidden items-center gap-2 text-sm font-medium text-foreground xl:flex">
            <svg viewBox="0 0 24 16" className="h-4 w-6 rounded-[3px]" aria-hidden>
              <rect width="24" height="16" fill="#006a4e" />
              <circle cx="11" cy="8" r="4.5" fill="#f42a41" />
            </svg>
            {site.phone}
          </a>
          <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex"><a href={`${site.appUrl}/login`}>Login</a></Button>
          <Button asChild size="sm" variant="outline" className="hidden md:inline-flex"><Link href="/demo">Demo</Link></Button>
          <Button asChild size="sm"><a href={`${site.appUrl}/signup`}>Start free trial</a></Button>
          {/* Mobile menu: native <details>, no client JS. */}
          <details className="group lg:hidden">
            <summary aria-label="Menu" className="flex cursor-pointer list-none rounded-md p-2 hover:bg-muted [&::-webkit-details-marker]:hidden">
              <Menu className="size-5" aria-hidden />
            </summary>
            <div className="absolute inset-x-0 top-full mt-2 max-h-[75vh] overflow-y-auto rounded-2xl border bg-surface p-2 shadow-xl">
              <ul className="px-3">
                {nav.map((item) => (
                  <li key={item.href} className="border-b last:border-b-0">
                    <Link href={item.href} className="block py-3.5 text-base font-medium">{item.label}</Link>
                    {"menu" in item && (
                      <ul className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1 pl-3">
                        {mobileSub[item.menu].map((sub) => (
                          <li key={sub.href}>
                            <Link href={sub.href} className="block py-1.5 text-sm text-muted-foreground">{sub.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                <li className="flex gap-2 py-3 sm:hidden">
                  <Button asChild size="sm" variant="outline" className="flex-1"><a href={`${site.appUrl}/login`}>Login</a></Button>
                  <Button asChild size="sm" variant="outline" className="flex-1"><Link href="/demo">Demo</Link></Button>
                </li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
