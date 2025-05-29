
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
import { useIsMobile } from "@/hooks/use-mobile";

interface GoalAchievementChartProps {
  data: GoalAchievementDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg max-w-xs">
        <p className="font-medium text-gray-900 text-sm">{label}</p>
        <p className="text-xs text-gray-600">Achievement Rate: <span className="font-medium text-blue-600">{data.achieved}%</span></p>
        <p className="text-xs text-gray-600 flex items-center gap-1">
          Status: <Badge variant={data.onTrack ? "default" : "destructive"} className="text-xs">
            {data.onTrack ? "On Track" : "Behind Schedule"}
          </Badge>
        </p>
        {data.avgTimeToComplete > 0 && (
          <p className="text-xs text-gray-600">Avg. Time: <span className="font-medium">{data.avgTimeToComplete} days</span></p>
        )}
      </div>
    );
  }
  return null;
};

const ColorLegend = ({ isMobile }: { isMobile: boolean }) => (
  <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-4'} text-xs`}>
    <div className="flex items-center gap-1">
      <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
      <span className={isMobile ? 'text-xs' : ''}>80%+ Achievement</span>
    </div>
    <div className="flex items-center gap-1">
      <div className="w-3 h-3 bg-amber-500 rounded mr-1"></div>
      <span className={isMobile ? 'text-xs' : ''}>60-79% Achievement</span>
    </div>
    <div className="flex items-center gap-1">
      <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
      <span className={isMobile ? 'text-xs' : ''}>Below 60%</span>
    </div>
  </div>
);

const StatsCards = ({ data, isMobile }: { data: GoalAchievementDataPoint[], isMobile: boolean }) => {
  const bestPerforming = data.length > 0 ? data.reduce((prev, current) => (prev.achieved > current.achieved) ? prev : current) : null;
  const needsAttention = data.length > 0 ? data.reduce((prev, current) => (prev.achieved < current.achieved) ? prev : current) : null;
  const avgAchievement = data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.achieved, 0) / data.length) : 0;

  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-4'} text-sm`}>
      <div className={`bg-gray-50 ${isMobile ? 'p-3' : 'p-4'} rounded-lg`}>
        <p className="font-medium text-gray-700 mb-2">Best Performing Goal</p>
        <p className={`text-gray-600 ${isMobile ? 'text-xs' : ''}`}>
          {bestPerforming ? bestPerforming.name : "No data"}
        </p>
        <p className={`text-green-600 font-medium mt-1 ${isMobile ? 'text-sm' : ''}`}>
          {bestPerforming ? `${bestPerforming.achieved}%` : "0%"}
        </p>
      </div>
      <div className={`bg-gray-50 ${isMobile ? 'p-3' : 'p-4'} rounded-lg`}>
        <p className="font-medium text-gray-700 mb-2">Needs Attention</p>
        <p className={`text-gray-600 ${isMobile ? 'text-xs' : ''}`}>
          {needsAttention ? needsAttention.name : "No data"}
        </p>
        <p className={`text-red-600 font-medium mt-1 ${isMobile ? 'text-sm' : ''}`}>
          {needsAttention ? `${needsAttention.achieved}%` : "0%"}
        </p>
      </div>
      <div className={`bg-gray-50 ${isMobile ? 'p-3' : 'p-4'} rounded-lg`}>
        <p className="font-medium text-gray-700 mb-2">Average Achievement</p>
        <p className={`text-gray-600 ${isMobile ? 'text-xs' : ''}`}>Across all goal types</p>
        <p className={`text-blue-600 font-medium mt-1 ${isMobile ? 'text-sm' : ''}`}>
          {avgAchievement}%
        </p>
      </div>
    </div>
  );
};

export function GoalAchievementChart({ data }: GoalAchievementChartProps) {
  const isMobile = useIsMobile();

  // Debug logging
  console.log("GoalAchievementChart received data:", data);
  console.log("isMobile:", isMobile);

  // Color bars based on whether goals are on track
  const getBarColor = (dataPoint: GoalAchievementDataPoint) => {
    if (dataPoint.achieved >= 80) return "#10b981"; // Green for high achievement
    if (dataPoint.achieved >= 60) return "#f59e0b"; // Amber for medium achievement
    return "#ef4444"; // Red for low achievement
  };

  // Safety check for empty data
  if (!data || data.length === 0) {
    console.log("No goal data available - showing empty state");
    return (
      <Card className="border border-gray-200">
        <CardContent className={isMobile ? "p-4" : "p-6"}>
          <div className={`flex items-center justify-center ${isMobile ? 'h-[200px]' : 'h-[300px]'} bg-gray-50 rounded-lg border-2 border-dashed border-gray-300`}>
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-2">No goal data available</p>
              <p className="text-gray-400 text-sm">Goal achievements will appear here once data is available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Responsive configurations - using fixed Tailwind classes
  const chartMargins = isMobile 
    ? { top: 5, right: 10, left: 80, bottom: 5 }
    : { top: 5, right: 30, left: 120, bottom: 5 };
  const yAxisWidth = isMobile ? 75 : 110;
  const fontSize = isMobile ? 10 : 12;
  const barSize = isMobile ? 20 : 30;

  return (
    <Card className="border border-gray-200">
      <CardContent className={isMobile ? "p-4" : "p-6"}>
        {/* Header Section */}
        <div className={`flex ${isMobile ? 'flex-col gap-3' : 'items-start justify-between'} mb-4`}>
          <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium`}>Goal Achievement by Type</h3>
          {!isMobile && <ColorLegend isMobile={false} />}
        </div>
        
        {/* Mobile Legend */}
        {isMobile && (
          <div className="mb-4">
            <ColorLegend isMobile={true} />
          </div>
        )}

        {/* Chart Section - Using fixed Tailwind classes instead of dynamic */}
        <div className={`${isMobile ? 'h-[300px]' : 'h-[400px]'} w-full bg-white rounded border`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              layout="vertical"
              margin={chartMargins}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={yAxisWidth}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="achieved" 
                radius={[0, 4, 4, 0]}
                barSize={barSize}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Cards Section */}
        <div className={isMobile ? "mt-4" : "mt-6"}>
          <StatsCards data={data} isMobile={isMobile} />
        </div>
      </CardContent>
    </Card>
  );
}
