import { ArrowDown, ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CardMenu } from "@/components/dashboard/card-menu";

interface StatCardProps {
  title: string;
  value: string;
  /** Signed percentage string, e.g. "+3.3%" or "-2.8%". */
  delta: string;
  chart: React.ReactNode;
}

/** KPI card: title, big number, trend delta and a sparkline. */
export function StatCard({ title, value, delta, chart }: StatCardProps): React.ReactElement {
  const isNegative = delta.startsWith("-");
  const Arrow = isNegative ? ArrowDown : ArrowUp;

  return (
    <Card>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <CardTitle>{title}</CardTitle>
          <CardMenu />
        </div>
        <div className="mt-2 grid grid-cols-2 items-center gap-2 md:grid-cols-1 xl:grid-cols-[5fr_7fr]">
          <div>
            <h3 className="mb-2 text-[1.75rem] leading-tight font-medium">{value}</h3>
            <p
              className={cn(
                "flex items-center gap-1 text-sm",
                isNegative ? "text-destructive" : "text-success"
              )}
            >
              <span>{delta}</span>
              <Arrow className="size-3.5" />
            </p>
          </div>
          {chart}
        </div>
      </CardContent>
    </Card>
  );
}
