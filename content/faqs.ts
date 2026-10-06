export type Faq = { q: string; a: string };

// TODO: confirm answers with the product team before launch.
export const faqs: readonly Faq[] = [
  {
    q: "Who is this system for?",
    a: "Schools and colleges in Bangladesh, from a single small institution to larger groups with several branches.",
  },
  {
    q: "How long does setup take?",
    a: "Most institutions are up and running within a few days. We help you import student data and train your staff.",
  },
  {
    q: "Can parents use it on their phones?",
    a: "Yes. The parent portal works in any mobile browser, so there is nothing to install.",
  },
  {
    q: "Is our data safe?",
    a: "Your data is stored securely, access is role-based, and it is never shared or sold. See our Privacy Policy for details.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes. Start a free trial, or book a demo and we will walk you through the system with your own use case.",
  },
  {
    q: "Do you support multiple branches?",
    a: "Yes. Contact us and we will tailor a plan for multi-branch institutions.",
  },
];
