import React from "react";
import { Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";
import { getMeasurementTrend, formatTrendChange } from "./utils/trendCalculations";

interface BodyMeasurementsCardProps {
  latestMeasurements: BodyMeasurements;
  bodyMeasurements: BodyMeasurements[];
}

export function BodyMeasurementsCard({ latestMeasurements, bodyMeasurements }: BodyMeasurementsCardProps) {
  const getSourceInfo = () => {
    switch (latestMeasurements.source) {
      case 'manual':
        return { label: 'Manual', color: 'bg-orange-100 text-orange-800' };
      case 'googleFit':
        return { label: 'Google Fit', color: 'bg-blue-100 text-blue-800' };
      case 'appleHealth':
        return { label: 'Apple Health', color: 'bg-muted text-muted-foreground' };
      default:
        return { label: 'Unknown', color: 'bg-muted text-muted-foreground' };
    }
  };

  const sourceInfo = getSourceInfo();

  // Calculate trends for each measurement
  const waistTrend = getMeasurementTrend(bodyMeasurements, 'waist');
  const hipsTrend = getMeasurementTrend(bodyMeasurements, 'hips');
  const armsTrend = getMeasurementTrend(bodyMeasurements, 'arms');
  const neckTrend = getMeasurementTrend(bodyMeasurements, 'neck');

  // Get previous measurement date for reference
  const getPreviousDate = () => {
    if (bodyMeasurements.length < 2) return null;
    const sorted = bodyMeasurements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return new Date(sorted[1].date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
  };

  const previousDate = getPreviousDate();

  const renderTrendIcon = (trend: any) => {
    if (!trend || trend.trend === 'stable') return <Minus className="h-3 w-3 text-muted-foreground" />;
    if (trend.trend === 'down') return <TrendingDown className="h-3 w-3 text-green-500" />;
    return <TrendingUp className="h-3 w-3 text-red-500" />;
  };

  const renderMeasurementItem = (label: string, value: number, unit: string, trend: any) => (
    <div className="bg-muted/30 rounded-md p-2">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm font-bold text-foreground">{value}{unit}</div>
        {renderTrendIcon(trend)}
      </div>
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      {trend && previousDate && (
        <div className={`text-xs font-medium ${trend.trend === 'down' ? 'text-green-600' : trend.trend === 'up' ? 'text-red-500' : 'text-muted-foreground'}`}>
          {formatTrendChange(trend, 'cm', 1)} vs {previousDate}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-orange-500 rounded-md p-1.5">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">Measurements</h4>
            <p className="text-xs text-muted-foreground">
              {new Date(latestMeasurements.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>
        <Badge className={`${sourceInfo.color} border-0 text-xs`}>
          {sourceInfo.label}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {latestMeasurements.waist && renderMeasurementItem('Waist', latestMeasurements.waist, 'cm', waistTrend)}
        {latestMeasurements.hips && renderMeasurementItem('Hips', latestMeasurements.hips, 'cm', hipsTrend)}
        {latestMeasurements.arms && renderMeasurementItem('Arms', latestMeasurements.arms, 'cm', armsTrend)}
        {latestMeasurements.neck && renderMeasurementItem('Neck', latestMeasurements.neck, 'cm', neckTrend)}
      </div>
    </div>
  );
}