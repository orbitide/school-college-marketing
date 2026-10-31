import { faqs } from "@/content/marketing";
import { site } from "@/content/site";

const context = "https://schema.org";

export const organizationLd = {
  "@context": context,
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  areaServed: "BD",
};

export const softwareApplicationLd = {
  "@context": context,
  "@type": "SoftwareApplication",
  name: site.name,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description: site.description,
  url: site.url,
};

export const faqPageLd = {
  "@context": context,
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
