import * as React from "react";

import { cn } from "@/lib/utils";

export function Table({ className, ...props }: React.ComponentProps<"table">): React.ReactElement {
  return (
    <div data-slot="table-container" className="w-full overflow-x-auto">
      <table className={cn("w-full text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader(props: React.ComponentProps<"thead">): React.ReactElement {
  return <thead {...props} />;
}

export function TableBody(props: React.ComponentProps<"tbody">): React.ReactElement {
  return <tbody {...props} />;
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">): React.ReactElement {
  return (
    <tr
      className={cn("border-border hover:bg-muted/50 border-b transition-colors", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">): React.ReactElement {
  return (
    <th
      className={cn("border-border border-b px-3 pt-0 pb-3 text-left font-medium", className)}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">): React.ReactElement {
  return <td className={cn("px-3 py-3 align-middle", className)} {...props} />;
}
