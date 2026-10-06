import { calendar, notices } from "@/content/sample";

export function NoticeBoard() {
  return (
    <div>
      <h3 className="border-b border-foreground pb-3 font-display text-2xl">Notice board</h3>
      <ul>
        {notices.map((n) => (
          <li key={n.title} className="grid grid-cols-[4.5rem_1fr] gap-4 border-b py-4">
            <time className="tnum font-display text-lg leading-tight text-muted-foreground">{n.date}</time>
            <div>
              <p className="label">{n.category}</p>
              <p className="mt-1 font-medium leading-snug">{n.title}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AcademicCalendar() {
  return (
    <div>
      <h3 className="border-b border-foreground pb-3 font-display text-2xl">Academic calendar</h3>
      <ul>
        {calendar.map((e) => (
          <li key={e.name} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-b py-4">
            <span className="tnum font-display text-3xl leading-none">
              {e.day}
              <span className="ml-1 block text-sm uppercase tracking-wider text-muted-foreground">{e.month}</span>
            </span>
            <div>
              <p className="label">{e.kind}</p>
              <p className="mt-1 font-medium leading-snug">{e.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
