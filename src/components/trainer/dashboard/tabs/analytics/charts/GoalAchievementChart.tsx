
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { GoalAchievementDataPoint } from "../types";

interface GoalAchievementChartProps {
  data: GoalAchievementDataPoint[];
}

export function GoalAchievementChart({ data }: GoalAchievementChartProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-base font-medium mb-4">Goal Achievement</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={70}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
              />
              <Bar 
                dataKey="achieved" 
                fill="#4f46e5" 
                radius={[0, 4, 4, 0]}
                barSize={30}
                label={{ position: 'right', formatter: (value: number) => `${value}%`, fill: '#6b7280', fontSize: 12 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
