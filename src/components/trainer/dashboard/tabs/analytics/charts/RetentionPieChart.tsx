
import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { RetentionDataPoint } from "../types";

interface RetentionPieChartProps {
  data: RetentionDataPoint[];
  colors: string[];
}

export function RetentionPieChart({ data, colors }: RetentionPieChartProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-base font-medium mb-4">Client Retention</h3>
        <div className="flex flex-col items-center h-[300px]">
          <div className="h-[200px] w-[200px] mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Clients']}
                  contentStyle={{ 
                    borderRadius: '4px', 
                    border: '1px solid #e2e8f0',
                    fontSize: '14px',
                    padding: '10px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {data.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div 
                  className="w-3 h-3 mr-2" 
                  style={{ backgroundColor: entry.color || colors[index % colors.length] }}
                />
                <span className="text-sm">{entry.name} ({entry.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
