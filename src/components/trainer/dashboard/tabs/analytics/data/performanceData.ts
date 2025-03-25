
import { PerformanceDataPoint, RetentionDataPoint, GoalAchievementDataPoint } from '../types';

// Mock data for client performance analytics
export const performanceData: PerformanceDataPoint[] = [
  { name: 'Week 1', attendance: 80, progress: 60, satisfaction: 75 },
  { name: 'Week 2', attendance: 85, progress: 65, satisfaction: 80 },
  { name: 'Week 3', attendance: 90, progress: 70, satisfaction: 85 },
  { name: 'Week 4', attendance: 88, progress: 75, satisfaction: 90 },
  { name: 'Week 5', attendance: 92, progress: 80, satisfaction: 88 },
  { name: 'Week 6', attendance: 95, progress: 85, satisfaction: 92 },
];

export const retentionData: RetentionDataPoint[] = [
  { name: '1-3 months', value: 45, color: '#FF8042' },
  { name: '3-6 months', value: 30, color: '#FFBB28' },
  { name: '6-12 months', value: 15, color: '#00C49F' },
  { name: '1+ year', value: 10, color: '#0088FE' },
];

export const goalAchievementData: GoalAchievementDataPoint[] = [
  { name: 'Weight Loss', achieved: 65, total: 100 },
  { name: 'Strength', achieved: 80, total: 100 },
  { name: 'Endurance', achieved: 70, total: 100 },
  { name: 'Flexibility', achieved: 55, total: 100 },
];

// Colors for pie chart
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
