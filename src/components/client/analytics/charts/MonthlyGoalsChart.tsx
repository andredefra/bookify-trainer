
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
        margin={{ top: 2, right: 25, left: 35, bottom: 2 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" axisLine={false} tickLine={false} domain={[0, 'dataMax']} />
        <YAxis 
          dataKey="type" 
          type="category" 
          axisLine={false} 
          tickLine={false}
          width={60}
          tick={{ fontSize: 11 }}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-2 shadow-md border rounded">
                  <p className="font-medium">{data.type}</p>
                  <p className="text-sm text-muted-foreground">
                    Current: <span className="font-medium">{data.current}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
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
            style={{ fill: "#6b7280", fontSize: "10px" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
