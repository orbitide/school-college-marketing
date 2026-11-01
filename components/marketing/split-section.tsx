import Link from "next/link";
import { Check } from "lucide-react";
import { Band, SectionHeader, type Tone } from "@/components/marketing/band";
import { Button } from "@/components/ui/button";

type Cta = { label: string; href: string; external?: boolean };

/** Copy on one side, a product visual on the other. Used for the three feature stories. */
export function SplitSection({ id, tone, eyebrow, title, body, callout, points, cta, visual, reverse = false, header }: {
  id: string;
  tone: Tone;
  eyebrow: string;
  title: string;
  body: React.ReactNode;
  callout: { title: string; text: React.ReactNode };
  points: readonly string[];
  cta: Cta;
  visual: React.ReactNode;
  reverse?: boolean;
  header?: { eyebrow: string; title: string; intro: string };
}) {
  return (
    <Band tone={tone} labelledBy={`${id}-title`}>
      {header && <SectionHeader id={`${id}-intro`} eyebrow={header.eyebrow} title={header.title} intro={header.intro} className="mb-14" />}
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : undefined}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`} className="h-section mt-3">{title}</h2>
          <p className="mt-5 text-lg text-foreground/80">{body}</p>

          <div className="mt-6 border-l-4 border-primary pl-5">
            <p className="text-lg font-semibold text-primary">{callout.title}</p>
            <p className="mt-2 text-foreground/80">{callout.text}</p>
          </div>

          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 font-medium"><Check className="mt-1 size-4 shrink-0 text-primary" strokeWidth={3} aria-hidden />{p}</li>
            ))}
          </ul>

          <Button asChild size="xl" className="mt-8">
            {cta.external ? <a href={cta.href}>{cta.label}</a> : <Link href={cta.href}>{cta.label}</Link>}
          </Button>
        </div>
        <div className={reverse ? "min-w-0 lg:order-1" : "min-w-0"}>{visual}</div>
      </div>
    </Band>
  );
}
