"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  variant?: "drawer" | "drawer-left" | "modal";
  children: React.ReactNode;
  footer?: React.ReactNode;
};

/** Native <dialog>: focus trap, Escape to close and backdrop click come from the browser. */
export function Modal({ open, onClose, title, description, variant = "modal", children, footer }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className={cn(variant === "modal" ? "modal" : "drawer", variant === "drawer-left" && "left")}
    >
      {open && (
        <div className={cn("flex flex-col", variant === "modal" ? "max-h-[85dvh]" : "h-dvh")}>
          <header className="flex items-start justify-between gap-4 border-b px-5 py-4">
            <div>
              <h2 id="dialog-title" className="text-lg">{title}</h2>
              {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
            </div>
            <button type="button" onClick={onClose} aria-label="Close" className="-mr-1.5 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
              <X className="size-5" aria-hidden />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          {footer && <footer className="flex flex-wrap justify-end gap-2 border-t bg-muted/40 px-5 py-3">{footer}</footer>}
        </div>
      )}
    </dialog>
  );
}
