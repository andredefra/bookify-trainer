
import { Card, CardContent } from "@/components/ui/card";
import { MonthlyRevenueDataPoint } from "../types";
import { RevenueBreakdown } from "../data/enhancedRevenueData";

interface EnhancedSummaryCardsProps {
  data: MonthlyRevenueDataPoint[];
  revenueBreakdown: RevenueBreakdown;
}

export function EnhancedSummaryCards({ data, revenueBreakdown }: EnhancedSummaryCardsProps) {
  // Calculate totals from data
  const totalRevenue = data.reduce((sum, month) => sum + month.total, 0);
  const totalClientRevenue = data.reduce((sum, month) => sum + (month.clientRevenue || 0), 0);
  const totalOccasionalRevenue = data.reduce((sum, month) => sum + (month.occasionalRevenue || 0), 0);
  
  // Calculate monthly averages
  const monthlyAverage = totalRevenue / data.length;
  const avgMonthlyGrowth = data.length > 1 ? 
    ((data[data.length - 1].total - data[0].total) / data[0].total * 100) / (data.length - 1) : 0;

  const cards = [
    {
      title: "Total Revenue (6 months)",
      value: `€${totalRevenue.toLocaleString()}`,
      subtitle: `Monthly average: €${Math.round(monthlyAverage).toLocaleString()}`,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Recurring Clients",
      value: `€${revenueBreakdown.clientsRevenue.toLocaleString()}`,
      subtitle: `${Math.round((revenueBreakdown.clientsRevenue / totalRevenue) * 100)}% of total`,
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Occasional Participants", 
      value: `€${revenueBreakdown.occasionalParticipantsRevenue.toLocaleString()}`,
      subtitle: `${Math.round((revenueBreakdown.occasionalParticipantsRevenue / totalRevenue) * 100)}% of total`,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Average Client Value",
      value: `€${Math.round(revenueBreakdown.averageClientValue)}`,
      subtitle: `Average growth: ${avgMonthlyGrowth > 0 ? '+' : ''}${avgMonthlyGrowth.toFixed(1)}%/month`,
      color: "bg-orange-50 border-orange-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <Card key={index} className={`${card.color}`}>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              {card.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {card.value}
            </p>
            <p className="text-xs text-gray-500">
              {card.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
