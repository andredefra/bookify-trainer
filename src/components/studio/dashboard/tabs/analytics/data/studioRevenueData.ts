import { 
  RevenueBySourceDataPoint, 
  ProgramSalesDataPoint, 
  MonthlySourceRevenueDataPoint,
  KPIWithBreakdown,
  TrainerPerformanceData,
  CommissionSummary
} from '../types';

export const revenueBySourceData: RevenueBySourceDataPoint[] = [
  { 
    source: 'direct', 
    sourceName: 'Direct Sales',
    programs: 8500, 
    sessions: 6200, 
    packages: 4800, 
    services: 2100,
    grossRevenue: 21600, 
    commissions: 0, 
    netRevenue: 21600
  },
  { 
    source: 'gym', 
    sourceName: 'FitLife Gym',
    programs: 3200, 
    sessions: 2800, 
    packages: 1500, 
    services: 800,
    grossRevenue: 8300, 
    commissions: 830, 
    netRevenue: 7470
  },
  { 
    source: 'gym', 
    sourceName: 'PowerHouse Gym',
    programs: 2100, 
    sessions: 1900, 
    packages: 1000, 
    services: 500,
    grossRevenue: 5500, 
    commissions: 550, 
    netRevenue: 4950
  },
  { 
    source: 'studio', 
    sourceName: 'Elite Training Network',
    programs: 1200, 
    sessions: 800, 
    packages: 600, 
    services: 400,
    grossRevenue: 3000, 
    commissions: 300, 
    netRevenue: 2700
  }
];

export const programSalesData: ProgramSalesDataPoint[] = [
  { programName: 'Strength & Conditioning', source: 'direct', sourceName: 'Direct', unitsSold: 15, revenue: 2250, commissions: 0, netRevenue: 2250 },
  { programName: 'Strength & Conditioning', source: 'gym', sourceName: 'FitLife Gym', unitsSold: 8, revenue: 1200, commissions: 120, netRevenue: 1080 },
  { programName: 'Weight Loss Program', source: 'direct', sourceName: 'Direct', unitsSold: 12, revenue: 1800, commissions: 0, netRevenue: 1800 },
  { programName: 'Weight Loss Program', source: 'gym', sourceName: 'PowerHouse', unitsSold: 5, revenue: 750, commissions: 75, netRevenue: 675 },
  { programName: 'HIIT Extreme', source: 'direct', sourceName: 'Direct', unitsSold: 10, revenue: 1500, commissions: 0, netRevenue: 1500 },
  { programName: 'HIIT Extreme', source: 'gym', sourceName: 'FitLife Gym', unitsSold: 6, revenue: 900, commissions: 90, netRevenue: 810 },
  { programName: 'Flexibility & Mobility', source: 'direct', sourceName: 'Direct', unitsSold: 8, revenue: 960, commissions: 0, netRevenue: 960 },
  { programName: 'Flexibility & Mobility', source: 'studio', sourceName: 'Elite Network', unitsSold: 4, revenue: 480, commissions: 48, netRevenue: 432 },
  { programName: 'Beginner Fitness', source: 'direct', sourceName: 'Direct', unitsSold: 18, revenue: 1440, commissions: 0, netRevenue: 1440 },
  { programName: 'Beginner Fitness', source: 'gym', sourceName: 'PowerHouse', unitsSold: 7, revenue: 560, commissions: 56, netRevenue: 504 },
];

export const monthlySourceRevenueData: MonthlySourceRevenueDataPoint[] = [
  { month: 'Jan', direct: 3200, gym: 1800, studio: 400, total: 5400 },
  { month: 'Feb', direct: 3500, gym: 2100, studio: 450, total: 6050 },
  { month: 'Mar', direct: 3800, gym: 2400, studio: 500, total: 6700 },
  { month: 'Apr', direct: 4100, gym: 2600, studio: 550, total: 7250 },
  { month: 'May', direct: 4400, gym: 2900, studio: 600, total: 7900 },
  { month: 'Jun', direct: 4800, gym: 3100, studio: 650, total: 8550 },
  { month: 'Jul', direct: 5200, gym: 3400, studio: 700, total: 9300 },
  { month: 'Aug', direct: 4600, gym: 2800, studio: 550, total: 7950 },
  { month: 'Sep', direct: 5100, gym: 3200, studio: 680, total: 8980 },
  { month: 'Oct', direct: 5500, gym: 3500, studio: 720, total: 9720 },
  { month: 'Nov', direct: 5800, gym: 3800, studio: 780, total: 10380 },
  { month: 'Dec', direct: 6200, gym: 4100, studio: 850, total: 11150 },
];

