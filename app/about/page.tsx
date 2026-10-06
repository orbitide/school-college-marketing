import type { Metadata } from "next";
import { FinalCta } from "@/components/home/final-cta";
import { PageHero } from "@/components/editorial/page-hero";
import { PhotoSlot } from "@/components/editorial/photo-slot";
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
        <div className="container-page grid items-start gap-12 lg:grid-cols-12">
          <PhotoSlot
            name="about-team"
            alt="The team at work with a school administrator"
            caption="TODO: team photograph and caption."
            ratio="aspect-[4/3]"
            className="lg:col-span-7"
          />
          <ol className="border-t-2 border-foreground lg:col-span-5">
            {values.map((v, i) => (
              <li key={v.title} className="grid grid-cols-[3rem_1fr] border-b py-6">
                <span className="tnum font-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-2xl">{v.title}</h2>
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
