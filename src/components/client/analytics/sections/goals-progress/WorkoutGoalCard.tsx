import React from "react";
import { Dumbbell } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";

interface WorkoutGoalCardProps {
  workoutGoal: ProgressItem;
}

export function WorkoutGoalCard({ workoutGoal }: WorkoutGoalCardProps) {
  const isActivityGoal = workoutGoal.goalType === 'activity_level';
  
  // Raccomandazione annuale per uno stile di vita sano (10k passi/giorno)
  const RECOMMENDED_ANNUAL_STEPS = 3650000;
  
  // Determina il target annuale da usare
  let annualTarget = workoutGoal.target;
  if (isActivityGoal && workoutGoal.unit === 'steps') {
    if (!annualTarget || annualTarget < 1000000) {
      annualTarget = RECOMMENDED_ANNUAL_STEPS;
    }
  }
  
  // Calcola il mese corrente e target mensile per activity goals annuali
  let currentMonthTarget = annualTarget;
  let currentMonthProgress = workoutGoal.progress;
  let monthLabel = '';
  
  // Rileva se è un goal annuale basandosi sul target (>= 1M steps = annuale)
  const isAnnualStepGoal = isActivityGoal && workoutGoal.unit === 'steps' && annualTarget >= 1000000;
  
  if (isAnnualStepGoal) {
    const now = new Date();
    const startDate = new Date(workoutGoal.createdAt || now);
    
    // Calcola quanti mesi sono passati dall'inizio del goal
    const monthsElapsed = Math.floor(
      (now.getTime() - startDate.getTime()) / (30.44 * 24 * 60 * 60 * 1000)
    );
    const currentMonth = Math.min(Math.max(0, monthsElapsed), 11); // 0-11 (12 mesi)
    
    // Target cumulativo per il mese corrente (ogni mese è 1/12 del target annuale)
    currentMonthTarget = Math.round((annualTarget / 12) * (currentMonth + 1));
    
    // Calcola progresso rispetto al target mensile corrente
    currentMonthProgress = Math.min(100, Math.round((workoutGoal.current / currentMonthTarget) * 100));
    
    // Label del mese (es: "Month 3 of 12")
    monthLabel = `Month ${currentMonth + 1} of 12`;
  }
  
  return (
    <div className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3 gap-4">
        <div className="flex items-center space-x-2 flex-1 max-w-[65%]">
          <div className="bg-teal-500 rounded-md p-1.5">
            <Dumbbell className="h-4 w-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">
              {isActivityGoal && isAnnualStepGoal ? 'Monthly Step Target' : isActivityGoal ? 'Activity Goal' : 'Strength Goal'}
            </h4>
            <p className="text-xs text-muted-foreground">
              {isActivityGoal && isAnnualStepGoal ? 'Based on your annual healthy steps goal' : workoutGoal.goal}
            </p>
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
        
        <Progress 
          value={isActivityGoal && isAnnualStepGoal ? currentMonthProgress : workoutGoal.progress} 
          className="h-2" 
        />
        
        <div className="text-center">
          <span className="text-xs font-medium text-teal-700">
            {Math.max(0, currentMonthTarget - workoutGoal.current).toLocaleString()} {workoutGoal.unit} {isActivityGoal && monthLabel ? 'remaining this month' : 'remaining'}
          </span>
        </div>
      </div>
    </div>
  );
}