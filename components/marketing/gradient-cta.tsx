import Link from "next/link";
import { Band } from "@/components/marketing/band";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

const hl = "text-accent";

export function GradientCta() {
  return (
    <Band tone="dark" labelledBy="gradient-cta-title" className="border-b border-white/10 bg-[radial-gradient(50rem_22rem_at_50%_0%,#2a5594,transparent_70%)] py-20 text-center sm:py-28">
      <h2 id="gradient-cta-title" className="h-section mx-auto max-w-3xl">
        Your institution has <span className={hl}>potential,</span> we help you run it <span className={hl}>smoothly.</span>
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80 sm:text-xl">Manage admissions, attendance, fees and families without the stress. You&rsquo;re just one click away.</p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild variant="accent" size="xl" className="h-14 px-8"><a href={`${site.appUrl}/signup`}>Start my free trial</a></Button>
        <Button asChild variant="outline-inverse" size="xl" className="h-14 px-8"><Link href="/demo">Book a demo</Link></Button>
      </div>
    </Band>
  );
}
