
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
import { GoalProgressItem } from "../types";
import { getGoalTypeLabel, GoalType } from "@/components/client/overview/fitness-progress/data/goalTemplates";

interface GoalsProgressChartProps {
  goalsData: GoalProgressItem[];
}

export function GoalsProgressChart({ goalsData }: GoalsProgressChartProps) {
  const isMobile = useIsMobile();
  
  const chartMargins = isMobile 
    ? { top: 20, right: 30, left: 20, bottom: 5 }
    : { top: 5, right: 60, left: 70, bottom: 5 };

  const maxLabelLength = Math.max(...goalsData.map(item => getGoalTypeLabel(item.type as GoalType).length));
  const yAxisWidth = isMobile 
    ? Math.min(maxLabelLength * 6, 80)
    : 100;

  const truncateLabel = (type: string) => {
    const label = getGoalTypeLabel(type as GoalType);
    if (!isMobile) return label;
    
    const maxLength = 14;
    if (label.length <= maxLength) return label;
    return `${label.slice(0, maxLength)}...`;
  };

  return (
    <div className="w-full h-[300px] sm:h-[320px] pb-4 px-1 sm:px-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={goalsData}
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
                    <p className="font-medium">{getGoalTypeLabel(data.type as GoalType)}</p>
                    <p className="text-xs text-muted-foreground">
                      Current: <span className="font-medium">{data.current} {data.unit}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Target: <span className="font-medium">{data.target} {data.unit}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Progress: <span className="font-medium">{data.progress}%</span>
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
            {goalsData.map((entry, index) => (
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
