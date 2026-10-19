import { InboxCard } from "@/components/dashboard/inbox-card";
import { MonthlySalesCard } from "@/components/dashboard/monthly-sales-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProjectsCard } from "@/components/dashboard/projects-card";
import { RevenueCard } from "@/components/dashboard/revenue-card";
import { Sparkline } from "@/components/dashboard/sparkline";
import { StatCard } from "@/components/dashboard/stat-card";
import { StorageCard } from "@/components/dashboard/storage-card";
import { CUSTOMERS_SERIES, GROWTH_SERIES, ORDERS_SERIES } from "@/components/dashboard/demo-data";

/**
 * Dashboard home — NobleUI demo1 layout with placeholder data
 * (`components/dashboard/demo-data.ts`). Replace the data source with real
 * queries; the shell (sidebar/navbar) and auth gate live in `./layout.tsx`.
 */
export default function DashboardPage(): React.ReactElement {
  return (
    <>
      <PageHeader title="Welcome to Dashboard" />
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="New Customers"
          value="3,897"
          delta="+3.3%"
          chart={<Sparkline kind="line" data={CUSTOMERS_SERIES} label="New customers trend" />}
        />
        <StatCard
          title="New Orders"
          value="35,084"
          delta="-2.8%"
          chart={<Sparkline kind="bar" data={ORDERS_SERIES} label="New orders trend" />}
        />
        <StatCard
          title="Growth"
          value="89.87%"
          delta="+2.8%"
          chart={<Sparkline kind="line" data={GROWTH_SERIES} label="Growth trend" />}
        />
      </div>
      <div className="mt-6">
        <RevenueCard />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8">
          <MonthlySalesCard />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <StorageCard />
        </div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 xl:col-span-4">
          <InboxCard />
        </div>
        <div className="lg:col-span-7 xl:col-span-8">
          <ProjectsCard />
        </div>
      </div>
    </>
  );
}
