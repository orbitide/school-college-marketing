import Link from "next/link";
import { GraduationCap, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { nav, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container-page relative flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-display text-xl font-semibold text-primary">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-accent">
            <GraduationCap className="size-5" aria-hidden />
          </span>
          {site.name}
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden lg:inline-flex">
            <a href={`${site.appUrl}/login`}>
              <UserRound /> Portal login
            </a>
          </Button>
          <Button asChild size="sm" variant="accent" className="hidden sm:inline-flex">
            <Link href="/demo">Book a demo</Link>
          </Button>
          <Button asChild size="sm" variant="accent" className="sm:hidden">
            <Link href="/demo">Demo</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
