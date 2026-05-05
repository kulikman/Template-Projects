import Link from "next/link";

import { ROUTES } from "@/lib/constants";

export default function SettingsPage(): React.ReactElement {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your account and subscription.</p>
      </div>

      <nav className="flex flex-col gap-1">
        <Link
          href={ROUTES.settingsBilling}
          className="border-border hover:bg-muted/50 flex items-center justify-between rounded-lg border px-4 py-3 transition-colors"
        >
          <div>
            <p className="text-foreground text-sm font-medium">Billing</p>
            <p className="text-muted-foreground text-xs">Manage your plan and payment methods.</p>
          </div>
          <span className="text-muted-foreground text-sm">→</span>
        </Link>
      </nav>
    </section>
  );
}
