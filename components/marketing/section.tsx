import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  label?: string;
  title: string;
  intro?: string;
  tone?: "default" | "muted" | "dark";
  align?: "left" | "center";
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, label, title, intro, tone = "default", align = "left", className, children }: SectionProps) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn("py-16 sm:py-24", tone === "muted" && "border-y bg-muted/60", dark && "on-dark bg-primary-dark text-primary-foreground", className)}
    >
      <div className="container-page">
        <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
          {label && <p className="label">{label}</p>}
          <h2 id={id ? `${id}-title` : undefined} className="mt-2 text-3xl leading-[1.15] sm:text-4xl">{title}</h2>
          {intro && <p className={cn("mt-4 text-lg", dark ? "text-primary-foreground/75" : "text-muted-foreground")}>{intro}</p>}
        </header>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
