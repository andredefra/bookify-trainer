
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
        <div className="bg-white p-2 shadow-md border rounded">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            Minutes: <span className="font-medium">{payload[0].value}</span>
          </p>
          <p className="text-sm text-muted-foreground">
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
        <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={renderTooltipContent} />
          <Bar dataKey="minutes" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="calories" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  } else if (chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={weeklyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={renderTooltipContent} />
          <Line type="monotone" dataKey="minutes" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  } else if (chartType === "area") {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={weeklyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={renderTooltipContent} />
          <Area type="monotone" dataKey="minutes" fill="#4f46e5" stroke="#4f46e5" fillOpacity={0.2} />
          <Area type="monotone" dataKey="calories" fill="#10b981" stroke="#10b981" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  
  return null;
}
