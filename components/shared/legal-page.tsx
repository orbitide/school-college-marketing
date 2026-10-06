import { PageHero } from "@/components/shared/page-hero";

export type LegalSection = { heading: string; body: string };

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: readonly LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={`Last updated: ${updated}`} />
      <div className="container-page max-w-3xl space-y-8 py-16 sm:py-20">
        {/* TODO: have a lawyer review this text before launch. */}
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-2xl font-semibold">{s.heading}</h2>
            <p className="mt-2 text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
