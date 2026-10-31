import Link from "next/link";
import { CampusGroupScene, CollegeScene, SchoolScene } from "@/components/marketing/illustrations";
import { PhotoSlot } from "@/components/marketing/photo-slot";
import { site } from "@/content/site";

const hl = "font-semibold text-primary";
const btn = "mt-auto inline-flex h-12 w-full items-center justify-center rounded-lg border border-primary/60 bg-white text-base font-bold text-primary shadow-[0_4px_14px_-6px_rgb(27_63_115/0.5)] outline-none transition-colors hover:bg-primary-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function AudiencesSection() {
  const cards = [
    { slot: "audience-school", alt: "A school building", scene: <SchoolScene />, title: "Schools", body: <>Run a single campus with <span className={hl}>fees, attendance and admissions</span> in one place. See the whole day at a glance, without chasing registers.</>, cta: <a href={`${site.appUrl}/signup`} className={btn}>Start free trial</a> },
    { slot: "audience-college", alt: "A college building", scene: <CollegeScene />, title: "Colleges", body: <>Handle admissions, groups and subjects, and keep <span className={hl}>board-ready result records</span>. Keep students, teachers and guardians informed as the year moves.</>, cta: <Link href="/demo" className={btn}>Book a demo</Link> },
    { slot: "audience-group", alt: "Several campuses linked together", scene: <CampusGroupScene />, title: "Multi-branch groups", body: <>Compare attendance, fee collection and admissions across every campus, with <span className={hl}>shared settings</span> and local control where you need it.</>, cta: <Link href="/resources/enterprise" className={btn}>See how it works</Link> },
  ];
  return (
    <section aria-labelledby="audiences-title" className="bg-[linear-gradient(135deg,#dfe7fb_0%,#d3e4f1_50%,#cdeee3_100%)] py-16 sm:py-24">
      <div className="container-page">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-base font-semibold text-primary sm:text-lg">Suitable for institutions of any size</p>
          <h2 id="audiences-title" className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">{site.name} makes a big difference in how your institution runs</h2>
        </header>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <li key={c.title}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-white">
                <PhotoSlot name={c.slot} alt={c.alt} ratio="aspect-[16/9]" sizes="(min-width: 768px) 33vw, 100vw" className="rounded-none" fallback={c.scene} />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-xl font-bold tracking-tight">{c.title}</h3>
                  <p className="mb-7 mt-4 text-foreground/80">{c.body}</p>
                  {c.cta}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
