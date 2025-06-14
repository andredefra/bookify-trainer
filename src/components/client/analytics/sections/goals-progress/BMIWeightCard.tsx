import React from "react";
import { Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BMIWeightCardProps {
  currentWeight: number;
  bmi: number;
  bmiStatus: { label: string; color: string };
  weightTrend?: string;
}

export function BMIWeightCard({ currentWeight, bmi, bmiStatus, weightTrend }: BMIWeightCardProps) {
  const getTrendIcon = () => {
    if (weightTrend === 'down') return '📉';
    if (weightTrend === 'up') return '📈';
    return '➖';
  };

  const getTrendText = () => {
    if (weightTrend === 'down') return 'Losing weight';
    if (weightTrend === 'up') return 'Gaining weight';
    return 'Weight stable';
  };

  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-green-500 rounded-md p-1.5">
            <Scale className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">BMI & Weight</h4>
            <p className="text-xs text-muted-foreground">Health metrics</p>
          </div>
        </div>
        <Badge className={`${bmiStatus.color} border-0 text-xs`}>
          {bmiStatus.label}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center bg-muted/30 rounded-md p-2">
            <div className="text-lg font-bold text-green-700">{currentWeight}</div>
            <div className="text-xs text-muted-foreground">kg</div>
          </div>
          <div className="text-center bg-muted/30 rounded-md p-2">
            <div className="text-lg font-bold text-green-700">{bmi}</div>
            <div className="text-xs text-muted-foreground">BMI</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-xs">
          <span className="text-sm">{getTrendIcon()}</span>
          <span className="font-medium text-green-700">{getTrendText()}</span>
        </div>
      </div>
    </div>
  );
}