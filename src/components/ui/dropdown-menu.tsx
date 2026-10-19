"use client";

import * as React from "react";
import { DropdownMenu as DropdownPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export const DropdownMenu = DropdownPrimitive.Root;
export const DropdownMenuTrigger = DropdownPrimitive.Trigger;

export function DropdownMenuContent({
  className,
  sideOffset = 6,
  align = "end",
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Content>): React.ReactElement {
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "bg-popover text-popover-foreground border-border z-50 min-w-40 rounded-md border p-1 shadow-lg",
          className
        )}
        {...props}
      />
    </DropdownPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Item>): React.ReactElement {
  return (
    <DropdownPrimitive.Item
      className={cn(
        "data-[highlighted]:bg-muted flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none [&_svg]:size-3.5",
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Label>): React.ReactElement {
  return <DropdownPrimitive.Label className={cn("px-3 py-2 text-sm", className)} {...props} />;
}

export function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownPrimitive.Separator>): React.ReactElement {
  return (
    <DropdownPrimitive.Separator className={cn("bg-border my-1 h-px", className)} {...props} />
  );
}
