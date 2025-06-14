import React from "react";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";

interface WeightGoalCardProps {
  weightGoal: ProgressItem;
}

export function WeightGoalCard({ weightGoal }: WeightGoalCardProps) {
  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-500 rounded-md p-1.5">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">Weight Goal</h4>
            <p className="text-xs text-muted-foreground">Target progress</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-blue-600">{weightGoal.progress}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Current: <span className="font-medium text-foreground">{weightGoal.current}{weightGoal.unit}</span></span>
          <span className="text-muted-foreground">Target: <span className="font-medium text-foreground">{weightGoal.target}{weightGoal.unit}</span></span>
        </div>
        
        <Progress value={weightGoal.progress} className="h-2" />
        
        <div className="text-center">
          <span className="text-xs font-medium text-blue-700">
            {Math.abs(weightGoal.target - weightGoal.current)}{weightGoal.unit} {weightGoal.current > weightGoal.target ? 'to lose' : 'to gain'}
          </span>
        </div>
      </div>
    </div>
  );
}