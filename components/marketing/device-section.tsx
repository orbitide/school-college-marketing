import { Check, Laptop, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Band } from "@/components/marketing/band";
import { site } from "@/content/site";

const devices = [
  { icon: Smartphone, name: "Phones", note: "Android and iPhone browsers" },
  { icon: Laptop, name: "Windows, Mac and Linux", note: "Any computer with a browser" },
  { icon: Tablet, name: "Tablets", note: "For the front office and classrooms" },
] as const;

export function DeviceSection() {
  return (
    <Band tone="paper" labelledBy="device-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="eyebrow">Nothing to install</p>
          <h2 id="device-title" className="h-section mt-3">Super easy to use on any phone or computer</h2>
          <p className="mt-5 max-w-lg text-lg text-foreground/75">Teachers, staff and parents sign in from a normal browser, so there is no software to install or update.</p>
          <Button asChild size="xl" className="mt-8"><a href={`${site.appUrl}/signup`}>Start free trial</a></Button>
          <p className="mt-3 text-sm font-medium text-muted-foreground">No installation needed</p>
        </div>

        <ul className="space-y-4">
          {devices.map((d) => (
            <li key={d.name} className="card flex items-center gap-4 px-5 py-5">
              <d.icon className="size-8 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0 flex-1"><span className="block text-lg font-bold">{d.name}</span><span className="text-sm text-muted-foreground">{d.note}</span></span>
              <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-success-soft text-success"><Check className="size-5" strokeWidth={3} /></span>
            </li>
          ))}
        </ul>
      </div>
    </Band>
  );
}
