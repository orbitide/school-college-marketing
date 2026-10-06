import { Lightbulb } from "lucide-react";
import { questions } from "@/content/learn/questions";

/** Static preview of the solving screen, used on the home page. */
export function SolutionPreview() {
  const q = questions[0];
  return (
    <div className="panel overflow-hidden" role="img" aria-label="Example of a worked solution with a hint and the first step">
      <div aria-hidden>
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2.5 text-xs font-semibold text-muted-foreground">
          <span>Mathematics · Quadratic equations</span>
          <span>Example</span>
        </div>
        <div className="p-5">
          <p className="text-sm text-muted-foreground">Problem</p>
          <p className="math mt-1 text-2xl font-semibold">{q.statement.replace("Solve ", "Solve: ")}</p>

          <div className="mt-5 rounded-xl bg-accent-soft p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-accent-text">
              <Lightbulb className="size-4" /> Hint 1 of 3
            </p>
            <p className="mt-1 text-[0.9375rem]">{q.hints[0]}</p>
          </div>

          <ol className="mt-5 space-y-4">
            <li className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">1</span>
              <div>
                <p className="font-semibold">{q.steps[0].title}</p>
                <p className="math mt-1 text-lg">{q.steps[0].math}</p>
              </div>
            </li>
            <li className="flex gap-3 text-muted-foreground">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold">2</span>
              <p className="pt-0.5">Show the next step when you are ready</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
