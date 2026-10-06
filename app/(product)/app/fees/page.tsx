import type { Metadata } from "next";
import { Suspense } from "react";
import { FeesTable } from "@/components/product/modules/fees";
import { PageHeader } from "@/components/product/ui";

export const metadata: Metadata = { title: "Fees and payments" };

export default function Page() {
  return (
    <div className="space-y-5">
      <PageHeader title="Fees and payments" description="Outstanding invoices. Send reminders and record payments." />
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
        <FeesTable />
      </Suspense>
    </div>
  );
}
