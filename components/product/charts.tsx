import { cn } from "@/lib/utils";

const pathFor = (data: number[], min: number, max: number, w: number, h: number, pad = 4) =>
  data.map((v, i) => `${i ? "L" : "M"}${((i / (data.length - 1)) * w).toFixed(1)},${(h - pad - ((v - min) / (max - min)) * (h - pad * 2)).toFixed(1)}`).join(" ");

export function Sparkline({ data, className, color = "var(--primary)" }: { data: number[]; className?: string; color?: string }) {
  const min = Math.min(...data), max = Math.max(...data) || 1;
  return (
    <svg viewBox="0 0 80 24" preserveAspectRatio="none" aria-hidden className={cn("h-6 w-20", className)}>
      <path d={pathFor(data, min - (max - min) * 0.1, max + (max - min) * 0.1 || 1, 80, 24)} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Line chart with a target line. The final point is the live value. */
export function TrendChart({ data, labels, target, min = 86, max = 98, unit = "%", label }: { data: number[]; labels: string[]; target: number; min?: number; max?: number; unit?: string; label: string }) {
  const w = 600, h = 180;
  const line = pathFor(data, min, max, w, h, 10);
  const ty = h - 10 - ((target - min) / (max - min)) * (h - 20);
  const last = data[data.length - 1];
  const ly = h - 10 - ((last - min) / (max - min)) * (h - 20);
  const mid = Math.floor(labels.length / 2);
  return (
    <figure role="img" aria-label={`${label}: latest ${last}${unit}, target ${target}${unit}`}>
      <div className="relative h-44">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden className="absolute inset-0 size-full overflow-visible">
          <path d={`${line} L${w},${h} L0,${h} Z`} fill="var(--primary)" opacity="0.07" />
          <line x1="0" x2={w} y1={ty} y2={ty} stroke="var(--border-strong)" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          <path d={line} fill="none" stroke="var(--primary)" strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute left-0 rounded bg-surface px-1 text-[0.6875rem] text-muted-foreground" style={{ top: `${(ty / h) * 100}%`, transform: "translateY(-120%)" }}>Target {target}{unit}</span>
        <span aria-hidden className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-primary" style={{ left: "100%", top: `${(ly / h) * 100}%` }} />
        <span className="tnum absolute right-0 rounded bg-primary px-1.5 py-0.5 text-xs font-semibold text-primary-foreground" style={{ top: `${(ly / h) * 100}%`, transform: "translate(-12px,-150%)" }}>{last}{unit}</span>
      </div>
      <div className="mt-1 flex justify-between text-[0.6875rem] text-muted-foreground"><span>{labels[0]}</span><span className="hidden sm:inline">{labels[mid]}</span><span>Today</span></div>
    </figure>
  );
}

/** Stacked bars: collected vs outstanding per month. */
export function StackedBars({ data, format }: { data: { label: string; collected: number; outstanding: number }[]; format: (n: number) => string }) {
  const max = Math.max(...data.map((d) => d.collected + d.outstanding));
  return (
    <figure>
      <div className="flex h-44 items-end gap-3 sm:gap-5" role="img" aria-label={data.map((d) => `${d.label}: collected ${format(d.collected)}, outstanding ${format(d.outstanding)}`).join(". ")}>
        {data.map((d) => (
          <div key={d.label} className="flex h-full flex-1 flex-col justify-end" title={`${d.label}: ${format(d.collected)} collected, ${format(d.outstanding)} outstanding`}>
            <div className="tnum mb-1 text-center text-[0.6875rem] text-muted-foreground">{format(d.outstanding)}</div>
            <div className="rounded-t bg-warning/80 transition-[height] duration-700" style={{ height: `${(d.outstanding / max) * 100}%`, minHeight: 2 }} />
            <div className="bg-primary transition-[height] duration-700" style={{ height: `${(d.collected / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex gap-3 sm:gap-5 text-center text-[0.6875rem] text-muted-foreground">{data.map((d) => <span key={d.label} className="flex-1">{d.label}</span>)}</div>
      <figcaption className="mt-3 flex gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><i className="size-2.5 rounded-sm bg-primary" />Collected</span><span className="flex items-center gap-1.5"><i className="size-2.5 rounded-sm bg-warning/80" />Outstanding</span></figcaption>
    </figure>
  );
}
