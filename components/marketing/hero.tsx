import Link from "next/link";
import { GraduationCap, Smartphone, ShieldCheck } from "lucide-react";
import { Band } from "@/components/marketing/band";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { Button } from "@/components/ui/button";
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
    <Band tone="wash" className="pb-10 pt-12 sm:pb-12 sm:pt-16 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <h1 className="text-[2.5rem] font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Run your school or college from one place.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
            Admissions, attendance, fees, exams and parent communication in one system that also shows what needs attention and helps you resolve it.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl"><a href={`${site.appUrl}/signup`}>Start free trial</a></Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/demo"><Faces n={2} size="size-7" />Book a demo</Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <li className="flex items-center gap-2"><GraduationCap className="size-5 text-primary" aria-hidden />Built for schools and colleges in Bangladesh</li>
            <li className="flex items-center gap-2"><ShieldCheck className="size-5 text-primary" aria-hidden />Role-based access</li>
            <li className="flex items-center gap-2"><Smartphone className="size-5 text-primary" aria-hidden />Works on any phone</li>
          </ul>
        </div>

        <HeroVisual />
      </div>

      <div className="card mx-auto mt-12 flex w-full max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-3 px-4 py-3">
        <Faces />
        <p className="text-sm font-semibold sm:text-base">Want a walkthrough? Talk to our team.</p>
        <Button asChild size="sm"><Link href="/contact">Talk to us</Link></Button>
      </div>
    </Band>
  );
}
