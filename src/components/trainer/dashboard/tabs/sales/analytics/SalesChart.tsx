
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const mockTimeSeriesData = {
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
    { name: "Jan", leads: 150, prospects: 60, clients: 20 },
    { name: "Feb", leads: 180, prospects: 75, clients: 35 },
    { name: "Mar", leads: 210, prospects: 90, clients: 45 },
  ],
  year: [
    { name: "Jan", leads: 180, prospects: 75, clients: 35 },
    { name: "Feb", leads: 160, prospects: 70, clients: 30 },
    { name: "Mar", leads: 210, prospects: 95, clients: 45 },
    { name: "Apr", leads: 240, prospects: 110, clients: 50 },
    { name: "May", leads: 280, prospects: 130, clients: 65 },
    { name: "Jun", leads: 320, prospects: 150, clients: 80 },
    { name: "Jul", leads: 360, prospects: 180, clients: 90 },
    { name: "Aug", leads: 340, prospects: 165, clients: 85 },
    { name: "Sep", leads: 380, prospects: 190, clients: 100 },
    { name: "Oct", leads: 400, prospects: 210, clients: 110 },
    { name: "Nov", leads: 420, prospects: 220, clients: 120 },
    { name: "Dec", leads: 450, prospects: 240, clients: 130 },
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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isVeryNarrow = useMediaQuery("(max-width: 480px)");
  
  const chartConfig = {
    leads: {
      label: "Leads",
      theme: {
        light: "#3b82f6",
        dark: "#60a5fa"
      }
    },
    prospects: {
      label: "Prospects", 
      theme: {
        light: "#10b981",
        dark: "#34d399"
      }
    },
    clients: {
      label: "Clients",
      theme: {
        light: "#f59e0b",
        dark: "#fbbf24"
      }
    }
  };

  const renderTimeframeChart = () => {
    const data = mockTimeSeriesData[timeFrame];
    
    return (
      <ResponsiveContainer width="100%" height={isMobile ? 300 : 500}>
        <BarChart 
          data={data}
          margin={{ 
            right: isVeryNarrow ? 8 : isMobile ? 12 : isTablet ? 16 : 24, 
            left: isVeryNarrow ? 8 : isMobile ? 12 : 16, 
            bottom: isVeryNarrow ? 25 : isMobile ? 30 : 20,
            top: isVeryNarrow ? 15 : 20
          }}
        >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="name" 
          stroke="#6b7280" 
          fontSize={isVeryNarrow ? 10 : isMobile ? 11 : 12}
          tickLine={false}
          axisLine={{ stroke: "#d1d5db" }}
          interval={isVeryNarrow ? 'preserveStartEnd' : isMobile ? 'preserveStartEnd' : 0}
          tick={{ fontSize: isVeryNarrow ? 10 : isMobile ? 11 : 12 }}
        />
        <YAxis 
          stroke="#6b7280" 
          fontSize={isVeryNarrow ? 10 : isMobile ? 11 : 12}
          tickLine={false}
          axisLine={{ stroke: "#d1d5db" }}
          tickFormatter={(value) => `${value}`}
          width={isVeryNarrow ? 25 : isMobile ? 30 : 40}
          tick={{ fontSize: isVeryNarrow ? 10 : isMobile ? 11 : 12 }}
        />
        <Tooltip />
        {!isMobile && <Legend fontSize={10} />}
        <Bar 
          dataKey="leads" 
          name="Leads" 
          fill="#3b82f6"
          radius={[1, 1, 0, 0]} 
          barSize={isVeryNarrow ? 12 : isMobile ? 14 : isTablet ? 16 : 20}
        />
        <Bar 
          dataKey="prospects" 
          name="Prospects" 
          fill="#10b981"
          radius={[1, 1, 0, 0]} 
          barSize={isVeryNarrow ? 12 : isMobile ? 14 : isTablet ? 16 : 20} 
        />
        <Bar 
          dataKey="clients" 
          name="Clients" 
          fill="#f59e0b"
          radius={[1, 1, 0, 0]} 
          barSize={isVeryNarrow ? 12 : isMobile ? 14 : isTablet ? 16 : 20} 
        />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // Render chart directly without containers
  const chartContent = renderTimeframeChart();

  return (
    <div className="w-full mt-2 md:mt-4">
      <div className="relative w-full border border-border/20 rounded-lg bg-card/50 p-4">
        {chartContent}
      </div>
    </div>
  );
}
