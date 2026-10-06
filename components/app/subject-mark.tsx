import { subjectBySlug } from "@/content/learn/subjects";

/** Small line illustration for each subject, drawn in the subject's own colour. */
const marks: Record<string, React.ReactNode> = {
  mathematics: (
    <>
      <path d="M10 8v48M6 52h52" />
      <path d="M12 12c8 44 28 44 40 0" />
    </>
  ),
  physics: (
    <>
      <path d="M6 52c8-44 44-44 52 0" />
      <circle cx="6" cy="52" r="3" fill="currentColor" />
      <circle cx="58" cy="52" r="3" fill="currentColor" />
      <path d="M32 18v-6" />
    </>
  ),
  chemistry: (
    <>
      <path d="M32 8l20 12v24L32 56 12 44V20z" />
      <path d="M32 20l10 6v12l-10 6-10-6V26z" />
    </>
  ),
  biology: (
    <>
      <path d="M12 52C12 24 28 10 54 10c0 26-14 42-42 42z" />
      <path d="M12 52L38 26" />
    </>
  ),
  english: (
    <>
      <path d="M10 16h44M10 28h44M10 40h28" />
      <path d="M44 46l4 4 8-10" />
    </>
  ),
  "computer-science": (
    <>
      <path d="M22 16L8 32l14 16M42 16l14 16-14 16" />
      <path d="M36 12L28 52" />
    </>
  ),
  accounting: (
    <>
      <rect x="10" y="8" width="44" height="48" rx="3" />
      <path d="M10 20h44M32 20v36M10 32h44M10 44h44" />
    </>
  ),
  economics: (
    <>
      <path d="M10 8v48h46" />
      <path d="M16 18l36 30M16 48l36-30" />
      <circle cx="34" cy="33" r="3" fill="currentColor" />
    </>
  ),
};

export function SubjectMark({ slug, className }: { slug: string; className?: string }) {
  const subject = subjectBySlug(slug);
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      style={{ color: subject?.color }}
    >
      {marks[slug]}
    </svg>
  );
}
