import Link from "next/link";
import { CampusGroupScene, CollegeScene, SchoolScene } from "@/components/marketing/illustrations";
import { Band, SectionHeader } from "@/components/marketing/band";
import { Button } from "@/components/ui/button";
import { PhotoSlot } from "@/components/marketing/photo-slot";
import { site } from "@/content/site";

const hl = "font-semibold text-primary";

export function AudiencesSection() {
  const cards = [
    { slot: "audience-school", alt: "A school building", scene: <SchoolScene />, title: "Schools", body: <>Run a single campus with <span className={hl}>fees, attendance and admissions</span> in one place. See the whole day at a glance, without chasing registers.</>, cta: <Button asChild variant="outline" size="lg" className="mt-auto w-full"><a href={`${site.appUrl}/signup`}>Start free trial</a></Button> },
    { slot: "audience-college", alt: "A college building", scene: <CollegeScene />, title: "Colleges", body: <>Handle admissions, groups and subjects, and keep <span className={hl}>board-ready result records</span>. Keep students, teachers and guardians informed as the year moves.</>, cta: <Button asChild variant="outline" size="lg" className="mt-auto w-full"><Link href="/demo">Book a demo</Link></Button> },
    { slot: "audience-group", alt: "Several campuses linked together", scene: <CampusGroupScene />, title: "Multi-branch groups", body: <>Compare attendance, fee collection and admissions across every campus, with <span className={hl}>shared settings</span> and local control where you need it.</>, cta: <Button asChild variant="outline" size="lg" className="mt-auto w-full"><Link href="/resources/enterprise">See how it works</Link></Button> },
  ];
  return (
    <Band tone="surface" labelledBy="audiences-title">
      <SectionHeader id="audiences-title" eyebrow="Suitable for institutions of any size" title={`${site.name} makes a big difference in how your institution runs`} className="max-w-4xl" />
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <li key={c.title}>
            <article className="card flex h-full flex-col overflow-hidden">
              <PhotoSlot name={c.slot} alt={c.alt} ratio="aspect-[16/9]" sizes="(min-width: 768px) 33vw, 100vw" className="rounded-none" fallback={c.scene} />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-xl font-bold tracking-tight">{c.title}</h3>
                <p className="mb-7 mt-3 text-foreground/80">{c.body}</p>
                {c.cta}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Band>
  );
}
