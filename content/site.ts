// TODO: replace brand name, domain and contact details.
export const site = {
  name: "SchoolSuite", // TODO: final product name
  tagline: "One platform to run your institution better.",
  description:
    "School and college management software for admissions, attendance, fees, exams and parent communication, with role-based access and your data under your control.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com", // TODO: [DOMAIN]
  email: "hello@example.com", // TODO
  phone: "+880 1XXX-XXXXXX", // TODO
  address: "Dhaka, Bangladesh", // TODO
} as const;

// Public site navigation.
export const nav = [
  { href: "/features", label: "Features" },
  { href: "/solutions", label: "Solutions" },
  { href: "/benefits", label: "Benefits" },
  { href: "/security", label: "Security" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
] as const;
