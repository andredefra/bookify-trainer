import React from "react";
import { Users, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";
import { getBodyFatTrend, formatTrendChange } from "./utils/trendCalculations";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

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
  
  // Calculate body composition for pie chart
  const calculateBodyComposition = () => {
    if (!bodyFatPercentage || !latestMeasurements?.weight) return null;
    
    const weight = latestMeasurements.weight;
    const fatMass = (weight * bodyFatPercentage) / 100;
    const leanMass = weight - fatMass;
    
    // Estimate muscle mass (typically 40-45% of body weight for active individuals)
    // This is a simplified estimation - in real apps would come from smart scales or body scans
    const muscleMass = weight * 0.42;
    const otherLeanMass = leanMass - muscleMass;
    
    return [
      { name: "Fat Mass", value: parseFloat(fatMass.toFixed(1)), color: "#ef4444" },
      { name: "Muscle Mass", value: parseFloat(muscleMass.toFixed(1)), color: "#3b82f6" },
      { name: "Other Lean Mass", value: parseFloat(otherLeanMass.toFixed(1)), color: "#10b981" }
    ];
  };
  
  const bodyCompositionData = calculateBodyComposition();
  
  const renderTrendIcon = () => {
    if (!bodyFatTrend || bodyFatTrend.trend === 'stable') return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (bodyFatTrend.trend === 'down') return <TrendingDown className="h-4 w-4 text-green-600" />;
    return <TrendingUp className="h-4 w-4 text-red-500" />;
  };

  const formatLastMeasured = () => {
    if (!latestMeasurements) return 'No data';
    return new Date(latestMeasurements.date).toLocaleDateString('it-IT', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="bg-card border rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
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
      
      <div>
        {bodyFatRequirements.sufficient && bodyFatPercentage ? (
          <div className="grid grid-cols-5 gap-3">
            {/* Left Column - Body Fat Percentage */}
            <div className="col-span-2 bg-muted/50 rounded-md p-4 flex flex-col justify-center">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-purple-700">{bodyFatPercentage}%</span>
                  {renderTrendIcon()}
                </div>
                {bodyFatTrend && bodyFatTrend.previousDate && (
                  <div className={`text-sm font-medium ${bodyFatTrend.trend === 'down' ? 'text-green-600' : bodyFatTrend.trend === 'up' ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {formatTrendChange(bodyFatTrend, '%')} vs {new Date(bodyFatTrend.previousDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column - Body Composition Chart */}
            {bodyCompositionData && (
              <div className="col-span-3 bg-muted/20 rounded-md p-3">
                <h5 className="text-xs font-medium text-muted-foreground mb-2 text-center">Body Composition</h5>
                <ResponsiveContainer width="100%" height={140}>
                  <PieChart>
                    <Pie
                      data={bodyCompositionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={28}
                      outerRadius={50}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ value }) => `${value}kg`}
                      labelLine={false}
                      style={{ fontSize: '10px' }}
                    >
                      {bodyCompositionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => `${value} kg`}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px',
                        fontSize: '11px'
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={28}
                      iconType="circle"
                      wrapperStyle={{ fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <p className="text-[10px] text-muted-foreground text-center mt-1">
                  *Estimate based on algorithms and body measurements
                </p>
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