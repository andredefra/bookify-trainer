
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface WorkoutType {
  name: string;
  value: number;
  color: string;
}

interface WorkoutTypesChartProps {
  workoutTypes: WorkoutType[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function WorkoutTypesChart({ workoutTypes }: WorkoutTypesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={workoutTypes}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={40}
          fill="#8884d8"
          dataKey="value"
          label={({ name }) => name}
          fontSize={8}
        >
          {workoutTypes.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-1 shadow-md border rounded text-xs">
                  <p className="font-medium text-xs">{data.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Sessions: <span className="font-medium">{data.value}</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
