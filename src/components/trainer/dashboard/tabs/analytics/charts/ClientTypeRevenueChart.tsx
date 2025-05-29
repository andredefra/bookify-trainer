
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { EnhancedRevenueDataPoint } from "../data/enhancedRevenueData";

interface ClientTypeRevenueChartProps {
  data: EnhancedRevenueDataPoint[];
}

export function ClientTypeRevenueChart({ data }: ClientTypeRevenueChartProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-base font-medium mb-4">Revenue per Tipo di Cliente</h3>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                tickFormatter={(value) => `€${value}`}
                axisLine={false} 
                tickLine={false}
              />
              <Tooltip 
                formatter={(value, name) => [`€${value}`, name === 'clientRevenue' ? 'Clienti Ricorrenti' : 'Partecipanti Occasionali']}
                contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
              />
              <Legend 
                iconSize={10}
                formatter={(value) => value === 'clientRevenue' ? 'Clienti Ricorrenti' : 'Partecipanti Occasionali'}
              />
              <Bar dataKey="clientRevenue" fill="#0088FE" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="occasionalRevenue" fill="#00C49F" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
