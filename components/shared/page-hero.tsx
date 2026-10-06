export function PageHero({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <section className="on-dark bg-hero relative overflow-hidden text-white">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div className="container-page relative py-16 sm:py-24">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl lg:text-6xl lg:leading-[1.05]">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg text-white/75">{intro}</p>}
        </div>
      </div>
    </section>
  );
}
