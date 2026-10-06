// Sample student view for the dashboard. Not real data.
export const student = {
  name: "Anika",
  institution: "Your school or college", // TODO: show the connected institution once linked
};

export const continueLearning = {
  topic: "Quadratic equations",
  subject: "mathematics",
  questionId: "quadratic-factoring",
  stepsDone: 3,
  stepsTotal: 5,
};

export const askedQuestions = [
  { id: "quadratic-factoring", title: "Solve 2x² + 5x − 3 = 0", status: "Solved", when: "Today" },
  { id: "projectile-up", title: "How high does a ball thrown upwards at 20 m/s go?", status: "Solved", when: "Yesterday" },
  { id: "price-elasticity", title: "Find the price elasticity of demand", status: "In progress", when: "2 days ago" },
] as const;

export const mastery = [
  { topic: "Quadratic equations", subject: "mathematics", percent: 72, note: "Discriminant questions need work" },
  { topic: "Equations of motion", subject: "physics", percent: 45, note: "Practise choosing the right equation" },
  { topic: "Elasticity", subject: "economics", percent: 55, note: "Interpretation is the weak spot" },
  { topic: "Mole calculations", subject: "chemistry", percent: 30, note: "Just started" },
] as const;

export const recommended = [
  { title: "Discriminant and nature of roots", setId: "quadratics", reason: "You missed this in your last practice set", level: "Medium" },
  { title: "Choosing the right equation of motion", setId: "motion", reason: "Builds on the question you solved yesterday", level: "Easy" },
] as const;

export const exams = [
  { subject: "physics", name: "Physics half-yearly", date: "Sat, 14 Nov", topics: "Motion, forces" },
  { subject: "mathematics", name: "Mathematics half-yearly", date: "Mon, 16 Nov", topics: "Algebra, trigonometry" },
] as const;

export const saved = [
  { id: "quadratic-factoring", title: "Solve 2x² + 5x − 3 = 0" },
  { id: "moles-of-water", title: "How many moles are in 36 g of water?" },
] as const;

export const notifications = [
  { text: "New notice from your teacher: half-yearly examination routine", when: "1h ago" },
  { text: "Your question about price elasticity has a new explanation", when: "Yesterday" },
  { text: "A new practice set is available: Quadratic equations", when: "2 days ago" },
] as const;

export const recentPractice = [
  { name: "Equations of motion", subject: "physics", score: "2 of 2", when: "Yesterday" },
  { name: "Quadratic equations", subject: "mathematics", score: "2 of 3", when: "3 days ago" },
] as const;
