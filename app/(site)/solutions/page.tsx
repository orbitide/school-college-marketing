import type { Metadata } from "next";
import { Check } from "lucide-react";
import { FinalCta } from "@/components/marketing/final-cta";
import { IndexGrid } from "@/components/marketing/landing";
import { PageHero } from "@/components/marketing/page-hero";
import { Section } from "@/components/marketing/section";
import { solutions as institutions } from "@/content/marketing";
import { solutions as roles } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions for schools and colleges",
  description: "Management software shaped around how schools, colleges and multi-branch groups work, with the right view for every role.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero label="Solutions" title="Built for how your institution works" intro="A school and a college do not run the same way. We configure the system around yours, and give each person the view they need." />
      <Section label="By institution" title="Choose your setting">
        <div className="grid gap-4 lg:grid-cols-3">
          {institutions.map(({ slug, icon: Icon, name, intro, needs }) => (
            <article key={slug} id={slug} className="panel p-6">
              <Icon className="size-6 text-primary" aria-hidden />
              <h2 className="mt-3 text-xl">{name}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{intro}</p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {needs.map((n) => <li key={n} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />{n}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <div className="border-t bg-muted/60">
        <div className="container-page pt-14"><p className="label">By role</p><h2 className="mt-2 text-3xl sm:text-4xl">The right view for everyone</h2></div>
        <IndexGrid items={roles} basePath="/solutions" />
      </div>
      <FinalCta />
    </>
  );
}
