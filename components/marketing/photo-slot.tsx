import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/utils";

const extensions = ["jpg", "jpeg", "webp", "png"];

/**
 * Photograph slot. Add `public/photos/<name>.jpg` (or .webp/.png) to replace the placeholder; the crop stays the same.
 * TODO: supply a real photograph.
 */
export function PhotoSlot({ name, alt, ratio = "aspect-[4/5]", sizes = "(min-width: 1024px) 45vw, 100vw", className, fallback }: { name: string; alt: string; ratio?: string; sizes?: string; className?: string; fallback?: React.ReactNode }) {
  const file = extensions.map((e) => `${name}.${e}`).find((f) => existsSync(path.join(process.cwd(), "public", "photos", f)));
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#dbe6f5,#e4efe9)]", ratio, className)}>
      {file ? (
        <Image src={`/photos/${file}`} alt={alt} fill sizes={sizes} className="object-cover" />
      ) : fallback ? (
        <div aria-hidden className="absolute inset-0">{fallback}</div>
      ) : (
        <div aria-hidden className="absolute inset-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-foreground/25 p-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Photograph</span>
          <span className="mt-2 max-w-[24ch] text-base font-medium text-foreground/70">{alt}</span>
          <span className="mt-3 font-mono text-[11px] text-muted-foreground">public/photos/{name}.jpg</span>
        </div>
      )}
    </div>
  );
}
