"use client";

import { CheckCircle2 } from "lucide-react";
import { useToasts } from "@/lib/toast";

export function Toaster() {
  const toasts = useToasts();
  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2 px-4 md:bottom-6">
      {toasts.map((t) => (
        <div key={t.id} role="status" className="toast-in pointer-events-auto flex items-center gap-2.5 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-md">
          <CheckCircle2 className="size-4 shrink-0 text-[#7fd6a5]" aria-hidden />
          {t.message}
        </div>
      ))}
    </div>
  );
}
