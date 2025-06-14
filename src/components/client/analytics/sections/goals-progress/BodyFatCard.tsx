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
    if (!bodyFatTrend || bodyFatTrend.trend === 'stable') return <Minus className="h-3 w-3 text-muted-foreground" />;
    if (bodyFatTrend.trend === 'down') return <TrendingDown className="h-3 w-3 text-green-600" />;
    return <TrendingUp className="h-3 w-3 text-red-500" />;
  };

  const formatLastMeasured = () => {
    if (!latestMeasurements) return 'No data';
    return new Date(latestMeasurements.date).toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-purple-500 rounded-md p-1.5">
            <Users className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">Body Fat %</h4>
            <p className="text-xs text-muted-foreground">Last: {formatLastMeasured()}</p>
          </div>
        </div>
        {bodyFatStatus && (
          <Badge className={`${bodyFatStatus.color} border-0 text-xs`}>
            {bodyFatStatus.label}
          </Badge>
        )}
      </div>
      
      <div className="space-y-3">
        {bodyFatRequirements.sufficient && bodyFatPercentage ? (
          <div className="text-center bg-muted/30 rounded-md p-3">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <span className="text-xl font-bold text-purple-700">{bodyFatPercentage}%</span>
              {renderTrendIcon()}
            </div>
            {bodyFatTrend && (
              <div className={`text-xs font-medium ${bodyFatTrend.trend === 'down' ? 'text-green-600' : bodyFatTrend.trend === 'up' ? 'text-red-500' : 'text-muted-foreground'}`}>
                {formatTrendChange(bodyFatTrend, '%')} vs previous
              </div>
            )}
          </div>
        ) : (
          <div className="text-center bg-muted/30 rounded-md p-3">
            <div className="text-xs text-muted-foreground mb-1">Missing:</div>
            <div className="text-xs font-medium text-purple-700">
              {bodyFatRequirements.missing.join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}