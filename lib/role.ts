"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Role = "admin" | "teacher" | "student" | "parent";
export const roles: { value: Role; label: string }[] = [
  { value: "admin", label: "Administrator" },
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
  { value: "parent", label: "Parent" },
];

const KEY = "prototype-role";
const listeners = new Set<() => void>();

const read = (): Role => {
  try {
    const v = localStorage.getItem(KEY);
    return roles.some((r) => r.value === v) ? (v as Role) : "admin";
  } catch {
    return "admin";
  }
};

/** Prototype role switcher, kept in this browser only. Real access control belongs on the server. */
export function useRole() {
  const role = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => e.key === KEY && cb();
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    read,
    () => "admin" as Role,
  );
  const setRole = useCallback((r: Role) => {
    try {
      localStorage.setItem(KEY, r);
    } catch {
      /* storage unavailable */
    }
    listeners.forEach((l) => l());
  }, []);
  return { role, setRole };
}
