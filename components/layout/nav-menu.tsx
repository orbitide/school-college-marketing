"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Header dropdown. The panel content is passed in as children (rendered on the server).
 * Opens on hover (mouse only) or click; click, Enter/Space and tap toggle; Escape closes and restores focus;
 * focus leaving, an outside click or choosing a link closes it.
 */
export function NavMenu({ label, children }: { label: string; children: React.ReactNode }) {
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
        {label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open && (
        <div id={id} className="menu-in absolute inset-x-0 top-full z-50" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
          <div className="rounded-b-xl border border-t-0 bg-surface p-6 shadow-md">{children}</div>
        </div>
      )}
    </li>
  );
}
