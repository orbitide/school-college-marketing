import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/faqs";

export function FaqList() {
  return (
    <div className="mx-auto max-w-3xl divide-y rounded-xl border bg-background">
      {faqs.map((faq) => (
        <details key={faq.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
            {faq.q}
            <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="mt-3 text-muted-foreground">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
