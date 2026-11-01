import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileMenu, type MobileItem } from "@/components/layout/mobile-menu";
import { NavLink, NavMenu } from "@/components/layout/nav-menu";
import { FeaturesPanel, ResourcesPanel, SolutionsPanel } from "@/components/layout/nav-panels";
import { Wordmark } from "@/components/layout/wordmark";
import { groupHref, moduleGroups } from "@/content/modules";
import { resources } from "@/content/resources";
import { nav, site } from "@/content/site";
import { solutions } from "@/content/solutions";

const panels = { features: <FeaturesPanel />, solutions: <SolutionsPanel />, resources: <ResourcesPanel /> } as const;

/** Sub-links shown under each dropdown item in the phone menu. */
const mobileSub: Record<string, { href: string; label: string }[]> = {
  features: moduleGroups.map((g) => ({ href: groupHref(g.title), label: g.title })),
  solutions: [...solutions.map((x) => ({ href: `/solutions/${x.slug}`, label: x.name })), { href: "/institutions", label: "Institution types" }],
  resources: resources.map((x) => ({ href: `/resources/${x.slug}`, label: x.name })),
};

const mobileItems: MobileItem[] = nav.map((item) => ({ href: item.href, label: item.label, sub: "menu" in item ? mobileSub[item.menu] : undefined }));

export function Header() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="relative mx-auto flex h-16 max-w-[84rem] items-center justify-between gap-4 rounded-2xl border bg-surface/95 px-4 shadow-sm backdrop-blur lg:px-6">
        <Wordmark />
        <nav aria-label="Main" className="hidden h-full lg:block">
          <ul className="flex h-full items-center gap-1">
            {nav.map((item) =>
              "menu" in item ? (
                <NavMenu key={item.href} label={item.label} href={item.href}>{panels[item.menu]}</NavMenu>
              ) : (
                <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
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
          <Button asChild size="sm" variant="outline" className="hidden xl:inline-flex"><a href={`${site.appUrl}/login`}>Login</a></Button>
          <Button asChild size="sm" variant="outline" className="hidden xl:inline-flex"><Link href="/demo">Demo</Link></Button>
          <Button asChild size="sm"><a href={`${site.appUrl}/signup`}>Start free trial</a></Button>
          <MobileMenu items={mobileItems} loginHref={`${site.appUrl}/login`} />
        </div>
      </div>
    </header>
  );
}
