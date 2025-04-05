
import React from "react";
import { SalesChartProps } from "./types";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const mockTimeSeriesData = {
  day: [
    { name: "08:00", leads: 3, prospects: 1, clients: 0 },
    { name: "10:00", leads: 5, prospects: 2, clients: 1 },
    { name: "12:00", leads: 8, prospects: 3, clients: 1 },
    { name: "14:00", leads: 6, prospects: 4, clients: 2 },
    { name: "16:00", leads: 9, prospects: 5, clients: 3 },
    { name: "18:00", leads: 4, prospects: 3, clients: 1 },
    { name: "20:00", leads: 2, prospects: 1, clients: 0 },
  ],
  week: [
    { name: "Mon", leads: 12, prospects: 5, clients: 2 },
    { name: "Tue", leads: 19, prospects: 8, clients: 4 },
    { name: "Wed", leads: 15, prospects: 10, clients: 6 },
    { name: "Thu", leads: 18, prospects: 12, clients: 7 },
    { name: "Fri", leads: 22, prospects: 15, clients: 8 },
    { name: "Sat", leads: 14, prospects: 9, clients: 5 },
    { name: "Sun", leads: 8, prospects: 4, clients: 2 },
  ],
  month: [
    { name: "1", leads: 20, prospects: 8, clients: 3 },
    { name: "5", leads: 24, prospects: 12, clients: 5 },
    { name: "10", leads: 32, prospects: 18, clients: 7 },
    { name: "15", leads: 40, prospects: 22, clients: 10 },
    { name: "20", leads: 36, prospects: 25, clients: 14 },
    { name: "25", leads: 45, prospects: 30, clients: 18 },
    { name: "30", leads: 52, prospects: 35, clients: 22 },
  ],
  quarter: [
    { name: "Gen", leads: 150, prospects: 60, clients: 20 },
    { name: "Feb", leads: 180, prospects: 75, clients: 35 },
    { name: "Mar", leads: 210, prospects: 90, clients: 45 },
  ],
  year: [
    { name: "Gen", leads: 180, prospects: 75, clients: 35 },
    { name: "Feb", leads: 160, prospects: 70, clients: 30 },
    { name: "Mar", leads: 210, prospects: 95, clients: 45 },
    { name: "Apr", leads: 240, prospects: 110, clients: 50 },
    { name: "Mag", leads: 280, prospects: 130, clients: 65 },
    { name: "Giu", leads: 320, prospects: 150, clients: 80 },
    { name: "Lug", leads: 360, prospects: 180, clients: 90 },
    { name: "Ago", leads: 340, prospects: 165, clients: 85 },
    { name: "Set", leads: 380, prospects: 190, clients: 100 },
    { name: "Ott", leads: 400, prospects: 210, clients: 110 },
    { name: "Nov", leads: 420, prospects: 220, clients: 120 },
    { name: "Dic", leads: 450, prospects: 240, clients: 130 },
  ],
  custom: [
    { name: "1/4", leads: 25, prospects: 10, clients: 5 },
    { name: "2/4", leads: 30, prospects: 15, clients: 7 },
    { name: "3/4", leads: 35, prospects: 18, clients: 9 },
    { name: "4/4", leads: 28, prospects: 14, clients: 6 },
    { name: "5/4", leads: 32, prospects: 16, clients: 8 },
    { name: "6/4", leads: 38, prospects: 19, clients: 11 },
    { name: "7/4", leads: 42, prospects: 22, clients: 14 },
  ],
};

export function SalesChart({ analytics, timeFrame }: SalesChartProps) {
  const chartConfig = {
    leads: {
      label: "Leads",
      theme: {
        light: "#3b82f6",  // blue-500
        dark: "#60a5fa"    // blue-400
      }
    },
    prospects: {
      label: "Prospects",
      theme: {
        light: "#10b981",  // emerald-500
        dark: "#34d399"    // emerald-400
      }
    },
    clients: {
      label: "Clients",
      theme: {
        light: "#f59e0b",  // amber-500
        dark: "#fbbf24"    // amber-400
      }
    }
  };

  const renderTimeframeChart = () => {
    // Use mock data instead of analytics.timeSeriesData
    const data = mockTimeSeriesData[timeFrame];
    
    return (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="name" 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
          axisLine={{ stroke: "#d1d5db" }}
        />
        <YAxis 
          stroke="#6b7280" 
          fontSize={12}
          tickLine={false}
          axisLine={{ stroke: "#d1d5db" }}
          tickFormatter={(value) => `${value}`}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Legend />
        <Bar dataKey="leads" name="Leads" fill="var(--color-leads)" radius={[4, 4, 0, 0]} barSize={20} />
        <Bar dataKey="prospects" name="Prospects" fill="var(--color-prospects)" radius={[4, 4, 0, 0]} barSize={20} />
        <Bar dataKey="clients" name="Clients" fill="var(--color-clients)" radius={[4, 4, 0, 0]} barSize={20} />
      </BarChart>
    );
  };

  return (
    <div className="w-full h-[300px]">
      <ChartContainer className="h-full" config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          {renderTimeframeChart()}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
