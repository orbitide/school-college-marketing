# School Management System: Site

The public website for an education operations SaaS (admissions, attendance, fees, exams, notices, parent communication) plus a **front-end prototype of the product** at `/app`. The prototype uses sample data only: nothing is sent to a backend, and role switching is a browser-side demo. The real application lives at `app.[DOMAIN]`.

**Stack:** Next.js (App Router), TypeScript (strict), Tailwind CSS v4, shadcn/ui-style components, lucide-react, zod. English only. Pages are static; client JS powers the interactive prototype (tables, drawers, role switcher) and the demo form.

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
| `NEXT_PUBLIC_APP_URL` | Yes | Product app URL; "Start free trial" links to `/signup` here |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | No | Digits only, e.g. `8801XXXXXXXXX`. Button is hidden when empty |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Enables Plausible analytics. Script is not loaded when empty |
| `LEAD_API_URL` | Yes (prod) | Backend endpoint; demo requests are POSTed here as JSON (server-side only) |

### Lead payload

`POST LEAD_API_URL` with `{ name, institution, studentCount, phone, email?, source: "marketing-site-demo" }`. Any non-2xx response shows the user a retry message. A hidden honeypot field silently drops bot submissions.

## Structure

```
app/(site)/     public website: /, /features, /pricing, /demo, /about, /contact, /privacy, /terms
app/(product)/  prototype application under /app: dashboard (admin, teacher, student, parent views),
                students, staff, admissions, fees, attendance, notices, timetable; other modules are "coming soon" pages
components/     product/ (shell, data table, drawers, attention list), marketing/, layout/, demo/, shared/, ui/
content/        site, modules, pricing, faqs, testimonials; product/ (generated sample institution data, navigation)
lib/            role switcher, toasts, lead schema (zod), notify stub, JSON-LD builders
```

## Prototype notes

- Sample institution data is generated deterministically in `content/product/data.ts`; dashboard figures are derived from it.
- Tables support search, filters, sort, pagination, bulk selection, column visibility and CSV export.
- Actions such as "Send reminder" show a confirmation and a toast only. Wire them to the real API.
- `/app` is excluded from robots.txt and marked noindex.

## Editing content

Website copy lives in `/content/*.ts`; no CMS. Search the repo for `TODO:` to find everything needing real input: brand name and domain, contact details, prices, testimonials and stats, legal text, screenshots.

## Notifications

`lib/notify.ts` exports `notifyNewLead`, currently a logging stub. Add email, WhatsApp or Slack delivery there.

## Adding shadcn components

`components.json` is configured. Run `npx shadcn@latest add <component>`; components land in `components/ui`.

## Deploy

Any Next.js host (e.g. Vercel). Set the env vars above and run `npm run build`.
