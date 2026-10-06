import Link from "next/link";
import { CtaButtons } from "@/components/editorial/cta-buttons";
import { PhotoSlot } from "@/components/editorial/photo-slot";
import { heroStats } from "@/content/home";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section>
      <div className="container-page grid gap-10 pb-12 pt-10 sm:pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-14 lg:pb-20">
        <div className="lg:col-span-7 lg:pt-4">
          <p className="label">Management system for schools and colleges in Bangladesh</p>
          <h1 className="mt-5 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[4.75rem]">
            Every register, receipt and result, <em className="text-primary">in one place.</em>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-muted-foreground sm:text-xl">
            Admissions, attendance, fees, examinations and a parent portal, kept in order by a single system that your whole staff can use from a phone.
          </p>
          <div className="mt-9">
            <CtaButtons />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Already a customer?{" "}
            <a href={`${site.appUrl}/login`} className="link-underline font-semibold text-foreground">
              Open the parent and student portal
            </a>
            , or <Link href="/contact" className="link-underline font-semibold text-foreground">contact us</Link>.
          </p>
        </div>
        <PhotoSlot
          name="hero-classroom"
          alt="Students and a teacher at work in a Bangladeshi classroom"
          caption="TODO: caption naming the institution and the occasion."
          ratio="aspect-[4/3] lg:aspect-[4/5]"
          sizes="(min-width: 1024px) 40vw, 100vw"
          priority
          className="lg:col-span-5"
        />
      </div>
      <div className="border-y border-foreground">
        <dl className="container-page grid grid-cols-2 lg:grid-cols-4">
          {heroStats.map((s, i) => (
            <div key={s.label} className={`py-6 lg:px-6 lg:first:pl-0 ${i > 0 ? "lg:border-l" : ""} ${i % 2 === 1 ? "border-l pl-5 lg:pl-6" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}>
              <dd className="font-display text-4xl leading-none">{s.value}</dd>
              <dt className="mt-2 text-sm text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
