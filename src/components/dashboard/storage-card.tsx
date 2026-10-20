"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CardMenu } from "@/components/dashboard/card-menu";

const USED_PERCENT = 67;

/** Radial gauge showing used vs. total cloud storage. */
export function StorageCard(): React.ReactElement {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex items-baseline justify-between">
          <CardTitle>Cloud storage</CardTitle>
          <CardMenu />
        </div>
        <div
          role="img"
          aria-label={`Storage used: ${USED_PERCENT}%`}
          className="relative mx-auto h-65 w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={[{ name: "Used", value: USED_PERCENT }]}
              innerRadius="70%"
              outerRadius="100%"
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                dataKey="value"
                fill="var(--primary)"
                cornerRadius={10}
                background={{ fill: "var(--grid)" }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <span className="text-muted-foreground absolute inset-0 flex items-center justify-center text-3xl font-medium">
            {USED_PERCENT}%
          </span>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="text-right">
            <p className="text-muted-foreground flex items-center justify-end gap-1 text-[0.625rem] font-black uppercase">
              Total storage <span className="bg-muted-foreground size-2 rounded-full" />
            </p>
            <h5 className="text-lg font-black">8TB</h5>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1 text-[0.625rem] font-black uppercase">
              <span className="bg-primary size-2 rounded-full" /> Used storage
            </p>
            <h5 className="text-lg font-black">~5TB</h5>
          </div>
        </div>
        <Button className="h-9 w-full">Upgrade storage</Button>
      </CardContent>
    </Card>
  );
}
