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
        return { label: 'Manual Entry', color: 'bg-orange-100 text-orange-800' };
      case 'googleFit':
        return { label: 'Google Fit', color: 'bg-blue-100 text-blue-800' };
      case 'appleHealth':
        return { label: 'Apple Health', color: 'bg-gray-100 text-gray-800' };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const sourceInfo = getSourceInfo();

  // Calculate trends for each measurement
  const waistTrend = getMeasurementTrend(bodyMeasurements, 'waist');
  const hipsTrend = getMeasurementTrend(bodyMeasurements, 'hips');
  const armsTrend = getMeasurementTrend(bodyMeasurements, 'arms');
  const neckTrend = getMeasurementTrend(bodyMeasurements, 'neck');

  const renderTrendIcon = (trend: any) => {
    if (!trend || trend.trend === 'stable') return <Minus className="h-3 w-3 text-gray-400" />;
    if (trend.trend === 'down') return <TrendingDown className="h-3 w-3 text-green-500" />;
    return <TrendingUp className="h-3 w-3 text-red-500" />;
  };

  const renderMeasurementItem = (label: string, value: number, unit: string, trend: any) => (
    <div className="bg-white/60 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <div className="text-lg font-bold text-orange-700">{value}</div>
        {renderTrendIcon(trend)}
      </div>
      <div className="text-xs text-slate-600 mb-1">{label} ({unit})</div>
      {trend && (
        <div className={`text-xs font-medium ${trend.trend === 'down' ? 'text-green-600' : trend.trend === 'up' ? 'text-red-500' : 'text-gray-500'}`}>
          {formatTrendChange(trend, 'cm', 1)}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-500 rounded-lg p-2">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Body Measurements</h4>
            <p className="text-xs text-slate-600">
              {new Date(latestMeasurements.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Badge className={`${sourceInfo.color} border-0 font-medium text-xs`}>
          {sourceInfo.label}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {latestMeasurements.waist && renderMeasurementItem('Waist', latestMeasurements.waist, 'cm', waistTrend)}
        {latestMeasurements.hips && renderMeasurementItem('Hips', latestMeasurements.hips, 'cm', hipsTrend)}
        {latestMeasurements.arms && renderMeasurementItem('Arms', latestMeasurements.arms, 'cm', armsTrend)}
        {latestMeasurements.neck && renderMeasurementItem('Neck', latestMeasurements.neck, 'cm', neckTrend)}
      </div>
    </div>
  );
}