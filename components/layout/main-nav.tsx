"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, CirclePlus, GraduationCap, LayoutGrid, Search } from "lucide-react";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

const active = (path: string, href: string) => path === href || path.startsWith(`${href}/`);

export function DesktopNav() {
  const path = usePathname();
  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active(path, item.href) ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                active(path, item.href) && "bg-primary-soft text-primary hover:bg-primary-soft hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const tabs = [
  { href: "/questions", label: "Search", icon: Search },
  { href: "/subjects", label: "Subjects", icon: LayoutGrid },
  { href: "/ask", label: "Ask", icon: CirclePlus, primary: true },
  { href: "/practice", label: "Practice", icon: BookOpen },
  { href: "/dashboard", label: "My learning", icon: GraduationCap },
] as const;

/** Phone navigation: the five things a student does most, always in reach. */
export function BottomNav() {
  const path = usePathname();
  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-40 border-t bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <ul className="grid grid-cols-5">
        {tabs.map(({ href, label, icon: Icon, ...rest }) => {
          const on = active(path, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={on ? "page" : undefined}
                className={cn("flex h-16 flex-col items-center justify-center gap-1 text-[0.6875rem] font-semibold", on ? "text-primary" : "text-muted-foreground")}
              >
                {"primary" in rest ? (
                  <span className="-mt-5 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                    <Icon className="size-6" aria-hidden />
                  </span>
                ) : (
                  <Icon className="size-5" aria-hidden />
                )}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
