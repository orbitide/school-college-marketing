import Link from "next/link";
import { SolveVisual } from "@/components/marketing/solve-visual";

const checks = ["Catch overdue fees and missing registers as they happen", "Resolve in one click and watch the numbers change"] as const;

export function SolveSection() {
  return (
    <section aria-labelledby="solve-title" className="relative overflow-hidden border-y bg-[radial-gradient(40rem_26rem_at_8%_18%,#e9effa,transparent),radial-gradient(40rem_26rem_at_95%_8%,#fdf6e3,transparent),#fbfcfe] py-16 sm:py-24">
      <div className="container-page">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-base font-semibold text-primary sm:text-lg">Education operations platform</p>
          <h2 className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl">For schools, colleges and groups of every size</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">Track, measure and improve day-to-day operations. Run a smooth institution with complete visibility and clear next steps.</p>
        </header>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div>
            <p className="text-base font-semibold text-primary">Problem-solving, built in</p>
            <h3 id="solve-title" className="mt-2 text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl">Stop problems piling up, start resolving them</h3>
            <p className="mt-5 text-lg text-foreground/80">Most institutions only find out about a problem when someone complains. Here the system surfaces overdue fees, unsubmitted registers and stalled applications while there is still time to act.</p>

            <div className="mt-6 border-l-4 border-primary pl-5">
              <p className="text-lg font-semibold text-primary">Go beyond the daily numbers</p>
              <p className="mt-2 text-foreground/80">See the story behind the day: which classes need a follow-up, which accounts are slipping and who has not yet done what. Every problem comes with the next action beside it.</p>
            </div>

            <ul className="mt-6 space-y-3 font-semibold">
              {checks.map((c) => <li key={c}>{c}</li>)}
            </ul>

            <Link href="/demo" className="mt-8 inline-flex h-12 items-center rounded-lg bg-gradient-to-r from-primary to-[#2b7a8c] px-7 text-base font-semibold text-white shadow-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              See it for yourself
            </Link>
          </div>
          <div className="min-w-0"><SolveVisual /></div>
        </div>
      </div>
    </section>
  );
}
