import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoSlot } from "@/components/editorial/photo-slot";
import { AttendanceRegister } from "@/components/editorial/register";

export function Classroom() {
  return (
    <section aria-labelledby="classroom-title" className="border-t py-16 sm:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
        <PhotoSlot
          name="teacher-attendance"
          alt="A teacher marking attendance on a phone at the start of class"
          caption="TODO: caption naming the school and class."
          ratio="aspect-[4/3]"
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="lg:col-span-7"
        />
        <div className="lg:col-span-5">
          <p className="label">Teachers</p>
          <h2 id="classroom-title" className="mt-3 text-3xl leading-[1.1] sm:text-4xl">Attendance in a minute, parents told at once</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Teachers mark a class from any phone. Absences reach parents immediately, and leadership sees the day&rsquo;s figures without chasing registers.
          </p>
          <div className="mt-8">
            <AttendanceRegister />
          </div>
          <Link href="/demo" className="link-underline mt-6 inline-flex items-center gap-2 font-semibold text-primary">
            See it in a demo <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
