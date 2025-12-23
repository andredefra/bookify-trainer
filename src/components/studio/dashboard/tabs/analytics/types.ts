export type RevenueSourceType = 'direct' | 'gym' | 'studio';

export interface RevenueBySourceDataPoint {
  source: RevenueSourceType;
  sourceName: string;
  programs: number;
  sessions: number;
  packages: number;
  services: number;
  grossRevenue: number;
  commissions: number;
  netRevenue: number;
}

export interface ProgramSalesDataPoint {
  programName: string;
  source: RevenueSourceType;
  sourceName: string;
  unitsSold: number;
  revenue: number;
  commissions: number;
  netRevenue: number;
}

export interface MonthlySourceRevenueDataPoint {
  month: string;
  direct: number;
  gym: number;
  studio: number;
  total: number;
}

export interface KPIWithBreakdown {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  breakdown?: {
    source: string;
    value: string;
    percentage: number;
  }[];
}

export interface TrainerPerformanceData {
  trainerId: string;
  trainerName: string;
  avatar?: string;
  sessionsCount: number;
  clientsCount: number;
  revenue: number;
  directRevenue: number;
  gymRevenue: number;
  retentionRate: number;
  trend: 'up' | 'down' | 'stable';
}

export interface CommissionSummary {
  commissionsEarned: number;
  commissionsPaid: number;
  netRevenue: number;
  totalGrossRevenue: number;
}

export type TimeFrame = 'week' | 'month' | 'quarter' | 'year';
