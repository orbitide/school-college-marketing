import type { Metadata } from "next";
import { PageHeader } from "@/components/product/ui";
import { TimetableView } from "@/components/product/modules/timetable";

export const metadata: Metadata = { title: "Timetable" };

export default function Page() {
  return (
    <div className="space-y-5">
      <PageHeader title="Timetable" description="Catch room and teacher clashes before they reach a classroom." />
      <TimetableView />
    </div>
  );
}
