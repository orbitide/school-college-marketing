import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "default" | "muted" | "dark";
  align?: "center" | "left";
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, intro, tone = "default", align = "center", children }: SectionProps) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className={cn(
        "py-20 sm:py-28",
        tone === "muted" && "bg-muted/60",
        dark && "on-dark bg-hero text-white",
      )}
    >
      <div className="container-page">
        <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 id={id ? `${id}-title` : undefined} className="mt-3 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {title}
          </h2>
          {intro && <p className={cn("mt-5 text-lg", dark ? "text-white/75" : "text-muted-foreground")}>{intro}</p>}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
