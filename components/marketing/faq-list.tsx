import { Plus } from "lucide-react";
import { faqs } from "@/content/faqs";

export function FaqList() {
  return (
    <div className="border-t border-foreground">
      {faqs.map((faq) => (
        <details key={faq.q} className="group border-b">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 font-display text-xl [&::-webkit-details-marker]:hidden">
            {faq.q}
            <Plus className="size-4 shrink-0 text-primary transition-transform group-open:rotate-45" aria-hidden />
          </summary>
          <p className="max-w-prose pb-6 text-muted-foreground">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
