import type { Metadata } from "next";
import { IndexGrid } from "@/components/marketing/landing";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description: "One platform with the right view for administrators, teachers, students and parents.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero label="Solutions" title="The right view for everyone at your institution" intro="Each person sees the information and actions that matter to them, and nothing else." />
      <IndexGrid items={solutions} basePath="/solutions" />
      <FinalCta />
    </>
  );
}
