"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

/**
 * Single client-side provider boundary for the whole app.
 *
 * Keep this list short — every provider added here ships in the client
 * bundle for every page. If a provider is only needed in one route group,
 * push it down into that group's layout instead.
 */
export function Providers({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  );
}
