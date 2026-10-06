"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Camera, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subjects } from "@/content/learn/subjects";
import { searchQuestions } from "@/lib/search";
import { cn } from "@/lib/utils";

const stuck = ["I do not know where to start", "I got a different answer", "I do not understand the explanation"] as const;

export function AskForm() {
  const params = useSearchParams();
  const mode = params.get("mode");
  const [text, setText] = useState(params.get("q") ?? "");
  const [subject, setSubject] = useState<string>("");
  const [where, setWhere] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onFile = (file?: File) => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // TODO: send the question (and image) to the backend. For now we match a worked example from the sample bank.
  const match = sent ? searchQuestions(text, subject || undefined)[0] ?? searchQuestions(text)[0] : undefined;
  const canSend = text.trim().length > 2 || preview;

  if (sent) {
    return (
      <div role="status" className="panel step-in p-6 sm:p-8">
        <p className="label">Got it</p>
        <h2 className="mt-1 text-2xl">Thanks for showing us what you are working on.</h2>
        <p className="mt-3 text-muted-foreground">
          This preview does not answer new questions yet, so here is a worked example that is close to yours.
        </p>
        {match ? (
          <Link href={`/solve/${match.id}`} className="panel pressable mt-5 flex items-center justify-between gap-4 p-4">
            <span>
              <span className="block text-sm text-muted-foreground">{match.topic}</span>
              <span className="mt-0.5 block font-semibold">{match.title}</span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden />
          </Link>
        ) : (
          <Button asChild className="mt-5"><Link href="/subjects">Browse subjects</Link></Button>
        )}
        <Button variant="ghost" className="mt-4" onClick={() => setSent(false)}>Ask something else</Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (canSend) setSent(true);
      }}
      className="space-y-7"
    >
      <div>
        <label htmlFor="q" className="text-lg font-semibold">What are you stuck on?</label>
        <textarea
          id="q"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          autoFocus={!mode}
          placeholder="Type the question, or tell us what you are trying to do. For example: Solve 2x² + 5x − 3 = 0"
          className="panel mt-2 block w-full resize-y p-4 text-base outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
        />
      </div>

      <div>
        <p className="text-lg font-semibold">Show us the problem</p>
        <p className="text-sm text-muted-foreground">A clear photo of the page works well.</p>
        <div className="mt-3 flex flex-wrap items-start gap-3">
          <label className="panel pressable flex h-12 cursor-pointer items-center gap-2 px-4 text-sm font-semibold focus-within:ring-2 focus-within:ring-ring">
            <Camera className="size-4 text-primary" aria-hidden />
            Take a photo
            <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          <label className="panel pressable flex h-12 cursor-pointer items-center gap-2 px-4 text-sm font-semibold focus-within:ring-2 focus-within:ring-ring">
            <ImagePlus className="size-4 text-primary" aria-hidden />
            Upload an image
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          {preview && (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Your uploaded problem" className="h-24 rounded-lg border object-cover" />
              <button type="button" onClick={() => onFile()} aria-label="Remove image" className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-foreground text-background">
                <X className="size-3.5" aria-hidden />
              </button>
            </div>
          )}
        </div>
      </div>

      <fieldset>
        <legend className="text-lg font-semibold">Which subject is it?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {subjects.map((s) => {
            const on = subject === s.slug;
            return (
              <label key={s.slug} className={cn("cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-within:ring-2 focus-within:ring-ring", on ? "text-white" : "bg-surface hover:border-primary")} style={on ? { background: s.color, borderColor: s.color } : undefined}>
                <input type="radio" name="subject" value={s.slug} checked={on} onChange={() => setSubject(on ? "" : s.slug)} onClick={() => on && setSubject("")} className="sr-only" />
                {s.name}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-lg font-semibold">Where are you stuck? <span className="text-sm font-normal text-muted-foreground">(optional)</span></legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {stuck.map((s) => (
            <label key={s} className={cn("cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-ring", where === s ? "border-primary bg-primary-soft text-primary" : "bg-surface hover:border-primary")}>
              <input type="radio" name="stuck" value={s} checked={where === s} onChange={() => setWhere(s)} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={!canSend}>Show me how <ArrowRight /></Button>
        <p className="text-sm text-muted-foreground">We will walk you through it, not just hand over the answer.</p>
      </div>
    </form>
  );
}
