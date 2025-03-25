
import { MonthlyRevenueDataPoint, RevenueByProductDataPoint, ClientGrowthDataPoint } from '../types';

// Mock data for revenue analytics
export const monthlyRevenue: MonthlyRevenueDataPoint[] = [
  { name: 'Jan', programs: 720, sessions: 480, total: 1200 },
  { name: 'Feb', programs: 840, sessions: 560, total: 1400 },
  { name: 'Mar', programs: 900, sessions: 600, total: 1500 },
  { name: 'Apr', programs: 1080, sessions: 720, total: 1800 },
  { name: 'May', programs: 1200, sessions: 800, total: 2000 },
  { name: 'Jun', programs: 1020, sessions: 680, total: 1700 },
];

export const revenueByProduct: RevenueByProductDataPoint[] = [
  { name: 'Strength & Conditioning', value: 4200 },
  { name: 'Weight Loss Program', value: 3800 },
  { name: 'Flexibility & Recovery', value: 2400 },
  { name: 'Personal Training', value: 5600 },
];

export const clientGrowth: ClientGrowthDataPoint[] = [
  { name: 'Jan', clients: 5 },
  { name: 'Feb', clients: 8 },
  { name: 'Mar', clients: 12 },
  { name: 'Apr', clients: 15 },
  { name: 'May', clients: 20 },
  { name: 'Jun', clients: 24 },
];

// Colors for pie chart
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
