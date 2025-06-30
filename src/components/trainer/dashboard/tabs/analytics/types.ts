
export interface PerformanceDataPoint {
  name: string;
  attendance: number;
  progress: number;
  goalsReached: number;
}

export interface RetentionDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface GoalAchievementDataPoint {
  name: string;
  achieved: number;
  total: number;
  goalType: string;
  timeProgress: number;
  onTrack: boolean;
  avgTimeToComplete?: number;
}

// Enhanced revenue-related types with packages
export interface MonthlyRevenueDataPoint {
  name: string;
  programs: number;
  sessions: number;
  packages: number;
  total: number;
  clientRevenue?: number;
  occasionalRevenue?: number;
}

export interface RevenueByProductDataPoint {
  name: string;
  value: number;
}

export interface ClientGrowthDataPoint {
  name: string;
  clients: number;
}

export interface ClientMetrics {
  clientId: string;
  clientName: string;
  weeklyData: PerformanceDataPoint[];
  overallAttendance: number;
  overallProgress: number;
  overallGoalsReached: number;
}

// New package-specific types
export interface PackagePerformanceDataPoint {
  packageType: string;
  sold: number;
  revenue: number;
  avgValue: number;
}

export interface RevenueBreakdownDataPoint {
  packageRevenue: number;
  individualSessionRevenue: number;
  programRevenue: number;
  totalRevenue: number;
  packageClientsCount: number;
  individualClientsCount: number;
  conversionRate: number;
}
