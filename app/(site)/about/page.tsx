import type { Metadata } from "next";
import { FinalCta } from "@/components/marketing/final-cta";
import { PageHero } from "@/components/marketing/page-hero";
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
  { title: "Support you can reach", text: "Real people on the telephone and WhatsApp, in your language." },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="Software that gives educators their time back"
        intro={`${site.name} helps school and college leaders spend less time on administration and more on students.`}
      />
      <section className="py-14 sm:py-20">
        <div className="container-page grid items-start gap-12 lg:grid-cols-1">
                    <ol className="divide-y rounded-xl border bg-surface">
            {values.map((v, i) => (
              <li key={v.title} className="grid grid-cols-[3rem_1fr] px-5 py-5">
                <span className="tnum text-lg font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-lg">{v.title}</h2>
                  <p className="mt-1.5 text-muted-foreground">{v.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
