import { CtaButtons } from "@/components/editorial/cta-buttons";
import { site } from "@/content/site";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="on-dark bg-primary py-20 text-primary-foreground sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="label">Get started</p>
          <h2 id="cta-title" className="mt-4 text-4xl leading-[1.05] sm:text-6xl">See how much time your office can save.</h2>
          <p className="mt-6 max-w-lg text-lg text-primary-foreground/75">
            Book a short demonstration and we will show the system using your own classes and fee structure.
          </p>
          <div className="mt-9">
            <CtaButtons inverse />
          </div>
        </div>
        <dl className="self-end border-t border-primary-foreground/40 lg:col-span-4 lg:col-start-9">
          {[
            ["Telephone", site.phone],
            ["Email", site.email],
            ["Address", site.address],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-primary-foreground/20 py-4">
              <dt className="label">{k}</dt>
              <dd className="mt-1">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
