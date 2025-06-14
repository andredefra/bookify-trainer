import React from "react";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";

interface WeightGoalCardProps {
  weightGoal: ProgressItem;
}

export function WeightGoalCard({ weightGoal }: WeightGoalCardProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg min-w-0">
      <div className="flex flex-col gap-2 mb-2.5">
        <div className="flex items-center">
          <TrendingUp className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
          <span className="text-sm font-medium text-blue-800 truncate">Weight Goal</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
          <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded whitespace-nowrap">
            Current: {weightGoal.current}{weightGoal.unit}
          </span>
          <span className="text-xs bg-blue-300 text-blue-900 px-2 py-0.5 rounded whitespace-nowrap">
            Target: {weightGoal.target}{weightGoal.unit}
          </span>
        </div>
      </div>
      <div className="mb-2 flex items-center">
        <Progress value={weightGoal.progress} className="h-2.5 flex-grow bg-blue-200" 
          style={{ 
            "--theme-primary": "rgb(37 99 235)",
          } as React.CSSProperties} 
        />
        <span className="ml-2 text-xs font-semibold text-blue-800 w-12 text-right flex-shrink-0">{weightGoal.progress}%</span>
      </div>
      <p className="text-xs text-blue-700">
        {Math.abs(weightGoal.target - weightGoal.current)}{weightGoal.unit} {weightGoal.current > weightGoal.target ? 'to lose' : 'to gain'}
      </p>
    </div>
  );
}