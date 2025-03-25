
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface ProgressHistoryItem {
  week: string;
  weight: number;
  strength: number;
  endurance: number;
}

interface ProgressChartProps {
  progressHistory: ProgressHistoryItem[];
  progressMetric: string;
}

export function ProgressChart({ progressHistory, progressMetric }: ProgressChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={progressHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="week" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-2 shadow-md border rounded">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm text-muted-foreground">
                    Weight: <span className="font-medium">{data.weight} kg</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Strength: <span className="font-medium">{data.strength}/10</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Endurance: <span className="font-medium">{data.endurance}/10</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        {progressMetric === "all" ? (
          <>
            <Line type="monotone" dataKey="weight" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="strength" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="endurance" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
          </>
        ) : (
          <Line type="monotone" dataKey={progressMetric} stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}
