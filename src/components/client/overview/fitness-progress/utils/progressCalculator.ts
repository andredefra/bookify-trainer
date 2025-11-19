
import { ProgressItem, GoalLog } from "../types";

export interface ProgressCalculation {
  currentProgress: number;
  timeProgress: number;
  isOnTrack: boolean;
  daysRemaining: number;
  projectedCompletion: number;
  nextMilestone?: {
    value: number;
    date: string;
  };
}

export function calculateProgressWithTimeline(goal: ProgressItem): ProgressCalculation {
  const now = new Date();
  const startDate = new Date(goal.createdAt || now);
  const targetDate = new Date(goal.targetDate);
  
  // Calcolo tempo trascorso vs tempo totale
  const totalDuration = targetDate.getTime() - startDate.getTime();
  const timeElapsed = now.getTime() - startDate.getTime();
  const timeProgress = Math.min(100, Math.max(0, (timeElapsed / totalDuration) * 100));
  
  // Calcolo progresso attuale
  const currentProgress = Math.min(100, Math.max(0, (goal.current / goal.target) * 100));
  
  // Determina se è in linea con i tempi
  const isOnTrack = currentProgress >= timeProgress * 0.8; // Tolleranza del 20%
  
  // Giorni rimanenti
  const daysRemaining = Math.max(0, Math.ceil((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Proiezione completamento basata sul trend
  let projectedCompletion = 100;
  if (goal.logs && goal.logs.length > 1) {
    const recentLogs = goal.logs.slice(-5); // Ultimi 5 log
    const trend = calculateTrend(recentLogs);
    const remainingValue = goal.target - goal.current;
    const daysToComplete = trend > 0 ? remainingValue / trend : Infinity;
    projectedCompletion = daysToComplete <= daysRemaining ? 100 : (goal.current / goal.target) * 100;
  }
  
  return {
    currentProgress,
    timeProgress,
    isOnTrack,
    daysRemaining,
    projectedCompletion
  };
}

export function calculateTrend(logs: GoalLog[]): number {
  if (logs.length < 2) return 0;
  
  // Calcola trend medio basato sugli ultimi log
  let totalChange = 0;
  let totalDays = 0;
  
  for (let i = 1; i < logs.length; i++) {
    const prevLog = logs[i - 1];
    const currentLog = logs[i];
    const daysDiff = (new Date(currentLog.date).getTime() - new Date(prevLog.date).getTime()) / (1000 * 60 * 60 * 24);
    const valueChange = currentLog.value - prevLog.value;
    
    if (daysDiff > 0) {
      totalChange += valueChange;
      totalDays += daysDiff;
    }
  }
  
  return totalDays > 0 ? totalChange / totalDays : 0;
}

export function generateMilestones(goal: ProgressItem): Array<{value: number; date: string}> {
  const startDate = new Date(goal.createdAt || new Date());
  const targetDate = new Date(goal.targetDate);
  const totalDuration = targetDate.getTime() - startDate.getTime();
  
  // Per activity_level, genera milestone mensili
  if (goal.goalType === 'activity_level' && goal.unit === 'steps') {
    const milestones = [];
    const yearInMs = 365 * 24 * 60 * 60 * 1000;
    
    // Se il goal dura circa un anno, crea 12 milestone mensili
    if (totalDuration >= yearInMs * 0.9 && totalDuration <= yearInMs * 1.1) {
      for (let month = 1; month <= 12; month++) {
        const milestoneDate = new Date(startDate);
        milestoneDate.setMonth(startDate.getMonth() + month);
        
        // Target mensile cumulativo: goal annuale / 12 * mese corrente
        const monthlyTarget = Math.round((goal.target / 12) * month);
        
        milestones.push({
          value: monthlyTarget,
          date: milestoneDate.toISOString().split('T')[0]
        });
      }
      return milestones;
    }
  }
  
  // Fallback: milestone percentuali per altri tipi di goal
  const milestones = [];
  const milestoneCount = 4; // 25%, 50%, 75%, 100%
  
  for (let i = 1; i <= milestoneCount; i++) {
    const percentage = (i / milestoneCount);
    const milestoneDate = new Date(startDate.getTime() + (totalDuration * percentage));
    const milestoneValue = goal.target * percentage;
    
    milestones.push({
      value: Math.round(milestoneValue * 10) / 10,
      date: milestoneDate.toISOString().split('T')[0]
    });
  }
  
  return milestones;
}

export function getStrengthProgressFromWorkouts(exerciseId: string, workoutLogs: any[]): number {
  // Trova l'ultimo peso registrato per l'esercizio specifico
  const exerciseLogs = workoutLogs
    .flatMap(workout => workout.exercises || [])
    .filter(exercise => exercise.id === exerciseId || exercise.name.toLowerCase().includes(exerciseId.toLowerCase()))
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
  
  return exerciseLogs.length > 0 ? exerciseLogs[0].weight || 0 : 0;
}
