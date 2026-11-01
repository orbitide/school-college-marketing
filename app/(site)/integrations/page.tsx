import type { Metadata } from "next";
import { Landing } from "@/components/marketing/landing";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect messaging, spreadsheets, payments and attendance devices to your institution's records.",
  alternates: { canonical: "/integrations" },
};

// TODO: confirm each channel with the product team before launch.
export default function IntegrationsPage() {
  return (
    <Landing
      label="Product · Integrations"
      title="Connect the channels you already use"
      intro="Messages, spreadsheets, payments and attendance devices connect to the same student and fee records, so nothing is typed twice."
      points={["SMS and WhatsApp messages to guardians", "Email for notices and receipts", "Import and export with Excel and CSV", "Fee payments recorded against the right student", "Attendance from biometric devices"]}
      visual="analytics"
      related={[{ label: "Messages and parent communication", href: "/features/messages-and-parent-communication" }, { label: "Fees and payments", href: "/features/fees-and-payments" }, { label: "All features", href: "/features" }]}
    />
  );
}
