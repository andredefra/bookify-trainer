
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { GoalAchievementDataPoint } from "../types";
import { Badge } from "@/components/ui/badge";

interface GoalAchievementChartProps {
  data: GoalAchievementDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-600">Achievement Rate: <span className="font-medium text-blue-600">{data.achieved}%</span></p>
        <p className="text-sm text-gray-600">
          Status: <Badge variant={data.onTrack ? "default" : "destructive"} className="ml-1">
            {data.onTrack ? "On Track" : "Behind Schedule"}
          </Badge>
        </p>
        {data.avgTimeToComplete > 0 && (
          <p className="text-sm text-gray-600">Avg. Time: <span className="font-medium">{data.avgTimeToComplete} days</span></p>
        )}
      </div>
    );
  }
  return null;
};

export function GoalAchievementChart({ data }: GoalAchievementChartProps) {
  // Color bars based on whether goals are on track
  const getBarColor = (dataPoint: GoalAchievementDataPoint) => {
    if (dataPoint.achieved >= 80) return "#10b981"; // Green for high achievement
    if (dataPoint.achieved >= 60) return "#f59e0b"; // Amber for medium achievement
    return "#ef4444"; // Red for low achievement
  };

  // Safety check for empty data
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-[450px]">
            <p className="text-gray-500">No goal data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Goal Achievement by Type</h3>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span>80%+ Achievement</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded mr-2"></div>
              <span>60-79% Achievement</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
              <span>Below 60%</span>
            </div>
          </div>
        </div>
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={110}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="achieved" 
                radius={[0, 4, 4, 0]}
                barSize={35}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-700 mb-2">Best Performing Goal</p>
            <p className="text-gray-600">
              {data.length > 0 ? data.reduce((prev, current) => (prev.achieved > current.achieved) ? prev : current).name : "No data"}
            </p>
            <p className="text-green-600 font-medium mt-1">
              {data.length > 0 ? `${data.reduce((prev, current) => (prev.achieved > current.achieved) ? prev : current).achieved}%` : "0%"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-700 mb-2">Needs Attention</p>
            <p className="text-gray-600">
              {data.length > 0 ? data.reduce((prev, current) => (prev.achieved < current.achieved) ? prev : current).name : "No data"}
            </p>
            <p className="text-red-600 font-medium mt-1">
              {data.length > 0 ? `${data.reduce((prev, current) => (prev.achieved < current.achieved) ? prev : current).achieved}%` : "0%"}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-700 mb-2">Average Achievement</p>
            <p className="text-gray-600">Across all goal types</p>
            <p className="text-blue-600 font-medium mt-1">
              {data.length > 0 ? `${Math.round(data.reduce((sum, item) => sum + item.achieved, 0) / data.length)}%` : "0%"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
