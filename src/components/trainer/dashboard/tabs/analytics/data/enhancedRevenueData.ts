
import { MonthlyRevenueDataPoint, RevenueBreakdownDataPoint } from '../types';

// Enhanced revenue data including packages
export const enhancedMonthlyRevenue: MonthlyRevenueDataPoint[] = [
  { name: 'Jan', programs: 720, sessions: 480, packages: 1200, total: 2400 },
  { name: 'Feb', programs: 840, sessions: 560, packages: 1400, total: 2800 },
  { name: 'Mar', programs: 900, sessions: 600, packages: 1500, total: 3000 },
  { name: 'Apr', programs: 1080, sessions: 720, packages: 1800, total: 3600 },
  { name: 'May', programs: 1200, sessions: 800, packages: 2000, total: 4000 },
  { name: 'Jun', programs: 1020, sessions: 680, packages: 1700, total: 3400 },
];

// Client type revenue breakdown
export const clientTypeBreakdown = {
  title: "Revenue by Client Type",
  data: [
    { name: "Package Clients", value: 8800, color: "#0088FE" },
    { name: "Individual Sessions", value: 4200, color: "#00C49F" },
    { name: "Program Only", value: 2600, color: "#FFBB28" },
  ]
};

// Package performance metrics
export const packagePerformanceData = [
  { packageType: "Personal Training Package", sold: 12, revenue: 6000, avgValue: 500 },
  { packageType: "Complete Transformation", sold: 8, revenue: 6000, avgValue: 750 },
  { packageType: "Beginner Package", sold: 15, revenue: 3600, avgValue: 240 },
  { packageType: "Group Training Package", sold: 6, revenue: 1800, avgValue: 300 },
];

// Enhanced colors for charts
export const ENHANCED_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Export missing types
export interface EnhancedRevenueDataPoint {
  name: string;
  programs: number;
  sessions: number;
  packages: number;
  total: number;
}

export interface RevenueBreakdown {
  packageRevenue: number;
  individualSessionRevenue: number;
  programRevenue: number;
  totalRevenue: number;
  packageClientsCount: number;
  individualClientsCount: number;
  conversionRate: number;
}

// Calculate revenue breakdown from transactions
export const calculateRevenueFromTransactions = (transactions: any[], recurringClients: string[]): RevenueBreakdown => {
  const packageRevenue = transactions
    .filter(t => t.type === 'Package' && t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const individualSessionRevenue = transactions
    .filter(t => t.type === 'Session' && t.status === 'paid' && !t.packageId)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const programRevenue = transactions
    .filter(t => t.type === 'Program' && t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate client type breakdown
  const packageClients = new Set(transactions.filter(t => t.isPackagePayment).map(t => t.client));
  const individualClients = new Set(transactions.filter(t => !t.isPackagePayment && !t.packageId).map(t => t.client));
  
  return {
    packageRevenue,
    individualSessionRevenue,
    programRevenue,
    totalRevenue: packageRevenue + individualSessionRevenue + programRevenue,
    packageClientsCount: packageClients.size,
    individualClientsCount: individualClients.size,
    conversionRate: Math.round((packageClients.size / (packageClients.size + individualClients.size)) * 100)
  };
};
