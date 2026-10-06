import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

const sections = [
  { heading: "Using this website", body: "This website provides information about our products. By using it, you agree to use it lawfully and not to disrupt it." },
  { heading: "Our product", body: "Use of the school management system is governed by the customer agreement signed or accepted when you subscribe. These terms apply to the marketing website only." },
  { heading: "Intellectual property", body: `All content, logos and designs on this website belong to ${site.name} unless stated otherwise.` },
  { heading: "No warranty", body: "Information on this website is provided as is and may change without notice. Features and pricing shown are indicative." },
  { heading: "Limitation of liability", body: "To the extent permitted by law, we are not liable for losses arising from use of this website." },
  { heading: "Governing law", body: "These terms are governed by the laws of Bangladesh. TODO: confirm jurisdiction." },
  { heading: "Contact", body: `Questions about these terms? Email ${site.email}.` },
] as const;

export default function TermsPage() {
  return <LegalPage title="Terms of Service" updated="TODO: date" sections={sections} />;
}
