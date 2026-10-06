import { Mail, MapPin, Phone } from "lucide-react";
import { CtaButtons } from "@/components/shared/cta-buttons";
import { site } from "@/content/site";

const contacts = [
  { icon: Phone, value: site.phone },
  { icon: Mail, value: site.email },
  { icon: MapPin, value: site.address },
] as const;

export function FinalCta() {
  return (
    <section className="on-dark bg-hero relative overflow-hidden py-20 text-white sm:py-28">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="eyebrow">Get started</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold sm:text-5xl sm:leading-[1.08]">See how much time your team can save</h2>
          <p className="mt-5 max-w-lg text-lg text-white/75">
            Book a short demo and we will show you the system with your own use case.
          </p>
          <div className="mt-8">
            <CtaButtons inverse />
          </div>
        </div>
        <ul className="glass space-y-5 rounded-2xl p-7 text-sm">
          {contacts.map(({ icon: Icon, value }) => (
            <li key={value} className="flex items-center gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-accent">
                <Icon className="size-4" aria-hidden />
              </span>
              {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
