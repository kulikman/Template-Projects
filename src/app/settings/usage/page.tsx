import { redirect } from "next/navigation";

import { createServerClient } from "@/lib/supabase/server";
import { getPlanLimits, formatBytes, formatLimit } from "@/lib/plan-limits";

export const metadata = { title: "Usage" };

interface UsageRowProps {
  label: string;
  used: number | string;
  limit: number;
  formatFn?: (n: number) => string;
}

function UsageRow({ label, used, limit, formatFn = formatLimit }: UsageRowProps): React.ReactElement {
  const usedNum = typeof used === "number" ? used : 0;
  const pct = isFinite(limit) && limit > 0 ? Math.min(100, (usedNum / limit) * 100) : 0;
  const isWarning = pct >= 80;
  const limitLabel = formatFn(limit);

  return (
    <div className="space-y-1.5 py-4 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-muted-foreground">
          {typeof used === "number" ? formatFn(usedNum) : used} / {limitLabel}
        </span>
      </div>
      {isFinite(limit) && (
        <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
          <div
            className={["h-full rounded-full transition-all", isWarning ? "bg-yellow-500" : "bg-primary"].join(" ")}
            style={{ width: `${pct}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default async function UsagePage(): Promise<React.ReactElement> {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch active subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("product_id, status, current_period_end")
    .eq("user_id", user.id)
    .in("status", ["active", "trialing"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const limits = getPlanLimits(subscription?.product_id);

  // TODO: replace with real usage queries once you have those tables.
  const usage = {
    projects: 0,
    members: 1,
    storageBytes: 0,
    apiCalls: 0,
  };

  const renewalDate = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-10">
      <div>
        <h1 className="text-foreground text-2xl font-bold">Usage</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Current plan: <span className="text-foreground font-semibold">{limits.name}</span>
          {renewalDate && (
            <span className="text-muted-foreground"> · Renews {renewalDate}</span>
          )}
        </p>
      </div>

      <div className="border-border divide-border bg-card divide-y rounded-xl border p-6">
        <UsageRow label="Projects" used={usage.projects} limit={limits.maxProjects} />
        <UsageRow label="Team members" used={usage.members} limit={limits.maxMembers} />
        <UsageRow
          label="Storage"
          used={formatBytes(usage.storageBytes)}
          limit={limits.maxStorageBytes}
          formatFn={formatBytes}
        />
        <UsageRow
          label="API calls this month"
          used={usage.apiCalls}
          limit={limits.maxApiCallsPerMonth}
        />
      </div>

      {limits.name === "Free" && (
        <div className="border-primary/20 bg-primary/5 flex items-center justify-between rounded-lg border px-5 py-4">
          <div>
            <p className="text-foreground text-sm font-semibold">Unlock more with Pro</p>
            <p className="text-muted-foreground text-xs">Unlimited projects, 50 GB storage, AI features.</p>
          </div>
          <a
            href="/pricing"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            Upgrade →
          </a>
        </div>
      )}
    </div>
  );
}
