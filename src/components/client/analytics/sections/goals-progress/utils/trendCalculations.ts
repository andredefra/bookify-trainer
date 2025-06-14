import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";

export interface TrendData {
  value: number;
  previousValue: number;
  difference: number;
  percentageChange: number;
  trend: 'up' | 'down' | 'stable';
  isPositive: boolean;
  previousDate?: string;
}

export const calculateTrend = (current: number, previous: number): TrendData => {
  const difference = current - previous;
  const percentageChange = previous !== 0 ? (difference / previous) * 100 : 0;
  
  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (Math.abs(difference) > 0.1) { // Threshold for considering a change significant
    trend = difference > 0 ? 'up' : 'down';
  }
  
  return {
    value: current,
    previousValue: previous,
    difference,
    percentageChange,
    trend,
    isPositive: difference >= 0
  };
};

export const getMeasurementTrend = (
  measurements: BodyMeasurements[],
  field: keyof BodyMeasurements
): TrendData | null => {
  if (measurements.length < 2) return null;
  
  const sortedMeasurements = measurements
    .filter(m => m[field] !== undefined)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sortedMeasurements.length < 2) return null;
  
  const current = sortedMeasurements[0][field] as number;
  const previous = sortedMeasurements[1][field] as number;
  
  return calculateTrend(current, previous);
};

export const getBodyFatTrend = (measurements: BodyMeasurements[]): TrendData | null => {
  if (measurements.length < 2) return null;
  
  const sortedMeasurements = measurements
    .filter(m => m.waist && m.neck) // Only measurements that can calculate body fat
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sortedMeasurements.length < 2) return null;
  
  // Calculate body fat for current and previous
  const currentBodyFat = calculateBodyFatFromMeasurements(sortedMeasurements[0]);
  const previousBodyFat = calculateBodyFatFromMeasurements(sortedMeasurements[1]);
  
  if (!currentBodyFat || !previousBodyFat) return null;
  
  const trendData = calculateTrend(currentBodyFat, previousBodyFat);
  return {
    ...trendData,
    previousDate: sortedMeasurements[1].date
  };
};

const calculateBodyFatFromMeasurements = (measurements: BodyMeasurements): number | null => {
  if (!measurements.waist || !measurements.neck) return null;
  
  // Simplified Navy Body Fat formula
  const waistNeckRatio = measurements.waist / measurements.neck;
  return Math.max(5, Math.min(50, waistNeckRatio * 15 - 10));
};

export const formatTrendValue = (value: number, unit: string = '', decimals: number = 1): string => {
  return `${value.toFixed(decimals)}${unit}`;
};

export const formatTrendChange = (trend: TrendData, unit: string = '', decimals: number = 1): string => {
  const sign = trend.difference >= 0 ? '+' : '';
  return `${sign}${trend.difference.toFixed(decimals)}${unit}`;
};