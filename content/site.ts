// TODO: replace brand name, domain and contact details.
export const site = {
  name: "SchoolSuite", // TODO: final product name
  tagline: "School & college management, made simple for Bangladesh.",
  description:
    "Admissions, attendance, fees, exams and a parent portal in one system built for schools and colleges in Bangladesh.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com", // TODO: [DOMAIN]
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.example.com",
  email: "hello@example.com", // TODO
  phone: "+880 1XXX-XXXXXX", // TODO
  address: "Dhaka, Bangladesh", // TODO
} as const;

export const nav = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
