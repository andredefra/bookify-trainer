
// Types for client performance analytics
export type PerformanceDataPoint = {
  name: string;
  attendance: number;
  progress: number;
  satisfaction: number;
};

export type RetentionDataPoint = {
  name: string;
  value: number;
  color: string;
};

export type GoalAchievementDataPoint = {
  name: string;
  achieved: number;
  total: number;
};

// Types for revenue analytics
export type MonthlyRevenueDataPoint = {
  name: string;
  programs: number;
  sessions: number;
  total: number;
};

export type RevenueByProductDataPoint = {
  name: string;
  value: number;
};

export type ClientGrowthDataPoint = {
  name: string;
  clients: number;
};
