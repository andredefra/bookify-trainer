import React from "react";
import { Users, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";
import { getBodyFatTrend, formatTrendChange } from "./utils/trendCalculations";

interface BodyFatCardProps {
  bodyFatPercentage: number | null;
  bodyFatStatus: { label: string; color: string } | null;
  bodyFatRequirements: { sufficient: boolean; missing: string[] };
  latestMeasurements: BodyMeasurements | null;
  bodyMeasurements: BodyMeasurements[];
}

export function BodyFatCard({ 
  bodyFatPercentage, 
  bodyFatStatus, 
  bodyFatRequirements, 
  latestMeasurements,
  bodyMeasurements 
}: BodyFatCardProps) {
  // Calculate trend
  const bodyFatTrend = getBodyFatTrend(bodyMeasurements);
  
  const renderTrendIcon = () => {
    if (!bodyFatTrend || bodyFatTrend.trend === 'stable') return <Minus className="h-3 w-3 text-gray-500" />;
    if (bodyFatTrend.trend === 'down') return <TrendingDown className="h-3 w-3 text-green-600" />;
    return <TrendingUp className="h-3 w-3 text-red-500" />;
  };
  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-500 rounded-lg p-2">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Body Fat %</h4>
            <p className="text-xs text-slate-600">Body composition</p>
          </div>
        </div>
        {bodyFatStatus && (
          <Badge className={`${bodyFatStatus.color} border-0 font-medium`}>
            {bodyFatStatus.label}
          </Badge>
        )}
      </div>
      
      <div className="space-y-3">
        {bodyFatRequirements.sufficient && bodyFatPercentage ? (
          <div className="space-y-3">
            <div className="text-center bg-white/60 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <span className="text-2xl font-bold text-purple-700">{bodyFatPercentage}%</span>
                {renderTrendIcon()}
              </div>
              <div className="text-xs text-slate-600 mb-1">Current Body Fat</div>
              {bodyFatTrend && (
                <div className={`text-xs font-medium ${bodyFatTrend.trend === 'down' ? 'text-green-600' : bodyFatTrend.trend === 'up' ? 'text-red-500' : 'text-gray-500'}`}>
                  {formatTrendChange(bodyFatTrend, '%')} vs previous
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center bg-white/60 rounded-lg p-4">
            <div className="text-sm text-slate-600 mb-2">Missing measurements:</div>
            <div className="text-xs font-medium text-purple-700">
              {bodyFatRequirements.missing.join(', ')}
            </div>
          </div>
        )}
        
        <div className="text-center">
          <span className="text-xs text-purple-600">
            {bodyFatPercentage ? 'Using Navy body fat formula' : 'Complete profile for calculation'}
          </span>
        </div>
      </div>
    </div>
  );
}