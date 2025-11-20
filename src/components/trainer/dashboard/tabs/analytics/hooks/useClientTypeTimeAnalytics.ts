import { useMemo } from "react";
import { 
  isWithinInterval, 
  subDays, 
  subMonths, 
  subQuarters, 
  subYears,
  startOfDay,
  endOfDay,
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  startOfWeek,
  startOfMonth,
  getQuarter,
  getYear,
  parseISO
} from "date-fns";
import { MonthlyRevenueDataPoint } from "../types";
import { RevenueBreakdown } from "../data/enhancedRevenueData";

export type TimeFrame = "week" | "month" | "quarter" | "year" | "custom";

interface ClientTypeTimeAnalyticsData {
  chartData: MonthlyRevenueDataPoint[];
  revenueBreakdown: RevenueBreakdown;
  timeFrameLabel: string;
  totalRevenue: number;
  recurringRevenue: number;
  occasionalRevenue: number;
  averageClientValue: number;
}

export function useClientTypeTimeAnalytics(
  transactions: any[],
  timeFrame: TimeFrame,
  customPeriod: number,
  recurringClientsList: string[]
): ClientTypeTimeAnalyticsData {
  return useMemo(() => {
    const now = new Date();
    
    // Helper function to check if a date is within the selected time frame
    const isWithinTimeFrame = (dateString: string): boolean => {
      const date = parseISO(dateString);
      const start = startOfDay(
        timeFrame === "week" ? subDays(now, 7) :
        timeFrame === "month" ? subMonths(now, 1) :
        timeFrame === "quarter" ? subMonths(now, 3) :
        timeFrame === "year" ? subYears(now, 1) :
        subDays(now, customPeriod)
      );
      const end = endOfDay(now);
      
      return isWithinInterval(date, { start, end });
    };

    // Filter transactions within the time frame
    const filteredTransactions = transactions.filter(t => 
      t.date && isWithinTimeFrame(t.date) && t.status === 'paid'
    );

    // Generate chart data based on time frame
    let chartData: MonthlyRevenueDataPoint[] = [];
    const start = startOfDay(
      timeFrame === "week" ? subDays(now, 7) :
      timeFrame === "month" ? subMonths(now, 1) :
      timeFrame === "quarter" ? subMonths(now, 3) :
      timeFrame === "year" ? subYears(now, 1) :
      subDays(now, customPeriod)
    );

    switch (timeFrame) {
      case "week": {
        // Daily aggregation for weekly view
        const days = eachDayOfInterval({ start, end: now });
        chartData = days.map(day => {
          const dayTransactions = filteredTransactions.filter(t => {
            const tDate = parseISO(t.date);
            return format(tDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
          });

          const clientRevenue = dayTransactions
            .filter(t => recurringClientsList.includes(t.client))
            .reduce((sum, t) => sum + t.amount, 0);
          
          const occasionalRevenue = dayTransactions
            .filter(t => !recurringClientsList.includes(t.client))
            .reduce((sum, t) => sum + t.amount, 0);

          const programs = dayTransactions.filter(t => t.type === 'Program').reduce((sum, t) => sum + t.amount, 0);
          const sessions = dayTransactions.filter(t => t.type === 'Session').reduce((sum, t) => sum + t.amount, 0);
          const packages = dayTransactions.filter(t => t.type === 'Package').reduce((sum, t) => sum + t.amount, 0);

          return {
            name: format(day, 'EEE'),
            programs,
            sessions,
            packages,
            total: programs + sessions + packages,
            clientRevenue,
            occasionalRevenue
          };
        });
        break;
      }

      case "month": {
        // Weekly aggregation for monthly view
        const weeks = eachWeekOfInterval({ start, end: now }, { weekStartsOn: 1 });
        chartData = weeks.map((week, index) => {
          const weekTransactions = filteredTransactions.filter(t => {
            const tDate = parseISO(t.date);
            const weekStart = startOfWeek(week, { weekStartsOn: 1 });
            const weekEnd = endOfDay(subDays(startOfWeek(subDays(week, -7), { weekStartsOn: 1 }), 1));
            return isWithinInterval(tDate, { start: weekStart, end: weekEnd });
          });

          const clientRevenue = weekTransactions
            .filter(t => recurringClientsList.includes(t.client))
            .reduce((sum, t) => sum + t.amount, 0);
          
          const occasionalRevenue = weekTransactions
            .filter(t => !recurringClientsList.includes(t.client))
            .reduce((sum, t) => sum + t.amount, 0);

          const programs = weekTransactions.filter(t => t.type === 'Program').reduce((sum, t) => sum + t.amount, 0);
          const sessions = weekTransactions.filter(t => t.type === 'Session').reduce((sum, t) => sum + t.amount, 0);
          const packages = weekTransactions.filter(t => t.type === 'Package').reduce((sum, t) => sum + t.amount, 0);

          return {
            name: `Week ${index + 1}`,
            programs,
            sessions,
            packages,
            total: programs + sessions + packages,
            clientRevenue,
            occasionalRevenue
          };
        });
        break;
      }

      case "quarter":
      case "year": {
        // Monthly aggregation
        const months = eachMonthOfInterval({ start, end: now });
        chartData = months.map(month => {
          const monthStart = startOfMonth(month);
          const monthEnd = endOfDay(subDays(startOfMonth(subDays(month, -31)), 1));
          
          const monthTransactions = filteredTransactions.filter(t => {
            const tDate = parseISO(t.date);
            return isWithinInterval(tDate, { start: monthStart, end: monthEnd });
          });

          const clientRevenue = monthTransactions
            .filter(t => recurringClientsList.includes(t.client))
            .reduce((sum, t) => sum + t.amount, 0);
          
          const occasionalRevenue = monthTransactions
            .filter(t => !recurringClientsList.includes(t.client))
            .reduce((sum, t) => sum + t.amount, 0);

          const programs = monthTransactions.filter(t => t.type === 'Program').reduce((sum, t) => sum + t.amount, 0);
          const sessions = monthTransactions.filter(t => t.type === 'Session').reduce((sum, t) => sum + t.amount, 0);
          const packages = monthTransactions.filter(t => t.type === 'Package').reduce((sum, t) => sum + t.amount, 0);

          return {
            name: format(month, 'MMM'),
            programs,
            sessions,
            packages,
            total: programs + sessions + packages,
            clientRevenue,
            occasionalRevenue
          };
        });
        break;
      }

      case "custom": {
        // Determine aggregation based on custom period
        if (customPeriod <= 14) {
          // Daily for up to 2 weeks
          const days = eachDayOfInterval({ start, end: now });
          chartData = days.map(day => {
            const dayTransactions = filteredTransactions.filter(t => {
              const tDate = parseISO(t.date);
              return format(tDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
            });

            const clientRevenue = dayTransactions
              .filter(t => recurringClientsList.includes(t.client))
              .reduce((sum, t) => sum + t.amount, 0);
            
            const occasionalRevenue = dayTransactions
              .filter(t => !recurringClientsList.includes(t.client))
              .reduce((sum, t) => sum + t.amount, 0);

            const programs = dayTransactions.filter(t => t.type === 'Program').reduce((sum, t) => sum + t.amount, 0);
            const sessions = dayTransactions.filter(t => t.type === 'Session').reduce((sum, t) => sum + t.amount, 0);
            const packages = dayTransactions.filter(t => t.type === 'Package').reduce((sum, t) => sum + t.amount, 0);

            return {
              name: format(day, 'MMM d'),
              programs,
              sessions,
              packages,
              total: programs + sessions + packages,
              clientRevenue,
              occasionalRevenue
            };
          });
        } else {
          // Weekly for longer periods
          const weeks = eachWeekOfInterval({ start, end: now }, { weekStartsOn: 1 });
          chartData = weeks.map((week, index) => {
            const weekStart = startOfWeek(week, { weekStartsOn: 1 });
            const weekEnd = endOfDay(subDays(startOfWeek(subDays(week, -7), { weekStartsOn: 1 }), 1));
            
            const weekTransactions = filteredTransactions.filter(t => {
              const tDate = parseISO(t.date);
              return isWithinInterval(tDate, { start: weekStart, end: weekEnd });
            });

            const clientRevenue = weekTransactions
              .filter(t => recurringClientsList.includes(t.client))
              .reduce((sum, t) => sum + t.amount, 0);
            
            const occasionalRevenue = weekTransactions
              .filter(t => !recurringClientsList.includes(t.client))
              .reduce((sum, t) => sum + t.amount, 0);

            const programs = weekTransactions.filter(t => t.type === 'Program').reduce((sum, t) => sum + t.amount, 0);
            const sessions = weekTransactions.filter(t => t.type === 'Session').reduce((sum, t) => sum + t.amount, 0);
            const packages = weekTransactions.filter(t => t.type === 'Package').reduce((sum, t) => sum + t.amount, 0);

            return {
              name: `Week ${index + 1}`,
              programs,
              sessions,
              packages,
              total: programs + sessions + packages,
              clientRevenue,
              occasionalRevenue
            };
          });
        }
        break;
      }
    }

    // Calculate revenue breakdown
    const recurringRevenue = filteredTransactions
      .filter(t => recurringClientsList.includes(t.client))
      .reduce((sum, t) => sum + t.amount, 0);
    
    const occasionalRevenue = filteredTransactions
      .filter(t => !recurringClientsList.includes(t.client))
      .reduce((sum, t) => sum + t.amount, 0);

    const totalRevenue = recurringRevenue + occasionalRevenue;

    const packageRevenue = filteredTransactions
      .filter(t => t.type === 'Package')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const individualSessionRevenue = filteredTransactions
      .filter(t => t.type === 'Session' && !t.packageId)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const programRevenue = filteredTransactions
      .filter(t => t.type === 'Program')
      .reduce((sum, t) => sum + t.amount, 0);

    const packageClients = new Set(filteredTransactions.filter(t => t.isPackagePayment).map(t => t.client));
    const individualClients = new Set(filteredTransactions.filter(t => !t.isPackagePayment && !t.packageId).map(t => t.client));

    const averageClientValue = recurringRevenue / Math.max(recurringClientsList.length, 1);
    const averageOccasionalValue = occasionalRevenue / Math.max(
      filteredTransactions.filter(t => !recurringClientsList.includes(t.client)).length, 
      1
    );

    const revenueBreakdown: RevenueBreakdown = {
      packageRevenue,
      individualSessionRevenue,
      programRevenue,
      totalRevenue,
      packageClientsCount: packageClients.size,
      individualClientsCount: individualClients.size,
      conversionRate: Math.round((packageClients.size / Math.max(packageClients.size + individualClients.size, 1)) * 100),
      clientsRevenue: recurringRevenue,
      occasionalParticipantsRevenue: occasionalRevenue,
      averageClientValue,
      averageOccasionalValue
    };

    // Generate time frame label
    let timeFrameLabel = "";
    switch (timeFrame) {
      case "week":
        timeFrameLabel = "Last 7 Days";
        break;
      case "month":
        timeFrameLabel = "Last 30 Days";
        break;
      case "quarter":
        timeFrameLabel = `Q${getQuarter(subMonths(now, 3))} ${getYear(subMonths(now, 3))}`;
        break;
      case "year":
        timeFrameLabel = `Year ${getYear(subYears(now, 1))} - ${getYear(now)}`;
        break;
      case "custom":
        timeFrameLabel = `Last ${customPeriod} Days`;
        break;
    }

    return {
      chartData,
      revenueBreakdown,
      timeFrameLabel,
      totalRevenue,
      recurringRevenue,
      occasionalRevenue,
      averageClientValue
    };
  }, [transactions, timeFrame, customPeriod, recurringClientsList]);
}
