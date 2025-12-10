import { ProgressItem, BodyMeasurements } from "@/components/client/overview/fitness-progress/types";
import { ClientData } from "./metricsCalculator";
import { ExtendedBodyMeasurement } from "../data/clientMockData";

// Convert trainer client data goals to client ProgressItem format
export function convertGoalsToProgressItems(client: ClientData): ProgressItem[] {
  const progressItems: ProgressItem[] = [];
  
  for (const goal of client.goals) {
    const progress = calculateGoalProgress(goal.current, goal.target, goal.type);
    
    let goalName = '';
    let unit = '';
    
    switch (goal.type) {
      case 'weight_management':
        goalName = 'Weight Goal';
        unit = 'kg';
        break;
      case 'strength_progress':
        goalName = 'Strength Progress';
        unit = 'kg';
        break;
      case 'activity_level':
        goalName = 'Annual Step Goal';
        unit = 'steps';
        break;
      case 'cardiovascular_endurance':
        goalName = 'Cardio Endurance';
        unit = 'km';
        break;
      case 'body_composition':
        goalName = 'Body Fat Target';
        unit = '%';
        break;
      default:
        goalName = (goal.type as string).replace(/_/g, ' ');
        unit = '';
    }
    
    progressItems.push({
      id: goal.id,
      goal: goalName,
      current: goal.current,
      target: goal.target,
      unit,
      progress,
      goalType: goal.type,
      targetDate: goal.deadline.toISOString().split('T')[0],
      createdAt: goal.createdAt.toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      source: 'trainer'
    });
  }
  
  return progressItems;
}

// Calculate goal progress percentage
function calculateGoalProgress(current: number, target: number, type: string): number {
  // For weight loss goals, lower is better
  if (type === 'weight_management' || type === 'body_composition') {
    if (current <= target) return 100;
    // Assume starting point was 20% higher than target for progress calculation
    const estimatedStart = target * 1.2;
    const totalToLose = estimatedStart - target;
    const lost = estimatedStart - current;
    return Math.min(100, Math.max(0, Math.round((lost / totalToLose) * 100)));
  }
  
  // For other goals, higher is better
  return Math.min(100, Math.round((current / target) * 100));
}

// Convert trainer body measurements to client BodyMeasurements format
export function convertBodyMeasurements(
  measurements: ExtendedBodyMeasurement[],
  clientHeight: number,
  clientGender: 'male' | 'female'
): BodyMeasurements[] {
  return measurements.map(m => ({
    id: `m-${m.date.getTime()}`,
    date: m.date.toISOString().split('T')[0],
    weight: m.weight,
    waist: m.waist,
    hips: m.hips,
    arms: m.arms,
    neck: m.neck,
    thighs: m.thighs,
    shoulders: m.shoulders,
    bodyFatPercentage: m.bodyFat,
    source: 'manual' as const
  }));
}

// Get weight data for weight goal card
export function getWeightData(client: ClientData) {
  const weightGoal = client.goals.find(g => g.type === 'weight_management');
  const latestMeasurement = client.bodyMeasurements[client.bodyMeasurements.length - 1];
  const previousMeasurement = client.bodyMeasurements.length > 1 
    ? client.bodyMeasurements[client.bodyMeasurements.length - 2] 
    : null;
  
  let trend = 'stable';
  if (previousMeasurement) {
    if (latestMeasurement.weight < previousMeasurement.weight) trend = 'down';
    else if (latestMeasurement.weight > previousMeasurement.weight) trend = 'up';
  }
  
  return {
    current: latestMeasurement?.weight || client.currentWeight,
    target: weightGoal?.target || client.targetWeight,
    unit: 'kg',
    trend
  };
}

// Calculate BMI
export function calculateBMI(weight: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return parseFloat((weight / (heightM * heightM)).toFixed(1));
}

// Get BMI status
export function getBMIStatus(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: 'Underweight', color: 'bg-yellow-100 text-yellow-800' };
  if (bmi < 25) return { label: 'Normal', color: 'bg-green-100 text-green-800' };
  if (bmi < 30) return { label: 'Overweight', color: 'bg-orange-100 text-orange-800' };
  return { label: 'Obese', color: 'bg-red-100 text-red-800' };
}

// Get body fat status
export function getBodyFatStatus(
  bodyFat: number, 
  gender: 'male' | 'female'
): { label: string; color: string } {
  if (gender === 'male') {
    if (bodyFat < 6) return { label: 'Essential', color: 'bg-blue-100 text-blue-800' };
    if (bodyFat < 14) return { label: 'Athletic', color: 'bg-green-100 text-green-800' };
    if (bodyFat < 18) return { label: 'Fit', color: 'bg-emerald-100 text-emerald-800' };
    if (bodyFat < 25) return { label: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Above Average', color: 'bg-orange-100 text-orange-800' };
  } else {
    if (bodyFat < 14) return { label: 'Essential', color: 'bg-blue-100 text-blue-800' };
    if (bodyFat < 21) return { label: 'Athletic', color: 'bg-green-100 text-green-800' };
    if (bodyFat < 25) return { label: 'Fit', color: 'bg-emerald-100 text-emerald-800' };
    if (bodyFat < 32) return { label: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Above Average', color: 'bg-orange-100 text-orange-800' };
  }
}

// Check body fat requirements
export function checkBodyFatRequirements(
  measurements: BodyMeasurements | null,
  hasHeight: boolean,
  hasGender: boolean
): { sufficient: boolean; missing: string[] } {
  const missing: string[] = [];
  
  if (!hasHeight) missing.push('height');
  if (!hasGender) missing.push('gender');
  if (!measurements?.waist) missing.push('waist');
  if (!measurements?.neck) missing.push('neck');
  
  return {
    sufficient: missing.length === 0,
    missing
  };
}

// Get historical data for AI context
export function getHistoricalDataSummary(client: ClientData): string {
  const measurements = client.bodyMeasurements as ExtendedBodyMeasurement[];
  if (measurements.length === 0) return 'No historical data available.';
  
  const latest = measurements[measurements.length - 1];
  const oldest = measurements[0];
  const monthsAgo = Math.round((new Date(latest.date).getTime() - new Date(oldest.date).getTime()) / (30.44 * 24 * 60 * 60 * 1000));
  
  const weightChange = latest.weight - oldest.weight;
  const bodyFatChange = latest.bodyFat - oldest.bodyFat;
  const waistChange = latest.waist && oldest.waist ? latest.waist - oldest.waist : null;
  
  let summary = `${client.name} - ${monthsAgo} months of data:\n`;
  summary += `Weight: ${oldest.weight}kg → ${latest.weight}kg (${weightChange > 0 ? '+' : ''}${weightChange.toFixed(1)}kg)\n`;
  summary += `Body Fat: ${oldest.bodyFat}% → ${latest.bodyFat}% (${bodyFatChange > 0 ? '+' : ''}${bodyFatChange.toFixed(1)}%)\n`;
  if (waistChange !== null) {
    summary += `Waist: ${oldest.waist}cm → ${latest.waist}cm (${waistChange > 0 ? '+' : ''}${waistChange.toFixed(1)}cm)\n`;
  }
  
  // Add goal progress
  summary += '\nGoals:\n';
  for (const goal of client.goals) {
    const progress = calculateGoalProgress(goal.current, goal.target, goal.type);
    summary += `- ${goal.type.replace(/_/g, ' ')}: ${progress}% complete (${goal.current}/${goal.target})\n`;
  }
  
  return summary;
}
