import type { Level } from "@/content/learn/subjects";

const filled: Record<Level, number> = { Easy: 1, Medium: 2, Hard: 3 };

/** Difficulty shown as three dots plus the word, so it never relies on colour alone. */
export function LevelBadge({ level }: { level: Level }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
      <span aria-hidden className="flex gap-0.5">
        {[1, 2, 3].map((i) => (
          <span key={i} className={`size-1.5 rounded-full ${i <= filled[level] ? "bg-accent" : "bg-border"}`} />
        ))}
      </span>
      {level}
    </span>
  );
}
