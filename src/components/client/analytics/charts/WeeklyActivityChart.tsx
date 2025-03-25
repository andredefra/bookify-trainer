
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
        <div className="bg-white p-2 shadow-md border rounded text-xs">
          <p className="font-medium">{label}</p>
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

  if (chartType === "bar") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData} margin={{ top: 2, right: 5, left: 0, bottom: 2 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
          <Tooltip content={renderTooltipContent} />
          <Bar dataKey="minutes" fill="#4f46e5" radius={[2, 2, 0, 0]} />
          <Bar dataKey="calories" fill="#10b981" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  } else if (chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={weeklyData} margin={{ top: 2, right: 5, left: 0, bottom: 2 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
          <Tooltip content={renderTooltipContent} />
          <Line type="monotone" dataKey="minutes" stroke="#4f46e5" strokeWidth={1.5} dot={{ r: 1.5 }} />
          <Line type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={1.5} dot={{ r: 1.5 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  } else if (chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={weeklyData} margin={{ top: 2, right: 5, left: 0, bottom: 2 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
          <Tooltip content={renderTooltipContent} />
          <Area type="monotone" dataKey="minutes" fill="#4f46e5" stroke="#4f46e5" fillOpacity={0.2} />
          <Area type="monotone" dataKey="calories" fill="#10b981" stroke="#10b981" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  
  return null;
}
