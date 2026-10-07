# School Management System: Site

The public website for an education operations SaaS (admissions, attendance, fees, exams, notices, parent communication) marketing pages only: no product demo or app screens.

**Stack:** Next.js (App Router), TypeScript (strict), Tailwind CSS v4, shadcn/ui-style components, lucide-react, zod. English only. Pages are static; client JS is limited to the contact form.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run lint`, `npm run build`, `npm start`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical URL for metadata, sitemap, robots, JSON-LD |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Digits only, e.g. `8801XXXXXXXXX`. Button is hidden when empty |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Enables Plausible analytics. Script is not loaded when empty |
| `LEAD_API_URL` | Yes (prod) | Backend endpoint; contact requests are POSTed here as JSON (server-side only) |

### Lead payload

`POST LEAD_API_URL` with `{ name, institution, studentCount, phone, email?, source: "marketing-site-contact" }`. Any non-2xx response shows the user a retry message. A hidden honeypot field silently drops bot submissions.

## Structure

```
app/(site)/     /, /features, /solutions, /benefits, /security, /pricing, /faq, /about, /contact, /privacy, /terms
components/     marketing/, layout/, contact/, shared/, ui/
content/        site, marketing (features, problems, security, FAQs), pricing
lib/            lead schema (zod), notify stub, JSON-LD builders
```

`/demo` redirects to `/contact`; `/app/*` redirects to `/`.

## Editing content

Website copy lives in `/content/*.ts`; no CMS. Search the repo for `TODO:` to find everything needing real input: brand name and domain, contact details, prices, testimonials and stats, legal text, screenshots.

## Notifications

`lib/notify.ts` exports `notifyNewLead`, currently a logging stub. Add email, WhatsApp or Slack delivery there.

## Adding shadcn components

`components.json` is configured. Run `npx shadcn@latest add <component>`; components land in `components/ui`.

## Deploy

Any Next.js host (e.g. Vercel). Set the env vars above and run `npm run build`.
