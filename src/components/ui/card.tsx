import * as React from "react";

import { cn } from "@/lib/utils";

/** NobleUI-style card: white surface, hairline border, soft shadow. */
export function Card({ className, ...props }: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground border-border/60 flex flex-col rounded-lg border shadow-[0_0_3px_rgba(0,0,0,0.04)]",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return <div data-slot="card-content" className={cn("p-5", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h6">): React.ReactElement {
  return (
    <h6
      data-slot="card-title"
      className={cn("text-[0.8125rem] font-medium tracking-normal uppercase", className)}
      {...props}
    />
  );
}
