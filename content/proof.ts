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
