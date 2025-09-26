import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target } from "lucide-react";
import { PerformanceDataPoint } from "../types";

interface ClientProgressChartProps {
  data: PerformanceDataPoint[];
  clientName?: string;
}

export function ClientProgressChart({ data, clientName }: ClientProgressChartProps) {
  const overallProgress = data.length > 0 
    ? Math.round(data.reduce((sum, point) => sum + point.progress, 0) / data.length)
    : 0;

  const progressTrend = data.length >= 2 
    ? data[data.length - 1].progress - data[0].progress
    : 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 rounded-md p-1.5">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-medium">
                {clientName ? `${clientName}'s Progress Tracking` : 'Client Progress Tracking'}
              </h3>
              <p className="text-xs text-muted-foreground">Weight, goals and fitness progression</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
            <div className={`text-xs flex items-center gap-1 ${progressTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <Target className="h-3 w-3" />
              {progressTrend >= 0 ? '+' : ''}{progressTrend.toFixed(1)}% trend
            </div>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={data}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                axisLine={false}
                tickLine={false}
                fontSize={12}
              />
              <YAxis 
                stroke="#94a3b8"
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                fontSize={12}
              />
              <Tooltip 
                formatter={(value, name) => {
                  const metricName = name === 'attendance' ? 'Session Attendance' : 
                                   name === 'progress' ? 'Weight/Body Progress' : 
                                   'Goals Achievement';
                  return [`${value}%`, metricName];
                }}
                contentStyle={{ 
                  borderRadius: '8px', 
                  border: '1px solid #e2e8f0',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              
              <Area 
                type="monotone" 
                dataKey="progress" 
                stroke="#4f46e5" 
                strokeWidth={2}
                fill="url(#progressGradient)"
                name="Body Progress"
              />
              <Area 
                type="monotone" 
                dataKey="attendance" 
                stroke="#10b981" 
                strokeWidth={2}
                fill="url(#attendanceGradient)"
                name="Session Attendance"
              />
              <Area 
                type="monotone" 
                dataKey="goalsReached" 
                stroke="#f59e0b" 
                strokeWidth={3}
                fill="rgba(245, 158, 11, 0.2)"
                name="Goals Achievement"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center bg-blue-50 p-3 rounded-lg">
            <div className="w-3 h-3 bg-blue-500 rounded mr-3"></div>
            <div>
              <span className="font-medium text-blue-700">Body Progress</span>
              <p className="text-xs text-blue-600">Weight/BMI improvement toward target</p>
            </div>
          </div>
          <div className="flex items-center bg-green-50 p-3 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded mr-3"></div>
            <div>
              <span className="font-medium text-green-700">Attendance</span>
              <p className="text-xs text-green-600">Sessions completed vs scheduled</p>
            </div>
          </div>
          <div className="flex items-center bg-amber-50 p-3 rounded-lg">
            <div className="w-3 h-3 bg-amber-500 rounded mr-3"></div>
            <div>
              <span className="font-medium text-amber-700">Goals Achievement</span>
              <p className="text-xs text-amber-600">Percentage of goals achieved (≥90%)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}