"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isActive } from "@/components/layout/nav-menu";
import { cn } from "@/lib/utils";

export type MobileItem = { href: string; label: string; sub?: { href: string; label: string }[] };

/** Phone menu: a native <details> that closes itself when the page changes. */
export function MobileMenu({ items, loginHref }: { items: MobileItem[]; loginHref: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className="group lg:hidden">
      <summary aria-label="Menu" className="flex cursor-pointer list-none rounded-md p-2 hover:bg-muted [&::-webkit-details-marker]:hidden">
        <Menu className="size-5" aria-hidden />
      </summary>
      <div className="absolute inset-x-0 top-full mt-2 max-h-[75vh] overflow-y-auto rounded-2xl border bg-surface p-2 shadow-xl">
        <ul className="px-3">
          {items.map((item) => (
            <li key={item.href} className="border-b last:border-b-0">
              <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined} className={cn("block py-3.5 text-base font-medium", isActive(pathname, item.href) && "text-primary")}>{item.label}</Link>
              {item.sub && (
                <ul className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1 pl-3">
                  {item.sub.map((s) => (
                    <li key={s.href}><Link href={s.href} className="block py-1.5 text-sm text-muted-foreground">{s.label}</Link></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="flex gap-2 py-3">
            <Button asChild size="sm" variant="outline" className="flex-1"><a href={loginHref}>Login</a></Button>
            <Button asChild size="sm" variant="outline" className="flex-1"><Link href="/demo">Demo</Link></Button>
          </li>
        </ul>
      </div>
    </details>
  );
}
