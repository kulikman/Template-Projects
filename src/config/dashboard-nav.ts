import { routes } from "@/config/routes";

/** Lucide icon names resolved by the sidebar — keeps this config free of React. */
export type DashboardNavIcon = "dashboard" | "settings" | "billing" | "usage" | "api-keys" | "org";

export interface DashboardNavItem {
  title: string;
  href: string;
  icon: DashboardNavIcon;
}

export interface DashboardNavSection {
  title: string;
  items: readonly DashboardNavItem[];
}

/** Sidebar structure. Hrefs and labels come from `routes` — the route contract. */
export const dashboardNav = [
  {
    title: "Main",
    items: [{ title: routes.dashboard.label, href: routes.dashboard.href, icon: "dashboard" }],
  },
  {
    title: "Account",
    items: [
      { title: routes.settings.label, href: routes.settings.href, icon: "settings" },
      {
        title: routes.settings.children.billing.label,
        href: routes.settings.children.billing.href,
        icon: "billing",
      },
      {
        title: routes.settings.children.usage.label,
        href: routes.settings.children.usage.href,
        icon: "usage",
      },
      {
        title: routes.settings.children.apiKeys.label,
        href: routes.settings.children.apiKeys.href,
        icon: "api-keys",
      },
      {
        title: routes.settings.children.organization.label,
        href: routes.settings.children.organization.href,
        icon: "org",
      },
    ],
  },
] as const satisfies readonly DashboardNavSection[];
