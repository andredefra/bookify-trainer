
import { PerformanceDataPoint, ClientMetrics, RetentionDataPoint, GoalAchievementDataPoint } from '../types';

// Updated ClientData interface to match new goal system
export interface ClientData {
  id: string;
  name: string;
  age: number;
  height: number;
  currentWeight: number;
  targetWeight: number;
  goals: Array<{
    id: string;
    target: number;
    current: number;
    type: 'weight_management' | 'strength_progress' | 'cardiovascular_endurance' | 'flexibility_mobility' | 'body_composition' | 'workout_consistency' | 'activity_level';
    deadline: Date;
    createdAt: Date;
  }>;
  sessions: Array<{
    date: Date;
    scheduled: boolean;
    completed: boolean;
  }>;
  bodyMeasurements: Array<{
    date: Date;
    weight: number;
    bodyFat: number;
  }>;
}

export function generateClientPerformanceData(client: ClientData, weeks: number): PerformanceDataPoint[] {
  const data: PerformanceDataPoint[] = [];
  const now = new Date();
  
  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (i * 7));
    
    // Calculate sessions for this week
    const weekSessions = client.sessions.filter(session => {
      const sessionDate = new Date(session.date);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return sessionDate >= weekStart && sessionDate <= weekEnd;
    });
    
    const scheduledSessions = weekSessions.filter(s => s.scheduled).length;
    const completedSessions = weekSessions.filter(s => s.completed).length;
    const attendance = scheduledSessions > 0 ? (completedSessions / scheduledSessions) * 100 : 0;
    
    // Calculate progress based on goals completion for this period
    const activeGoals = client.goals.filter(goal => 
      goal.createdAt <= weekStart && goal.deadline >= weekStart
    );
    
    let avgProgress = 0;
    let goalsReached = 0;
    
    if (activeGoals.length > 0) {
      activeGoals.forEach(goal => {
        const progress = (goal.current / goal.target) * 100;
        avgProgress += progress;
        if (progress >= 90) goalsReached++;
      });
      avgProgress = avgProgress / activeGoals.length;
      goalsReached = (goalsReached / activeGoals.length) * 100;
    }
    
    data.push({
      name: `Week ${weeks - i}`,
      attendance: Math.round(attendance),
      progress: Math.round(avgProgress),
      goalsReached: Math.round(goalsReached)
    });
  }
  
  return data;
}

export function calculateClientRetentionData(clients: ClientData[]): RetentionDataPoint[] {
  const retentionBuckets = {
    '1-3 months': 0,
    '3-6 months': 0,
    '6-12 months': 0,
    '1+ year': 0
  };
  
  const now = new Date();
  
  clients.forEach(client => {
    if (client.sessions.length > 0) {
      const firstSession = client.sessions.reduce((earliest, session) => 
        session.date < earliest.date ? session : earliest
      );
      
      const daysSinceFirst = (now.getTime() - firstSession.date.getTime()) / (1000 * 60 * 60 * 24);
      
      if (daysSinceFirst <= 90) retentionBuckets['1-3 months']++;
      else if (daysSinceFirst <= 180) retentionBuckets['3-6 months']++;
      else if (daysSinceFirst <= 365) retentionBuckets['6-12 months']++;
      else retentionBuckets['1+ year']++;
    }
  });
  
  const total = Object.values(retentionBuckets).reduce((sum, count) => sum + count, 0);
  
  return [
    { name: '1-3 months', value: Math.round((retentionBuckets['1-3 months'] / total) * 100), color: '#FF8042' },
    { name: '3-6 months', value: Math.round((retentionBuckets['3-6 months'] / total) * 100), color: '#FFBB28' },
    { name: '6-12 months', value: Math.round((retentionBuckets['6-12 months'] / total) * 100), color: '#00C49F' },
    { name: '1+ year', value: Math.round((retentionBuckets['1+ year'] / total) * 100), color: '#0088FE' }
  ];
}

export function calculateGoalAchievementData(clients: ClientData[]): GoalAchievementDataPoint[] {
  const goalStats = new Map<string, { achieved: number; total: number; totalTime: number; completedGoals: number }>();
  
  clients.forEach(client => {
    client.goals.forEach(goal => {
      if (!goalStats.has(goal.type)) {
        goalStats.set(goal.type, { achieved: 0, total: 0, totalTime: 0, completedGoals: 0 });
      }
      
      const stats = goalStats.get(goal.type)!;
      stats.total++;
      
      const progress = (goal.current / goal.target) * 100;
      if (progress >= 90) {
        stats.achieved++;
        const timeToComplete = (new Date().getTime() - goal.createdAt.getTime()) / (1000 * 60 * 60 * 24);
        stats.totalTime += timeToComplete;
        stats.completedGoals++;
      }
    });
  });
  
  return Array.from(goalStats.entries()).map(([goalType, stats]) => {
    const achievementRate = stats.total > 0 ? (stats.achieved / stats.total) * 100 : 0;
    const avgTimeToComplete = stats.completedGoals > 0 ? stats.totalTime / stats.completedGoals : 0;
    
    return {
      name: goalType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      achieved: Math.round(achievementRate),
      total: 100,
      goalType,
      timeProgress: achievementRate,
      onTrack: achievementRate >= 70,
      avgTimeToComplete: Math.round(avgTimeToComplete)
    };
  });
}

export function calculateSingleClientRetention(client: ClientData): RetentionDataPoint[] {
  // For single client, show session consistency instead
  const now = new Date();
  const totalSessions = client.sessions.length;
  
  if (totalSessions === 0) {
    return [
      { name: 'No Data', value: 100, color: '#cccccc' }
    ];
  }
  
  const completedSessions = client.sessions.filter(s => s.completed).length;
  const attendance = (completedSessions / totalSessions) * 100;
  
  return [
    { name: 'Completed', value: Math.round(attendance), color: '#00C49F' },
    { name: 'Missed', value: Math.round(100 - attendance), color: '#FF8042' }
  ];
}

export function calculateSingleClientGoals(client: ClientData): GoalAchievementDataPoint[] {
  return client.goals.map(goal => {
    const progress = (goal.current / goal.target) * 100;
    const timeElapsed = (new Date().getTime() - goal.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    const totalTime = (goal.deadline.getTime() - goal.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    const timeProgress = Math.min((timeElapsed / totalTime) * 100, 100);
    
    return {
      name: goal.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      achieved: Math.round(progress),
      total: 100,
      goalType: goal.type,
      timeProgress: Math.round(timeProgress),
      onTrack: progress >= timeProgress * 0.8,
      avgTimeToComplete: Math.round(timeElapsed)
    };
  });
}
