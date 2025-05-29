// Utility functions for calculating real client performance metrics

export interface ClientData {
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

// Calculate progress toward weight target for a specific date
export function calculateProgressMetricForDate(client: ClientData, targetDate: Date): number {
  const { height, age, bodyMeasurements, targetWeight } = client;
  
  if (bodyMeasurements.length < 1) return 0;
  
  // Get measurements up to the target date
  const relevantMeasurements = bodyMeasurements
    .filter(m => m.date <= targetDate)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
    
  if (relevantMeasurements.length === 0) return 0;
  
  const firstMeasurement = relevantMeasurements[0];
  const latestMeasurement = relevantMeasurements[relevantMeasurements.length - 1];
  
  if (targetWeight) {
    // Calculate progress toward specific target weight
    const startWeight = firstMeasurement.weight;
    const currentWeight = latestMeasurement.weight;
    const targetWeightValue = targetWeight;
    
    const totalWeightToLose = Math.abs(startWeight - targetWeightValue);
    const weightLostSoFar = Math.abs(startWeight - currentWeight);
    
    if (totalWeightToLose === 0) return 100;
    
    // For weight loss goals
    if (startWeight > targetWeightValue) {
      return Math.min(100, Math.round((weightLostSoFar / totalWeightToLose) * 100));
    }
    // For weight gain goals
    else if (startWeight < targetWeightValue) {
      return Math.min(100, Math.round((weightLostSoFar / totalWeightToLose) * 100));
    }
  }
  
  // Fallback to BMI improvement
  const idealRange = getIdealWeightRange(height, age);
  const idealWeight = (idealRange.min + idealRange.max) / 2;
  const startWeight = firstMeasurement.weight;
  const currentWeight = latestMeasurement.weight;
  
  const totalWeightToLose = Math.abs(startWeight - idealWeight);
  const weightLostSoFar = Math.abs(startWeight - currentWeight);
  
  if (totalWeightToLose === 0) return 100;
  
  return Math.min(100, Math.round((weightLostSoFar / totalWeightToLose) * 100));
}

// Calculate progress based on weight/BMI improvement
export function calculateProgressMetric(client: ClientData): number {
  return calculateProgressMetricForDate(client, new Date());
}

// Calculate goals reached percentage for a specific date
export function calculateGoalsReachedForDate(goals: ClientData['goals'], targetDate: Date): number {
  if (goals.length === 0) return 0;
  
  // Only consider goals that were created before or on the target date
  const relevantGoals = goals.filter(goal => goal.createdAt <= targetDate);
  
  if (relevantGoals.length === 0) return 0;
  
  let totalProgress = 0;
  
  relevantGoals.forEach(goal => {
    // Calculate time-based progress
    const goalDuration = goal.deadline.getTime() - goal.createdAt.getTime();
    const timeElapsed = Math.min(targetDate.getTime() - goal.createdAt.getTime(), goalDuration);
    const timeProgress = Math.max(0, timeElapsed / goalDuration);
    
    // Calculate actual progress
    const actualProgress = Math.min(1, goal.current / goal.target);
    
    // Combine time and actual progress (weighted average)
    // If ahead of schedule, give full credit. If behind, scale down.
    const combinedProgress = Math.min(1, actualProgress / Math.max(0.1, timeProgress)) * timeProgress;
    
    totalProgress += combinedProgress;
  });
  
  return Math.round((totalProgress / relevantGoals.length) * 100);
}

// Calculate goals reached percentage
export function calculateGoalsReached(goals: ClientData['goals']): number {
  return calculateGoalsReachedForDate(goals, new Date());
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
    
    // Filter sessions for this week
    const weekSessions = client.sessions.filter(session => 
      session.date >= weekStart && session.date <= weekEnd
    );
    
    // Calculate metrics for this specific week endpoint
    const attendance = calculateAttendance(weekSessions);
    
    // Calculate cumulative progress up to this week
    const progress = calculateProgressMetricForDate(client, weekEnd);
    
    // Calculate goals progress up to this week
    const goalsReached = calculateGoalsReachedForDate(client.goals, weekEnd);
    
    data.push({
      name: `Week ${weeks - i}`,
      attendance: attendance || 0,
      progress: progress || 0,
      goalsReached: goalsReached || 0
    });
  }
  
  return data;
}

