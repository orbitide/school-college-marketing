import Link from "next/link";
import { AdmissionsVisual } from "@/components/marketing/admissions-visual";

const points = ["Document requests sent to guardians in one click", "Approvals with the full picture in one panel", "Every decision recorded, and families notified"] as const;
const hl = "font-semibold text-primary";

export function AdmissionsSection() {
  return (
    <section aria-labelledby="admissions-title" className="relative overflow-hidden border-y bg-[radial-gradient(38rem_26rem_at_4%_88%,#e3f3ee,transparent),radial-gradient(40rem_26rem_at_94%_6%,#e9effa,transparent),#fbfcfe] py-16 sm:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
        <div className="min-w-0 lg:order-1"><AdmissionsVisual /></div>
        <div className="lg:order-2">
          <p className="text-base font-semibold text-primary">Admissions and approvals</p>
          <h2 id="admissions-title" className="mt-2 text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl">Decide on time, with every document in place</h2>
          <p className="mt-5 text-lg text-foreground/80">
            Stop drowning in folders, phone calls and &ldquo;where is this application?&rdquo; questions. Move applicants from enquiry to enrolment with a clear <span className={hl}>admissions pipeline</span> and checklists that chase missing documents for you.
          </p>

          <div className="mt-6 border-l-4 border-primary pl-5">
            <p className="text-lg font-semibold text-primary">Applications that keep moving</p>
            <p className="mt-2 text-foreground/80">Forget manual <span className={hl}>status tracking</span>. Every applicant has a stage, a document checklist and a next step, so nothing waits in someone&rsquo;s notebook.</p>
          </div>

          <ul className="mt-6 space-y-3 font-semibold">
            {points.map((p) => <li key={p}>{p}</li>)}
          </ul>

          <Link href="/demo" className="mt-8 inline-flex h-12 items-center rounded-lg bg-gradient-to-r from-primary to-[#2b7a8c] px-7 text-base font-semibold text-white shadow-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Take me on a tour
          </Link>
        </div>
      </div>
    </section>
  );
}
