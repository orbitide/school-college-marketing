import { cn } from "@/lib/utils";

/** Browser-style frame used for all product mockups. All data shown is illustrative. */
export function MockWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${title}: illustrative product screen with sample data`}
      className={cn("overflow-hidden rounded-2xl border bg-white text-left text-foreground shadow-lift", className)}
    >
      <div aria-hidden className="flex items-center gap-2 border-b bg-muted/60 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#e5b7b0]" />
        <span className="size-2.5 rounded-full bg-[#ecd9a4]" />
        <span className="size-2.5 rounded-full bg-[#b9d9bf]" />
        <span className="ml-3 truncate text-xs font-medium text-muted-foreground">{title}</span>
        <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
          Sample data
        </span>
      </div>
      <div aria-hidden className="p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
}
