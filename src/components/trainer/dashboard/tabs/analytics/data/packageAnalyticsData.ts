export interface PackageData {
  id: number;
  title: string;
  type: 'sessions_only' | 'program_only' | 'hybrid' | 'service';
  rank: number;
  salesCount: number;
  revenue: number;
  avgValue: number;
  growthRate: number;
  conversionRate: number;
  completionRate: number;
  trend: 'up' | 'down';
  salesDates: string[]; // ISO date strings for each sale
}

export interface PackageTypeDistribution {
  name: string;
  value: number;
  color: string;
}

// Unified package data source
export const packageData: PackageData[] = [
  {
    id: 1,
    title: "Complete Transformation",
    type: "hybrid",
    rank: 1,
    salesCount: 15,
    revenue: 11250,
    avgValue: 750,
    growthRate: 25,
    conversionRate: 85,
    completionRate: 92,
    trend: "up",
    salesDates: [
      // Dicembre 2025 (mese corrente)
      "2025-12-01", "2025-12-02", "2025-12-01", "2025-12-02",
      // Novembre 2025
      "2025-11-15", "2025-11-18", "2025-11-20", "2025-11-22", "2025-11-25",
      "2025-11-28", "2025-11-10", "2025-11-05",
      // Ottobre 2025
      "2025-10-20", "2025-10-25", "2025-10-28"
    ]
  },
  {
    id: 2,
    title: "Personal Training Package",
    type: "sessions_only",
    rank: 2,
    salesCount: 12,
    revenue: 6000,
    avgValue: 500,
    growthRate: 15,
    conversionRate: 78,
    completionRate: 88,
    trend: "up",
    salesDates: [
      // Dicembre 2025
      "2025-12-01", "2025-12-02", "2025-12-01",
      // Novembre 2025
      "2025-11-12", "2025-11-15", "2025-11-18", "2025-11-21", "2025-11-24",
      // Ottobre 2025
      "2025-10-15", "2025-10-20", "2025-10-28", "2025-10-05"
    ]
  },
  {
    id: 3,
    title: "Beginner's Program",
    type: "program_only",
    rank: 3,
    salesCount: 8,
    revenue: 1920,
    avgValue: 240,
    growthRate: -5,
    conversionRate: 65,
    completionRate: 90,
    trend: "down",
    salesDates: [
      // Dicembre 2025
      "2025-12-01", "2025-12-02",
      // Novembre 2025
      "2025-11-08", "2025-11-14", "2025-11-20",
      // Ottobre 2025
      "2025-10-10", "2025-10-18", "2025-10-25"
    ]
  },
  {
    id: 4,
    title: "Group Training",
    type: "sessions_only",
    rank: 4,
    salesCount: 6,
    revenue: 1800,
    avgValue: 300,
    growthRate: 10,
    conversionRate: 72,
    completionRate: 85,
    trend: "up",
    salesDates: [
      // Dicembre 2025
      "2025-12-01", "2025-12-02",
      // Novembre 2025
      "2025-11-10", "2025-11-22",
      // Ottobre 2025
      "2025-10-15", "2025-10-28"
    ]
  }
];

// Package type distribution data
export const packageTypeData: PackageTypeDistribution[] = [
  { name: 'Sessions Only', value: 45, color: '#0088FE' },
  { name: 'Hybrid', value: 35, color: '#00C49F' },
  { name: 'Program Only', value: 20, color: '#FFBB28' },
];

// Chart colors
export const CHART_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Calculated analytics metrics
export const getAnalyticsMetrics = () => {
  const totalSales = packageData.reduce((sum, pkg) => sum + pkg.salesCount, 0);
  const totalRevenue = packageData.reduce((sum, pkg) => sum + pkg.revenue, 0);
  const avgValue = totalRevenue / totalSales;
  const avgConversion = packageData.reduce((sum, pkg) => sum + pkg.conversionRate, 0) / packageData.length;
  
  // Count unique clients (assuming some packages might have overlapping clients)
  const estimatedClients = Math.floor(totalSales * 0.8); // Rough estimation
  
  return {
    totalSales,
    totalRevenue,
    avgValue: Math.round(avgValue),
    avgConversion: Math.round(avgConversion),
    estimatedClients
  };
};

// Package type utilities
export const getPackageTypeColor = (type: string) => {
  switch (type) {
    case 'sessions_only': return 'bg-blue-100 text-blue-800';
    case 'program_only': return 'bg-green-100 text-green-800';
    case 'hybrid': return 'bg-purple-100 text-purple-800';
    case 'service': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return 'text-yellow-600 bg-yellow-50';
    case 2: return 'text-gray-600 bg-gray-50';
    case 3: return 'text-amber-600 bg-amber-50';
    default: return 'text-blue-600 bg-blue-50';
  }
};
