import React from "react";
import { Dumbbell } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";

interface WorkoutGoalCardProps {
  workoutGoal: ProgressItem;
}

export function WorkoutGoalCard({ workoutGoal }: WorkoutGoalCardProps) {
  const isActivityGoal = workoutGoal.goalType === 'activity_level';
  
  return (
    <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-teal-500 rounded-lg p-2">
            <Dumbbell className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">
              {isActivityGoal ? 'Activity Goal' : 'Strength Goal'}
            </h4>
            <p className="text-xs text-slate-600">{workoutGoal.goal}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-teal-600">{workoutGoal.progress}%</div>
          <div className="text-xs text-slate-500">Complete</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Current: <span className="font-medium text-slate-800">{workoutGoal.current}{workoutGoal.unit}</span></span>
          <span className="text-slate-600">Target: <span className="font-medium text-slate-800">{workoutGoal.target}{workoutGoal.unit}</span></span>
        </div>
        
        <Progress value={workoutGoal.progress} className="h-2 bg-teal-100" />
        
        <div className="text-center">
          <span className="text-sm font-medium text-teal-700">
            {workoutGoal.target - workoutGoal.current} {workoutGoal.unit} remaining
          </span>
        </div>
      </div>
    </div>
  );
}