"use client";

import { useState } from "react";
import { Calendar, DownloadCloud, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Title row: greeting, date filter and report actions. */
export function PageHeader({ title }: { title: string }): React.ReactElement {
  const [date, setDate] = useState("");

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-xl font-medium">{title}</h1>
      <div className="flex flex-wrap items-center gap-2">
        <label className="border-primary flex h-9 w-52 items-center overflow-hidden rounded-md border">
          <span className="border-primary flex h-full items-center border-r px-2.5">
            <Calendar className="text-primary size-4" />
          </span>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Report date"
            className="h-full rounded-none border-0 bg-transparent"
          />
        </label>
        <Button
          variant="outline"
          className="border-primary text-primary h-9 px-3"
          onClick={() => window.print()}
        >
          <Printer /> Print
        </Button>
        <Button className="h-9 px-3">
          <DownloadCloud /> Download Report
        </Button>
      </div>
    </div>
  );
}
