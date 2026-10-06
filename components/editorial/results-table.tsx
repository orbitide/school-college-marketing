import { results, resultsMeta } from "@/content/sample";

export function ResultsTable() {
  return (
    <figure>
      <div className="overflow-x-auto">
        <table className="tnum w-full border-collapse text-left">
          <caption className="pb-3 text-left font-display text-xl">{resultsMeta.caption}</caption>
          <thead>
            <tr className="border-y-2 border-foreground text-[0.75rem] uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="hidden w-12 py-2.5 pr-3 font-semibold sm:table-cell">Roll</th>
              <th scope="col" className="py-2.5 pr-3 font-semibold">Student</th>
              {resultsMeta.subjects.map((s) => (
                <th key={s} scope="col" className="hidden py-2.5 pr-3 text-right font-semibold sm:table-cell">{s}</th>
              ))}
              <th scope="col" className="py-2.5 pr-3 text-right font-semibold">GPA</th>
              <th scope="col" className="py-2.5 text-right font-semibold">Grade</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.roll} className="border-b">
                <td className="hidden py-3.5 pr-3 text-muted-foreground sm:table-cell">{r.roll}</td>
                <th scope="row" className="py-3.5 pr-3 font-medium">{r.name}</th>
                {r.marks.map((m, i) => (
                  <td key={i} className="hidden py-3.5 pr-3 text-right sm:table-cell">{m}</td>
                ))}
                <td className="py-3.5 pr-3 text-right font-semibold">{r.gpa}</td>
                <td className="py-3.5 text-right font-display text-lg text-accent">{r.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 border-t border-foreground pt-3 text-[0.8125rem] text-muted-foreground">
        Sample data. Subject marks are shown on larger screens. Marks are entered once; grades, GPA and printable marksheets are produced automatically.
      </figcaption>
    </figure>
  );
}
