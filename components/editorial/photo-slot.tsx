import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/utils";

const extensions = ["jpg", "jpeg", "webp", "png"];

/**
 * Art-directed photograph. Drop `public/photos/<name>.jpg` (or .webp/.png) to replace the placeholder;
 * the crop and layout stay the same. TODO: supply real photography for every slot.
 */
export function PhotoSlot({
  name,
  alt,
  caption,
  ratio = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  className,
}: {
  name: string;
  alt: string;
  caption?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const file = extensions
    .map((ext) => `${name}.${ext}`)
    .find((f) => existsSync(path.join(process.cwd(), "public", "photos", f)));

  return (
    <figure className={className}>
      <div className={cn("relative overflow-hidden bg-[#e2d9c4]", ratio)}>
        {file ? (
          <Image src={`/photos/${file}`} alt={alt} fill sizes={sizes} priority={priority} className="photo-in object-cover" />
        ) : (
          <div aria-hidden className="absolute inset-3 flex flex-col items-center justify-center border border-foreground/25 p-4 text-center">
            <span className="label !text-muted-foreground">Photograph</span>
            <span className="mt-2 max-w-[22ch] font-display text-lg italic leading-snug text-foreground/75">{alt}</span>
            <span className="mt-3 font-mono text-[11px] text-muted-foreground">public/photos/{name}.jpg</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-[0.8125rem] leading-snug text-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
