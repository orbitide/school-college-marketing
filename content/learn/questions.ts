import type { Level } from "@/content/learn/subjects";

export type Step = { title: string; body: string; math?: string };

export type Solved = {
  id: string;
  subject: string; // subject slug
  topic: string;
  level: Level;
  /** Short title used in lists. */
  title: string;
  statement: string;
  /** Nudges that never give the answer away. */
  hints: readonly string[];
  steps: readonly Step[];
  answer: string;
  explanation: string;
  concept: { name: string; summary: string };
  alternative: { title: string; steps: readonly string[] };
  mistakes: readonly string[];
  similar: readonly { text: string; answer: string }[];
  practiceSet: string; // id in content/learn/practice.ts
};

// Sample worked solutions. TODO: replace with the institution's question bank.
export const questions: readonly Solved[] = [
  {
    id: "quadratic-factoring",
    subject: "mathematics",
    topic: "Quadratic equations",
    level: "Medium",
    title: "Solve 2x² + 5x − 3 = 0",
    statement: "Solve 2x² + 5x − 3 = 0",
    hints: [
      "Is the equation already equal to zero? Which numbers are a, b and c?",
      "Look for two numbers whose product is a × c = −6 and whose sum is b = 5.",
      "Those numbers are 6 and −1. Use them to split the middle term, then group.",
    ],
    steps: [
      { title: "Read off a, b and c", body: "The equation is already equal to zero, so we can read the coefficients directly.", math: "a = 2,  b = 5,  c = −3" },
      { title: "Find the splitting numbers", body: "We need two numbers that multiply to a × c = −6 and add to b = 5. Try pairs: 6 and −1 work, because 6 × (−1) = −6 and 6 + (−1) = 5.", math: "6 × (−1) = −6,   6 + (−1) = 5" },
      { title: "Split the middle term", body: "Rewrite 5x as 6x − x, then group the terms in pairs.", math: "2x² + 6x − x − 3 = 0" },
      { title: "Factor each group", body: "Take out the common factor from each pair. Both groups now contain (x + 3).", math: "2x(x + 3) − 1(x + 3) = 0" },
      { title: "Use the zero product rule", body: "If a product is zero, at least one factor must be zero. Set each factor to zero and solve.", math: "(2x − 1)(x + 3) = 0  ⇒  x = ½  or  x = −3" },
    ],
    answer: "x = ½ or x = −3",
    explanation: "Factoring works because a product equals zero only when one of its factors is zero. Splitting the middle term is a way of finding those factors when a is not 1. Check by substituting: 2(½)² + 5(½) − 3 = 0.5 + 2.5 − 3 = 0, and 2(−3)² + 5(−3) − 3 = 18 − 15 − 3 = 0.",
    concept: { name: "Solving quadratics by factoring", summary: "Rewrite ax² + bx + c = 0 as a product of two brackets. Then each bracket can be set to zero." },
    alternative: {
      title: "The quadratic formula",
      steps: [
        "Use x = (−b ± √(b² − 4ac)) ÷ 2a with a = 2, b = 5, c = −3.",
        "Discriminant: b² − 4ac = 25 + 24 = 49, and √49 = 7.",
        "x = (−5 + 7) ÷ 4 = ½  and  x = (−5 − 7) ÷ 4 = −3.",
      ],
    },
    mistakes: [
      "Forgetting to move everything to one side so the equation equals zero before factoring.",
      "Sign slips in the discriminant: with c = −3, the term −4ac becomes +24, not −24.",
      "Dividing both sides by x. This loses the solution x = 0 in other problems.",
    ],
    similar: [
      { text: "Solve 3x² − 7x + 2 = 0", answer: "x = 2 or x = ⅓" },
      { text: "Solve x² + 4x − 21 = 0", answer: "x = 3 or x = −7" },
    ],
    practiceSet: "quadratics",
  },
  {
    id: "projectile-up",
    subject: "physics",
    topic: "Equations of motion",
    level: "Easy",
    title: "How high does a ball thrown upwards at 20 m/s go?",
    statement: "A ball is thrown straight up at 20 m/s. How high does it rise? Take g = 10 m/s².",
    hints: [
      "What is the ball's velocity at the very top of its path?",
      "You know the start speed, the end speed and the acceleration. Which equation links these to distance?",
      "Use v² = u² + 2as, and remember gravity slows the ball, so a is negative.",
    ],
    steps: [
      { title: "List what you know", body: "Going up, gravity slows the ball. At the highest point it stops for an instant.", math: "u = 20 m/s,  v = 0,  a = −10 m/s²" },
      { title: "Choose the equation", body: "We want distance s, and we have no time given, so use the equation that skips time.", math: "v² = u² + 2as" },
      { title: "Substitute", body: "Put the values in carefully, keeping the minus sign on a.", math: "0 = 20² + 2(−10)s  ⇒  0 = 400 − 20s" },
      { title: "Solve for s", body: "Rearrange and divide.", math: "s = 400 ÷ 20 = 20 m" },
    ],
    answer: "20 m",
    explanation: "The ball loses 10 m/s of speed every second, so it reaches the top after 2 s. Since its average speed during that time is 10 m/s, it travels 10 × 2 = 20 m, matching the equation result.",
    concept: { name: "Equations of uniform acceleration", summary: "When acceleration is constant, v = u + at, s = ut + ½at² and v² = u² + 2as connect speed, distance and time." },
    alternative: {
      title: "Using time first",
      steps: ["Time to stop: t = u ÷ g = 20 ÷ 10 = 2 s.", "Distance: s = ut − ½gt² = 20(2) − 5(4) = 20 m."],
    },
    mistakes: [
      "Using v = 20 at the top. The speed there is zero.",
      "Forgetting that gravity is negative when the ball moves upward.",
      "Giving the total flight time or total distance instead of the maximum height.",
    ],
    similar: [
      { text: "A stone is thrown up at 30 m/s. How high does it go? (g = 10 m/s²)", answer: "45 m" },
      { text: "How long does the ball above take to return to the thrower's hand?", answer: "4 s" },
    ],
    practiceSet: "motion",
  },
  {
    id: "moles-of-water",
    subject: "chemistry",
    topic: "Mole calculations",
    level: "Easy",
    title: "How many moles are in 36 g of water?",
    statement: "How many moles are there in 36 g of water? (H = 1, O = 16)",
    hints: [
      "Which formula links mass, moles and molar mass?",
      "Water is H₂O. How many hydrogen atoms and how many oxygen atoms are in one molecule?",
      "Add up the atomic masses for the whole molecule, then divide the given mass by it.",
    ],
    steps: [
      { title: "Write the formula for water", body: "One molecule of water has two hydrogen atoms and one oxygen atom.", math: "H₂O" },
      { title: "Find the molar mass", body: "Add the atomic masses of every atom in the formula.", math: "M = 2(1) + 16 = 18 g/mol" },
      { title: "Use moles = mass ÷ molar mass", body: "Divide the given mass by the molar mass.", math: "n = 36 ÷ 18 = 2 mol" },
    ],
    answer: "2 mol",
    explanation: "A mole is a fixed amount of substance, and the molar mass tells you how many grams one mole weighs. Since one mole of water weighs 18 g, 36 g is exactly two of them.",
    concept: { name: "The mole", summary: "Moles connect a mass you can weigh to the number of particles you cannot see: n = m ÷ M." },
    alternative: {
      title: "Proportion",
      steps: ["18 g of water is 1 mol.", "36 g is twice as much, so it is 2 mol."],
    },
    mistakes: [
      "Using only the mass of oxygen, or forgetting that there are two hydrogen atoms.",
      "Dividing the wrong way round (molar mass ÷ mass).",
      "Dropping the unit. Molar mass is in g/mol, so the answer is in mol.",
    ],
    similar: [
      { text: "How many moles are in 44 g of carbon dioxide? (C = 12, O = 16)", answer: "1 mol" },
      { text: "How many molecules are in 2 mol of water? (Avogadro constant = 6.02 × 10²³)", answer: "about 1.2 × 10²⁴" },
    ],
    practiceSet: "moles",
  },
  {
    id: "price-elasticity",
    subject: "economics",
    topic: "Elasticity",
    level: "Medium",
    title: "Find the price elasticity of demand",
    statement: "The price of a good rises from 20 to 25 and the quantity demanded falls from 100 to 80. Find the price elasticity of demand using the midpoint method.",
    hints: [
      "Elasticity compares two percentage changes. Which two?",
      "Midpoint method: divide each change by the average of the old and new values.",
      "Divide the percentage change in quantity by the percentage change in price.",
    ],
    steps: [
      { title: "Percentage change in quantity", body: "Change in quantity divided by the average quantity.", math: "−20 ÷ 90 = −22.2%" },
      { title: "Percentage change in price", body: "Change in price divided by the average price.", math: "5 ÷ 22.5 = 22.2%" },
      { title: "Divide", body: "Elasticity is %ΔQ ÷ %ΔP. We usually quote the size and ignore the minus sign.", math: "PED = −22.2 ÷ 22.2 = −1.0" },
      { title: "Interpret", body: "A size of exactly 1 means demand is unit elastic: revenue stays about the same.", math: "|PED| = 1" },
    ],
    answer: "PED = −1 (unit elastic)",
    explanation: "The midpoint method gives the same answer whether the price rises or falls between the two points. Unit elasticity means the percentage fall in quantity exactly offsets the percentage rise in price.",
    concept: { name: "Price elasticity of demand", summary: "How strongly the quantity demanded responds to a change in price: %ΔQ ÷ %ΔP." },
    alternative: {
      title: "Simple percentage method",
      steps: ["%ΔQ = −20 ÷ 100 = −20%; %ΔP = 5 ÷ 20 = 25%.", "PED = −20 ÷ 25 = −0.8. The answer differs, which is why the midpoint method is preferred."],
    },
    mistakes: [
      "Using the old values as the base for both changes and then comparing it with a midpoint answer.",
      "Dividing price change by quantity change instead of quantity by price.",
      "Forgetting to interpret the result: above 1 is elastic, below 1 is inelastic.",
    ],
    similar: [
      { text: "Price falls from 50 to 40 and quantity rises from 200 to 260. Find the midpoint elasticity.", answer: "about −1.4 (elastic)" },
    ],
    practiceSet: "elasticity",
  },
  {
    id: "python-loop",
    subject: "computer-science",
    topic: "Loops",
    level: "Easy",
    title: "What does this loop print?",
    statement: "What is printed by:  for i in range(3): print(i * 2)",
    hints: [
      "What values does range(3) produce? Does it include 3?",
      "Work through one pass of the loop at a time, writing the value of i each time.",
      "Multiply each value of i by 2 before printing.",
    ],
    steps: [
      { title: "List the values of i", body: "range(3) starts at 0 and stops before 3.", math: "i = 0, 1, 2" },
      { title: "Run each pass", body: "Each time through the loop, print twice the current i.", math: "0 × 2 = 0,   1 × 2 = 2,   2 × 2 = 4" },
      { title: "Write the output", body: "print adds a new line after each value.", math: "0\n2\n4" },
    ],
    answer: "0, 2, 4 (each on its own line)",
    explanation: "range(n) counts from 0 up to n − 1. Starting from zero is a common source of off-by-one mistakes, so tracing the loop on paper is a good habit.",
    concept: { name: "for loops with range()", summary: "range(n) gives n numbers starting from 0, and the loop body runs once for each." },
    alternative: { title: "Trace table", steps: ["Draw columns for i and the printed value.", "Fill one row per pass: (0, 0), (1, 2), (2, 4)."] },
    mistakes: ["Thinking range(3) includes 3.", "Starting counting from 1.", "Printing i instead of i * 2."],
    similar: [{ text: "What does for i in range(1, 4): print(i) print?", answer: "1, 2, 3" }],
    practiceSet: "loops",
  },
];

export const questionById = (id: string) => questions.find((q) => q.id === id);
