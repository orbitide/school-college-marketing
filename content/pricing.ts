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
