"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const KEY = "saved-problems";
const listeners = new Set<() => void>();

const read = () => {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
};

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** Saved problem ids, kept in this browser only. TODO: sync to the student's account. */
export function useSaved() {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const ids = useMemo<string[]>(() => {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }, [raw]);

  const toggle = useCallback((id: string) => {
    const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: ignore */
    }
    listeners.forEach((l) => l());
  }, [ids]);

  return { ids, toggle };
}
