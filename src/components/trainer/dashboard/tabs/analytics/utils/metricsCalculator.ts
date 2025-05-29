
// Utility functions for calculating real client performance metrics

interface ClientData {
  id: string;
  name: string;
  age: number;
  height: number; // in cm
  currentWeight: number; // in kg
  targetWeight?: number;
  goals: Array<{
    id: string;
    target: number;
    current: number;
    type: 'weight' | 'strength' | 'endurance' | 'flexibility';
    deadline: Date;
    createdAt: Date;
  }>;
  sessions: Array<{
    date: Date;
    completed: boolean;
    scheduled: boolean;
  }>;
  bodyMeasurements: Array<{
    date: Date;
    weight: number;
    bodyFat?: number;
  }>;
}

// Calculate BMI
export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// Calculate ideal weight range based on age and height
export function getIdealWeightRange(height: number, age: number): { min: number; max: number } {
  const heightInMeters = height / 100;
  const baseMin = 18.5 * (heightInMeters * heightInMeters);
  const baseMax = 24.9 * (heightInMeters * heightInMeters);
  
  // Adjust for age (older adults can have slightly higher BMI)
  const ageAdjustment = age > 65 ? 0.05 : 0;
  
  return {
    min: baseMin,
    max: baseMax + (baseMax * ageAdjustment)
  };
}

// Calculate attendance percentage
export function calculateAttendance(sessions: ClientData['sessions']): number {
  if (sessions.length === 0) return 0;
  
  const scheduledSessions = sessions.filter(s => s.scheduled);
  const completedSessions = sessions.filter(s => s.completed);
  
  if (scheduledSessions.length === 0) return 0;
  
  return Math.round((completedSessions.length / scheduledSessions.length) * 100);
}

// Calculate progress based on weight/BMI improvement
export function calculateProgressMetric(client: ClientData): number {
  const { height, age, bodyMeasurements, targetWeight } = client;
  
  if (bodyMeasurements.length < 2) return 0;
  
  // Sort measurements by date
  const sortedMeasurements = bodyMeasurements.sort((a, b) => a.date.getTime() - b.date.getTime());
  const firstMeasurement = sortedMeasurements[0];
  const latestMeasurement = sortedMeasurements[sortedMeasurements.length - 1];
  
  const idealRange = getIdealWeightRange(height, age);
  const startBMI = calculateBMI(firstMeasurement.weight, height);
  const currentBMI = calculateBMI(latestMeasurement.weight, height);
  
  // Calculate progress toward ideal BMI range
  let progress = 0;
  
  if (targetWeight) {
    const targetBMI = calculateBMI(targetWeight, height);
    const totalChange = Math.abs(startBMI - targetBMI);
    const currentChange = Math.abs(startBMI - currentBMI);
    
    if (totalChange > 0) {
      progress = Math.min(100, (currentChange / totalChange) * 100);
    }
  } else {
    // Use ideal BMI range as target
    const idealBMI = (idealRange.min + idealRange.max) / 2;
    const totalChange = Math.abs(startBMI - idealBMI);
    const currentChange = Math.abs(startBMI - currentBMI);
    
    if (totalChange > 0) {
      progress = Math.min(100, (currentChange / totalChange) * 100);
    }
  }
  
  return Math.round(progress);
}

// Calculate goals reached percentage
export function calculateGoalsReached(goals: ClientData['goals']): number {
  if (goals.length === 0) return 0;
  
  const now = new Date();
  const activeGoals = goals.filter(goal => goal.deadline > now || 
    (goal.deadline <= now && goal.current >= goal.target));
  
  let reachedGoals = 0;
  
  activeGoals.forEach(goal => {
    const progressPercentage = (goal.current / goal.target) * 100;
    
    // Consider a goal "reached" if progress is >= 90%
    if (progressPercentage >= 90) {
      reachedGoals++;
    }
  });
  
  return Math.round((reachedGoals / activeGoals.length) * 100);
}

// Generate weekly performance data for a client
export function generateClientPerformanceData(client: ClientData, weeks: number = 6): Array<{
  name: string;
  attendance: number;
  progress: number;
  goalsReached: number;
}> {
  const data = [];
  const now = new Date();
  
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (i * 7));
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    // Filter data for this week
    const weekSessions = client.sessions.filter(session => 
      session.date >= weekStart && session.date <= weekEnd
    );
    
    const weekMeasurements = client.bodyMeasurements.filter(measurement => 
      measurement.date >= weekStart && measurement.date <= weekEnd
    );
    
    // Calculate metrics for this week
    const attendance = calculateAttendance(weekSessions);
    
    // For progress, use cumulative data up to this week
    const cumulativeMeasurements = client.bodyMeasurements.filter(measurement => 
      measurement.date <= weekEnd
    );
    const clientDataForWeek = { ...client, bodyMeasurements: cumulativeMeasurements };
    const progress = calculateProgressMetric(clientDataForWeek);
    
    const goalsReached = calculateGoalsReached(client.goals);
    
    data.push({
      name: `Week ${weeks - i}`,
      attendance,
      progress,
      goalsReached
    });
  }
  
  return data;
}
