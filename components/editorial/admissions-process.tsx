import { admissionSteps } from "@/content/sample";

export function AdmissionsProcess() {
  return (
    <ol className="grid border-t-2 border-foreground sm:grid-cols-2 lg:grid-cols-4">
      {admissionSteps.map((s, i) => (
        <li key={s.title} className="border-b py-6 sm:pr-8 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
          <span className="tnum font-display text-5xl leading-none text-accent">{i + 1}</span>
          <h3 className="mt-4 text-2xl">{s.title}</h3>
          <p className="mt-2 text-[0.9375rem] text-muted-foreground">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
