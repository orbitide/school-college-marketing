"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { studentRanges } from "@/lib/lead";
import { submitDemoRequest, type DemoState } from "@/app/demo/actions";

const initial: DemoState = { status: "idle" };

const inputClass =
  "mt-1 block h-11 w-full rounded-lg border bg-background px-3 text-base outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 aria-[invalid=true]:border-destructive";

function Field({
  id, label, error, optional, children,
}: { id: string; label: string; error?: string[]; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-destructive">
          {error[0]}
        </p>
      )}
    </div>
  );
}

export function DemoForm() {
  const [state, action, pending] = useActionState(submitDemoRequest, initial);
  const e = state.errors ?? {};
  const aria = (id: string) => ({ "aria-invalid": !!e[id], "aria-describedby": e[id] ? `${id}-error` : undefined });

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border bg-secondary/50 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-primary" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold">Thank you! Request received.</h2>
        <p className="mt-2 text-muted-foreground">Our team will contact you shortly to schedule your demo.</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5 rounded-xl border bg-background p-6 sm:p-8">
      <Field id="name" label="Your name" error={e.name}>
        <input id="name" name="name" autoComplete="name" required className={inputClass} {...aria("name")} />
      </Field>
      <Field id="institution" label="Institution name" error={e.institution}>
        <input id="institution" name="institution" autoComplete="organization" required className={inputClass} {...aria("institution")} />
      </Field>
      <Field id="studentCount" label="Number of students" error={e.studentCount}>
        <select id="studentCount" name="studentCount" required defaultValue="" className={inputClass} {...aria("studentCount")}>
          <option value="" disabled>Select a range</option>
          {studentRanges.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </Field>
      <Field id="phone" label="Phone / WhatsApp" error={e.phone}>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" required className={inputClass} {...aria("phone")} />
      </Field>
      <Field id="email" label="Email" optional error={e.email}>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass} {...aria("email")} />
      </Field>

      {/* Honeypot: hidden from users and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Sending..." : "Book my demo"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">We only use your details to arrange your demo.</p>
    </form>
  );
}
