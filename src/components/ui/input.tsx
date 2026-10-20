import * as React from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">): React.ReactElement {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/25 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 text-sm outline-none focus-visible:ring-3 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
