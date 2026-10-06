import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Wordmark } from "@/components/layout/wordmark";
import { nav, site } from "@/content/site";

export function Header() {
  return (
    <>
      <div className="hidden bg-primary text-[0.8125rem] text-primary-foreground sm:block">
        <div className="container-page flex h-9 items-center justify-between">
          <p className="text-primary-foreground/80">School and college management for Bangladesh</p>
          <ul className="flex items-center gap-6">
            <li>
              <a href={`${site.appUrl}/login`} className="link-underline">
                Parent and student portal
              </a>
            </li>
            <li className="text-primary-foreground/80">{site.phone}</li>
          </ul>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-foreground bg-background">
        <div className="container-page relative flex h-16 items-center justify-between gap-6">
          <Wordmark />
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-[0.9375rem] font-medium [text-decoration-color:transparent] hover:[text-decoration-color:currentColor]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/demo">Book a demonstration</Link>
            </Button>
            <Button asChild size="sm" className="sm:hidden">
              <Link href="/demo">Demo</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
