import { Check, GraduationCap } from "lucide-react";
import { Band, SectionHeader } from "@/components/marketing/band";
import { attendanceTrend } from "@/content/product/data";
import { proof } from "@/content/proof";
import { site } from "@/content/site";

const focus = ["Fees and collection", "Attendance and registers", "Admissions and approvals"] as const;

/** Round badge with text on a circle. This is our own mark, not an award. */
function Badge() {
  return (
    <div className="relative size-40 shrink-0 sm:size-44" aria-hidden>
      <svg viewBox="0 0 200 200" className="size-full drop-shadow-md">
        <defs>
          <path id="badge-ring" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="var(--primary)" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#9fc0ee" strokeWidth="1.5" strokeDasharray="2 5" />
        <circle cx="100" cy="100" r="58" fill="var(--primary-dark)" />
        <text fill="#fff" fontSize="14" fontWeight="700" letterSpacing="3">
          <textPath href="#badge-ring" startOffset="0">BUILT FOR BANGLADESH • SCHOOLS &amp; COLLEGES •</textPath>
        </text>
      </svg>
      <GraduationCap className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-white" />
    </div>
  );
}

/** Rising bars from the sample attendance series, light to dark. */
function Bars() {
  const data = attendanceTrend.slice(-12);
  const min = Math.min(...data) - 2, max = Math.max(...data);
  return (
    <figure className="visual-frame p-5 sm:p-6">
      <div className="flex h-44 items-end gap-2 sm:h-52 sm:gap-3" role="img" aria-label="Attendance rate over the last 12 school days, sample institution">
        {data.map((v, i) => (
          <span key={i} className="flex-1 rounded-t-md" style={{ height: `${20 + ((v - min) / (max - min)) * 80}%`, background: `color-mix(in srgb, var(--primary) ${25 + (i / (data.length - 1)) * 75}%, #cfe0f7)` }} />
        ))}
      </div>
      <figcaption className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground"><i className="size-2 rounded-full bg-primary" />Attendance rate, sample institution</figcaption>
    </figure>
  );
}

export function WhyChoose() {
  const q = proof.quote;
  return (
    <Band tone="paper" labelledBy="why-title">
      <SectionHeader id="why-title" eyebrow="Why choose us" title={`Why choose ${site.name}?`} />

      <div className="card mt-12 grid items-center gap-8 p-6 sm:p-10 md:grid-cols-[auto_1fr] md:gap-14">
        <div className="flex justify-center"><Badge /></div>
        <div>
          <p className="text-2xl font-bold leading-tight tracking-tight sm:text-4xl">Built around how institutions here actually run</p>
          <p className="mt-5 text-lg text-foreground/80">Especially built for:</p>
          <ul className="mt-3 space-y-2 text-lg font-medium">
            {focus.map((f) => <li key={f} className="flex items-center gap-3"><Check className="size-5 shrink-0 text-primary" strokeWidth={3} aria-hidden />{f}</li>)}
          </ul>
        </div>
      </div>

      <div className="card relative mt-6 overflow-hidden p-6 sm:p-10">
        <span aria-hidden className="pointer-events-none absolute -right-2 -top-8 select-none font-serif text-[11rem] font-bold leading-none text-primary/10 sm:text-[14rem]">&rdquo;</span>
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-6xl font-bold tracking-tight sm:text-7xl">{proof.stat.value}</p>
            <p className="mt-2 text-muted-foreground">{proof.stat.label}</p>
            <figure className="mt-8">
              <blockquote className="text-2xl font-medium leading-snug sm:text-3xl">
                &ldquo;{q.before}<span className="text-primary">{q.highlight}</span>{q.after}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">NN</span>
                <span><span className="block font-semibold">{q.author}</span><span className="text-sm text-muted-foreground">{q.role}</span></span>
              </figcaption>
            </figure>
          </div>
          <Bars />
        </div>
      </div>
    </Band>
  );
}
