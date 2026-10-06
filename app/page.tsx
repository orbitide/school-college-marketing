import { FaqList } from "@/components/editorial/faq-list";
import { Section } from "@/components/editorial/section";
import { JsonLd } from "@/components/shared/json-ld";
import { Admissions } from "@/components/home/admissions";
import { Assurances } from "@/components/home/assurances";
import { Classroom } from "@/components/home/classroom";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Institutions } from "@/components/home/institutions";
import { Modules } from "@/components/home/modules";
import { NoticesCalendar } from "@/components/home/notices-calendar";
import { PhotoBand } from "@/components/home/photo-band";
import { PricingTeaser } from "@/components/home/pricing-teaser";
import { Results } from "@/components/home/results";
import { Statement } from "@/components/home/statement";
import { Testimonials } from "@/components/home/testimonials";
import { faqPageLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={faqPageLd} />
      <Hero />
      <Statement />
      <PhotoBand />
      <Institutions />
      <Modules />
      <NoticesCalendar />
      <Results />
      <Admissions />
      <Classroom />
      <Assurances />
      <Testimonials />
      <HowItWorks />
      <PricingTeaser />
      <Section id="faq" layout="split" label="Questions" title="Frequently asked questions">
        <FaqList />
      </Section>
      <FinalCta />
    </>
  );
}
