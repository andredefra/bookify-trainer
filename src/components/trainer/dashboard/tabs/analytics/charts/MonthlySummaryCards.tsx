
import React from "react";
import { MonthlyRevenueDataPoint } from "../types";

interface MonthlySummaryCardsProps {
  data: MonthlyRevenueDataPoint[];
}

export function MonthlySummaryCards({ data }: MonthlySummaryCardsProps) {
  // Calculate summary metrics
  const totalRevenue = data.reduce((sum, month) => sum + month.total, 0);
  const averageMonthlyRevenue = totalRevenue / data.length;
  const lastMonthRevenue = data[data.length - 1].total;
  const prevMonthRevenue = data[data.length - 2].total;
  const percentChange = ((lastMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
        <div className="text-2xl font-bold mt-1">€{totalRevenue.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground mt-1">All time</div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Monthly Average</div>
        <div className="text-2xl font-bold mt-1">€{averageMonthlyRevenue.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground mt-1">Per month</div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Last Month</div>
        <div className="text-2xl font-bold mt-1">€{lastMonthRevenue.toLocaleString()}</div>
        <div className={`text-xs mt-1 ${percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {percentChange >= 0 ? '↑' : '↓'} {Math.abs(percentChange).toFixed(1)}% vs previous
        </div>
      </div>
    </div>
  );
}
