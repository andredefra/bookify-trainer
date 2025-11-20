import { useMemo } from "react";
import {
  format,
  differenceInDays,
  isSameWeek,
  isSameMonth,
  isSameQuarter,
  isSameYear,
  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears
} from "date-fns";
import { enUS } from "date-fns/locale";
import { MonthlyRevenueDataPoint } from "../types";
import { TransactionType } from "../../transactions/types/transactionTypes";

export type TimeFrame = "week" | "month" | "quarter" | "year" | "custom";

interface RevenueTimeAnalyticsData {
  chartData: MonthlyRevenueDataPoint[];
  totalRevenue: number;
  averageRevenue: number;
  growthRate: number;
  timeFrameLabel: string;
  yearToDateRevenue: number;
  currentMonthRevenue: number;
  lastCompleteMonthRevenue: number;
  monthlyAverage: number;
}

export function useRevenueTimeAnalytics(
  transactions: TransactionType[],
  timeFrame: TimeFrame,
  customPeriod: number
): RevenueTimeAnalyticsData {
  return useMemo(() => {
    const now = new Date();
    
    const isWithinTimeFrame = (dateStr: string): boolean => {
      const date = new Date(dateStr);
      
      switch (timeFrame) {
        case "week":
          return isSameWeek(date, now, { weekStartsOn: 1 });
        case "month":
          return isSameMonth(date, now);
        case "quarter":
          return isSameQuarter(date, now);
        case "year":
          return isSameYear(date, now);
        case "custom":
          return differenceInDays(now, date) <= customPeriod;
        default:
          return false;
      }
    };

    const paidTransactions = transactions.filter(
      t => t.status === 'paid' && isWithinTimeFrame(t.date)
    );

    let chartData: MonthlyRevenueDataPoint[] = [];
    let previousPeriodTransactions: TransactionType[] = [];

    switch (timeFrame) {
      case "week":
        chartData = Array.from({ length: 7 }, (_, i) => {
          const day = (i + 1) % 7;
          const dayTransactions = paidTransactions.filter(t => {
            const date = new Date(t.date);
            return date.getDay() === day;
          });
          
          const programs = dayTransactions
            .filter(t => t.type === 'Program')
            .reduce((sum, t) => sum + t.amount, 0);
          const sessions = dayTransactions
            .filter(t => t.type === 'Session')
            .reduce((sum, t) => sum + t.amount, 0);
          const packages = dayTransactions
            .filter(t => t.type === 'Package')
            .reduce((sum, t) => sum + t.amount, 0);
          
          return {
            name: format(new Date(2025, 0, day + 1), "EEE", { locale: enUS }),
            programs,
            sessions,
            packages,
            total: programs + sessions + packages
          };
        });
        
        previousPeriodTransactions = transactions.filter(t => {
          const date = new Date(t.date);
          const lastWeekStart = subWeeks(now, 1);
          return t.status === 'paid' && isSameWeek(date, lastWeekStart, { weekStartsOn: 1 });
        });
        break;

      case "month":
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        chartData = Array.from({ length: daysInMonth }, (_, i) => {
          const dayNum = i + 1;
          const dayTransactions = paidTransactions.filter(t => {
            const date = new Date(t.date);
            return date.getDate() === dayNum;
          });
          
          const programs = dayTransactions
            .filter(t => t.type === 'Program')
            .reduce((sum, t) => sum + t.amount, 0);
          const sessions = dayTransactions
            .filter(t => t.type === 'Session')
            .reduce((sum, t) => sum + t.amount, 0);
          const packages = dayTransactions
            .filter(t => t.type === 'Package')
            .reduce((sum, t) => sum + t.amount, 0);
          
          return {
            name: `${dayNum}`,
            programs,
            sessions,
            packages,
            total: programs + sessions + packages
          };
        });
        
        previousPeriodTransactions = transactions.filter(t => {
          const date = new Date(t.date);
          const lastMonth = subMonths(now, 1);
          return t.status === 'paid' && isSameMonth(date, lastMonth);
        });
        break;

      case "quarter":
        const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
        chartData = Array.from({ length: 3 }, (_, i) => {
          const monthNum = quarterMonth + i;
          const monthTransactions = paidTransactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === monthNum;
          });
          
          const programs = monthTransactions
            .filter(t => t.type === 'Program')
            .reduce((sum, t) => sum + t.amount, 0);
          const sessions = monthTransactions
            .filter(t => t.type === 'Session')
            .reduce((sum, t) => sum + t.amount, 0);
          const packages = monthTransactions
            .filter(t => t.type === 'Package')
            .reduce((sum, t) => sum + t.amount, 0);
          
          return {
            name: format(new Date(2025, monthNum, 1), "MMM"),
            programs,
            sessions,
            packages,
            total: programs + sessions + packages
          };
        });
        
        previousPeriodTransactions = transactions.filter(t => {
          const date = new Date(t.date);
          const lastQuarter = subQuarters(now, 1);
          return t.status === 'paid' && isSameQuarter(date, lastQuarter);
        });
        break;

      case "year":
        chartData = Array.from({ length: 12 }, (_, i) => {
          const monthTransactions = paidTransactions.filter(t => {
            const date = new Date(t.date);
            return date.getMonth() === i;
          });
          
          const programs = monthTransactions
            .filter(t => t.type === 'Program')
            .reduce((sum, t) => sum + t.amount, 0);
          const sessions = monthTransactions
            .filter(t => t.type === 'Session')
            .reduce((sum, t) => sum + t.amount, 0);
          const packages = monthTransactions
            .filter(t => t.type === 'Package')
            .reduce((sum, t) => sum + t.amount, 0);
          
          return {
            name: format(new Date(2025, i, 1), "MMM"),
            programs,
            sessions,
            packages,
            total: programs + sessions + packages
          };
        });
        
        previousPeriodTransactions = transactions.filter(t => {
          const date = new Date(t.date);
          const lastYear = subYears(now, 1);
          return t.status === 'paid' && isSameYear(date, lastYear);
        });
        break;

      case "custom":
        const days = customPeriod;
        chartData = Array.from({ length: days }, (_, i) => {
          const targetDay = subDays(now, days - 1 - i);
          const dayTransactions = paidTransactions.filter(t => {
            const date = new Date(t.date);
            return date.getDate() === targetDay.getDate() &&
                   date.getMonth() === targetDay.getMonth() &&
                   date.getFullYear() === targetDay.getFullYear();
          });
          
          const programs = dayTransactions
            .filter(t => t.type === 'Program')
            .reduce((sum, t) => sum + t.amount, 0);
          const sessions = dayTransactions
            .filter(t => t.type === 'Session')
            .reduce((sum, t) => sum + t.amount, 0);
          const packages = dayTransactions
            .filter(t => t.type === 'Package')
            .reduce((sum, t) => sum + t.amount, 0);
          
          return {
            name: format(targetDay, "MMM d"),
            programs,
            sessions,
            packages,
            total: programs + sessions + packages
          };
        });
        
        const customStart = subDays(now, customPeriod * 2);
        const customEnd = subDays(now, customPeriod);
        previousPeriodTransactions = transactions.filter(t => {
          const date = new Date(t.date);
          return t.status === 'paid' && 
                 date >= customStart && 
                 date <= customEnd;
        });
        break;
    }

    const totalRevenue = paidTransactions.reduce((sum, t) => sum + t.amount, 0);
    const averageRevenue = paidTransactions.length > 0 
      ? totalRevenue / paidTransactions.length 
      : 0;

    const previousRevenue = previousPeriodTransactions.reduce((sum, t) => sum + t.amount, 0);
    const growthRate = previousRevenue > 0
      ? ((totalRevenue - previousRevenue) / previousRevenue) * 100
      : 0;

    const timeFrameLabel = timeFrame === "custom" 
      ? `Last ${customPeriod} Days`
      : `This ${timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}`;

    // Calculate year-to-date revenue (all paid transactions in current year)
    const currentYear = now.getFullYear();
    const yearToDateRevenue = transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.status === 'paid' && date.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate current month revenue (up to today)
    const currentMonthRevenue = transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.status === 'paid' && isSameMonth(date, now);
      })
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate last complete month revenue
    const lastMonth = subMonths(now, 1);
    const lastCompleteMonthRevenue = transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.status === 'paid' && isSameMonth(date, lastMonth);
      })
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate monthly average for the year
    const currentMonth = now.getMonth() + 1; // 1-12
    const monthlyAverage = currentMonth > 0 ? yearToDateRevenue / currentMonth : 0;

    return {
      chartData,
      totalRevenue,
      averageRevenue,
      growthRate,
      timeFrameLabel,
      yearToDateRevenue,
      currentMonthRevenue,
      lastCompleteMonthRevenue,
      monthlyAverage
    };
  }, [transactions, timeFrame, customPeriod]);
}
