"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CardMenu } from "@/components/dashboard/card-menu";
import { MONTHLY_SALES } from "@/components/dashboard/demo-data";

/** Bar chart of sales per month. */
export function MonthlySalesCard(): React.ReactElement {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="mb-2 flex items-baseline justify-between">
          <CardTitle>Monthly sales</CardTitle>
          <CardMenu />
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          Sales are activities related to selling or the number of goods or services sold in a given
          time period.
        </p>
        <div role="img" aria-label="Monthly sales" className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_SALES}>
              <CartesianGrid stroke="var(--grid)" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="var(--muted-foreground)"
                tickLine={false}
                fontSize={11}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                tickLine={false}
                axisLine={false}
                fontSize={11}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                }}
              />
              <Bar dataKey="value" name="Sales" fill="var(--primary)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
