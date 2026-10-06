import type { Metadata } from "next";
import { LegalPage } from "@/components/editorial/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects and uses information on this website.`,
  alternates: { canonical: "/privacy" },
};

const sections = [
  { heading: "What we collect", body: "When you request a demo or contact us, we collect your name, institution, student count, phone number and, optionally, email address. If analytics is enabled, we use privacy-friendly, cookie-free statistics." },
  { heading: "How we use it", body: "We use your details only to respond to your request, arrange a demo and share information about our product. We do not sell your data." },
  { heading: "Sharing", body: "We share information only with service providers that help us operate our business, and where required by law." },
  { heading: "Retention and your rights", body: `We keep enquiry data only as long as needed. You can ask us to access or delete your information at any time by emailing ${site.email}.` },
  { heading: "Product data", body: "Data processed inside the school management system is covered by your agreement with us and handled on behalf of your institution." },
  { heading: "Contact", body: `Questions about this policy? Email ${site.email}.` },
] as const;

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="TODO: date" sections={sections} />;
}
