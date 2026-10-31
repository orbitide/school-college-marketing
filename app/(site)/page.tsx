import { DeviceSection } from "@/components/marketing/device-section";
import { GradientCta } from "@/components/marketing/gradient-cta";
import { Hero } from "@/components/marketing/hero";
import { AdditionalFeatures } from "@/components/marketing/additional-features";
import { AdmissionsSection } from "@/components/marketing/admissions-section";
import { AudiencesSection } from "@/components/marketing/audiences-section";
import { InstitutionsSection } from "@/components/marketing/institutions-section";
import { IntegrationsSection } from "@/components/marketing/integrations-section";
import { ReviewsSection } from "@/components/marketing/reviews-section";
import { StoriesSection } from "@/components/marketing/stories-section";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { PlatformSection } from "@/components/marketing/platform-section";
import { SolveSection } from "@/components/marketing/solve-section";
import { StaffSection } from "@/components/marketing/staff-section";
import { TrustBanner } from "@/components/marketing/trust-banner";
import { WhyChoose } from "@/components/marketing/why-choose";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureShowcase />
      <WhyChoose />
      <SolveSection />
      <StaffSection />
      <AdmissionsSection />
      <PlatformSection />
      <AdditionalFeatures />
      <TrustBanner />
      <AudiencesSection />
      <IntegrationsSection />
      <StoriesSection />
      <InstitutionsSection />
      <ReviewsSection />
      <DeviceSection />
      <GradientCta />
    </>
  );
}
