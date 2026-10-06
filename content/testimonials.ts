export type Testimonial = { quote: string; name: string; role: string; institution: string };

// TODO: replace with real, approved customer quotes before launch.
export const testimonials: readonly Testimonial[] = [
  {
    quote: "TODO: real quote about faster fee collection.",
    name: "TODO: Name",
    role: "Principal",
    institution: "TODO: School name, City",
  },
  {
    quote: "TODO: real quote about attendance and parent communication.",
    name: "TODO: Name",
    role: "Administrator",
    institution: "TODO: College name, City",
  },
  {
    quote: "TODO: real quote about publishing results.",
    name: "TODO: Name",
    role: "Head Teacher",
    institution: "TODO: School name, City",
  },
];

// TODO: replace with verified numbers.
export const stats = [
  { value: "TODO", label: "institutions" },
  { value: "TODO", label: "students managed" },
  { value: "TODO", label: "fee receipts issued" },
] as const;
