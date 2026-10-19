"use client";

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

import type { ChartPoint } from "@/components/dashboard/demo-data";

interface SparklineProps {
  data: readonly ChartPoint[];
  kind: "line" | "bar";
  /** Accessible summary, e.g. "New customers trend". */
  label: string;
}

/** 60px-high trend chart used inside stat cards. */
export function Sparkline({ data, kind, label }: SparklineProps): React.ReactElement {
  const points = [...data];
  return (
    <div role="img" aria-label={label} className="h-15 w-full">
      <ResponsiveContainer width="100%" height="100%">
        {kind === "line" ? (
          <LineChart data={points}>
            <YAxis hide domain={["dataMin", "dataMax"]} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        ) : (
          <BarChart data={points}>
            <Bar
              dataKey="value"
              fill="var(--primary)"
              radius={[2, 2, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
