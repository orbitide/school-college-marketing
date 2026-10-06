"use client";

import { Bookmark } from "lucide-react";
import { useSaved } from "@/lib/saved";
import { cn } from "@/lib/utils";

export function SaveButton({ id, compact = false }: { id: string; compact?: boolean }) {
  const { ids, toggle } = useSaved();
  const saved = ids.includes(id);
  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved problems" : "Save this problem"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
        compact ? "p-2 hover:bg-muted" : "border px-3 py-1.5 hover:border-primary",
        saved && "text-primary",
      )}
    >
      <Bookmark className={cn("size-4", saved && "fill-current")} aria-hidden />
      {!compact && (saved ? "Saved" : "Save")}
    </button>
  );
}
