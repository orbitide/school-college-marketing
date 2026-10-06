import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-[0.9375rem] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-dark",
        accent: "bg-accent text-foreground hover:brightness-95",
        outline: "border border-border bg-surface text-foreground hover:border-primary hover:text-primary",
        soft: "bg-primary-soft text-primary hover:bg-[#d3e8e6]",
        inverse: "bg-surface text-primary hover:bg-primary-soft",
        "outline-inverse": "border border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10",
        ghost: "text-foreground hover:bg-muted",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3.5",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
