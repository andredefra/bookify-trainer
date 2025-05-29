
import { PerformanceDataPoint, RetentionDataPoint, GoalAchievementDataPoint } from '../types';
import { mockClients } from './clientMockData';
import { generateClientPerformanceData } from '../utils/metricsCalculator';

// Generate real performance data from mock clients
function generateRealPerformanceData(): PerformanceDataPoint[] {
  // Use first client as example, or aggregate multiple clients
  const client = mockClients[0];
  return generateClientPerformanceData(client, 6);
}

// Mock data for client performance analytics (now using real calculations)
export const performanceData: PerformanceDataPoint[] = generateRealPerformanceData();

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
