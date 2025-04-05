
import React from "react";
import { SalesChartProps } from "./types";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,  
  ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export function SalesChart({ analytics, timeFrame }: SalesChartProps) {
  const chartConfig = {
    leads: {
      label: "Leads",
      theme: {
        light: "#3b82f6",  // blue-500
        dark: "#60a5fa"    // blue-400
      }
    }
  };

  const renderTimeframeChart = () => {
    return (
      <BarChart data={analytics.timeSeriesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <Bar dataKey="value" name="leads" fill="var(--color-leads)" />
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
