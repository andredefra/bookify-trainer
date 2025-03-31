
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
  
  // Significantly adjusted margins for mobile
  const chartMargins = isMobile 
    ? { top: 5, right: 30, left: 5, bottom: 5 }
    : { top: 5, right: 30, left: 120, bottom: 5 };

  // Calculate max length of labels
  const maxLabelLength = Math.max(...monthlyData.map(item => item.type.length));
  const yAxisWidth = isMobile 
    ? Math.min(maxLabelLength * 4, 70) // Limit width on mobile
    : 120;

  // Truncate labels function
  const truncateLabel = (label: string) => {
    if (!isMobile) return label;
    
    const maxLength = 8;
    if (label.length <= maxLength) return label;
    return `${label.slice(0, maxLength)}...`;
  };

  return (
    <div className="w-full h-[300px] sm:h-[320px] pb-4">
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
            tick={{ fontSize: isMobile ? 9 : 12 }} 
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
              fontSize: isMobile ? 8 : 12,
              textAnchor: isMobile ? 'start' : 'end',
              fill: "#6b7280" 
            }}
            tickFormatter={truncateLabel}
            tickMargin={isMobile ? 2 : 5}
            padding={{ top: 15, bottom: 15 }}
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
            barSize={isMobile ? 12 : 20}
          >
            {monthlyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.current >= entry.target ? "#10b981" : "#4f46e5"} />
            ))}
            <LabelList 
              dataKey="current" 
              position="right" 
              formatter={(value, entry) => {
                if (entry && entry.payload && entry.payload.target !== undefined) {
                  return isMobile 
                    ? `${value}/${entry.payload.target}`
                    : `${value} / ${entry.payload.target}`;
                }
                return `${value}`;
              }}
              style={{ 
                fill: "#6b7280", 
                fontSize: isMobile ? 8 : 12,
                fontWeight: "normal",
                textAnchor: "start",
                dy: 3
              }}
              offset={isMobile ? 2 : 5}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
