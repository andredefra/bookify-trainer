import React from "react";
import { Dumbbell } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";

interface WorkoutGoalCardProps {
  workoutGoal: ProgressItem;
}

export function WorkoutGoalCard({ workoutGoal }: WorkoutGoalCardProps) {
  return (
    <div className="bg-teal-50 p-4 rounded-lg min-w-0">
      <div className="flex flex-col gap-2 mb-2.5">
        <div className="flex items-center">
          <Dumbbell className="h-4 w-4 mr-2 text-teal-600 flex-shrink-0" />
          <span className="text-sm font-medium text-teal-800 truncate">
            {workoutGoal.goalType === 'activity_level' ? 'Activity Goal' : 'Strength Goal'}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
          <span className="text-xs bg-teal-200 text-teal-800 px-2 py-0.5 rounded whitespace-nowrap">
            Current: {workoutGoal.current}{workoutGoal.unit}
          </span>
          <span className="text-xs bg-teal-300 text-teal-900 px-2 py-0.5 rounded whitespace-nowrap">
            Target: {workoutGoal.target}{workoutGoal.unit}
          </span>
        </div>
      </div>
      <div className="mb-2 flex items-center">
        <Progress value={workoutGoal.progress} className="h-2.5 flex-grow bg-teal-200" 
          style={{ 
            "--theme-primary": "rgb(20 184 166)",
          } as React.CSSProperties} 
        />
        <span className="ml-2 text-xs font-semibold text-teal-800 w-12 text-right flex-shrink-0">{workoutGoal.progress}%</span>
      </div>
      <p className="text-xs text-teal-700">
        {workoutGoal.target - workoutGoal.current} {workoutGoal.unit} remaining
      </p>
    </div>
  );
}