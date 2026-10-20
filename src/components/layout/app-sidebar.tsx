"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Building2,
  CreditCard,
  Gauge,
  KeyRound,
  PanelLeftClose,
  Settings,
} from "lucide-react";

import { dashboardNav, type DashboardNavIcon } from "@/config/dashboard-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const ICONS = {
  dashboard: Box,
  settings: Settings,
  billing: CreditCard,
  usage: Gauge,
  "api-keys": KeyRound,
  org: Building2,
} as const satisfies Record<DashboardNavIcon, React.ElementType>;

interface AppSidebarProps {
  isFolded: boolean;
  isOpen: boolean;
  onToggleFold: () => void;
  onNavigate: () => void;
}

/**
 * NobleUI-style sidebar. Desktop: 15rem wide, foldable to icons.
 * Mobile: off-canvas drawer controlled by `isOpen`.
 */
export function AppSidebar({
  isFolded,
  isOpen,
  onToggleFold,
  onNavigate,
}: AppSidebarProps): React.ReactElement {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Sidebar"
      className={cn(
        "bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r transition-all duration-200",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        isFolded && "lg:w-16"
      )}
    >
      <div className="border-sidebar-border flex h-15 shrink-0 items-center justify-between border-b px-6">
        <Link
          href="/"
          className={cn("text-primary text-2xl font-black tracking-tight", isFolded && "lg:hidden")}
        >
          {siteConfig.name.split("-")[0]}
        </Link>
        <button
          type="button"
          onClick={onToggleFold}
          aria-label="Toggle sidebar"
          className="text-muted-foreground hover:text-foreground hidden lg:block"
        >
          <PanelLeftClose className={cn("size-5", isFolded && "rotate-180")} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {dashboardNav.map((section) => (
          <div key={section.title} className="mb-4">
            <p
              className={cn(
                "text-muted-foreground px-3 pb-2 text-[0.6875rem] font-bold tracking-wide uppercase",
                isFolded && "lg:invisible"
              )}
            >
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = ICONS[item.icon];
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:text-primary",
                        isFolded && "lg:justify-center"
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className={cn(isFolded && "lg:hidden")}>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
