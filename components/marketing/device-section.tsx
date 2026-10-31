import { Check, Laptop, Smartphone, Tablet } from "lucide-react";
import { site } from "@/content/site";

const devices = [
  { icon: Smartphone, name: "Phones", note: "Android and iPhone browsers" },
  { icon: Laptop, name: "Windows, Mac and Linux", note: "Any computer with a browser" },
  { icon: Tablet, name: "Tablets", note: "For the front office and classrooms" },
] as const;

export function DeviceSection() {
  return (
    <section aria-labelledby="device-title" className="on-dark bg-gradient-to-r from-[#2b8a96] via-[#3a76ab] to-[#1b3f73] py-16 text-white sm:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="text-base font-semibold text-[#ffe94a]">Nothing to install</p>
          <h2 id="device-title" className="mt-2 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">Super easy to use on any phone or computer</h2>
          <p className="mt-5 max-w-lg text-lg text-white/90">Teachers, staff and parents sign in from a normal browser, so there is no software to install or update.</p>
          <a href={`${site.appUrl}/signup`} className="mt-8 inline-flex h-12 items-center rounded-lg bg-white px-7 text-base font-bold text-primary shadow-md outline-none transition-colors hover:bg-primary-soft focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b8a96]">
            Start free trial
          </a>
          <p className="mt-3 text-sm font-semibold text-white/85">No installation needed</p>
        </div>

        <ul className="space-y-4">
          {devices.map((d) => (
            <li key={d.name} className="flex items-center gap-4 rounded-xl bg-white px-5 py-5 text-foreground shadow-md">
              <d.icon className="size-8 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 flex-1"><span className="block text-lg font-bold">{d.name}</span><span className="text-sm text-muted-foreground">{d.note}</span></span>
              <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#8fe0cf] text-[#0b4a3d]"><Check className="size-5" strokeWidth={3} /></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
