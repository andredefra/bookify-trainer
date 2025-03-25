
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList
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
    <div className="w-full h-[120px] flex justify-center">
      <BarChart
        width={400}
        height={120}
        layout="vertical"
        data={monthlyData}
        margin={{ top: 0, right: 10, left: 15, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" axisLine={false} tickLine={false} domain={[0, 'dataMax']} tick={{ fontSize: 8 }} />
        <YAxis 
          dataKey="type" 
          type="category" 
          axisLine={false} 
          tickLine={false}
          width={60}
          tick={{ fontSize: 8 }}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-1 shadow-md border rounded text-xs">
                  <p className="font-medium text-xs">{data.type}</p>
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
        <Bar dataKey="current" fill="#4f46e5" radius={[3, 3, 3, 3]}>
          {monthlyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.current >= entry.target ? "#10b981" : "#4f46e5"} />
          ))}
          <LabelList 
            dataKey="current" 
            position="right" 
            formatter={(value: number, entry: any) => `${value}/${entry.target}`} 
            style={{ fill: "#6b7280", fontSize: "7px" }}
          />
        </Bar>
      </BarChart>
    </div>
  );
}
