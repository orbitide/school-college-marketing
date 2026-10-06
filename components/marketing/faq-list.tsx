import { Plus } from "lucide-react";
import { faqs } from "@/content/faqs";

export function FaqList() {
  return (
    <div className="divide-y rounded-xl border bg-surface">
      {faqs.map((faq) => (
        <details key={faq.q} className="group px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-medium [&::-webkit-details-marker]:hidden">
            {faq.q}
            <Plus className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" aria-hidden />
          </summary>
          <p className="max-w-prose pb-5 text-muted-foreground">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
