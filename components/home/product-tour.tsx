import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/shared/section";
import { AdmissionsMockup } from "@/components/mockups/admissions";
import { AttendanceMockup } from "@/components/mockups/attendance";
import { NoticesEventsMockup } from "@/components/mockups/notices-events";
import { ResultsMockup } from "@/components/mockups/results";
import { cn } from "@/lib/utils";

const tour = [
  {
    eyebrow: "Admissions",
    title: "From enquiry to enrolled, in one clear pipeline",
    points: ["Online applications and enquiry tracking", "See every applicant's stage at a glance", "Student records created on enrolment"],
    mock: <AdmissionsMockup />,
  },
  {
    eyebrow: "Teachers & attendance",
    title: "Attendance in seconds, parents informed instantly",
    points: ["Mark a whole class from any phone", "Automatic absence alerts to parents", "Daily and monthly reports for leadership"],
    mock: <AttendanceMockup />,
  },
  {
    eyebrow: "Notices & events",
    title: "One announcement reaches everyone who needs it",
    points: ["Send to a class, a section or the whole institution", "Exam routines, holidays and events in one place", "Everything mirrored in the parent portal"],
    mock: <NoticesEventsMockup />,
  },
  {
    eyebrow: "Exams & results",
    title: "Publish accurate results in hours, not weeks",
    points: ["Marks entry with automatic grading", "Printable marksheets and report cards", "Results shared securely with parents"],
    mock: <ResultsMockup />,
  },
] as const;

export function ProductTour() {
  return (
    <Section
      tone="muted"
      eyebrow="Product tour"
      title="See how a day at your institution looks"
      intro="Illustrative screens with sample data. Your demo will use your own classes and fee structure."
    >
      <div className="space-y-20 sm:space-y-28">
        {tour.map((t, i) => (
          <div key={t.eyebrow} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={cn("min-w-0", i % 2 === 1 && "lg:order-2")}>
              <p className="eyebrow">{t.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{t.title}</h3>
              <ul className="mt-6 space-y-3">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/25 text-gold-text">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link href="/demo" className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                See it in a demo <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
            <div className={cn("reveal min-w-0", i % 2 === 1 && "lg:order-1")}>{t.mock}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
