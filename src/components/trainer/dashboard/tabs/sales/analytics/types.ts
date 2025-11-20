
import { SalesContact } from "../types";

export type TimeFrame = "week" | "month" | "quarter" | "year" | "custom";

export interface TimeAnalyticsData {
  totalNew: number;
  statusCounts: {
    lead: number;
    prospect: number;
    client: number;
    lost: number;
    terminated: number;
  };
  conversionRate: number;
  timeSeriesData: Array<{name: string; value: number}>;
  averageValue: number;
  growthRate: number;
  timeFrameLabel: string;
}

export interface SalesTimeAnalyticsProps {
  contacts: SalesContact[];
}

export interface MetricsCardProps {
  analytics: TimeAnalyticsData;
}

export interface TimeFrameSelectorProps {
  timeFrame: TimeFrame;
  onTimeFrameChange: (value: TimeFrame) => void;
  customPeriod: number;
  onCustomPeriodChange: (period: number) => void;
  showTitle?: boolean;
}

export interface SalesChartProps {
  analytics: TimeAnalyticsData;
  timeFrame: TimeFrame;
}
