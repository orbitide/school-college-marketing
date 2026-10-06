import { BellRing } from "lucide-react";
import { MockWindow } from "@/components/mockups/window";

const rows = [
  { name: "Ayesha Rahman", roll: 1, present: true },
  { name: "Tahmid Hasan", roll: 2, present: true },
  { name: "Nusrat Jahan", roll: 3, present: false },
  { name: "Imran Hossain", roll: 4, present: true },
  { name: "Sadia Akter", roll: 5, present: true },
] as const;

export function AttendanceMockup() {
  return (
    <MockWindow title="Class 8 · Section A · Attendance">
      <ul className="divide-y rounded-xl border">
        {rows.map((r) => (
          <li key={r.roll} className="flex items-center justify-between px-3 py-2.5 text-xs">
            <span className="flex items-center gap-3">
              <span className="w-5 text-muted-foreground">{r.roll}</span>
              <span className="font-semibold">{r.name}</span>
            </span>
            <span className={`rounded-full px-2.5 py-1 font-semibold ${r.present ? "bg-[#e3f4e8] text-success" : "bg-[#fbe4e1] text-destructive"}`}>
              {r.present ? "Present" : "Absent"}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-[11px] font-medium text-secondary-foreground">
        <BellRing className="size-3.5" />
        Absence alert sent to parent of Nusrat Jahan
      </p>
    </MockWindow>
  );
}
