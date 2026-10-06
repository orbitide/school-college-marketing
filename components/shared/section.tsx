import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title: string;
  intro?: string;
  muted?: boolean;
  children: React.ReactNode;
};

export function Section({ id, title, intro, muted, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={cn("py-16 sm:py-20", muted && "bg-muted/50")}>
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id={id ? `${id}-title` : undefined} className="text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
