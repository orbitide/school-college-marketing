import type { Metadata } from "next";
import { Suspense } from "react";
import { AttendanceTable } from "@/components/product/modules/attendance";
import { PageHeader } from "@/components/product/ui";

export const metadata: Metadata = { title: "Attendance" };

export default function Page() {
  return (
    <div className="space-y-5">
      <PageHeader title="Attendance" description="Today's registers by section. Find the ones not yet submitted." />
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
        <AttendanceTable />
      </Suspense>
    </div>
  );
}
