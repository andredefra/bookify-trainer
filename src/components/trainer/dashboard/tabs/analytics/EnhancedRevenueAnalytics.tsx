
import React, { useState } from "react";
import { EnhancedSummaryCards } from "./charts/EnhancedSummaryCards";
import { ClientTypeRevenueChart } from "./charts/ClientTypeRevenueChart";
import { TransactionsProvider, useTransactions } from "../transactions/context/TransactionsContext";
import { Tabs } from "@/components/ui/tabs";
import { TimeFrameSelector } from "../sales/analytics/TimeFrameSelector";
import { useClientTypeTimeAnalytics, TimeFrame } from "./hooks/useClientTypeTimeAnalytics";

// Recurring clients list (these are the established clients)
const recurringClientsList = [
  "Sarah Johnson",
  "Mike Peterson", 
  "Lisa Garcia"
];

function EnhancedRevenueAnalyticsContent() {
  const { transactions } = useTransactions();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("month");
  const [customPeriod, setCustomPeriod] = useState(30);
  
  const analytics = useClientTypeTimeAnalytics(
    transactions,
    timeFrame,
    customPeriod,
    recurringClientsList
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Client Type Analytics</h3>
        <p className="text-sm text-muted-foreground">{analytics.timeFrameLabel}</p>
      </div>

      {/* Time Frame Selector */}
      <Tabs value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)} className="w-full">
        <TimeFrameSelector
          timeFrame={timeFrame}
          onTimeFrameChange={setTimeFrame}
          customPeriod={customPeriod}
          onCustomPeriodChange={setCustomPeriod}
          showTitle={false}
        />
      </Tabs>
      
      {/* Enhanced summary cards with real filtered data */}
      <EnhancedSummaryCards 
        data={analytics.chartData} 
        revenueBreakdown={analytics.revenueBreakdown}
      />
      
      {/* Client Type Revenue Chart with filtered data */}
      <ClientTypeRevenueChart data={analytics.chartData} />
    </div>
  );
}

export function EnhancedRevenueAnalytics() {
  return (
    <TransactionsProvider>
      <EnhancedRevenueAnalyticsContent />
    </TransactionsProvider>
  );
}
