
import React, { useState } from "react";
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
import { TransactionsProvider, useTransactions } from "../transactions/context/TransactionsContext";

function RevenueAnalyticsContent() {
  const { transactions } = useTransactions();

  // Calculate real revenue data from transactions
  const calculateRealRevenueData = () => {
    const paidTransactions = transactions.filter(t => t.status === 'paid');
    
    // Calculate monthly revenue with programs vs sessions breakdown
    const monthlyData = monthlyRevenue.map(month => {
      const monthTransactions = paidTransactions.filter(t => {
        const transactionMonth = new Date(t.date).getMonth();
        const currentMonth = new Date().getMonth() - (6 - monthlyRevenue.indexOf(month));
        return transactionMonth === currentMonth;
      });
      
      const programRevenue = monthTransactions
        .filter(t => t.type === 'Program')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const sessionRevenue = monthTransactions
        .filter(t => t.type === 'Session')
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        ...month,
        programs: programRevenue > 0 ? programRevenue : month.programs,
        sessions: sessionRevenue > 0 ? sessionRevenue : month.sessions,
        total: (programRevenue > 0 ? programRevenue : month.programs) + 
               (sessionRevenue > 0 ? sessionRevenue : month.sessions)
      };
    });

    // Calculate revenue by product from real data
    const productRevenue = revenueByProduct.map(product => {
      const productTransactions = paidTransactions.filter(t => 
        t.name.toLowerCase().includes(product.name.toLowerCase().split(' ')[0])
      );
      
      const realValue = productTransactions.reduce((sum, t) => sum + t.amount, 0);
      
      return {
        ...product,
        value: realValue > 0 ? realValue : product.value
      };
    });

    return { monthlyData, productRevenue };
  };

  const { monthlyData, productRevenue } = calculateRealRevenueData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Revenue Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Analisi delle entrate per tipologia di servizio (Sessions vs Programs)
        </p>
      </div>
      
      {/* Summary cards with real data */}
      <MonthlySummaryCards data={monthlyData} />
      
      {/* Monthly Revenue Chart - Sessions vs Programs */}
      <MonthlyRevenueChart data={monthlyData} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue by Product */}
        <RevenueByProductChart data={productRevenue} colors={COLORS} />
        
        {/* Client Growth */}
        <ClientGrowthChart data={clientGrowth} />
      </div>
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
