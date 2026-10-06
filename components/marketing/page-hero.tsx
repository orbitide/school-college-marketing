export function PageHero({ label, title, intro }: { label?: string; title: string; intro?: string }) {
  return (
    <section className="border-b bg-surface">
      <div className="container-page py-14 sm:py-20">
        <div className="max-w-3xl">
          {label && <p className="label">{label}</p>}
          <h1 className="mt-2 text-4xl leading-[1.08] sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
        </div>
      </div>
    </section>
  );
}
