import { cn } from "@/lib/utils";

const tones = {
  /** White band. */
  surface: "bg-surface",
  /** Page-grey band; alternates with `surface` so sections read as separate chapters. */
  paper: "bg-background",
  /** Hero-style soft blue wash, used once at the top. */
  wash: "bg-gradient-to-b from-primary-soft to-surface",
  /** Brand navy, used for the closing call to action. */
  dark: "on-dark bg-primary-dark text-primary-foreground",
} as const;

export type Tone = keyof typeof tones;

/** Full-width page section with the shared vertical rhythm. */
export function Band({ tone = "surface", id, labelledBy, className, children }: { tone?: Tone; id?: string; labelledBy?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 sm:py-24", tones[tone], className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Eyebrow, heading and optional intro, centred by default. */
export function SectionHeader({ id, eyebrow, title, intro, align = "center", className }: { id: string; eyebrow?: string; title: string; intro?: string; align?: "center" | "left"; className?: string }) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="h-section mt-3">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
    </header>
  );
}
