import { CalendarDays } from "lucide-react";
import { MockWindow } from "@/components/mockups/window";

const notices = [
  { title: "Half-yearly exam routine published", tag: "Exam", date: "12 Oct" },
  { title: "Fee payment deadline: 20 October", tag: "Fees", date: "10 Oct" },
  { title: "School closed for public holiday", tag: "Holiday", date: "08 Oct" },
] as const;
const events = [
  { day: "18", mon: "Oct", name: "Science fair" },
  { day: "25", mon: "Oct", name: "Parent-teacher meeting" },
  { day: "02", mon: "Nov", name: "Annual sports day" },
] as const;

export function NoticesEventsMockup() {
  return (
    <MockWindow title="Notices & events">
      <div className="grid gap-3 sm:grid-cols-5">
        <ul className="space-y-2 sm:col-span-3">
          {notices.map((n) => (
            <li key={n.title} className="rounded-xl border p-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-gold-text">{n.tag}</span>
                <span className="text-muted-foreground">{n.date}</span>
              </div>
              <p className="mt-1.5 font-semibold">{n.title}</p>
            </li>
          ))}
        </ul>
        <ul className="space-y-2 sm:col-span-2">
          {events.map((e) => (
            <li key={e.name} className="flex items-center gap-3 rounded-xl border p-2.5 text-xs">
              <span className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-white">
                <span className="font-display text-sm font-semibold leading-none">{e.day}</span>
                <span className="text-[9px] uppercase">{e.mon}</span>
              </span>
              <span className="font-medium">{e.name}</span>
            </li>
          ))}
          <li className="flex items-center gap-1.5 px-1 text-[10px] text-muted-foreground">
            <CalendarDays className="size-3" /> Synced to parent portal
          </li>
        </ul>
      </div>
    </MockWindow>
  );
}
