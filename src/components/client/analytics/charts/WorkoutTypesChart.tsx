
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
    <div className="w-full h-[300px] flex flex-col items-center justify-center">
      <div className="h-[200px] w-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={workoutTypes}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={3}
              fill="#8884d8"
              dataKey="value"
            >
              {workoutTypes.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 shadow-md border rounded text-xs">
                      <p className="font-medium">{data.name}</p>
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
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {workoutTypes.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div 
              className="w-3 h-3 mr-1" 
              style={{ backgroundColor: entry.color || COLORS[index % COLORS.length] }}
            />
            <span className="text-xs">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
