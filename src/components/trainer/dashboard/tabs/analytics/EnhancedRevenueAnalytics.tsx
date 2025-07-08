
import React, { useState } from "react";
import { 
  enhancedMonthlyRevenue, 
  clientTypeBreakdown,
  calculateRevenueFromTransactions,
  ENHANCED_COLORS 
} from "./data/enhancedRevenueData";
import { EnhancedSummaryCards } from "./charts/EnhancedSummaryCards";
import { ClientTypeRevenueChart } from "./charts/ClientTypeRevenueChart";
import { RevenueBreakdownChart } from "./charts/RevenueBreakdownChart";
import { ConversionMetricsChart } from "./charts/ConversionMetricsChart";
import { TransactionsProvider, useTransactions } from "../transactions/context/TransactionsContext";

// Recurring clients list (these are the established clients)
const recurringClientsList = [
  "Sarah Johnson",
  "Mike Peterson", 
  "Lisa Garcia"
];

function EnhancedRevenueAnalyticsContent() {
  const { transactions } = useTransactions();
  
  // Calculate real revenue breakdown from transactions
  const revenueBreakdown = calculateRevenueFromTransactions(transactions, recurringClientsList);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Client Type Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Revenue breakdown between recurring clients and occasional participants
        </p>
      </div>
      
      {/* Enhanced summary cards with real data */}
      <EnhancedSummaryCards 
        data={enhancedMonthlyRevenue} 
        revenueBreakdown={revenueBreakdown}
      />
      
      {/* Client Type Revenue Chart */}
      <ClientTypeRevenueChart data={enhancedMonthlyRevenue} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Breakdown Pie Chart */}
        <RevenueBreakdownChart 
          data={clientTypeBreakdown.data} 
          colors={ENHANCED_COLORS}
          revenueBreakdown={revenueBreakdown}
        />
        
        {/* Conversion Metrics */}
        <ConversionMetricsChart revenueBreakdown={revenueBreakdown} />
      </div>
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