// Calculate client retention data based on session history
export function calculateClientRetentionData(clients: ClientData[]): Array<{
  name: string;
  value: number;
  color: string;
}> {
  if (clients.length === 0) {
    return [
      { name: 'No Data', value: 100, color: '#e5e7eb' }
    ];
  }

  const now = new Date();
  const retentionCategories = {
    '1-3 months': { count: 0, color: '#FF8042' },
    '3-6 months': { count: 0, color: '#FFBB28' },
    '6-12 months': { count: 0, color: '#00C49F' },
    '1+ year': { count: 0, color: '#0088FE' }
  };

  clients.forEach(client => {
    if (client.sessions.length === 0) return;

    // Find first and last session dates
    const sessionDates = client.sessions
      .filter(s => s.completed)
      .map(s => s.date)
      .sort((a, b) => a.getTime() - b.getTime());

    if (sessionDates.length === 0) return;

    const firstSession = sessionDates[0];
    const lastSession = sessionDates[sessionDates.length - 1];
    
    // Calculate how long they've been active (from first to last session)
    const durationMs = lastSession.getTime() - firstSession.getTime();
    const durationMonths = durationMs / (1000 * 60 * 60 * 24 * 30);

    // Categorize based on duration
    if (durationMonths <= 3) {
      retentionCategories['1-3 months'].count++;
    } else if (durationMonths <= 6) {
      retentionCategories['3-6 months'].count++;
    } else if (durationMonths <= 12) {
      retentionCategories['6-12 months'].count++;
    } else {
      retentionCategories['1+ year'].count++;
    }
  });

  const totalClients = clients.length;
  
  return Object.entries(retentionCategories).map(([name, data]) => ({
    name,
    value: totalClients > 0 ? Math.round((data.count / totalClients) * 100) : 0,
    color: data.color
  })).filter(item => item.value > 0);
}

// Calculate goal achievement data by goal type
export function calculateGoalAchievementData(clients: ClientData[]): Array<{
  name: string;
  achieved: number;
  total: number;
}> {
  if (clients.length === 0) {
    return [
      { name: 'No Goals', achieved: 0, total: 100 }
    ];
  }

  const goalTypes = {
    'Weight Loss': { achieved: 0, total: 0 },
    'Strength': { achieved: 0, total: 0 },
    'Endurance': { achieved: 0, total: 0 },
    'Flexibility': { achieved: 0, total: 0 }
  };

  clients.forEach(client => {
    client.goals.forEach(goal => {
      let categoryName = '';
      
      switch (goal.type) {
        case 'weight':
          categoryName = 'Weight Loss';
          break;
        case 'strength':
          categoryName = 'Strength';
          break;
        case 'endurance':
          categoryName = 'Endurance';
          break;
        case 'flexibility':
          categoryName = 'Flexibility';
          break;
        default:
          return;
      }

      goalTypes[categoryName].total++;
      
      // Calculate if goal is achieved (current >= target)
      const progressPercentage = (goal.current / goal.target) * 100;
      if (progressPercentage >= 80) { // Consider 80%+ as achieved
        goalTypes[categoryName].achieved++;
      }
    });
  });

  return Object.entries(goalTypes)
    .filter(([_, data]) => data.total > 0)
    .map(([name, data]) => ({
      name,
      achieved: Math.round((data.achieved / data.total) * 100),
      total: 100
    }));
}

// Calculate retention for a single client
export function calculateSingleClientRetention(client: ClientData): Array<{
  name: string;
  value: number;
  color: string;
}> {
  if (client.sessions.length === 0) {
    return [{ name: 'No Sessions', value: 100, color: '#e5e7eb' }];
  }

  const completedSessions = client.sessions.filter(s => s.completed);
  const scheduledSessions = client.sessions.filter(s => s.scheduled);
  
  if (scheduledSessions.length === 0) {
    return [{ name: 'No Scheduled Sessions', value: 100, color: '#e5e7eb' }];
  }

  const attendanceRate = (completedSessions.length / scheduledSessions.length) * 100;
  const missedRate = 100 - attendanceRate;

  return [
    { name: 'Attended', value: Math.round(attendanceRate), color: '#00C49F' },
    { name: 'Missed', value: Math.round(missedRate), color: '#FF8042' }
  ].filter(item => item.value > 0);
}

// Calculate goal achievement for a single client
export function calculateSingleClientGoals(client: ClientData): Array<{
  name: string;
  achieved: number;
  total: number;
}> {
  if (client.goals.length === 0) {
    return [{ name: 'No Goals Set', achieved: 0, total: 100 }];
  }

  const goalTypes = {
    'Weight Loss': { achieved: 0, total: 0 },
    'Strength': { achieved: 0, total: 0 },
    'Endurance': { achieved: 0, total: 0 },
    'Flexibility': { achieved: 0, total: 0 }
  };

  client.goals.forEach(goal => {
    let categoryName = '';
    
    switch (goal.type) {
      case 'weight':
        categoryName = 'Weight Loss';
        break;
      case 'strength':
        categoryName = 'Strength';
        break;
      case 'endurance':
        categoryName = 'Endurance';
        break;
      case 'flexibility':
        categoryName = 'Flexibility';
        break;
      default:
        return;
    }

    goalTypes[categoryName].total++;
    
    const progressPercentage = (goal.current / goal.target) * 100;
    if (progressPercentage >= 80) {
      goalTypes[categoryName].achieved++;
    }
  });

  return Object.entries(goalTypes)
    .filter(([_, data]) => data.total > 0)
    .map(([name, data]) => ({
      name,
      achieved: Math.round((data.achieved / data.total) * 100),
      total: 100
    }));
}
