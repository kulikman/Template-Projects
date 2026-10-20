/**
 * Placeholder data for the dashboard template. Replace with real queries
 * (Server Component + Supabase) when the product has data.
 */

export interface ChartPoint {
  label: string;
  value: number;
}

function toPoints(values: readonly number[], labelPrefix: string): ChartPoint[] {
  return values.map((value, index) => ({ label: `${labelPrefix} ${index + 1}`, value }));
}

export const CUSTOMERS_SERIES = toPoints(
  [3844, 3855, 3841, 3867, 3822, 3843, 3821, 3841, 3856, 3827, 3843],
  "Day"
);
export const ORDERS_SERIES = toPoints([36, 77, 52, 90, 74, 35, 55, 23, 47, 10, 63], "Day");
export const GROWTH_SERIES = toPoints([41, 45, 44, 46, 52, 54, 43, 74, 82, 82, 89], "Day");

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const MONTHLY_SALES: ChartPoint[] = [
  152, 109, 93, 113, 126, 161, 188, 143, 102, 113, 116, 124,
].map((value, index) => ({ label: MONTHS[index] ?? "", value }));

/** Deterministic pseudo-random walk so server and client render the same chart. */
function revenueSeries(length: number, base: number, amplitude: number): ChartPoint[] {
  return Array.from({ length }, (_, i) => ({
    label: `${i + 1}`,
    value: Math.round(base + Math.sin(i / 3) * amplitude + Math.cos(i * 1.7) * (amplitude / 4)),
  }));
}

export const REVENUE_PERIODS = ["Today", "Week", "Month", "Year"] as const;
export type RevenuePeriod = (typeof REVENUE_PERIODS)[number];

export const REVENUE_SERIES: Record<RevenuePeriod, ChartPoint[]> = {
  Today: revenueSeries(24, 40, 12),
  Week: revenueSeries(7, 45, 15),
  Month: revenueSeries(30, 45, 18),
  Year: revenueSeries(12, 50, 20),
};

export interface InboxMessage {
  id: string;
  name: string;
  time: string;
  preview: string;
  avatar: string;
}

export const INBOX: readonly InboxMessage[] = [
  {
    id: "1",
    name: "Leonardo Payne",
    time: "12.30 PM",
    preview: "Hey! there I'm available...",
    avatar: "/images/faces/face2.jpg",
  },
  {
    id: "2",
    name: "Carl Henson",
    time: "02.14 AM",
    preview: "I've finished it! See you so..",
    avatar: "/images/faces/face3.jpg",
  },
  {
    id: "3",
    name: "Jensen Combs",
    time: "08.22 PM",
    preview: "This template is awesome!",
    avatar: "/images/faces/face4.jpg",
  },
  {
    id: "4",
    name: "Amiah Burton",
    time: "05.49 AM",
    preview: "Nice to meet you",
    avatar: "/images/faces/face5.jpg",
  },
  {
    id: "5",
    name: "Yaretzi Mayo",
    time: "01.19 AM",
    preview: "Hey! there I'm available...",
    avatar: "/images/faces/face1.jpg",
  },
];

export type ProjectStatusVariant = "danger" | "success" | "info" | "warning" | "primary";

export interface ProjectRow {
  id: number;
  name: string;
  start: string;
  due: string;
  status: string;
  variant: ProjectStatusVariant;
  assignee: string;
}

export const PROJECTS: readonly ProjectRow[] = [
  {
    id: 1,
    name: "Website redesign",
    start: "01/01/2026",
    due: "26/04/2026",
    status: "Released",
    variant: "danger",
    assignee: "Leonardo Payne",
  },
  {
    id: 2,
    name: "Mobile app",
    start: "01/01/2026",
    due: "26/04/2026",
    status: "Review",
    variant: "success",
    assignee: "Carl Henson",
  },
  {
    id: 3,
    name: "Billing portal",
    start: "01/05/2026",
    due: "10/09/2026",
    status: "Pending",
    variant: "info",
    assignee: "Jensen Combs",
  },
  {
    id: 4,
    name: "Admin console",
    start: "01/01/2026",
    due: "30/11/2026",
    status: "Work in Progress",
    variant: "warning",
    assignee: "Amiah Burton",
  },
  {
    id: 5,
    name: "Public API",
    start: "01/01/2026",
    due: "31/12/2026",
    status: "Coming soon",
    variant: "danger",
    assignee: "Yaretzi Mayo",
  },
  {
    id: 6,
    name: "Docs site",
    start: "01/01/2026",
    due: "31/12/2026",
    status: "Coming soon",
    variant: "primary",
    assignee: "Carl Henson",
  },
];
