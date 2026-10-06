import { Plus } from "lucide-react";
import { faqs } from "@/content/faqs";

export function FaqList() {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((faq) => (
        <details key={faq.q} className="card group px-6 py-5 open:border-accent/50 open:shadow-lift">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {faq.q}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted transition-transform group-open:rotate-45">
              <Plus className="size-4" aria-hidden />
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-muted-foreground">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
