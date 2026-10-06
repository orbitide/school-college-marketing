# School Management System: Site

A student study companion (ask, solve, practise, track progress) plus the marketing pages for the school/college ERP behind it. The student screens are a **front-end prototype with sample data**: nothing is sent to a backend, and new questions are matched to a small bank of worked examples. The ERP app itself lives at `app.[DOMAIN]`.

**Stack:** Next.js (App Router), TypeScript (strict), Tailwind CSS v4, shadcn/ui-style components, lucide-react, zod. English only. Pages are static; client JS is limited to the mobile nav and demo form.

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
app/            routes: student (/, /ask, /questions, /subjects, /solve/[id], /practice, /dashboard), institutions (/institutions, /features, /pricing, /demo, /about, /contact, /privacy, /terms), sitemap, robots, OG image
components/     app/ (student UI), marketing/ (institution pages), layout/, demo/, shared/, ui/
content/        typed content: site, features, pricing, faqs, testimonials; learn/ (subjects, worked questions, practice sets, sample student)
lib/            lead schema (zod), notify stub, JSON-LD builders, utils
public/screens/ placeholder screenshots (replace TODO-* files)
```

## Editing content

Copy lives in `/content/*.ts`; no CMS. Search the repo for `TODO:` to find everything needing real input: brand name and domain, contact details, prices, testimonials and stats, legal text, screenshots.

## Notifications

`lib/notify.ts` exports `notifyNewLead`, currently a logging stub. Add email, WhatsApp or Slack delivery there.

## Adding shadcn components

`components.json` is configured. Run `npx shadcn@latest add <component>`; components land in `components/ui`.

## Deploy

Any Next.js host (e.g. Vercel). Set the env vars above and run `npm run build`.
