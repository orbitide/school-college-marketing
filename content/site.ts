// TODO: replace brand name, domain and contact details.
export const site = {
  name: "SchoolSuite", // TODO: final product name
  tagline: "One platform to run your institution better.",
  description:
    "Admissions, attendance, fees, exams, notices and parent communication in one system. It shows what needs attention and helps you resolve it.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com", // TODO: [DOMAIN]
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.example.com",
  email: "hello@example.com", // TODO
  phone: "+880 1XXX-XXXXXX", // TODO
  address: "Dhaka, Bangladesh", // TODO
} as const;

// Social profiles. TODO: add real URLs; the footer shows an icon only for the ones that are set.
export const social = { facebook: "", x: "", youtube: "", instagram: "", linkedin: "" } as const;

// Public site navigation. Items with a menu open a dropdown (see components/layout/nav-panels.tsx).
export const nav = [
  { href: "/features", label: "Features", menu: "features" },
  { href: "/solutions", label: "Solutions", menu: "solutions" },
  { href: "/resources", label: "Resources", menu: "resources" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;
