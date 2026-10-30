"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { moduleGroups, slug } from "@/content/modules";
import { cn } from "@/lib/utils";

/**
 * "Features" dropdown with a submenu of modules grouped like the application.
 * Opens on hover or click; Escape closes it and returns focus; focus leaving it closes it.
 */
export function FeaturesMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLLIElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointer = useRef<string>("");
  const id = useId();

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const openNow = () => { cancel(); setOpen(true); };
  const closeSoon = () => { cancel(); timer.current = setTimeout(() => setOpen(false), 150); };

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  useEffect(() => cancel, []);

  return (
    <li
      ref={root}
      className="flex h-full items-center"
      onPointerEnter={(e) => e.pointerType === "mouse" && openNow()}
      onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
      onBlur={(e) => !root.current?.contains(e.relatedTarget as Node) && setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onPointerDown={(e) => { pointer.current = e.pointerType; }}
        // A mouse click keeps the hover-opened menu open; touch and keyboard toggle it.
        onClick={() => { if (pointer.current === "mouse") setOpen(true); else setOpen((v) => !v); pointer.current = ""; }}
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
          open ? "bg-muted text-foreground" : "text-muted-foreground",
        )}
      >
        Features
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open && (
        <div id={id} className="menu-in absolute inset-x-0 top-full z-50">
          <div className="rounded-b-xl border border-t-0 bg-surface p-6 shadow-md">
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {moduleGroups.map((g) => (
                <div key={g.title}>
                  <Link href={`/features#${slug(g.title)}`} onClick={() => setOpen(false)} className="text-sm font-semibold hover:text-primary hover:underline">
                    {g.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground">{g.intro}</p>
                  <ul className="mt-2 space-y-0.5">
                    {g.modules.map((m) => (
                      <li key={m.name}>
                        <Link href={`/features#${slug(m.name)}`} onClick={() => setOpen(false)} className="-mx-2 block rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-primary-soft hover:text-primary">
                          {m.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4 text-sm">
              <Link href="/features" onClick={() => setOpen(false)} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
                See all features <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/app/dashboard" onClick={() => setOpen(false)} className="font-medium text-muted-foreground hover:text-foreground hover:underline">
                Try the demo app
              </Link>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
