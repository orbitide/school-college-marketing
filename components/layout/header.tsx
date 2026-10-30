import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturesMenu } from "@/components/layout/features-menu";
import { Wordmark } from "@/components/layout/wordmark";
import { moduleGroups, slug } from "@/content/modules";
import { nav } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-surface/95 backdrop-blur">
      <div className="container-page relative flex h-16 items-center justify-between gap-6">
        <Wordmark />
        <nav aria-label="Main" className="hidden h-full md:block">
          <ul className="flex h-full items-center gap-1">
            {nav.map((item) =>
              item.href === "/features" ? (
                <FeaturesMenu key={item.href} />
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">{item.label}</Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden lg:inline-flex"><Link href="/app/dashboard">Try the demo app</Link></Button>
          <Button asChild size="sm"><Link href="/demo">Book a demo</Link></Button>
          {/* Mobile menu: native <details>, no client JS. */}
          <details className="group md:hidden">
            <summary aria-label="Menu" className="flex cursor-pointer list-none rounded-md p-2 hover:bg-muted [&::-webkit-details-marker]:hidden">
              <Menu className="size-5" aria-hidden />
            </summary>
            <div className="absolute inset-x-0 top-full border-b bg-surface shadow-md">
              <ul className="container-page py-2">
                {[...nav, { href: "/app/dashboard", label: "Try the demo app" }].map((item) => (
                  <li key={item.href} className="border-b last:border-b-0">
                    <Link href={item.href} className="block py-3.5 text-base font-medium">{item.label}</Link>
                    {item.href === "/features" && (
                      <ul className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1 pl-3">
                        {moduleGroups.map((g) => (
                          <li key={g.title}>
                            <Link href={`/features#${slug(g.title)}`} className="block py-1.5 text-sm text-muted-foreground">{g.title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
