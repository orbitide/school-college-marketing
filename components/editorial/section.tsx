import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  label?: string;
  title: string;
  intro?: string;
  /** "split" places the heading in a left column on desktop; "stacked" keeps it above the content. */
  layout?: "split" | "stacked";
  tone?: "paper" | "dark";
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, label, title, intro, layout = "stacked", tone = "paper", className, children }: SectionProps) {
  const dark = tone === "dark";
  const heading = (
    <header className={cn(layout === "split" ? "lg:col-span-4" : "max-w-3xl")}>
      {label && <p className="label">{label}</p>}
      <h2 id={id ? `${id}-title` : undefined} className="mt-3 text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {intro && <p className={cn("mt-5 max-w-prose text-lg", dark ? "text-primary-foreground/75" : "text-muted-foreground")}>{intro}</p>}
    </header>
  );

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn("py-16 sm:py-24", dark ? "on-dark bg-primary text-primary-foreground" : "border-t", className)}
    >
      <div className={cn("container-page", layout === "split" && "grid gap-10 lg:grid-cols-12 lg:gap-12")}>
        {heading}
        <div className={cn(layout === "split" ? "lg:col-span-8" : "mt-12 sm:mt-14")}>{children}</div>
      </div>
    </section>
  );
}
