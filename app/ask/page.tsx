import type { Metadata } from "next";
import { Suspense } from "react";
import { AskForm } from "@/components/app/ask-form";

export const metadata: Metadata = {
  title: "Ask a question",
  description: "Stuck on a problem? Type it or snap a photo and get a step-by-step walkthrough.",
  alternates: { canonical: "/ask" },
};

export default function AskPage() {
  return (
    <div className="container-page grid gap-10 py-10 sm:py-16 lg:grid-cols-[1fr_20rem] lg:gap-16">
      <div className="max-w-2xl">
        <p className="label">Ask a question</p>
        <h1 className="mt-2 text-3xl sm:text-4xl">Stuck on a problem? Show us what you are working on.</h1>
        <p className="mt-3 text-lg text-muted-foreground">No need to word it perfectly. Tell us what you can and we will help you work out the rest.</p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <AskForm />
          </Suspense>
        </div>
      </div>
      <aside className="h-fit rounded-2xl bg-primary-soft p-5 lg:mt-24">
        <h2 className="text-lg">Tips for a good question</h2>
        <ul className="mt-3 space-y-2.5 text-sm text-foreground/80">
          <li>Include the whole question, with any numbers or units.</li>
          <li>Say what you have already tried, even if it did not work.</li>
          <li>For photos, hold the camera steady and keep the page flat and well lit.</li>
        </ul>
      </aside>
    </div>
  );
}
