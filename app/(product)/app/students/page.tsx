import type { Metadata } from "next";
import { Suspense } from "react";
import { StudentsTable } from "@/components/product/modules/students";
import { PageHeader } from "@/components/product/ui";

export const metadata: Metadata = { title: "Students" };

export default function Page() {
  return (
    <div className="space-y-5">
      <PageHeader title="Students" description="Every student in one list. Search, filter, message guardians or export." />
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
        <StudentsTable />
      </Suspense>
    </div>
  );
}
