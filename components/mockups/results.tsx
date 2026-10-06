import { MockWindow } from "@/components/mockups/window";

const rows = [
  { name: "Ayesha Rahman", bangla: 92, english: 88, math: 96, gpa: "5.00", grade: "A+" },
  { name: "Tahmid Hasan", bangla: 84, english: 79, math: 90, gpa: "4.83", grade: "A+" },
  { name: "Sadia Akter", bangla: 76, english: 81, math: 72, gpa: "4.33", grade: "A" },
  { name: "Imran Hossain", bangla: 68, english: 70, math: 64, gpa: "3.67", grade: "A-" },
] as const;

export function ResultsMockup() {
  return (
    <MockWindow title="Half-yearly result · Class 8">
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full min-w-[26rem] text-left text-xs">
          <thead className="bg-muted/70 text-muted-foreground">
            <tr>
              {["Student", "Bangla", "English", "Math", "GPA", "Grade"].map((h) => (
                <th key={h} scope="col" className="px-3 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((r) => (
              <tr key={r.name}>
                <th scope="row" className="px-3 py-2.5 font-semibold">{r.name}</th>
                <td className="px-3 py-2.5">{r.bangla}</td>
                <td className="px-3 py-2.5">{r.english}</td>
                <td className="px-3 py-2.5">{r.math}</td>
                <td className="px-3 py-2.5 font-semibold">{r.gpa}</td>
                <td className="px-3 py-2.5">
                  <span className="rounded-full bg-accent/20 px-2 py-0.5 font-semibold text-gold-text">{r.grade}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockWindow>
  );
}
