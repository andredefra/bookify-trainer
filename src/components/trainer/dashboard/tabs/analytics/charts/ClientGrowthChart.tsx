
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ClientGrowthDataPoint } from "../types";

interface ClientGrowthChartProps {
  data: ClientGrowthDataPoint[];
}

export function ClientGrowthChart({ data }: ClientGrowthChartProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-base font-medium mb-4">Client Growth</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
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
                axisLine={false} 
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
              />
              <Line 
                type="monotone" 
                dataKey="clients" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
