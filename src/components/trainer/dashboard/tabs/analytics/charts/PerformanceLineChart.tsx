
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { PerformanceDataPoint } from "../types";

interface PerformanceLineChartProps {
  data: PerformanceDataPoint[];
}

export function PerformanceLineChart({ data }: PerformanceLineChartProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-base font-medium mb-4">Client Performance Metrics</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="#94a3b8"
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={(value, name) => {
                  const metricName = name === 'attendance' ? 'Attendance' : 
                                   name === 'progress' ? 'Progress (BMI/Weight)' : 
                                   'Goals Reached';
                  return [`${value}%`, metricName];
                }}
                contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
              />
              <Legend iconSize={10} />
              <Line 
                type="monotone" 
                dataKey="attendance" 
                stroke="#4f46e5" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Attendance"
              />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Progress (BMI/Weight)"
              />
              <Line 
                type="monotone" 
                dataKey="goalsReached" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Goals Reached"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-500 rounded mr-2"></div>
            <span className="text-gray-600">Attendance: Sessions completed vs scheduled</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-600">Progress: BMI/Weight improvement toward target</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-amber-500 rounded mr-2"></div>
            <span className="text-gray-600">Goals Reached: Percentage of goals achieved (≥90%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
