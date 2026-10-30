"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { roles, useRole } from "@/lib/role";

/** Lets website links open the prototype as a given role, e.g. /app/dashboard?role=teacher. */
export function RoleFromUrl() {
  const param = useSearchParams().get("role");
  const { role, setRole } = useRole();
  useEffect(() => {
    const next = roles.find((r) => r.value === param);
    if (next && next.value !== role) setRole(next.value);
    // Only react to the URL parameter, not to later manual role changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return null;
}
