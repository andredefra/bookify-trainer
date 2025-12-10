
import { PerformanceDataPoint, RetentionDataPoint, GoalAchievementDataPoint } from '../types';
import { mockClients } from './clientMockData';
import { generateClientPerformanceData } from '../utils/metricsCalculator';
import { GOAL_TEMPLATES } from '@/components/client/overview/fitness-progress/data/goalTemplates';
import { calculateProgressWithTimeline } from '@/components/client/overview/fitness-progress/utils/progressCalculator';

// Generate real performance data from mock clients
function generateRealPerformanceData(): PerformanceDataPoint[] {
  // Use first client as example, or aggregate multiple clients
  const client = mockClients[0];
  return generateClientPerformanceData(client, 6);
}

// Generate goal achievement data using the new 6 goal types and timeline analytics
function generateGoalAchievementData(): GoalAchievementDataPoint[] {
  const goalTypeStats = new Map<string, { achieved: number; total: number; totalTimeToComplete: number; completedGoals: number }>();
  
  // Initialize stats for all goal types
  Object.keys(GOAL_TEMPLATES).forEach(goalType => {
    goalTypeStats.set(goalType, { achieved: 0, total: 0, totalTimeToComplete: 0, completedGoals: 0 });
  });
  
  // Analyze all client goals
  mockClients.forEach(client => {
    client.goals.forEach(goal => {
      const stats = goalTypeStats.get(goal.type);
      if (stats) {
        stats.total++;
        
        // Calculate progress and timeline
        const mockProgressItem = {
          current: goal.current,
          target: goal.target,
          targetDate: goal.deadline.toISOString(),
          createdAt: goal.createdAt.toISOString(),
          goalType: goal.type as any,
          goal: `${goal.type} goal`,
          unit: 'units',
          progress: (goal.current / goal.target) * 100,
          source: 'trainer' as const
        };
        
        const progressCalc = calculateProgressWithTimeline(mockProgressItem);
        
        // Consider goal achieved if progress >= 90%
        if (progressCalc.currentProgress >= 90) {
          stats.achieved++;
          // Calculate time to complete (days from creation to now)
          const timeToComplete = (new Date().getTime() - goal.createdAt.getTime()) / (1000 * 60 * 60 * 24);
          stats.totalTimeToComplete += timeToComplete;
          stats.completedGoals++;
        }
      }
    });
  });
  
  // Convert to chart data
  return Object.entries(GOAL_TEMPLATES).map(([goalType, template]) => {
    const stats = goalTypeStats.get(goalType);
    if (!stats || stats.total === 0) {
      return {
        name: template.name,
        achieved: 0,
        total: 100,
        goalType,
        timeProgress: 0,
        onTrack: true,
        avgTimeToComplete: 0
      };
    }
    
    const achievementRate = (stats.achieved / stats.total) * 100;
    const avgTimeToComplete = stats.completedGoals > 0 ? stats.totalTimeToComplete / stats.completedGoals : 0;
    
    return {
      name: template.name,
      achieved: Math.round(achievementRate),
      total: 100,
      goalType,
      timeProgress: achievementRate, // Simplified for display
      onTrack: achievementRate >= 70, // Consider on track if 70%+ achievement rate
      avgTimeToComplete: Math.round(avgTimeToComplete)
    };
  });
}

// Mock data for client performance analytics (now using real calculations)
export const performanceData: PerformanceDataPoint[] = generateRealPerformanceData();

export const retentionData: RetentionDataPoint[] = [
  { name: '1-3 months', value: 45, color: '#FF8042' },
  { name: '3-6 months', value: 30, color: '#FFBB28' },
  { name: '6-12 months', value: 15, color: '#00C49F' },
  { name: '1+ year', value: 10, color: '#0088FE' },
];

// Generate goal achievement data with new system
export const goalAchievementData: GoalAchievementDataPoint[] = generateGoalAchievementData();

// Colors for pie chart
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
