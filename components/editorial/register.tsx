import { register } from "@/content/sample";

export function AttendanceRegister() {
  return (
    <figure>
      <table className="tnum w-full border-collapse text-left">
        <caption className="pb-3 text-left font-display text-xl">Class VIII · Section A · Today</caption>
        <thead>
          <tr className="border-y-2 border-foreground text-[0.75rem] uppercase tracking-wider text-muted-foreground">
            <th scope="col" className="w-12 py-2.5 font-semibold">Roll</th>
            <th scope="col" className="py-2.5 font-semibold">Student</th>
            <th scope="col" className="py-2.5 text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {register.map((r) => (
            <tr key={r.roll} className="border-b">
              <td className="py-3 text-muted-foreground">{r.roll}</td>
              <th scope="row" className="py-3 font-medium">{r.name}</th>
              <td className={`py-3 text-right font-semibold ${r.present ? "text-success" : "text-destructive"}`}>
                {r.present ? "Present" : "Absent, parent notified"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-3 text-[0.8125rem] text-muted-foreground">Sample data.</figcaption>
    </figure>
  );
}
