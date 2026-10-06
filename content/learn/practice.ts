import type { Level } from "@/content/learn/subjects";

export type PracticeQuestion = {
  prompt: string;
  options: readonly string[];
  answer: number;
  level: Level;
  hint: string;
  explanation: string;
};

export type PracticeSet = { id: string; name: string; subject: string; questions: readonly PracticeQuestion[] };

// Sample practice sets. TODO: replace with the institution's question banks.
export const practiceSets: readonly PracticeSet[] = [
  {
    id: "quadratics",
    name: "Quadratic equations",
    subject: "mathematics",
    questions: [
      {
        prompt: "Solve x² − 5x + 6 = 0",
        options: ["x = 2 or x = 3", "x = −2 or x = −3", "x = 1 or x = 6", "x = −1 or x = 6"],
        answer: 0,
        level: "Easy",
        hint: "Find two numbers that multiply to 6 and add to −5.",
        explanation: "(x − 2)(x − 3) = x² − 5x + 6, so x = 2 or x = 3.",
      },
      {
        prompt: "What is the discriminant of 2x² + 5x − 3 = 0?",
        options: ["1", "49", "−23", "−49"],
        answer: 1,
        level: "Medium",
        hint: "Use b² − 4ac and watch the sign of c.",
        explanation: "b² − 4ac = 25 − 4(2)(−3) = 25 + 24 = 49.",
      },
      {
        prompt: "Which equation has roots x = 4 and x = −1?",
        options: ["x² + 3x − 4 = 0", "x² − 3x − 4 = 0", "x² − 3x + 4 = 0", "x² + 3x + 4 = 0"],
        answer: 1,
        level: "Medium",
        hint: "Multiply the brackets (x − 4)(x + 1).",
        explanation: "(x − 4)(x + 1) = x² + x − 4x − 4 = x² − 3x − 4.",
      },
    ],
  },
  {
    id: "motion",
    name: "Equations of motion",
    subject: "physics",
    questions: [
      {
        prompt: "A car accelerates from rest at 2 m/s² for 5 s. What is its final speed?",
        options: ["7 m/s", "10 m/s", "25 m/s", "2.5 m/s"],
        answer: 1,
        level: "Easy",
        hint: "Use v = u + at with u = 0.",
        explanation: "v = 0 + 2 × 5 = 10 m/s.",
      },
      {
        prompt: "A stone is dropped from rest and falls for 3 s. How far does it fall? (g = 10 m/s²)",
        options: ["30 m", "45 m", "90 m", "15 m"],
        answer: 1,
        level: "Medium",
        hint: "Use s = ut + ½at² with u = 0.",
        explanation: "s = ½ × 10 × 3² = 45 m.",
      },
    ],
  },
  {
    id: "moles",
    name: "Mole calculations",
    subject: "chemistry",
    questions: [
      {
        prompt: "What is the molar mass of CO₂? (C = 12, O = 16)",
        options: ["28 g/mol", "44 g/mol", "60 g/mol", "32 g/mol"],
        answer: 1,
        level: "Easy",
        hint: "Add one carbon and two oxygen atoms.",
        explanation: "12 + 2(16) = 44 g/mol.",
      },
      {
        prompt: "How many moles are in 8 g of oxygen gas, O₂? (O = 16)",
        options: ["0.25 mol", "0.5 mol", "4 mol", "2 mol"],
        answer: 0,
        level: "Medium",
        hint: "Oxygen gas is O₂, so find its molar mass first.",
        explanation: "M = 32 g/mol, so n = 8 ÷ 32 = 0.25 mol.",
      },
    ],
  },
  {
    id: "elasticity",
    name: "Elasticity",
    subject: "economics",
    questions: [
      {
        prompt: "If the size of price elasticity of demand is 2.5, demand is…",
        options: ["inelastic", "unit elastic", "elastic", "perfectly inelastic"],
        answer: 2,
        level: "Easy",
        hint: "Compare the size of the number with 1.",
        explanation: "Above 1 means quantity responds more than proportionally to price, so demand is elastic.",
      },
      {
        prompt: "Price rises by 10% and quantity demanded falls by 5%. What is the size of PED?",
        options: ["0.5", "2", "5", "15"],
        answer: 0,
        level: "Medium",
        hint: "PED = %ΔQ ÷ %ΔP, ignoring the sign.",
        explanation: "5 ÷ 10 = 0.5, which is inelastic.",
      },
    ],
  },
  {
    id: "loops",
    name: "Loops",
    subject: "computer-science",
    questions: [
      {
        prompt: "How many times does the body of  for i in range(4)  run?",
        options: ["3", "4", "5", "0"],
        answer: 1,
        level: "Easy",
        hint: "range(4) gives the numbers 0, 1, 2, 3.",
        explanation: "range(4) produces four values, so the body runs four times.",
      },
      {
        prompt: "What is the last value of i in  for i in range(5)?",
        options: ["5", "4", "6", "0"],
        answer: 1,
        level: "Easy",
        hint: "range(n) stops just before n.",
        explanation: "The values are 0, 1, 2, 3, 4, so the last is 4.",
      },
    ],
  },
];

export const practiceById = (id: string) => practiceSets.find((p) => p.id === id);
