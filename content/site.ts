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

// Public site navigation.
export const nav = [
  { href: "/features", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
