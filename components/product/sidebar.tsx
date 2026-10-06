"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { navGroups } from "@/content/product/nav";
import { institution } from "@/content/product/data";
import { useRole } from "@/lib/role";
import { cn } from "@/lib/utils";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname();
  const { role } = useRole();

  return (
    <nav aria-label="Application" className="flex h-full flex-col overflow-y-auto bg-surface px-3 py-4">
      <Link href="/app/dashboard" onClick={onNavigate} className="mb-5 flex items-center gap-2.5 px-2">
        <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GraduationCap className="size-4.5" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold leading-tight">{institution.name}</span>
          <span className="block text-xs text-muted-foreground">Sample institution</span>
        </span>
      </Link>

      <div className="space-y-5">
        {navGroups.map((g) => {
          const items = g.items.filter((i) => i.roles.includes(role));
          if (!items.length) return null;
          return (
            <div key={g.title}>
              <p className="px-2 pb-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</p>
              <ul>
                {items.map((i) => {
                  const on = path === i.href || path.startsWith(`${i.href}/`);
                  return (
                    <li key={i.href}>
                      <Link
                        href={i.href}
                        onClick={onNavigate}
                        aria-current={on ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                          on ? "bg-primary-soft text-primary" : "text-foreground/80 hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <i.icon className={cn("size-4", on ? "text-primary" : "text-muted-foreground")} aria-hidden />
                        {i.label}
                        {!i.built && <span className="ml-auto text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground">Soon</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
