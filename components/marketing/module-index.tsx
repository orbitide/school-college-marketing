import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { moduleGroups } from "@/content/modules";

/** Modules grouped the same way as the application navigation. */
export function ModuleIndex() {
  return (
    <div className="divide-y border-y">
      {moduleGroups.map((g) => (
        <section key={g.title} aria-labelledby={`g-${g.title}`} className="grid gap-4 py-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <div>
            <h2 id={`g-${g.title}`} className="text-xl">{g.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{g.intro}</p>
          </div>
          <ul className="divide-y rounded-lg border bg-surface">
            {g.modules.map((m) => (
              <li key={m.name} className="flex flex-wrap items-center gap-x-6 gap-y-1 px-4 py-3.5">
                <div className="min-w-0 flex-1 basis-64">
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.summary}</p>
                </div>
                <Link href={m.demo ?? "/demo"} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  {m.demo ? "Open in the demo app" : "See it in a demo"} <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
