
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
