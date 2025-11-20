
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { MonthlyRevenueDataPoint } from "../types";

interface MonthlyRevenueChartProps {
  data: MonthlyRevenueDataPoint[];
  title?: string;
}

export function MonthlyRevenueChart({ data, title = "Monthly Revenue" }: MonthlyRevenueChartProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-base font-medium mb-4">{title}</h3>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
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
                formatter={(value) => [`€${value}`, ""]}
                contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
              />
              <Legend iconSize={10} />
              <Line type="monotone" dataKey="programs" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="sessions" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="packages" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
