"use client";

import { useSearchParams } from "next/navigation";

/** Reads the named URL params so dashboard links can open a table already filtered. */
export function useInitial(filterKeys: string[]) {
  const sp = useSearchParams();
  const filters: Record<string, string> = {};
  for (const k of filterKeys) {
    const v = sp.get(k);
    if (v) filters[k] = v;
  }
  return { q: sp.get("q") ?? "", filters };
}
