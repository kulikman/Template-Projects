"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CardMenu } from "@/components/dashboard/card-menu";
import {
  REVENUE_PERIODS,
  REVENUE_SERIES,
  type RevenuePeriod,
} from "@/components/dashboard/demo-data";

/** Large Revenue card with a Today / Week / Month / Year switcher. */
export function RevenueCard(): React.ReactElement {
  const [period, setPeriod] = useState<RevenuePeriod>("Month");

  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div className="mb-4 flex items-baseline justify-between md:mb-3">
          <CardTitle>Revenue</CardTitle>
          <CardMenu />
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <p className="text-muted-foreground max-w-xl text-[0.8125rem]">
            Revenue is the income that a business has from its normal business activities, usually
            from the sale of goods and services to customers.
          </p>
          <div role="group" aria-label="Revenue period" className="flex">
            {REVENUE_PERIODS.map((item) => (
              <Button
                key={item}
                variant={item === period ? "default" : "outline"}
                onClick={() => setPeriod(item)}
                aria-pressed={item === period}
                className={cn(
                  "border-primary rounded-none first:rounded-l-md last:rounded-r-md",
                  item !== period && "text-primary bg-transparent",
                  item === "Week" && "hidden md:inline-flex"
                )}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div
          role="img"
          aria-label={`Revenue, ${period.toLowerCase()}`}
          className="mt-4 h-100 w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={REVENUE_SERIES[period]}>
              <CartesianGrid stroke="var(--grid)" />
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
                tickFormatter={(v: number) => v.toFixed(1)}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                }}
                formatter={(value) => [`$${String(value)}k`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
