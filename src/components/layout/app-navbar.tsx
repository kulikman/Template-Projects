"use client";

import Link from "next/link";
import { Menu, Search, UserRound } from "lucide-react";

import { routes } from "@/config/routes";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

interface AppNavbarProps {
  onToggleSidebar: () => void;
  /** Slot for the notifications bell (server-fed, so it is passed in, not imported). */
  notifications: React.ReactNode;
}

/** Top bar of the dashboard shell: sidebar toggle, search, theme, bell, profile. */
export function AppNavbar({ onToggleSidebar, notifications }: AppNavbarProps): React.ReactElement {
  return (
    <header className="bg-card border-border sticky top-0 z-30 flex h-15 items-center gap-3 border-b px-4 sm:px-6">
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label="Open sidebar"
        className="text-muted-foreground hover:text-foreground lg:hidden"
      >
        <Menu className="size-5" />
      </button>
      <form
        role="search"
        className="relative flex-1 sm:max-w-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          type="search"
          placeholder="Search here..."
          aria-label="Search"
          className="border-0 bg-transparent pl-9 shadow-none"
        />
      </form>
      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
        {notifications}
        <DropdownMenu>
          <DropdownMenuTrigger aria-label="Account menu" className="ml-2 rounded-full outline-none">
            <Avatar src="/images/faces/face1.jpg" alt="Account" size={30} className="size-7.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href={routes.settings.href}>
                <UserRound /> Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
