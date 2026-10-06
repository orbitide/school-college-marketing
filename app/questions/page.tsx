import type { Metadata } from "next";
import { Suspense } from "react";
import { QuestionsBrowser } from "@/components/app/questions-browser";

export const metadata: Metadata = {
  title: "Search questions",
  description: "Search worked questions by topic, subject and difficulty.",
  alternates: { canonical: "/questions" },
};

export default function QuestionsPage() {
  return (
    <div className="container-page max-w-3xl py-10 sm:py-14">
      <h1 className="text-3xl sm:text-4xl">Search questions</h1>
      <p className="mt-2 text-muted-foreground">Find a worked solution by topic, or filter by subject and difficulty.</p>
      <div className="mt-7">
        <Suspense fallback={<p className="text-muted-foreground">Loading questions...</p>}>
          <QuestionsBrowser />
        </Suspense>
      </div>
    </div>
  );
}
