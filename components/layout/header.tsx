import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { nav, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="container-page relative flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <GraduationCap className="size-6 text-primary" aria-hidden />
          {site.name}
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/demo">Book a demo</Link>
          </Button>
          <Button asChild size="sm" className="sm:hidden">
            <Link href="/demo">Demo</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
