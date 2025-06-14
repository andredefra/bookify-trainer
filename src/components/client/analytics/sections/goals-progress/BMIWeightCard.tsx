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
    <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-green-500 rounded-lg p-2">
            <Scale className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">BMI & Weight</h4>
            <p className="text-xs text-slate-600">Health metrics</p>
          </div>
        </div>
        <Badge className={`${bmiStatus.color} border-0 font-medium`}>
          {bmiStatus.label}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center bg-white/60 rounded-lg p-3">
            <div className="text-xl font-bold text-green-700">{currentWeight}</div>
            <div className="text-xs text-slate-600">kg</div>
          </div>
          <div className="text-center bg-white/60 rounded-lg p-3">
            <div className="text-xl font-bold text-green-700">{bmi}</div>
            <div className="text-xs text-slate-600">BMI</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-sm">
          <span className="text-xl">{getTrendIcon()}</span>
          <span className="font-medium text-green-700">{getTrendText()}</span>
        </div>
      </div>
    </div>
  );
}