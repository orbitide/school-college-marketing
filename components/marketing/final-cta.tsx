import { CtaButtons } from "@/components/marketing/cta-buttons";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="on-dark bg-primary-dark py-16 text-primary-foreground sm:py-24">
      <div className="container-page grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h2 id="cta-title" className="text-3xl leading-[1.15] sm:text-4xl">See what needs attention at your institution</h2>
          <p className="mt-4 max-w-xl text-lg text-primary-foreground/75">
            Book a short demo and we will set it up with your classes and fee structure. Or explore the demo app yourself first.
          </p>
        </div>
        <div className="lg:justify-self-end"><CtaButtons inverse /></div>
      </div>
    </section>
  );
}
