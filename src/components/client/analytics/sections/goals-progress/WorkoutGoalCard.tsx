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
    <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="bg-teal-500 rounded-md p-1.5">
            <Dumbbell className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">
              {isActivityGoal ? 'Activity Goal' : 'Strength Goal'}
            </h4>
            <p className="text-xs text-muted-foreground truncate">{workoutGoal.goal}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-teal-600">{workoutGoal.progress}%</div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Current: <span className="font-medium text-foreground">{workoutGoal.current}{workoutGoal.unit}</span></span>
          <span className="text-muted-foreground">Target: <span className="font-medium text-foreground">{workoutGoal.target}{workoutGoal.unit}</span></span>
        </div>
        
        <Progress value={workoutGoal.progress} className="h-2" />
        
        <div className="text-center">
          <span className="text-xs font-medium text-teal-700">
            {workoutGoal.target - workoutGoal.current} {workoutGoal.unit} remaining
          </span>
        </div>
      </div>
    </div>
  );
}