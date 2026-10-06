import type { Metadata } from "next";
import { RoleDashboard } from "@/components/product/dashboards";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return <RoleDashboard />;
}
