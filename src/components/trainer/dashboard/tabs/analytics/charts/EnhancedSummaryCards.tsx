
import React from "react";
import { EnhancedRevenueDataPoint, RevenueBreakdown } from "../data/enhancedRevenueData";
import { Users, TrendingUp, Euro, Target } from "lucide-react";

interface EnhancedSummaryCardsProps {
  data: EnhancedRevenueDataPoint[];
  revenueBreakdown: RevenueBreakdown;
}

export function EnhancedSummaryCards({ data, revenueBreakdown }: EnhancedSummaryCardsProps) {
  // Calculate summary metrics from mock data
  const totalRevenue = data.reduce((sum, month) => sum + month.total, 0);
  const totalClientRevenue = data.reduce((sum, month) => sum + month.clientRevenue, 0);
  const totalOccasionalRevenue = data.reduce((sum, month) => sum + month.occasionalRevenue, 0);
  
  const clientRevenuePercentage = (totalClientRevenue / totalRevenue) * 100;
  const lastMonthTotal = data[data.length - 1].total;
  const prevMonthTotal = data[data.length - 2].total;
  const monthOverMonthGrowth = ((lastMonthTotal - prevMonthTotal) / prevMonthTotal) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Euro className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Revenue da Clienti</div>
            <div className="text-2xl font-bold">€{revenueBreakdown.clientsRevenue.toFixed(0)}</div>
            <div className="text-xs text-blue-600">{clientRevenuePercentage.toFixed(1)}% del totale</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-full">
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Revenue Occasionali</div>
            <div className="text-2xl font-bold">€{revenueBreakdown.occasionalParticipantsRevenue.toFixed(0)}</div>
            <div className="text-xs text-green-600">{(100 - clientRevenuePercentage).toFixed(1)}% del totale</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <Target className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Valore Medio Cliente</div>
            <div className="text-2xl font-bold">€{revenueBreakdown.averageClientValue.toFixed(0)}</div>
            <div className="text-xs text-purple-600">Per transazione</div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <TrendingUp className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">Crescita Mensile</div>
            <div className="text-2xl font-bold">{monthOverMonthGrowth > 0 ? '+' : ''}{monthOverMonthGrowth.toFixed(1)}%</div>
            <div className={`text-xs ${monthOverMonthGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              vs mese precedente
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
