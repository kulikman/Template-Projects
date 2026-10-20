"use client";

import { useState } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { AppNavbar } from "@/components/layout/app-navbar";
import { AppSidebar } from "@/components/layout/app-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
  notifications: React.ReactNode;
}

/** Sidebar + navbar frame around dashboard pages. Owns fold/open state. */
export function DashboardShell({
  children,
  notifications,
}: DashboardShellProps): React.ReactElement {
  const [isFolded, setIsFolded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background flex min-h-screen flex-1">
      <AppSidebar
        isFolded={isFolded}
        isOpen={isOpen}
        onToggleFold={() => setIsFolded((prev) => !prev)}
        onNavigate={() => setIsOpen(false)}
      />
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={cn("flex min-w-0 flex-1 flex-col lg:pl-60", isFolded && "lg:pl-16")}>
        <AppNavbar
          onToggleSidebar={() => setIsOpen((prev) => !prev)}
          notifications={notifications}
        />
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
        <footer className="border-border text-muted-foreground flex items-center justify-between border-t px-6 py-3 text-sm">
          <p>{siteConfig.name}</p>
        </footer>
      </div>
    </div>
  );
}
