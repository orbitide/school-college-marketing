"use server";

import { z } from "zod";
import { leadSchema } from "@/lib/lead";
import { notifyNewLead } from "@/lib/notify";

export type DemoState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export async function submitDemoRequest(_prev: DemoState, formData: FormData): Promise<DemoState> {
  const parsed = leadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", errors: z.flattenError(parsed.error).fieldErrors };
  }
  const lead = parsed.data;

  // Honeypot filled: pretend success so bots learn nothing.
  if (lead.website) return { status: "success" };

  const endpoint = process.env.LEAD_API_URL;
  if (!endpoint) {
    console.error("LEAD_API_URL is not set");
    return { status: "error", message: "We could not submit your request. Please call or WhatsApp us." };
  }

  try {
    const payload = { ...lead, website: undefined };
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, source: "marketing-site-demo" }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Lead API responded ${res.status}`);
  } catch (err) {
    console.error("Lead submission failed", err);
    return { status: "error", message: "Something went wrong. Please try again or contact us on WhatsApp." };
  }

  await notifyNewLead(lead).catch((err) => console.error("Lead notification failed", err));
  return { status: "success" };
}
