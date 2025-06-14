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
  return (
    <div className="bg-green-50 p-4 rounded-lg min-w-0">
      <div className="flex flex-col gap-2 mb-2.5">
        <div className="flex items-center">
          <Scale className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
          <span className="text-sm font-medium text-green-800 truncate">BMI & Weight</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
          <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded whitespace-nowrap">
            Weight: {currentWeight}kg
          </span>
          <span className="text-xs bg-green-300 text-green-900 px-2 py-0.5 rounded whitespace-nowrap">
            BMI: {bmi}
          </span>
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-green-700">Status:</span>
        <Badge className={`text-xs px-2 py-1 ${bmiStatus.color} border-0`}>
          {bmiStatus.label}
        </Badge>
      </div>
      <p className="text-xs text-green-700">
        {weightTrend === 'down' ? '📉 Losing weight' : 
         weightTrend === 'up' ? '📈 Gaining weight' : '➖ Weight stable'}
      </p>
    </div>
  );
}