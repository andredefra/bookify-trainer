import { Layout } from "react-grid-layout";

export interface WidgetConfig {
  id: string;
  title: string;
  isCore: boolean; // Core widgets cannot be disabled
  defaultLayout: {
    w: number;
    h: number;
    x: number;
    y: number;
    minW?: number;
    minH?: number;
  };
}

export const WIDGET_CATALOG: WidgetConfig[] = [
  {
    id: "quick-actions",
    title: "Quick Actions",
    isCore: true,
    defaultLayout: { w: 1, h: 2, x: 0, y: 0, minW: 1, minH: 2 }
  },
  {
    id: "todays-agenda",
    title: "Today's Agenda",
    isCore: true,
    defaultLayout: { w: 1, h: 2, x: 1, y: 0, minW: 1, minH: 2 }
  },
  {
    id: "messages",
    title: "Messages",
    isCore: true,
    defaultLayout: { w: 1, h: 2, x: 2, y: 0, minW: 1, minH: 2 }
  },
  {
    id: "expiration-alerts",
    title: "Expiration Alerts",
    isCore: true,
    defaultLayout: { w: 3, h: 1, x: 0, y: 2, minW: 2, minH: 1 }
  },
  {
    id: "revenue-chart",
    title: "Revenue Chart",
    isCore: false,
    defaultLayout: { w: 2, h: 2, x: 0, y: 3, minW: 2, minH: 2 }
  },
  {
    id: "client-activity",
    title: "Client Activity",
    isCore: false,
    defaultLayout: { w: 1, h: 2, x: 2, y: 3, minW: 1, minH: 2 }
  },
  {
    id: "performance-metrics",
    title: "Performance Metrics",
    isCore: false,
    defaultLayout: { w: 1, h: 2, x: 0, y: 5, minW: 1, minH: 2 }
  },
  {
    id: "package-sales",
    title: "Package Sales",
    isCore: false,
    defaultLayout: { w: 1, h: 2, x: 1, y: 5, minW: 1, minH: 2 }
  },
  {
    id: "goals",
    title: "Goals",
    isCore: false,
    defaultLayout: { w: 1, h: 2, x: 2, y: 5, minW: 1, minH: 2 }
  },
  {
    id: "recent-activities",
    title: "Recent Activities",
    isCore: false,
    defaultLayout: { w: 3, h: 2, x: 0, y: 7, minW: 2, minH: 2 }
  }
];

export function getDefaultLayout(): Layout[] {
  return WIDGET_CATALOG.map(widget => ({
    i: widget.id,
    x: widget.defaultLayout.x,
    y: widget.defaultLayout.y,
    w: widget.defaultLayout.w,
    h: widget.defaultLayout.h,
    minW: widget.defaultLayout.minW,
    minH: widget.defaultLayout.minH
  }));
}

export function getDefaultEnabledWidgets(): string[] {
  return WIDGET_CATALOG
    .filter(w => w.isCore)
    .map(w => w.id);
}

export function getCoreWidgetIds(): string[] {
  return WIDGET_CATALOG
    .filter(w => w.isCore)
    .map(w => w.id);
}
