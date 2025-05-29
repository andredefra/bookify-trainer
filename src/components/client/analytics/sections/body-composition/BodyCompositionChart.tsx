
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";
import { calculateBodyComposition } from "@/components/client/overview/fitness-progress/utils";

interface BodyCompositionChartProps {
  latestMeasurements: BodyMeasurements | null;
}

export function BodyCompositionChart({ latestMeasurements }: BodyCompositionChartProps) {
  const isMobile = useIsMobile();
  
  // Calculate body composition
  const bodyComposition = latestMeasurements ? calculateBodyComposition(latestMeasurements) : null;
  
  // Body composition data for pie chart
  const compositionData = [
    { name: "Muscle", value: 35, color: "#8b5cf6" },
    { name: "Fat", value: bodyComposition?.bodyFatPercentage || 18, color: "#f97316" },
    { name: "Water", value: 40, color: "#0ea5e9" },
    { name: "Other", value: 7, color: "#64748b" }
  ];

  // Normalize data to 100%
  const total = compositionData.reduce((sum, item) => sum + item.value, 0);
  const normalizedData = compositionData.map(item => ({
    ...item,
    value: Math.round((item.value / total) * 100)
  }));

  return (
    <Card className="lg:col-span-1 shadow-sm hover:shadow-md transition-all bg-white border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
          <User className="h-5 w-5 text-purple-600" />
          Body Composition
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-center h-32 mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={normalizedData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
                paddingAngle={2}
                dataKey="value"
              >
                {normalizedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-2 shadow-lg border rounded text-xs">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm">{data.value}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-1 text-xs">
          {normalizedData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-1">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600">{entry.name}: {entry.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
