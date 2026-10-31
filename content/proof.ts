// Placeholder proof for the home page. TODO: replace the bracketed values with a real customer result,
// a real quote and the customer's name before launch. Nothing here is a real customer statement.
export const proof = {
  // TODO: replace with a real average rating and the review source before launch.
  rating: { value: "[X.X]/5", label: "average rating" },
  stat: { value: "[X]%", label: "[Outcome] improved in the first term" },
  quote: {
    before: "SchoolSuite has become ",
    highlight: "[a key part of how we run the office]",
    after: ", from fees to attendance.",
    author: "[Name]",
    role: "[Role], [Institution]",
  },
} as const;

// Placeholder customer stories for the home page carousel. TODO: replace with real, approved stories
// (and add `rating` and `href` when they exist). Nothing here is a real customer statement.
export type Story = { tag: string; quote: string; name: string; role: string; photo: string; rating?: number; href?: string };

export const stories: Story[] = [
  { tag: "[School]", quote: "[A real customer quote about how the office runs now.]", name: "[Name]", role: "[Role], [Institution]", photo: "customer-1" },
  { tag: "[College]", quote: "[A real customer quote about admissions or results.]", name: "[Name]", role: "[Role], [Institution]", photo: "customer-2" },
  { tag: "[Group]", quote: "[A real customer quote about running several campuses.]", name: "[Name]", role: "[Role], [Institution]", photo: "customer-3" },
];

// Placeholder reviews for the home page. TODO: replace with real, approved reviews (and add `rating` once
// they come from a verifiable source). Nothing here is a real customer statement.
export type Review = { title: string; body: string; name: string; role: string; rating?: number };

export const reviews: Review[] = Array.from({ length: 6 }, (_, i) => ({
  title: `[Review headline ${i + 1}]`,
  body: "[A real, approved customer review goes here. Replace this placeholder before launch.]",
  name: "[Name]",
  role: "[Role], [Institution]",
}));
