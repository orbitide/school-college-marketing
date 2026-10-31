import type { Metadata } from "next";
import { IndexGrid } from "@/components/marketing/landing";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Enterprise, staff, teachers, monitoring, analytics, reporting and track management.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero label="Resources" title="What the platform does for your institution" intro="Capabilities that run across modules: from multi-branch groups to monitoring, analytics and reporting." />
      <IndexGrid items={resources} basePath="/resources" />
      <FinalCta />
    </>
  );
}
