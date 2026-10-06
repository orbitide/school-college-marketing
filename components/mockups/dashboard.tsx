import { MockWindow } from "@/components/mockups/window";

const kpis = [
  { label: "Present today", value: "94%", tone: "text-success" },
  { label: "Fees collected", value: "৳4.2L", tone: "text-primary" },
  { label: "Pending dues", value: "38", tone: "text-destructive" },
] as const;

const bars = [62, 74, 70, 88, 81, 93, 90];

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <MockWindow title="Management dashboard" className={className}>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border bg-background p-3">
            <p className="text-[10px] text-muted-foreground sm:text-xs">{k.label}</p>
            <p className={`mt-1 font-display text-xl font-semibold sm:text-2xl ${k.tone}`}>{k.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-5">
        <div className="rounded-xl border p-3 sm:col-span-3">
          <p className="text-xs font-semibold">Attendance this week</p>
          <div className="mt-3 flex h-24 items-end gap-2">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-[#3f6cb8]" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border p-3 sm:col-span-2">
          <p className="text-xs font-semibold">Latest notices</p>
          <ul className="mt-2 space-y-2 text-[11px]">
            {["Half-yearly exam routine", "Fee deadline reminder", "Science fair registration"].map((n) => (
              <li key={n} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockWindow>
  );
}
