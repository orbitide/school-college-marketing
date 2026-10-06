import type { Metadata } from "next";
import { Suspense } from "react";
import { PracticeSessions } from "@/components/app/practice-session";

export const metadata: Metadata = {
  title: "Practice",
  description: "Practise questions on one concept at a time, with hints and explanations.",
  alternates: { canonical: "/practice" },
};

export default function PracticePage() {
  return (
    <div className="container-page max-w-3xl py-10 sm:py-14">
      <h1 className="text-3xl sm:text-4xl">Practice</h1>
      <p className="mt-2 text-muted-foreground">Pick a concept and work through a short set. Use a hint if you need one.</p>
      <div className="mt-7">
        <Suspense fallback={null}>
          <PracticeSessions />
        </Suspense>
      </div>
    </div>
  );
}
