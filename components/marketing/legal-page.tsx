import { PageHero } from "@/components/marketing/page-hero";

export type LegalSection = { heading: string; body: string };

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: readonly LegalSection[] }) {
  return (
    <>
      <PageHero label="Legal" title={title} intro={`Last updated: ${updated}`} />
      {/* TODO: have a lawyer review this text before launch. */}
      <div className="container-page max-w-3xl space-y-8 py-14 sm:py-20">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl">{s.heading}</h2>
            <p className="mt-2 text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
