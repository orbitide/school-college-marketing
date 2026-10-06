import { CtaButtons } from "@/components/shared/cta-buttons";

export function FinalCta() {
  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">See how much time your team can save</h2>
        <p className="mt-4 max-w-xl text-lg text-primary-foreground">
          Book a short demo and we will show you the system with your own use case.
        </p>
        <div className="mt-8">
          <CtaButtons inverse />
        </div>
      </div>
    </section>
  );
}
