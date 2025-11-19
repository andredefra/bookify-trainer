import React from "react";
import { Dumbbell } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";

interface WorkoutGoalCardProps {
  workoutGoal: ProgressItem;
}

export function WorkoutGoalCard({ workoutGoal }: WorkoutGoalCardProps) {
  const isActivityGoal = workoutGoal.goalType === 'activity_level';
  
  // Calcola il mese corrente e target mensile per activity goals annuali
  let currentMonthTarget = workoutGoal.target;
  let currentMonthProgress = workoutGoal.progress;
  let monthLabel = '';
  
  // Rileva se è un goal annuale basandosi sul target (>= 1M steps = annuale)
  const isAnnualStepGoal = isActivityGoal && workoutGoal.unit === 'steps' && workoutGoal.target >= 1000000;
  
  if (isAnnualStepGoal) {
    const now = new Date();
    const startDate = new Date(workoutGoal.createdAt || now);
    
    // Calcola quanti mesi sono passati dall'inizio del goal
    const monthsElapsed = Math.floor(
      (now.getTime() - startDate.getTime()) / (30.44 * 24 * 60 * 60 * 1000)
    );
    const currentMonth = Math.min(Math.max(0, monthsElapsed), 11); // 0-11 (12 mesi)
    
    // Target cumulativo per il mese corrente (ogni mese è 1/12 del target annuale)
    currentMonthTarget = Math.round((workoutGoal.target / 12) * (currentMonth + 1));
    
    // Calcola progresso rispetto al target mensile corrente
    currentMonthProgress = Math.min(100, Math.round((workoutGoal.current / currentMonthTarget) * 100));
    
    // Label del mese (es: "Month 3 of 12")
    monthLabel = `Month ${currentMonth + 1} of 12`;
  }
  
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
          <div className="text-xl font-bold text-teal-600">{currentMonthProgress}%</div>
          <div className="text-xs text-muted-foreground">
            {isActivityGoal && monthLabel ? monthLabel : 'Complete'}
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Current: <span className="font-medium text-foreground">{workoutGoal.current.toLocaleString()}{workoutGoal.unit}</span></span>
          <span className="text-muted-foreground">{isActivityGoal && monthLabel ? 'Month Target' : 'Target'}: <span className="font-medium text-foreground">{currentMonthTarget.toLocaleString()}{workoutGoal.unit}</span></span>
        </div>
        
        <Progress value={workoutGoal.progress} className="h-2" />
        
        <div className="text-center">
          <span className="text-xs font-medium text-teal-700">
            {Math.max(0, currentMonthTarget - workoutGoal.current).toLocaleString()} {workoutGoal.unit} {isActivityGoal && monthLabel ? 'remaining this month' : 'remaining'}
          </span>
        </div>
      </div>
    </div>
  );
}