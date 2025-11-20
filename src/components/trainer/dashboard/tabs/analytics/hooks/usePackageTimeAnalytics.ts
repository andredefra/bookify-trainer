import { useMemo } from "react";
import {
  format,
  differenceInDays,
  isSameWeek,
  isSameMonth,
  isSameQuarter,
  isSameYear,
} from "date-fns";
import { PackageData } from "../data/packageAnalyticsData";

export type TimeFrame = "week" | "month" | "quarter" | "year" | "custom";

export interface PackageTimeAnalyticsData {
  totalSales: number;
  totalRevenue: number;
  avgValue: number;
  estimatedClients: number;
  filteredPackages: PackageData[];
  timeFrameLabel: string;
}

export function usePackageTimeAnalytics(
  packages: PackageData[],
  timeFrame: TimeFrame,
  customPeriod: number
): PackageTimeAnalyticsData {
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

    // Filter packages based on their sales dates
    const filteredPackages = packages.map(pkg => {
      const filteredSalesDates = pkg.salesDates.filter(date => isWithinTimeFrame(date));
      const filteredSalesCount = filteredSalesDates.length;
      
      if (filteredSalesCount === 0) return null;
      
      // Recalculate revenue based on filtered sales
      const filteredRevenue = (pkg.revenue / pkg.salesCount) * filteredSalesCount;
      
      return {
        ...pkg,
        salesCount: filteredSalesCount,
        revenue: Math.round(filteredRevenue),
        salesDates: filteredSalesDates,
      };
    }).filter((pkg): pkg is PackageData => pkg !== null)
      .sort((a, b) => b.salesCount - a.salesCount)
      .map((pkg, index) => ({ ...pkg, rank: index + 1 }));

    // Calculate metrics
    const totalSales = filteredPackages.reduce((sum, pkg) => sum + pkg.salesCount, 0);
    const totalRevenue = filteredPackages.reduce((sum, pkg) => sum + pkg.revenue, 0);
    const avgValue = totalSales > 0 ? Math.round(totalRevenue / totalSales) : 0;
    const estimatedClients = Math.floor(totalSales * 0.8);

    // Generate time frame label
    let timeFrameLabel = "";
    switch (timeFrame) {
      case "week":
        timeFrameLabel = "This Week";
        break;
      case "month":
        timeFrameLabel = format(now, "MMMM yyyy");
        break;
      case "quarter":
        const quarter = Math.floor(now.getMonth() / 3) + 1;
        timeFrameLabel = `Q${quarter} ${now.getFullYear()}`;
        break;
      case "year":
        timeFrameLabel = now.getFullYear().toString();
        break;
      case "custom":
        timeFrameLabel = `Last ${customPeriod} Days`;
        break;
    }

    return {
      totalSales,
      totalRevenue,
      avgValue,
      estimatedClients,
      filteredPackages,
      timeFrameLabel,
    };
  }, [packages, timeFrame, customPeriod]);
}
