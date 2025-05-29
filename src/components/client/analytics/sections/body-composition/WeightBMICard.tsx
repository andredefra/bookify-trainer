
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";
import { calculateBodyComposition } from "@/components/client/overview/fitness-progress/utils";
import { calculateBMI, getBMIStatus } from "./utils";

interface WeightBMICardProps {
  weightData: {
    current: number;
    target: number;
    unit: string;
    trend: string;
  } | null;
  latestMeasurements: BodyMeasurements | null;
}

export function WeightBMICard({ weightData, latestMeasurements }: WeightBMICardProps) {
  const isMobile = useIsMobile();
  
  // Calculate body composition
  const bodyComposition = latestMeasurements ? calculateBodyComposition(latestMeasurements) : null;
  
  // Default or calculated values
  const currentWeight = weightData?.current || 70;
  const bmi = calculateBMI(currentWeight);
  const bmiStatus = getBMIStatus(bmi);

  const renderTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3 text-green-500" />;
    return <Minus className="h-3 w-3 text-gray-500" />;
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-all bg-white border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
          <Scale className="h-5 w-5 text-blue-600" />
          Weight & BMI
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-600">Current Weight</p>
            <div className="flex items-center gap-1">
              <span className="text-lg font-semibold text-slate-900">
                {currentWeight} {weightData?.unit || 'kg'}
              </span>
              {weightData?.trend && renderTrendIcon(weightData.trend)}
            </div>
          </div>
          {weightData?.target && (
            <div className="text-right">
              <p className="text-xs text-slate-600">Target</p>
              <span className="text-sm font-medium text-slate-700">
                {weightData.target} {weightData.unit}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-600">BMI</p>
            <span className="text-lg font-semibold text-slate-900">{bmi}</span>
          </div>
          <Badge className={`text-xs px-2 py-1 ${bmiStatus.color} border-0`}>
            {bmiStatus.label}
          </Badge>
        </div>

        {bodyComposition?.leanMass && (
          <div>
            <p className="text-xs text-slate-600">Lean Mass</p>
            <span className="text-sm font-medium text-slate-700">
              {bodyComposition.leanMass} kg
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
