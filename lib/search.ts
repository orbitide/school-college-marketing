import { questions, type Solved } from "@/content/learn/questions";

const tokens = (s: string) => s.toLowerCase().split(/[^\p{L}\p{N}²]+/u).filter((t) => t.length > 1);

/** Simple keyword match over the sample bank. TODO: replace with real search. */
export function searchQuestions(query: string, subject?: string): Solved[] {
  const q = tokens(query);
  return questions
    .filter((x) => !subject || x.subject === subject)
    .map((x) => {
      const hay = `${x.title} ${x.statement} ${x.topic} ${x.concept.name}`.toLowerCase();
      return { x, score: q.reduce((n, t) => n + (hay.includes(t) ? 1 : 0), 0) };
    })
    .filter((r) => !q.length || r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.x);
}
