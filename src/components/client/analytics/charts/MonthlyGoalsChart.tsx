
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  ResponsiveContainer
} from "recharts";

interface MonthlyGoal {
  type: string;
  current: number;
  target: number;
}

interface MonthlyGoalsChartProps {
  monthlyData: MonthlyGoal[];
}

export function MonthlyGoalsChart({ monthlyData }: MonthlyGoalsChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={monthlyData}
        margin={{ top: 2, right: 25, left: 30, bottom: 2 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" axisLine={false} tickLine={false} domain={[0, 'dataMax']} tick={{ fontSize: 9 }} />
        <YAxis 
          dataKey="type" 
          type="category" 
          axisLine={false} 
          tickLine={false}
          width={50}
          tick={{ fontSize: 9 }}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-2 shadow-md border rounded text-xs">
                  <p className="font-medium">{data.type}</p>
                  <p className="text-xs text-muted-foreground">
                    Current: <span className="font-medium">{data.current}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Goal: <span className="font-medium">{data.target}</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="current" fill="#4f46e5" radius={[4, 4, 4, 4]}>
          {monthlyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.current >= entry.target ? "#10b981" : "#4f46e5"} />
          ))}
          <LabelList 
            dataKey="current" 
            position="right" 
            formatter={(value: number, entry: any) => `${value}/${entry.target}`} 
            style={{ fill: "#6b7280", fontSize: "8px" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
