import Image from "next/image";
import { CtaButtons } from "@/components/shared/cta-buttons";

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-secondary/60 to-background pt-12 sm:pt-20">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            School &amp; college management for Bangladesh
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            Run your institution with less paperwork and more time for students.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Admissions, attendance, fees, exams and parent communication in one simple system your whole team can use from a phone.
          </p>
          <div className="mt-8">
            <CtaButtons />
          </div>
        </div>
        <Image
          src="/screens/TODO-dashboard.svg"
          alt="Dashboard overview of the school management system"
          width={1200}
          height={750}
          priority
          className="w-full rounded-xl border shadow-xl"
        />
      </div>
    </section>
  );
}
