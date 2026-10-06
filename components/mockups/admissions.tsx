import { Check } from "lucide-react";
import { MockWindow } from "@/components/mockups/window";

const stages = ["Applied", "Reviewed", "Interview", "Enrolled"] as const;
const applicants = [
  { name: "Ayesha Rahman", cls: "Class 6", stage: 3 },
  { name: "Tahmid Hasan", cls: "Class 6", stage: 2 },
  { name: "Nusrat Jahan", cls: "Class 9", stage: 1 },
  { name: "Imran Hossain", cls: "Class 1", stage: 0 },
] as const;

export function AdmissionsMockup() {
  return (
    <MockWindow title="Admissions pipeline">
      <ol className="flex items-center justify-between gap-1">
        {stages.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col items-center gap-1 text-center">
            <span className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${i < 3 ? "bg-primary text-white" : "bg-accent text-accent-foreground"}`}>
              {i < 3 ? i + 1 : <Check className="size-3.5" />}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground sm:text-xs">{s}</span>
          </li>
        ))}
      </ol>
      <ul className="mt-4 divide-y rounded-xl border">
        {applicants.map((a) => (
          <li key={a.name} className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs">
            <span>
              <span className="block font-semibold">{a.name}</span>
              <span className="text-muted-foreground">{a.cls}</span>
            </span>
            <span className="rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">{stages[a.stage]}</span>
          </li>
        ))}
      </ul>
    </MockWindow>
  );
}
