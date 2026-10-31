export type Plan = { name: string; students: string; features: readonly string[]; highlighted?: boolean };

// TODO: publish real prices (BDT per month, billed annually?) once confirmed. Until then plans are quoted.
export const plans: readonly Plan[] = [
  { name: "Starter", students: "Up to 300 students", features: ["Admissions, attendance, fees", "Exams and results", "Parent portal", "Email and WhatsApp support"] },
  { name: "Growth", students: "301 to 1,000 students", features: ["Everything in Starter", "Notices with SMS", "Management reports", "Priority support"], highlighted: true },
  { name: "Institution", students: "1,001 to 3,000 students", features: ["Everything in Growth", "Onboarding and staff training", "Data import assistance", "Dedicated account manager"] },
  { name: "Enterprise", students: "Multi-branch or 3,000+", features: ["Multiple branches", "Custom onboarding", "Tailored to your needs"] },
];
