import { Plus } from "lucide-react";
import { PhotoSlot } from "@/components/marketing/photo-slot";
import { PlatformCards } from "@/components/marketing/platform-cards";

// TODO: review the copy with the product team.
const groups = [
  {
    title: "What you control from one dashboard",
    items: [
      ["Run the institution from one place", "Admissions, attendance, fees, exams and notices live in one system, so leaders stay organised and in control."],
      ["Make faster, clearer decisions", "See overdue fees, missing registers and stalled applications as they happen, with the next action beside each."],
      ["Stay in control across branches", "Whether you run one campus or several, compare attendance and collection and keep everyone aligned."],
    ],
  },
  {
    title: "What teachers get",
    items: [
      ["Attendance in a minute", "Mark a class from a phone. Guardians hear about absences the same day."],
      ["Students to follow up", "See who is slipping and message the parent in one click."],
      ["Timetable and marks in one place", "Rooms, substitutions and marks entry without separate paperwork."],
    ],
  },
  {
    title: "What parents and students gain",
    items: [
      ["Know how your child is doing", "Attendance, results and notices in one place, on any phone."],
      ["Fees and notices without a trip to the office", "See what is due, pay it and read what the institution has published."],
      ["A direct line to the class teacher", "Send a message that stays attached to the student."],
    ],
  },
] as const;

export function PlatformSection() {
  return (
    <section aria-labelledby="platform-title" className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfcfe,#eef4f6_55%,#e6f1ef)] py-16 sm:py-24">
      <div className="container-page">
        <h2 id="platform-title" className="mx-auto max-w-4xl text-center text-3xl font-bold leading-[1.15] tracking-tight text-[#0b1d3a] sm:text-5xl">
          One platform to run operations, spot problems and keep families informed
        </h2>

        <div className="mt-10 grid gap-5 rounded-[1.75rem] border border-white/80 bg-white/55 p-3 sm:mt-12 sm:p-6 lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col gap-3">
            {groups.map((g, gi) => (
              <details key={g.title} name="platform-groups" open={gi === 0} className="grad-open group rounded-2xl border border-border bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-xl font-bold outline-none focus-visible:ring-2 focus-visible:ring-ring group-open:text-primary sm:text-2xl [&::-webkit-details-marker]:hidden">
                  {g.title}
                  <Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden />
                </summary>
                <ul className="mx-5 divide-y border-t pb-3">
                  {g.items.map(([t, d]) => (
                    <li key={t} className="py-3.5">
                      <p className="font-bold text-[#0b1d3a]">{t}</p>
                      <p className="mt-1 text-foreground/75">{d}</p>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

          <div className="relative min-h-[26rem]">
            <PhotoSlot name="administrator" alt="A school administrator at their desk" ratio="aspect-[4/5] lg:aspect-auto lg:h-full" />
            <PlatformCards />
          </div>
        </div>
      </div>
    </section>
  );
}
