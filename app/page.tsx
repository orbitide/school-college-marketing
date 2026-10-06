import Link from "next/link";
import { ArrowRight, BookOpen, Check, Lightbulb, Lock, TriangleAlert } from "lucide-react";
import { HomeSearch } from "@/components/app/home-search";
import { LevelBadge } from "@/components/app/level-badge";
import { MasteryBar } from "@/components/app/mastery-bar";
import { SolutionPreview } from "@/components/app/solution-preview";
import { SubjectMark } from "@/components/app/subject-mark";
import { Button } from "@/components/ui/button";
import { continueLearning, exams, mastery, student } from "@/content/learn/student";
import { questions } from "@/content/learn/questions";
import { subjectBySlug, subjects } from "@/content/learn/subjects";

const loop = [
  { word: "Learn", text: "Understand the idea behind the question, with hints that nudge instead of tell." },
  { word: "Solve", text: "Follow a worked solution one step at a time, then see another way to do it." },
  { word: "Practice", text: "Try fresh questions on the same concept, from easy to hard." },
  { word: "Improve", text: "See which topics are solid and which need another look." },
] as const;

const institutionCan = ["Courses", "Teachers", "Assignments", "Notices", "Exam information", "Study materials", "Question banks", "Student groups"] as const;

export default function Home() {
  const featured = subjects.slice(0, 2);
  const rest = subjects.slice(2);
  const cont = questions.find((q) => q.id === continueLearning.questionId)!;
  const exam = exams[0];

  return (
    <>
      {/* Ask */}
      <section className="border-b">
        <div className="container-page grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <p className="label">Your study companion</p>
            <h1 className="mt-3 text-4xl leading-[1.1] sm:text-5xl">What are you studying today?</h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Stuck on a problem? Show us what you are working on. We will walk you through it step by step, then help you practise until it clicks.
            </p>
            <div className="mt-7">
              <HomeSearch />
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Popular today:{" "}
              {["quadratic-factoring", "projectile-up", "moles-of-water"].map((id, i) => {
                const q = questions.find((x) => x.id === id)!;
                return (
                  <span key={id}>
                    {i > 0 && " · "}
                    <Link href={`/solve/${id}`} className="link-underline font-semibold text-foreground">{q.topic}</Link>
                  </span>
                );
              })}
            </p>
          </div>
          <SolutionPreview />
        </div>
      </section>

      {/* Learn > Solve > Practice > Improve */}
      <section aria-label="How it works" className="border-b bg-surface">
        <ol className="container-page grid grid-cols-2 lg:grid-cols-4">
          {loop.map((l, i) => (
            <li key={l.word} className={`py-6 lg:px-6 lg:first:pl-0 ${i > 0 ? "lg:border-l" : ""} ${i % 2 === 1 ? "border-l pl-5 lg:pl-6" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""}`}>
              <p className="flex items-center gap-2 font-display text-xl font-semibold">
                <span className="text-primary">{l.word}</span>
                {i < 3 && <ArrowRight className="hidden size-4 text-muted-foreground lg:block" aria-hidden />}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{l.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Today */}
      <section aria-labelledby="today-title" className="py-12 sm:py-16">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <h2 id="today-title" className="text-2xl sm:text-3xl">Pick up where you left off</h2>
            <p className="text-sm text-muted-foreground">Sample view for {student.name}</p>
          </div>
          <div className="panel mt-5 grid divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <div className="p-5 sm:p-6">
              <p className="label">Continue learning</p>
              <p className="mt-2 font-display text-xl font-semibold">{continueLearning.topic}</p>
              <p className="mt-1 text-sm text-muted-foreground">{cont.title}</p>
              <MasteryBar percent={(continueLearning.stepsDone / continueLearning.stepsTotal) * 100} color={subjectBySlug(cont.subject)!.color} label="Progress through this solution" />
              <p className="mt-1.5 text-xs text-muted-foreground">Step {continueLearning.stepsDone} of {continueLearning.stepsTotal}</p>
              <Button asChild size="sm" className="mt-4"><Link href={`/solve/${cont.id}`}>Continue <ArrowRight /></Link></Button>
            </div>
            <div className="p-5 sm:p-6">
              <p className="label">Practise next</p>
              <p className="mt-2 font-display text-xl font-semibold">Discriminant and nature of roots</p>
              <p className="mt-1 text-sm text-muted-foreground">You missed this in your last set.</p>
              <div className="mt-3"><LevelBadge level="Medium" /></div>
              <Button asChild size="sm" variant="soft" className="mt-4"><Link href="/practice?set=quadratics">Start practice <ArrowRight /></Link></Button>
            </div>
            <div className="p-5 sm:p-6">
              <p className="label">Coming up</p>
              <p className="mt-2 font-display text-xl font-semibold">{exam.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{exam.date} · {exam.topics}</p>
              <Button asChild size="sm" variant="outline" className="mt-4"><Link href="/dashboard#exams">See exam plan</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section aria-labelledby="subjects-title" className="border-t py-12 sm:py-16">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <h2 id="subjects-title" className="text-2xl sm:text-3xl">Browse by subject</h2>
            <Link href="/subjects" className="link-underline hidden text-sm font-semibold text-primary sm:inline">All subjects and topics</Link>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {featured.map((s) => (
              <Link key={s.slug} href={`/questions?subject=${s.slug}`} className="pressable group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-2xl border p-6" style={{ background: s.soft, borderColor: s.color + "40" }}>
                <SubjectMark slug={s.slug} className="absolute -right-4 -top-4 size-40 opacity-25" />
                <div className="relative">
                  <h3 className="text-2xl" style={{ color: s.color }}>{s.name}</h3>
                  <p className="mt-1 max-w-xs text-foreground/80">{s.tagline}</p>
                </div>
                <p className="relative mt-6 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                  {s.topics.slice(0, 3).map((t) => <span key={t.name}>{t.name}</span>)}
                </p>
              </Link>
            ))}
          </div>
          <ul className="mt-4 grid divide-y border-y sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
            {rest.map((s) => (
              <li key={s.slug} className="sm:border-b sm:pr-6">
                <Link href={`/questions?subject=${s.slug}`} className="flex items-center gap-4 py-4 hover:text-primary">
                  <span className="w-1 self-stretch rounded-full" style={{ background: s.color }} aria-hidden />
                  <SubjectMark slug={s.slug} className="size-8 shrink-0" />
                  <span>
                    <span className="block font-semibold">{s.name}</span>
                    <span className="text-sm text-muted-foreground">{s.topics.length} topics</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Learning, not answers */}
      <section aria-labelledby="learn-title" className="border-t bg-surface py-14 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label">Learning, not just answers</p>
            <h2 id="learn-title" className="mt-3 text-3xl sm:text-4xl">Understand why it works, so you can do the next one yourself</h2>
            <ul className="mt-6 space-y-3">
              {[
                ["Hints before answers", "Get a small nudge first. Ask for more only when you need it."],
                ["Steps you reveal one at a time", "Check your own work against each step as you go."],
                ["Common mistakes", "See the slips other students make, before you make them."],
                ["Another way to solve it", "Compare methods and pick the one that makes sense to you."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-success" aria-hidden />
                  <p><span className="font-semibold">{t}.</span> <span className="text-muted-foreground">{d}</span></p>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-7"><Link href="/solve/quadratic-factoring">Try a worked example <ArrowRight /></Link></Button>
          </div>
          <div className="space-y-3" aria-label="Example of the hint ladder">
            <div className="rounded-xl bg-accent-soft p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-accent-text"><Lightbulb className="size-4" aria-hidden /> Hint 1 of 3</p>
              <p className="mt-1">Is the equation already equal to zero? Which numbers are a, b and c?</p>
            </div>
            <div className="rounded-xl border bg-background p-4 text-muted-foreground">
              <p className="flex items-center gap-2 text-sm font-semibold"><Lock className="size-4" aria-hidden /> Hint 2 of 3</p>
              <p className="mt-1 text-sm">Take it when you are ready.</p>
            </div>
            <div className="rounded-xl bg-destructive-soft p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-destructive"><TriangleAlert className="size-4" aria-hidden /> Common mistake</p>
              <p className="mt-1 text-[0.9375rem]">With c = −3, the term −4ac becomes +24, not −24.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice and progress */}
      <section aria-labelledby="progress-title" className="border-t py-14 sm:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <p className="label">Practice and progress</p>
            <h2 id="progress-title" className="mt-3 text-3xl sm:text-4xl">Always know what to study next</h2>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Practise at your level, from easy to hard. Your topic mastery shows where you are strong and which topics deserve another look before the exam.
            </p>
            <div className="mt-5 flex flex-wrap gap-4"><LevelBadge level="Easy" /><LevelBadge level="Medium" /><LevelBadge level="Hard" /></div>
            <Button asChild variant="outline" className="mt-7"><Link href="/practice"><BookOpen /> Start practising</Link></Button>
          </div>
          <div className="panel p-5 sm:p-7 lg:order-1">
            <p className="font-display text-lg font-semibold">Topics you are practising</p>
            <ul className="mt-4 space-y-5">
              {mastery.slice(0, 3).map((m) => {
                const s = subjectBySlug(m.subject)!;
                return (
                  <li key={m.topic}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold">{m.topic}</span>
                      <span className="tnum text-sm font-semibold" style={{ color: s.color }}>{m.percent}%</span>
                    </div>
                    <div className="mt-1.5"><MasteryBar percent={m.percent} color={s.color} label={m.topic} /></div>
                    <p className="mt-1 text-sm text-muted-foreground">{m.note}</p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-xs text-muted-foreground">Sample progress</p>
          </div>
        </div>
      </section>

      {/* Institutions */}
      <section aria-labelledby="inst-title" className="on-dark bg-primary py-14 text-primary-foreground sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <p className="label">For schools and colleges</p>
            <h2 id="inst-title" className="mt-3 text-3xl sm:text-4xl">Bring your own classes into the same place</h2>
            <p className="mt-4 max-w-md text-primary-foreground/80">
              Institutions can publish their own material, so students find what their teachers assigned alongside everything else they study.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="inverse"><Link href="/institutions">See what institutions get</Link></Button>
              <Button asChild variant="outline-inverse"><Link href="/demo">Book a demonstration</Link></Button>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-x-6 border-t border-primary-foreground/30 sm:grid-cols-3">
            {institutionCan.map((c) => (
              <li key={c} className="border-b border-primary-foreground/20 py-3 font-medium">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final ask */}
      <section className="py-14 sm:py-20">
        <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl">Stuck on something right now?</h2>
            <p className="mt-2 text-lg text-muted-foreground">Type it, snap it, or pick a subject. We will take it from there.</p>
          </div>
          <Button asChild size="lg" variant="accent"><Link href="/ask">Ask a question <ArrowRight /></Link></Button>
        </div>
      </section>
    </>
  );
}
