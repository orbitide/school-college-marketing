import type { Lead } from "@/lib/lead";

/**
 * Notify the team about a new contact request.
 * TODO: send an email / WhatsApp / Slack message here (e.g. Resend, WhatsApp Cloud API, Slack webhook).
 */
export async function notifyNewLead(lead: Lead): Promise<void> {
  console.info("[lead] new contact request", { institution: lead.institution, studentCount: lead.studentCount });
}
