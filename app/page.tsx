import { JsonLd } from "@/components/shared/json-ld";
import { faqPageLd } from "@/lib/structured-data";
import { FaqList } from "@/components/shared/faq-list";
import { Section } from "@/components/shared/section";
import { FeatureGrid } from "@/components/home/feature-grid";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { PricingTeaser } from "@/components/home/pricing-teaser";
import { ProblemSolution } from "@/components/home/problem-solution";
import { SocialProof } from "@/components/home/social-proof";

export default function Home() {
  return (
    <>
      <JsonLd data={faqPageLd} />
      <Hero />
      <ProblemSolution />
      <FeatureGrid />
      <HowItWorks />
      <SocialProof />
      <PricingTeaser />
      <Section muted id="faq" title="Frequently asked questions">
        <FaqList />
      </Section>
      <FinalCta />
    </>
  );
}
