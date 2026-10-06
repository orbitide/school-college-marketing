// TODO: replace brand name, domain and contact details.
export const site = {
  name: "SchoolSuite", // TODO: final product name
  tagline: "A study companion for students, with the tools schools need.",
  description:
    "Ask a question, see it solved step by step, then practise until it clicks. A learning platform for students in Bangladesh, connected to their school or college.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com", // TODO: [DOMAIN]
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://app.example.com",
  email: "hello@example.com", // TODO
  phone: "+880 1XXX-XXXXXX", // TODO
  address: "Dhaka, Bangladesh", // TODO
} as const;

// Student navigation (header and mobile tab bar).
export const nav = [
  { href: "/ask", label: "Ask" },
  { href: "/questions", label: "Questions" },
  { href: "/subjects", label: "Subjects" },
  { href: "/practice", label: "Practice" },
  { href: "/dashboard", label: "My learning" },
] as const;

// Links for schools and colleges (the ERP / institution side of the product).
export const institutionNav = [
  { href: "/institutions", label: "For institutions" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/demo", label: "Book a demonstration" },
] as const;
