
import React from "react";
import { User, Scale, Heart, Activity, ChevronDown, ChevronUp, Dumbbell, PieChart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  PieChart as RechartsBar,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";

export function BodyMetrics() {
  const bodyCompositionData = [
    { name: "Muscle", value: 31, color: "#8b5cf6" },
    { name: "Fat", value: 18, color: "#f97316" },
    { name: "Water", value: 43, color: "#0ea5e9" },
    { name: "Other", value: 8, color: "#64748b" }
  ];

  return (
    <Card className="shadow-md hover:shadow-lg transition-all bg-white border-slate-200">
      <CardContent className="p-5">
        <h3 className="text-base font-semibold mb-4 flex items-center text-slate-800">
          <User className="h-5 w-5 mr-2 text-purple-600" />
          <span>Body Composition</span>
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-center h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBar>
                <Pie
                  data={bodyCompositionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {bodyCompositionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2 shadow-lg border rounded">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm">{data.value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RechartsBar>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-1">
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Scale className="h-4 w-4 text-slate-600 mr-1.5" />
                <span className="text-sm text-slate-700">Weight</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-slate-900">68 kg</span>
                <ChevronDown className="h-3 w-3 ml-1 text-green-600" />
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center">
                <Activity className="h-4 w-4 text-slate-600 mr-1.5" />
                <span className="text-sm text-slate-700">BMI</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-slate-900">23.1</span>
                <span className="text-xs ml-1 px-1.5 py-0.5 bg-green-100 text-green-800 rounded">Normal</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
