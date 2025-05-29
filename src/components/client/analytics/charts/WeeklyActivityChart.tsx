
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
  Legend,
  ResponsiveContainer
} from "recharts";

interface WeeklyDataItem {
  day: string;
  minutes: number;
  calories: number;
  steps: number;
  distance: number;
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
            Minutes: <span className="font-medium">{payload[0]?.value || 0}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Calories: <span className="font-medium">{payload[1]?.value || 0}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Steps: <span className="font-medium">{payload[2]?.value || 0}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-4 pb-2">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-muted-foreground font-medium">
              {entry.value === 'minutes' ? 'Minutes' : 'Calories'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "bar" ? (
          <BarChart 
            data={weeklyData} 
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
            />
            <Tooltip content={renderTooltipContent} />
            <Legend content={renderCustomLegend} />
            <Bar dataKey="minutes" fill="#4f46e5" radius={[3, 3, 0, 0]} />
            <Bar dataKey="calories" fill="#10b981" radius={[3, 3, 0, 0]} />
          </BarChart>
        ) : chartType === "line" ? (
          <LineChart 
            data={weeklyData} 
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
            />
            <Tooltip content={renderTooltipContent} />
            <Legend content={renderCustomLegend} />
            <Line type="monotone" dataKey="minutes" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        ) : (
          <AreaChart 
            data={weeklyData} 
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
            />
            <Tooltip content={renderTooltipContent} />
            <Legend content={renderCustomLegend} />
            <Area type="monotone" dataKey="minutes" fill="#4f46e5" stroke="#4f46e5" fillOpacity={0.3} />
            <Area type="monotone" dataKey="calories" fill="#10b981" stroke="#10b981" fillOpacity={0.3} />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
