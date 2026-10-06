import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { FinalCta } from "@/components/home/final-cta";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} builds simple, reliable management software for schools and colleges in Bangladesh.`,
  alternates: { canonical: "/about" },
};

// TODO: replace with the real company story, team and founding year.
const values = [
  { title: "Built for Bangladesh", text: "Designed around how local schools and colleges actually work, from fee collection to result publishing." },
  { title: "Simple by default", text: "If a teacher cannot learn it in an afternoon, we keep working on it." },
  { title: "Support you can reach", text: "Real people on phone and WhatsApp, in your language." },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Software that gives educators their time back"
        intro={`${site.name} helps school and college leaders spend less time on administration and more on students.`}
      />
      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="card card-hover p-8">
              <h2 className="text-xl font-semibold">{v.title}</h2>
              <p className="mt-2 text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
