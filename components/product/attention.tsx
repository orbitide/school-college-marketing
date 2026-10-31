"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CircleAlert, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

export type AttentionItem = {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  detail: string;
  action: string;
  href?: string;
  /** Display only (used in website previews): shows the action without making it clickable. */
  static?: boolean;
  /** For actions that happen in place rather than navigating. */
  run?: () => void;
  done?: string;
};

const icon = { high: CircleAlert, medium: AlertTriangle, low: Info } as const;
const color = { high: "text-danger", medium: "text-warning", low: "text-info" } as const;
const word = { high: "High priority", medium: "Medium priority", low: "Low priority" } as const;

/** The product's core pattern: a problem, the evidence, and the next action in one row. */
export function AttentionList({ items, className }: { items: AttentionItem[]; className?: string }) {
  return (
    <ul className={cn("divide-y", className)}>
      {items.map((i) => {
        const Icon = icon[i.severity];
        return (
          <li key={i.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5">
            <Icon className={cn("size-5 shrink-0", color[i.severity])} aria-label={word[i.severity]} />
            <div className="min-w-0 flex-1 basis-60">
              <p className="font-semibold leading-snug">{i.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{i.detail}</p>
            </div>
            {i.static ? (
              <span className="inline-flex h-9 items-center gap-2 rounded-md border border-border-strong bg-surface px-3 text-sm font-semibold">{i.action} <ArrowRight className="size-4" aria-hidden /></span>
            ) : i.href ? (
              <Button asChild variant="outline" size="sm"><Link href={i.href}>{i.action} <ArrowRight /></Link></Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => { i.run?.(); toast(i.done ?? "Done"); }}>{i.action}</Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
