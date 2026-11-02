export type Plan = {
  name: string;
  students: string;
  price: string | null; // null = "Contact us"
  note: string;
  features: readonly string[];
  highlighted?: boolean;
};

// TODO: confirm real prices (BDT per month, billed annually?).
export const plans: readonly Plan[] = [
  {
    name: "Starter",
    students: "Up to 300 students",
    price: "TODO",
    note: "per month",
    features: ["Admissions, attendance, fees", "Exams & results", "Parent portal", "Email & WhatsApp support"],
  },
  {
    name: "Growth",
    students: "301 to 1,000 students",
    price: "TODO",
    note: "per month",
    features: ["Everything in Starter", "Notices with SMS", "Management dashboard", "Priority support"],
    highlighted: true,
  },
  {
    name: "Institution",
    students: "1,001 to 3,000 students",
    price: "TODO",
    note: "per month",
    features: ["Everything in Growth", "Onboarding & staff training", "Data import assistance", "Dedicated account manager"],
  },
  {
    name: "Enterprise",
    students: "Multi-branch or 3,000+",
    price: null,
    note: "Custom plan",
    features: ["Multiple branches", "Custom onboarding", "Tailored to your needs"],
  },
];

// TODO: confirm with the business before launch.
export const pricingFaqs = [
  { q: "How is pricing decided?", a: "Plans are based on your number of students. Multi-branch groups and institutions above 3,000 students get a custom quote." },
  { q: "Is there a free trial?", a: "Yes. You can start a free trial, or book a demo and we will walk you through the system first." },
  { q: "Is onboarding included?", a: "Every plan includes onboarding support. Institution and Enterprise plans include staff training and data import assistance." },
  { q: "Can I change plans later?", a: "Yes. Talk to us when your student count changes and we will move you to the right plan." },
  { q: "What currency are prices in?", a: "Prices are in Bangladeshi taka (BDT). Billing details are shared in your demo." },
] as const;
