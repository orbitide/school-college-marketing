export function PageHero({ label, title, intro }: { label?: string; title: string; intro?: string }) {
  return (
    <section className="border-b">
      <div className="container-page grid gap-6 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          {label && <p className="label">{label}</p>}
          <h1 className="mt-3 text-4xl leading-[1.05] sm:text-6xl">{title}</h1>
        </div>
        {intro && <p className="max-w-prose self-end text-lg text-muted-foreground lg:col-span-4">{intro}</p>}
      </div>
    </section>
  );
}
