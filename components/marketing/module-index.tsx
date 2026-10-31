import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { groupHref, moduleGroups, moduleHref } from "@/content/modules";
import { slug } from "@/content/modules";

/** Modules grouped the same way as the application navigation. */
export function ModuleIndex() {
  return (
    <div className="divide-y border-y">
      {moduleGroups.map((g) => (
        <section key={g.title} id={slug(g.title)} aria-labelledby={`g-${g.title}`} className="grid scroll-mt-24 gap-4 py-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
          <div>
            <h2 id={`g-${g.title}`} className="text-xl"><Link href={groupHref(g.title)} className="hover:text-primary hover:underline">{g.title}</Link></h2>
            <p className="mt-1 text-sm text-muted-foreground">{g.intro}</p>
          </div>
          <ul className="divide-y rounded-lg border bg-surface">
            {g.modules.map((m) => (
              <li key={m.name} id={slug(m.name)} className="flex scroll-mt-24 flex-wrap items-center gap-x-6 gap-y-1 px-4 py-3.5 target:bg-primary-soft">
                <div className="min-w-0 flex-1 basis-64">
                  <p className="font-semibold"><Link href={moduleHref(m.name)} className="hover:text-primary hover:underline">{m.name}</Link></p>
                  <p className="text-sm text-muted-foreground">{m.summary}</p>
                </div>
                <Link href={moduleHref(m.name)} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  Learn more <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
