import { SolveVisual } from "@/components/marketing/solve-visual";
import { SplitSection } from "@/components/marketing/split-section";

export function SolveSection() {
  return (
    <SplitSection
      id="solve"
      tone="surface"
      header={{ eyebrow: "Education operations platform", title: "For schools, colleges and groups of every size", intro: "Track, measure and improve day-to-day operations. Run a smooth institution with complete visibility and clear next steps." }}
      eyebrow="Problem-solving, built in"
      title="Stop problems piling up, start resolving them"
      body="Most institutions only find out about a problem when someone complains. Here the system surfaces overdue fees, unsubmitted registers and stalled applications while there is still time to act."
      callout={{ title: "Go beyond the daily numbers", text: "See the story behind the day: which classes need a follow-up, which accounts are slipping and who has not yet done what. Every problem comes with the next action beside it." }}
      points={["Catch overdue fees and missing registers as they happen", "Resolve in one click and watch the numbers change"]}
      cta={{ label: "See it for yourself", href: "/demo" }}
      visual={<SolveVisual />}
    />
  );
}
