import { Section } from "@/components/editorial/section";
import { AcademicCalendar, NoticeBoard } from "@/components/editorial/bulletin";

export function NoticesCalendar() {
  return (
    <Section
      label="Notices and calendar"
      title="One notice board that every parent can read"
      intro="Publish a notice once and it reaches the right classes by portal and SMS. Exams, holidays and events live on a shared calendar."
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <NoticeBoard />
        <AcademicCalendar />
      </div>
      <p className="mt-6 text-[0.8125rem] text-muted-foreground">Sample data, shown as it appears to parents.</p>
    </Section>
  );
}
