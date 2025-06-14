import React from "react";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";

interface WeightGoalCardProps {
  weightGoal: ProgressItem;
}

export function WeightGoalCard({ weightGoal }: WeightGoalCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 rounded-lg p-2">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Weight Goal</h4>
            <p className="text-xs text-slate-600">Target progress</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{weightGoal.progress}%</div>
          <div className="text-xs text-slate-500">Complete</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Current: <span className="font-medium text-slate-800">{weightGoal.current}{weightGoal.unit}</span></span>
          <span className="text-slate-600">Target: <span className="font-medium text-slate-800">{weightGoal.target}{weightGoal.unit}</span></span>
        </div>
        
        <Progress value={weightGoal.progress} className="h-2 bg-blue-100" />
        
        <div className="text-center">
          <span className="text-sm font-medium text-blue-700">
            {Math.abs(weightGoal.target - weightGoal.current)}{weightGoal.unit} {weightGoal.current > weightGoal.target ? 'to lose' : 'to gain'}
          </span>
        </div>
      </div>
    </div>
  );
}