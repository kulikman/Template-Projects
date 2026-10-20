import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-1 text-[0.7rem] leading-none font-bold whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        success: "bg-success text-white",
        danger: "bg-destructive text-white",
        warning: "bg-warning text-black",
        info: "bg-info text-black",
        secondary: "bg-muted-foreground text-white",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps): React.ReactElement {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
