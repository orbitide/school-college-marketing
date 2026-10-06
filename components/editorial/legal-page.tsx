import { PageHero } from "@/components/editorial/page-hero";

export type LegalSection = { heading: string; body: string };

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: readonly LegalSection[] }) {
  return (
    <>
      <PageHero label="Legal" title={title} intro={`Last updated: ${updated}`} />
      {/* TODO: have a lawyer review this text before launch. */}
      <div className="container-page max-w-4xl py-14 sm:py-20">
        <ol className="border-t-2 border-foreground">
          {sections.map((s, i) => (
            <li key={s.heading} className="grid gap-2 border-b py-7 sm:grid-cols-[4rem_1fr]">
              <span className="tnum font-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
              <section>
                <h2 className="text-2xl">{s.heading}</h2>
                <p className="mt-2 max-w-prose text-muted-foreground">{s.body}</p>
              </section>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
