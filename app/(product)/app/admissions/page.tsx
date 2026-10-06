import type { Metadata } from "next";
import { Suspense } from "react";
import { AdmissionsTable } from "@/components/product/modules/admissions";
import { PageHeader } from "@/components/product/ui";

export const metadata: Metadata = { title: "Admissions" };

export default function Page() {
  return (
    <div className="space-y-5">
      <PageHeader title="Admissions" description="Review applications, chase missing documents and approve." />
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
        <AdmissionsTable />
      </Suspense>
    </div>
  );
}
