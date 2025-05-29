
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Scale, Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProgressItem, BodyMeasurements } from "@/components/client/overview/fitness-progress/types";
import { calculateBodyComposition } from "@/components/client/overview/fitness-progress/utils";

interface BodyCompositionSectionProps {
  progressData: ProgressItem[];
  bodyMeasurements?: BodyMeasurements[];
}

// Helper function to get latest body measurements
const getLatestMeasurements = (measurements: BodyMeasurements[] = []): BodyMeasurements | null => {
  if (measurements.length === 0) return null;
  return measurements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};

// Helper function to get weight data from progress goals
const getWeightData = (progressData: ProgressItem[]) => {
  const weightGoal = progressData.find(goal => goal.goalType === 'weight_management');
  return weightGoal ? {
    current: weightGoal.current,
    target: weightGoal.target,
    unit: weightGoal.unit,
    trend: weightGoal.current < weightGoal.target ? 'down' : weightGoal.current > weightGoal.target ? 'up' : 'stable'
  } : null;
};

// Calculate BMI
const calculateBMI = (weight: number, height: number = 1.75): number => {
  // Default height of 1.75m if not provided - in a real app this would come from user profile
  return Math.round((weight / (height * height)) * 10) / 10;
};

// Get BMI status
const getBMIStatus = (bmi: number): { label: string; color: string } => {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-600 bg-blue-50" };
  if (bmi < 25) return { label: "Normal", color: "text-green-600 bg-green-50" };
  if (bmi < 30) return { label: "Overweight", color: "text-orange-600 bg-orange-50" };
  return { label: "Obese", color: "text-red-600 bg-red-50" };
};

export function BodyCompositionSection({ progressData, bodyMeasurements = [] }: BodyCompositionSectionProps) {
  const isMobile = useIsMobile();
  const latestMeasurements = getLatestMeasurements(bodyMeasurements);
  const weightData = getWeightData(progressData);
  
  // Calculate body composition
  const bodyComposition = latestMeasurements ? calculateBodyComposition(latestMeasurements) : null;
  
  // Default or calculated values
  const currentWeight = weightData?.current || 70;
  const bmi = calculateBMI(currentWeight);
  const bmiStatus = getBMIStatus(bmi);
  
  // Body composition data for pie chart
  const compositionData = [
    { name: "Muscle", value: 35, color: "#8b5cf6" },
    { name: "Fat", value: bodyComposition?.bodyFatPercentage || 18, color: "#f97316" },
    { name: "Water", value: 40, color: "#0ea5e9" },
    { name: "Other", value: 7, color: "#64748b" }
  ];

  // Normalize data to 100%
  const total = compositionData.reduce((sum, item) => sum + item.value, 0);
  const normalizedData = compositionData.map(item => ({
    ...item,
    value: Math.round((item.value / total) * 100)
  }));

  const renderTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3 text-green-500" />;
    return <Minus className="h-3 w-3 text-gray-500" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      {/* Body Composition Chart */}
      <Card className="lg:col-span-1 shadow-sm hover:shadow-md transition-all bg-white border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
            <User className="h-5 w-5 text-purple-600" />
            Body Composition
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex justify-center h-32 mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={normalizedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {normalizedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 shadow-lg border rounded text-xs">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm">{data.value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-1 text-xs">
            {normalizedData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-600">{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weight & BMI */}
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

      {/* Measurements Status */}
      <Card className="shadow-sm hover:shadow-md transition-all bg-white border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
            <Activity className="h-5 w-5 text-green-600" />
            Measurements
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          {latestMeasurements ? (
            <>
              <div className="text-xs text-slate-600 mb-2">
                Last updated: {new Date(latestMeasurements.date).toLocaleDateString()}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                {latestMeasurements.waist && (
                  <div>
                    <span className="text-slate-600">Waist:</span>
                    <span className="ml-1 font-medium">{latestMeasurements.waist}cm</span>
                  </div>
                )}
                {latestMeasurements.hips && (
                  <div>
                    <span className="text-slate-600">Hips:</span>
                    <span className="ml-1 font-medium">{latestMeasurements.hips}cm</span>
                  </div>
                )}
                {latestMeasurements.arms && (
                  <div>
                    <span className="text-slate-600">Arms:</span>
                    <span className="ml-1 font-medium">{latestMeasurements.arms}cm</span>
                  </div>
                )}
                {latestMeasurements.thighs && (
                  <div>
                    <span className="text-slate-600">Thighs:</span>
                    <span className="ml-1 font-medium">{latestMeasurements.thighs}cm</span>
                  </div>
                )}
              </div>
              
              <Badge className="text-xs px-2 py-1 bg-green-50 text-green-600 border-0">
                Source: {latestMeasurements.source === 'manual' ? 'Manual' : 
                         latestMeasurements.source === 'googleFit' ? 'Google Fit' : 'Apple Health'}
              </Badge>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-xs text-slate-500 mb-2">No measurements recorded</p>
              <p className="text-xs text-slate-400">
                Add body measurements to track your progress
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
