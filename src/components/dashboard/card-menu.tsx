"use client";

import { Download, Eye, MoreHorizontal, Pencil, Printer, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ACTIONS = [
  { label: "View", icon: Eye },
  { label: "Edit", icon: Pencil },
  { label: "Delete", icon: Trash2 },
  { label: "Print", icon: Printer },
  { label: "Download", icon: Download },
] as const;

/** The "…" menu in every NobleUI card header. Actions are placeholders. */
export function CardMenu(): React.ReactElement {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Card actions"
        className="text-muted-foreground hover:text-foreground rounded-sm outline-none"
      >
        <MoreHorizontal className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {ACTIONS.map(({ label, icon: Icon }) => (
          <DropdownMenuItem key={label}>
            <Icon /> {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
