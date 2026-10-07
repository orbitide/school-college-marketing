import { CtaButtons } from "@/components/marketing/cta-buttons";

export function FinalCta({ title = "Ready to simplify how your institution runs?" }: { title?: string }) {
  return (
    <section aria-labelledby="cta-title" className="on-dark bg-primary-dark py-16 text-primary-foreground sm:py-24">
      <div className="container-page grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <h2 id="cta-title" className="text-3xl leading-[1.15] sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-xl text-lg text-primary-foreground/75">
            Book a short call. We will listen to how you work today and tell you honestly whether and how we can help.
          </p>
        </div>
        <div className="lg:justify-self-end"><CtaButtons inverse /></div>
      </div>
    </section>
  );
}
