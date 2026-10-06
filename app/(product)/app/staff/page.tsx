import type { Metadata } from "next";
import { Suspense } from "react";
import { StaffTable } from "@/components/product/modules/staff";
import { PageHeader } from "@/components/product/ui";

export const metadata: Metadata = { title: "Teachers and staff" };

export default function Page() {
  return (
    <div className="space-y-5">
      <PageHeader title="Teachers and staff" description="Staff records and who is in today." />
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
        <StaffTable />
      </Suspense>
    </div>
  );
}
