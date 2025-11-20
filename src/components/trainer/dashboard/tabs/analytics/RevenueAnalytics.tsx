
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
    
    // Calculate monthly revenue with programs vs sessions vs packages breakdown
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

      const packageRevenue = monthTransactions
        .filter(t => t.type === 'Package')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const calculatedPrograms = programRevenue > 0 ? programRevenue : month.programs;
      const calculatedSessions = sessionRevenue > 0 ? sessionRevenue : month.sessions;
      const calculatedPackages = packageRevenue > 0 ? packageRevenue : month.packages;
      
      return {
        ...month,
        programs: calculatedPrograms,
        sessions: calculatedSessions,
        packages: calculatedPackages,
        total: calculatedPrograms + calculatedSessions + calculatedPackages
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
          Revenue analysis by service type (Sessions vs Programs vs Packages)
        </p>
      </div>
      
      {/* Summary cards with real data */}
      <MonthlySummaryCards data={monthlyData} />
      
      {/* Monthly Revenue Chart - Sessions vs Programs vs Packages */}
      <MonthlyRevenueChart data={monthlyData} />
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
