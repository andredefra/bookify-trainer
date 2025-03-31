
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
import { useIsMobile } from "@/hooks/use-mobile";

interface MonthlyGoal {
  type: string;
  current: number;
  target: number;
}

interface MonthlyGoalsChartProps {
  monthlyData: MonthlyGoal[];
}

export function MonthlyGoalsChart({ monthlyData }: MonthlyGoalsChartProps) {
  const isMobile = useIsMobile();
  
  // Optimized margins to better utilize space, especially on the left
  const chartMargins = isMobile 
    ? { top: 20, right: 30, left: 20, bottom: 5 } // Reduced left margin on mobile
    : { top: 5, right: 60, left: 70, bottom: 5 }; // Reduced left margin on desktop too

  // Calculate max length of labels
  const maxLabelLength = Math.max(...monthlyData.map(item => item.type.length));
  const yAxisWidth = isMobile 
    ? Math.min(maxLabelLength * 6, 80) // Reduced width to free up space
    : 100; // Reduced width on desktop as well

  // Truncate labels function
  const truncateLabel = (label: string) => {
    if (!isMobile) return label;
    
    const maxLength = 14; // Increased max length for better readability
    if (label.length <= maxLength) return label;
    return `${label.slice(0, maxLength)}...`;
  };

  return (
    <div className="w-full h-[300px] sm:h-[320px] pb-4 px-1 sm:px-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={monthlyData}
          margin={chartMargins}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis 
            type="number" 
            axisLine={false} 
            tickLine={false} 
            domain={[0, 'dataMax']}
            tick={{ fontSize: isMobile ? 10 : 12 }} 
            height={20}
            tickCount={isMobile ? 3 : 5}
          />
          <YAxis 
            dataKey="type" 
            type="category" 
            axisLine={false} 
            tickLine={false}
            width={yAxisWidth}
            tick={{ 
              fontSize: isMobile ? 10 : 12,
              textAnchor: "end",
              fill: "#6b7280" 
            }}
            tickFormatter={truncateLabel}
            tickMargin={isMobile ? 5 : 6}
            padding={{ top: 20, bottom: 20 }}
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
          <Bar 
            dataKey="current" 
            fill="#4f46e5" 
            radius={[3, 3, 3, 3]}
            barSize={isMobile ? 14 : 20}
          >
            {monthlyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.current >= entry.target ? "#10b981" : "#4f46e5"} />
            ))}
            <LabelList 
              dataKey="current" 
              position="right"
              formatter={(value, entry) => {
                if (entry && entry.payload && entry.payload.target !== undefined) {
                  return `${value}/${entry.payload.target}`;
                }
                return `${value}`;
              }}
              style={{ 
                fill: "#6b7280", 
                fontSize: isMobile ? 9 : 12,
                fontWeight: "normal",
                textAnchor: "start"
              }}
              offset={isMobile ? 8 : 10}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
