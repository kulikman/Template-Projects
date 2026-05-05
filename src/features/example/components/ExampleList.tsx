import type { ExampleItem } from "../types/example.types";

interface ExampleListProps {
  items: ExampleItem[];
}

/**
 * Server Component — renders the list of example items.
 *
 * No 'use client' here: this component is pure presentational,
 * receives data from the Server Component parent, and has no interactivity.
 *
 * To add interactivity (delete button, inline edit), extract a thin
 * 'use client' wrapper and pass callbacks as props.
 */
export function ExampleList({ items }: ExampleListProps): React.ReactElement {
  if (items.length === 0) {
    return <p className="text-muted-foreground py-8 text-center text-sm">No items yet.</p>;
  }

  return (
    <ul className="divide-border divide-y">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-3 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{item.title}</p>
            {item.description && (
              <p className="text-muted-foreground mt-0.5 line-clamp-2 text-sm">
                {item.description}
              </p>
            )}
          </div>
          <time className="text-muted-foreground shrink-0 text-xs tabular-nums">
            {new Date(item.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
        </li>
      ))}
    </ul>
  );
}
