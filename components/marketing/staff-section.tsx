import { StaffVisual } from "@/components/marketing/staff-visual";
import { site } from "@/content/site";

const points = ["Reminders for teachers who have not submitted", "Absence alerts to guardians the same day", "Cover arranged for absent staff in one click"] as const;
const hl = "font-semibold text-primary";

export function StaffSection() {
  return (
    <section aria-labelledby="staff-title" className="relative overflow-hidden bg-[radial-gradient(38rem_26rem_at_6%_12%,#e9effa,transparent),radial-gradient(40rem_26rem_at_96%_90%,#e3f3ee,transparent),#fbfcfe] py-16 sm:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div>
          <p className="text-base font-semibold text-primary">Track attendance and staff</p>
          <h2 id="staff-title" className="mt-2 text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl">Attendance and staff management on autopilot</h2>
          <p className="mt-5 text-lg text-foreground/80">
            Do more than take a register. With <span className={hl}>registers by section</span> and <span className={hl}>staff presence</span> in one place, you see the whole institution&rsquo;s day without chasing anyone.
          </p>

          <div className="mt-6 border-l-4 border-primary pl-5">
            <p className="text-lg font-semibold text-primary">Take attendance and tell guardians automatically</p>
            <p className="mt-2 text-foreground/80">Teachers mark a class from a phone in a minute. Absences reach parents the same day, and leadership sees which registers are still missing.</p>
          </div>

          <ul className="mt-6 space-y-3 font-semibold">
            {points.map((p) => <li key={p}>{p}</li>)}
          </ul>

          <a href={`${site.appUrl}/signup`} className="mt-8 inline-flex h-12 items-center rounded-lg bg-gradient-to-r from-primary to-[#2b7a8c] px-7 text-base font-semibold text-white shadow-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            Start free trial
          </a>
        </div>
        <div className="min-w-0"><StaffVisual /></div>
      </div>
    </section>
  );
}
