import { pains } from "@/content/home";

export function Statement() {
  return (
    <section aria-labelledby="statement-title" className="py-20 sm:py-28">
      <div className="container-page">
        <p className="label">Why institutions switch</p>
        <h2 id="statement-title" className="mt-5 max-w-5xl text-3xl leading-[1.15] sm:text-5xl lg:text-[3.5rem]">
          Running an institution should not depend on spreadsheets, notebooks and{" "}
          <em className="text-primary">telephone calls.</em>
        </h2>
        <ol className="mt-14 grid border-t border-foreground md:grid-cols-3">
          {pains.map((p, i) => (
            <li key={p.pain} className="border-b py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <span className="tnum font-display text-lg text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-2xl">{p.pain}</h3>
              <p className="mt-2 text-muted-foreground">{p.fix}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
