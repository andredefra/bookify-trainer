
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionsProvider, useTransactions } from "../transactions/context/TransactionsContext";

// Sample client list for the filter
const clients = [
  { id: "all", name: "All Clients" },
  { id: "client1", name: "Sarah Johnson" },
  { id: "client2", name: "Mike Peterson" },
  { id: "client3", name: "Lisa Garcia" },
  { id: "client4", name: "David Kim" },
  { id: "client5", name: "Emma Thompson" },
];

// Recurring clients list (these are the established clients)
const recurringClientsList = [
  "Sarah Johnson",
  "Mike Peterson", 
  "Lisa Garcia"
];

function EnhancedRevenueAnalyticsContent() {
  const [selectedClient, setSelectedClient] = useState("all");
  const { transactions } = useTransactions();
  
  // Calculate real revenue breakdown from transactions
  const revenueBreakdown = calculateRevenueFromTransactions(transactions, recurringClientsList);

  return (
    <div className="space-y-6">
      {/* Client Filter */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Business Revenue Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Revenue breakdown between recurring clients and occasional participants
          </p>
        </div>
        <Select value={selectedClient} onValueChange={setSelectedClient}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
