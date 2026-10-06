import type { Metadata } from "next";
import { NoticesView } from "@/components/product/modules/notices";
import { PageHeader } from "@/components/product/ui";

export const metadata: Metadata = { title: "Notices" };

export default function Page() {
  return (
    <div className="space-y-5">
      <PageHeader title="Notices" description="Publish a notice once and see who has read it." />
      <NoticesView />
    </div>
  );
}
