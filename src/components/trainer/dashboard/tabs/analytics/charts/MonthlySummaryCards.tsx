
import React from "react";

interface MonthlySummaryCardsProps {
  yearToDateRevenue: number;
  monthlyAverage: number;
  lastCompleteMonthRevenue: number;
  currentMonthRevenue: number;
}

export function MonthlySummaryCards({ 
  yearToDateRevenue, 
  monthlyAverage, 
  lastCompleteMonthRevenue, 
  currentMonthRevenue 
}: MonthlySummaryCardsProps) {
  // Calculate growth percentage (last complete month vs current month to date)
  const growthPercentage = lastCompleteMonthRevenue > 0
    ? ((currentMonthRevenue - lastCompleteMonthRevenue) / lastCompleteMonthRevenue) * 100
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-card p-4 rounded-lg border shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Total Revenue (YTD)</div>
        <div className="text-2xl font-bold mt-1">€{yearToDateRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
        <div className="text-xs text-muted-foreground mt-1">Year to date</div>
      </div>
      
      <div className="bg-card p-4 rounded-lg border shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Monthly Average</div>
        <div className="text-2xl font-bold mt-1">€{monthlyAverage.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
        <div className="text-xs text-muted-foreground mt-1">Per month (2025)</div>
      </div>
      
      <div className="bg-card p-4 rounded-lg border shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Last Complete Month</div>
        <div className="text-2xl font-bold mt-1">€{lastCompleteMonthRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
        <div className="text-xs text-muted-foreground mt-1">October 2025</div>
      </div>
      
      <div className="bg-card p-4 rounded-lg border shadow-sm">
        <div className="text-sm font-medium text-muted-foreground">Current Month (To Date)</div>
        <div className="text-2xl font-bold mt-1">€{currentMonthRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
        <div className={`text-xs mt-1 ${growthPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {growthPercentage >= 0 ? '↑' : '↓'} {Math.abs(growthPercentage).toFixed(1)}% vs last month
        </div>
      </div>
    </div>
  );
}
