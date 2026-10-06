import Link from "next/link";
import { cn } from "@/lib/utils";

export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const tones: Record<Tone, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
  neutral: "bg-muted text-muted-foreground",
};
const dots: Record<Tone, string> = { success: "bg-success", warning: "bg-warning", danger: "bg-danger", info: "bg-info", neutral: "bg-border-strong" };

/** Status badge. Always carries a text label, never colour alone. */
export function Badge({ tone = "neutral", children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-semibold", tones[tone], className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", dots[tone])} />
      {children}
    </span>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Row of key figures separated by rules, each one leading somewhere. */
export function StatStrip({ items }: { items: { label: string; value: string; note?: string; href?: string; tone?: Tone }[] }) {
  return (
    <dl className="panel grid grid-cols-2 divide-x divide-y overflow-hidden lg:grid-cols-4 lg:divide-y-0">
      {items.map((s) => (
        <div key={s.label} className={cn("relative p-4", s.href && "hover:bg-muted/50")}>
          <dt className="text-sm text-muted-foreground">{s.label}</dt>
          <dd className="tnum mt-1 text-2xl font-semibold">{s.value}</dd>
          {s.note && <dd className="mt-0.5 text-xs text-muted-foreground">{s.note}</dd>}
          {s.href && (
            <dd className="absolute inset-0">
              <Link href={s.href} aria-label={`Open ${s.label.toLowerCase()}`} className="block size-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring" />
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

export function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name.replace(/^(Mr|Ms|Mrs)\.\s/, "").split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <span aria-hidden className={cn("flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary", className)}>
      {initials}
    </span>
  );
}

export function Panel({ title, action, children, className }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("panel", className)}>
      <header className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <h2 className="text-base">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}
