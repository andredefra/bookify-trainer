
import React, { useState } from "react";
import { MonthlySummaryCards } from "./charts/MonthlySummaryCards";
import { MonthlyRevenueChart } from "./charts/MonthlyRevenueChart";
import { TransactionsProvider, useTransactions } from "../transactions/context/TransactionsContext";
import { TimeFrameSelector } from "../sales/analytics/TimeFrameSelector";
import { Tabs } from "@/components/ui/tabs";
import { useRevenueTimeAnalytics, TimeFrame } from "./hooks/useRevenueTimeAnalytics";

function RevenueAnalyticsContent() {
  const { transactions } = useTransactions();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("month");
  const [customPeriod, setCustomPeriod] = useState<number>(30);

  const { 
    chartData, 
    timeFrameLabel, 
    yearToDateRevenue, 
    monthlyAverage, 
    lastCompleteMonthRevenue, 
    currentMonthRevenue 
  } = useRevenueTimeAnalytics(transactions, timeFrame, customPeriod);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Revenue Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Revenue analysis by service type (Sessions vs Programs vs Packages)
        </p>
      </div>
      
      {/* Summary cards with real data */}
      <MonthlySummaryCards 
        yearToDateRevenue={yearToDateRevenue}
        monthlyAverage={monthlyAverage}
        lastCompleteMonthRevenue={lastCompleteMonthRevenue}
        currentMonthRevenue={currentMonthRevenue}
      />
      
      {/* Time Frame Selector */}
      <div className="flex justify-center">
        <Tabs value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
          <TimeFrameSelector
            timeFrame={timeFrame}
            onTimeFrameChange={(value) => setTimeFrame(value as TimeFrame)}
            customPeriod={customPeriod}
            onCustomPeriodChange={setCustomPeriod}
            showTitle={false}
          />
        </Tabs>
      </div>
      
      {/* Revenue Chart - Sessions vs Programs vs Packages */}
      <MonthlyRevenueChart data={chartData} title={`${timeFrameLabel} Revenue`} />
    </div>
  );
}

export function RevenueAnalytics() {
  return (
    <TransactionsProvider>
      <RevenueAnalyticsContent />
    </TransactionsProvider>
  );
}
