export type Level = "Easy" | "Medium" | "Hard";

export type Subject = {
  slug: string;
  name: string;
  /** Main hue and a soft tint of it, used for marks, bars and highlights. */
  color: string;
  soft: string;
  tagline: string;
  topics: readonly { name: string; level: Level }[];
};

// Sample catalogue. TODO: replace with the institution's real syllabus and question counts.
export const subjects: readonly Subject[] = [
  {
    slug: "mathematics", name: "Mathematics", color: "#2b5fa8", soft: "#e6eef9", tagline: "Algebra, geometry and the reasoning behind them.",
    topics: [
      { name: "Quadratic equations", level: "Medium" },
      { name: "Linear equations", level: "Easy" },
      { name: "Trigonometry basics", level: "Medium" },
      { name: "Coordinate geometry", level: "Hard" },
    ],
  },
  {
    slug: "physics", name: "Physics", color: "#c0502a", soft: "#fbebe5", tagline: "Motion, forces and energy, explained with real situations.",
    topics: [
      { name: "Equations of motion", level: "Easy" },
      { name: "Newton's laws", level: "Medium" },
      { name: "Work, energy and power", level: "Medium" },
      { name: "Waves and sound", level: "Hard" },
    ],
  },
  {
    slug: "chemistry", name: "Chemistry", color: "#226b45", soft: "#e2f2e8", tagline: "Reactions, the mole and the periodic table.",
    topics: [
      { name: "Mole calculations", level: "Easy" },
      { name: "Chemical bonding", level: "Medium" },
      { name: "Acids, bases and salts", level: "Medium" },
    ],
  },
  {
    slug: "biology", name: "Biology", color: "#6f8f1f", soft: "#eef3dc", tagline: "Cells, genes and living systems.",
    topics: [
      { name: "Cell structure", level: "Easy" },
      { name: "Photosynthesis", level: "Medium" },
      { name: "Genetics", level: "Hard" },
    ],
  },
  {
    slug: "english", name: "English", color: "#b03f68", soft: "#f8e6ed",
    tagline: "Grammar, writing and comprehension.",
    topics: [
      { name: "Tenses", level: "Easy" },
      { name: "Paragraph writing", level: "Medium" },
      { name: "Reading comprehension", level: "Medium" },
    ],
  },
  {
    slug: "computer-science", name: "Computer Science", color: "#3d4a66", soft: "#e8ebf2", tagline: "Programming and how computers think.",
    topics: [
      { name: "Loops", level: "Easy" },
      { name: "Functions", level: "Medium" },
      { name: "Binary and logic", level: "Medium" },
    ],
  },
  {
    slug: "accounting", name: "Accounting", color: "#9a6f12", soft: "#f7efd9", tagline: "Journals, ledgers and the trial balance.",
    topics: [
      { name: "Journal entries", level: "Easy" },
      { name: "Trial balance", level: "Medium" },
      { name: "Final accounts", level: "Hard" },
    ],
  },
  {
    slug: "economics", name: "Economics", color: "#0e7a86", soft: "#dff1f3", tagline: "Demand, supply and how markets respond.",
    topics: [
      { name: "Demand and supply", level: "Easy" },
      { name: "Elasticity", level: "Medium" },
      { name: "National income", level: "Hard" },
    ],
  },
];

export const subjectBySlug = (slug: string) => subjects.find((s) => s.slug === slug);