export const kpiData: KPIWithBreakdown[] = [
  { 
    label: "Total Revenue", 
    value: "€38,400",
    change: "+18%",
    isPositive: true,
    breakdown: [
      { source: 'Direct', value: '€21,600', percentage: 56 },
      { source: 'Gym Partner', value: '€13,800', percentage: 36 },
      { source: 'Studio Network', value: '€3,000', percentage: 8 }
    ]
  },
  { 
    label: "Programs Sold", 
    value: "93",
    change: "+25%",
    isPositive: true,
    breakdown: [
      { source: 'Direct', value: '63', percentage: 68 },
      { source: 'Gym Partner', value: '26', percentage: 28 },
      { source: 'Studio Network', value: '4', percentage: 4 }
    ]
  },
  { 
    label: "Sessions Completed", 
    value: "312",
    change: "+15%",
    isPositive: true,
    breakdown: [
      { source: 'Direct', value: '186', percentage: 60 },
      { source: 'Gym Partner', value: '108', percentage: 34 },
      { source: 'Studio Network', value: '18', percentage: 6 }
    ]
  },
  { 
    label: "Active Clients", 
    value: "47",
    change: "+12%",
    isPositive: true,
    breakdown: [
      { source: 'Direct', value: '28', percentage: 60 },
      { source: 'Gym Partner', value: '15', percentage: 32 },
      { source: 'Studio Network', value: '4', percentage: 8 }
    ]
  }
];

export const trainerPerformanceData: TrainerPerformanceData[] = [
  {
    trainerId: '1',
    trainerName: 'Marco Rossi',
    sessionsCount: 86,
    clientsCount: 12,
    revenue: 12500,
    directRevenue: 8200,
    gymRevenue: 4300,
    retentionRate: 92,
    trend: 'up'
  },
  {
    trainerId: '2',
    trainerName: 'Laura Bianchi',
    sessionsCount: 72,
    clientsCount: 10,
    revenue: 10800,
    directRevenue: 6500,
    gymRevenue: 4300,
    retentionRate: 88,
    trend: 'up'
  },
  {
    trainerId: '3',
    trainerName: 'Giuseppe Verdi',
    sessionsCount: 65,
    clientsCount: 9,
    revenue: 8400,
    directRevenue: 5100,
    gymRevenue: 3300,
    retentionRate: 85,
    trend: 'stable'
  },
  {
    trainerId: '4',
    trainerName: 'Anna Ferrari',
    sessionsCount: 54,
    clientsCount: 8,
    revenue: 6700,
    directRevenue: 4200,
    gymRevenue: 2500,
    retentionRate: 79,
    trend: 'down'
  }
];

export const commissionSummary: CommissionSummary = {
  commissionsEarned: 1680,
  commissionsPaid: 300,
  netRevenue: 36720,
  totalGrossRevenue: 38400
};

export const revenueByProductType = [
  { name: 'Programs', value: 15000, percentage: 39 },
  { name: 'Sessions', value: 11700, percentage: 30 },
  { name: 'Packages', value: 7900, percentage: 21 },
  { name: 'Services', value: 3800, percentage: 10 },
];

export const sourceColors = {
  direct: 'hsl(var(--chart-1))',
  gym: 'hsl(var(--chart-2))',
  studio: 'hsl(var(--chart-3))',
};

export const sourceLabels = {
  direct: 'Direct Sales',
  gym: 'Gym Partner',
  studio: 'Studio Network',
};
