import Link from "next/link";
import { GraduationCap, Smartphone, ShieldCheck } from "lucide-react";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { site } from "@/content/site";

const faces = [["Salma Khatun", "bg-primary-soft text-primary"], ["Rubel Mia", "bg-warning-soft text-warning"], ["Alamgir Kabir", "bg-success-soft text-success"]] as const;
const initials = (n: string) => n.split(" ").map((p) => p[0]).join("");

function Faces({ n = 3, size = "size-9" }: { n?: number; size?: string }) {
  return (
    <span aria-hidden className="flex -space-x-1.5">
      {faces.slice(0, n).map(([name, tint]) => (
        <span key={name} className={`flex ${size} items-center justify-center rounded-full text-[0.6875rem] font-semibold ring-2 ring-white ${tint}`}>{initials(name)}</span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-[linear-gradient(135deg,#e9effa_0%,#e4f0f4_55%,#e3f3ee_100%)]">
      <div className="container-page pb-10 pt-12 sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div>
            <h1 className="text-[2.5rem] font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              Run your school or college from one place.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
              Admissions, attendance, fees, exams and parent communication in one system that also shows what needs attention and helps you resolve it.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`${site.appUrl}/signup`}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-[#2b7a8c] px-7 text-base font-semibold text-white shadow-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Start free trial
              </a>
              <Link
                href="/demo"
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-lg border-2 border-foreground bg-white/40 px-5 text-base font-semibold outline-none transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Faces n={2} size="size-7" />
                Book a demo
              </Link>
            </div>

            <p className="mt-7 inline-flex items-center gap-3 rounded-full bg-white/60 py-2 pl-3 pr-5 text-sm font-medium">
              <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"><GraduationCap className="size-4" /></span>
              Built for schools and colleges in Bangladesh
            </p>
          </div>

          <HeroVisual />
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 rounded-2xl bg-white/55 px-6 py-3 text-sm font-semibold">
            <li className="flex items-center gap-2"><ShieldCheck className="size-5 text-primary" aria-hidden />Role-based access</li>
            <li className="flex items-center gap-2"><Smartphone className="size-5 text-primary" aria-hidden />Works on any phone</li>
          </ul>
          <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
            <Faces />
            <p className="text-sm font-semibold sm:text-base">Want a walkthrough? Talk to our team.</p>
            <Link href="/contact" className="inline-flex h-10 items-center rounded-lg bg-gradient-to-r from-primary to-[#2b7a8c] px-5 text-sm font-semibold text-white shadow-sm hover:opacity-90">Talk to us</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
