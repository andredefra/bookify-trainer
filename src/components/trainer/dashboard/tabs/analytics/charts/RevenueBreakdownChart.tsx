
import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { RevenueBreakdown } from "../data/enhancedRevenueData";

interface RevenueBreakdownChartProps {
  data: Array<{name: string; value: number; color: string}>;
  colors: string[];
  revenueBreakdown: RevenueBreakdown;
}

export function RevenueBreakdownChart({ data, colors, revenueBreakdown }: RevenueBreakdownChartProps) {
  // Create real data from transactions
  const realData = [
    { 
      name: 'Clienti Ricorrenti', 
      value: revenueBreakdown.clientsRevenue,
      percentage: (revenueBreakdown.clientsRevenue / revenueBreakdown.totalRevenue * 100).toFixed(1)
    },
    { 
      name: 'Partecipanti Occasionali', 
      value: revenueBreakdown.occasionalParticipantsRevenue,
      percentage: (revenueBreakdown.occasionalParticipantsRevenue / revenueBreakdown.totalRevenue * 100).toFixed(1)
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-base font-medium mb-4">Breakdown Revenue per Tipo</h3>
        <div className="flex items-center justify-center min-h-[250px] gap-6">
          {/* Legend on the left */}
          <div className="space-y-3">
            {realData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div 
                  className="w-4 h-4 mr-3 rounded" 
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{entry.name}</div>
                  <div className="text-gray-600">€{entry.value} ({entry.percentage}%)</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pie chart on the right */}
          <div className="h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={realData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={false}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {realData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`€${value}`, '']}
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    color: '#111827'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
