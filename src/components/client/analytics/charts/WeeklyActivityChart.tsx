
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart, 
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface WeeklyDataItem {
  day: string;
  minutes: number;
  calories: number;
}

interface WeeklyActivityChartProps {
  weeklyData: WeeklyDataItem[];
  chartType: string;
}

export function WeeklyActivityChart({ weeklyData, chartType }: WeeklyActivityChartProps) {
  const renderTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-1 shadow-md border rounded text-xs">
          <p className="font-medium text-xs">{label}</p>
          <p className="text-xs text-muted-foreground">
            Minutes: <span className="font-medium">{payload[0].value}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Calories: <span className="font-medium">{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const commonProps = {
    data: weeklyData,
    margin: { top: 0, right: 0, left: 0, bottom: 0 }
  };

  if (chartType === "bar") {
    return (
      <ResponsiveContainer width="100%" height={120}>
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
          <Tooltip content={renderTooltipContent} />
          <Bar dataKey="minutes" fill="#4f46e5" radius={[2, 2, 0, 0]} maxBarSize={8} />
          <Bar dataKey="calories" fill="#10b981" radius={[2, 2, 0, 0]} maxBarSize={8} />
        </BarChart>
      </ResponsiveContainer>
    );
  } else if (chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={120}>
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
          <Tooltip content={renderTooltipContent} />
          <Line type="monotone" dataKey="minutes" stroke="#4f46e5" strokeWidth={1} dot={{ r: 1 }} />
          <Line type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={1} dot={{ r: 1 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  } else if (chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8 }} />
          <Tooltip content={renderTooltipContent} />
          <Area type="monotone" dataKey="minutes" fill="#4f46e5" stroke="#4f46e5" fillOpacity={0.2} />
          <Area type="monotone" dataKey="calories" fill="#10b981" stroke="#10b981" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  
  return null;
}
