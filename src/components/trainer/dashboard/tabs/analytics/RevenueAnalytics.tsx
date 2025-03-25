
import React from "react";
import { 
  monthlyRevenue, 
  revenueByProduct, 
  clientGrowth, 
  COLORS 
} from "./data/revenueData";
import { MonthlySummaryCards } from "./charts/MonthlySummaryCards";
import { MonthlyRevenueChart } from "./charts/MonthlyRevenueChart";
import { RevenueByProductChart } from "./charts/RevenueByProductChart";
import { ClientGrowthChart } from "./charts/ClientGrowthChart";

export function RevenueAnalytics() {
  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <MonthlySummaryCards data={monthlyRevenue} />
      
      {/* Monthly Revenue Chart */}
      <MonthlyRevenueChart data={monthlyRevenue} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue by Product */}
        <RevenueByProductChart data={revenueByProduct} colors={COLORS} />
        
        {/* Client Growth */}
        <ClientGrowthChart data={clientGrowth} />
      </div>
    </div>
  );
}
