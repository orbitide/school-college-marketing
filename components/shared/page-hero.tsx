export function PageHero({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="bg-gradient-to-b from-secondary/60 to-background pb-8 pt-12 sm:pt-16">
      <div className="container-page max-w-3xl text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}
