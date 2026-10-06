import { ArrowRight, BellRing, UserRound, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaButtons } from "@/components/shared/cta-buttons";
import { DashboardMockup } from "@/components/mockups/dashboard";
import { heroStats } from "@/content/home";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="on-dark bg-hero relative overflow-hidden text-white">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div className="container-page relative grid items-center gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-24">
        <div>
          <p className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-white/90">
            <span className="size-1.5 rounded-full bg-accent" />
            Built for schools &amp; colleges in Bangladesh
          </p>
          <h1 className="mt-6 text-[2.5rem] font-semibold leading-[1.05] sm:text-6xl">
            The calm, modern way to run your <em className="text-accent not-italic">institution</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            Admissions, attendance, fees, exams and parent communication in one elegant system your whole team can use from a phone.
          </p>
          <div className="mt-9">
            <CtaButtons inverse />
          </div>
          <Button asChild variant="ghost" size="sm" className="mt-5 -ml-3 text-white/80 hover:bg-white/10 hover:text-white">
            <a href={`${site.appUrl}/login`}>
              <UserRound /> Already a customer? Parent / student portal
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>

        <div className="relative">
          <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-accent/10 blur-3xl" />
          <DashboardMockup className="relative" />
          <div aria-hidden className="float-slow absolute -left-4 top-[58%] hidden items-center gap-2.5 rounded-2xl border bg-white px-3.5 py-2.5 text-xs text-foreground shadow-lift sm:flex lg:-left-10">
            <span className="flex size-8 items-center justify-center rounded-full bg-accent text-accent-foreground"><Wallet className="size-4" /></span>
            <span><b className="block">৳4,500 received</b><span className="text-muted-foreground">Class 8 · tuition fee</span></span>
          </div>
          <div aria-hidden className="float-slow absolute -bottom-6 right-2 hidden items-center gap-2.5 rounded-2xl border bg-white px-3.5 py-2.5 text-xs text-foreground shadow-lift [animation-delay:-3s] sm:flex lg:-right-6">
            <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-primary"><BellRing className="size-4" /></span>
            <span><b className="block">Alert sent to parent</b><span className="text-muted-foreground">Absent today</span></span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <dl className="container-page grid grid-cols-2 gap-y-6 py-8 lg:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dd className="font-display text-3xl font-semibold text-accent">{s.value}</dd>
              <dt className="mt-1 text-sm text-white/70">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
