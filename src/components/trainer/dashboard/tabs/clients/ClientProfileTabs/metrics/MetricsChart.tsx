
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface MetricDataPoint {
  date: string;
  weight: number;
  bodyFat: number;
  musclePercentage: number;
}

interface MetricsChartProps {
  clientMetrics?: {
    weight: string;
    height: string;
    bodyFat: string;
  };
}

export function MetricsChart({ clientMetrics }: MetricsChartProps) {
  // Sample data - in a real application, this would come from an API or props
  const sampleData: MetricDataPoint[] = [
    { date: "Gen", weight: 80, bodyFat: 18, musclePercentage: 45 },
    { date: "Feb", weight: 79, bodyFat: 17, musclePercentage: 46 },
    { date: "Mar", weight: 78, bodyFat: 16, musclePercentage: 47 },
    { date: "Apr", weight: 77, bodyFat: 15, musclePercentage: 48 },
    { date: "Mag", weight: 76, bodyFat: 14, musclePercentage: 50 },
    { date: "Giu", weight: 75, bodyFat: 13, musclePercentage: 52 }
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sampleData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "4px",
              border: "1px solid #e2e8f0",
              fontSize: "12px"
            }}
          />
          <Legend 
            align="center"
            verticalAlign="bottom"
            iconSize={10}
            wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
          />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Peso (kg)"
          />
          <Line
            type="monotone"
            dataKey="bodyFat"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Grasso Corporeo (%)"
          />
          <Line
            type="monotone"
            dataKey="musclePercentage"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Massa Muscolare (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
