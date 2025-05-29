
export interface PerformanceDataPoint {
  name: string;
  attendance: number;
  progress: number;
  goalsReached: number; // Renamed from satisfaction
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
}

// Revenue-related types
export interface MonthlyRevenueDataPoint {
  name: string;
  programs: number;
  sessions: number;
  total: number;
}

export interface RevenueByProductDataPoint {
  name: string;
  value: number;
}

export interface ClientGrowthDataPoint {
  name: string;
  clients: number;
}

// New interface for client metrics calculation
export interface ClientMetrics {
  clientId: string;
  clientName: string;
  weeklyData: PerformanceDataPoint[];
  overallAttendance: number;
  overallProgress: number;
  overallGoalsReached: number;
}
