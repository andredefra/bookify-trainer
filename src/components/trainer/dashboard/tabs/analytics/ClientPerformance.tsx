
import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for client performance analytics
const performanceData = [
  { name: 'Week 1', attendance: 80, progress: 60, satisfaction: 75 },
  { name: 'Week 2', attendance: 85, progress: 65, satisfaction: 80 },
  { name: 'Week 3', attendance: 90, progress: 70, satisfaction: 85 },
  { name: 'Week 4', attendance: 88, progress: 75, satisfaction: 90 },
  { name: 'Week 5', attendance: 92, progress: 80, satisfaction: 88 },
  { name: 'Week 6', attendance: 95, progress: 85, satisfaction: 92 },
];

const retentionData = [
  { name: '1-3 months', value: 45, color: '#FF8042' },
  { name: '3-6 months', value: 30, color: '#FFBB28' },
  { name: '6-12 months', value: 15, color: '#00C49F' },
  { name: '1+ year', value: 10, color: '#0088FE' },
];

const goalAchievementData = [
  { name: 'Weight Loss', achieved: 65, total: 100 },
  { name: 'Strength', achieved: 80, total: 100 },
  { name: 'Endurance', achieved: 70, total: 100 },
  { name: 'Flexibility', achieved: 55, total: 100 },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function ClientPerformance() {
  const [timeframe, setTimeframe] = useState("weekly");
  
  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Performance Metrics Chart */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-base font-medium mb-4">Client Performance Metrics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={performanceData}
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
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
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
                />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="satisfaction" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Retention */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-base font-medium mb-4">Client Retention</h3>
            <div className="h-[300px] flex items-center justify-center">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={retentionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={true}
                    >
                      {retentionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Clients']}
                      contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Goal Achievement */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-base font-medium mb-4">Goal Achievement</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={goalAchievementData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    width={70}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar 
                    dataKey="achieved" 
                    fill="#4f46e5" 
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                    label={{ position: 'right', formatter: (value) => `${value}%`, fill: '#6b7280', fontSize: 12 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
