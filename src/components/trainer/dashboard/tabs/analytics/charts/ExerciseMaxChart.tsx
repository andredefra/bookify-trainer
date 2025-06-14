import React, { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ExerciseMaxDataPoint } from "../types/exerciseTypes";
import { formatWeight, formatReps } from "../utils/exerciseCalculations";
import { availableExercises } from "../data/exerciseMaxData";

interface ExerciseMaxChartProps {
  data: ExerciseMaxDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg max-w-xs">
        <p className="font-medium text-gray-900 text-sm">{label}</p>
        <div className="space-y-1 mt-2">
          <p className="text-xs text-gray-600">
            1RM: <span className="font-medium text-blue-600">{formatWeight(data.oneRM)}</span>
          </p>
          <p className="text-xs text-gray-600">
            10RM: <span className="font-medium text-green-600">{formatWeight(data.tenRM)}</span>
          </p>
          <div className="border-t pt-1 mt-2">
            <p className="text-xs text-gray-500">Based on:</p>
            <p className="text-xs text-gray-600">
              {formatWeight(data.weight)} × {formatReps(data.reps)}
            </p>
            {data.clientName && (
              <p className="text-xs text-gray-500">{data.clientName}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const StatsCards = ({ data, isMobile }: { data: ExerciseMaxDataPoint[], isMobile: boolean }) => {
  const bestLift = data.length > 0 ? data.reduce((prev, current) => (prev.oneRM > current.oneRM) ? prev : current) : null;
  const avgOneRM = data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.oneRM, 0) / data.length) : 0;
  const totalExercises = data.length;

  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-4'} text-sm`}>
      <div className={`bg-gray-50 ${isMobile ? 'p-3' : 'p-4'} rounded-lg`}>
        <p className="font-medium text-gray-700 mb-2">Strongest Lift</p>
        <p className={`text-gray-600 ${isMobile ? 'text-xs' : ''}`}>
          {bestLift ? bestLift.exercise : "No data"}
        </p>
        <p className={`text-blue-600 font-medium mt-1 ${isMobile ? 'text-sm' : ''}`}>
          {bestLift ? formatWeight(bestLift.oneRM) : "0kg"}
        </p>
      </div>
      <div className={`bg-gray-50 ${isMobile ? 'p-3' : 'p-4'} rounded-lg`}>
        <p className="font-medium text-gray-700 mb-2">Average 1RM</p>
        <p className={`text-gray-600 ${isMobile ? 'text-xs' : ''}`}>Across all exercises</p>
        <p className={`text-green-600 font-medium mt-1 ${isMobile ? 'text-sm' : ''}`}>
          {formatWeight(avgOneRM)}
        </p>
      </div>
      <div className={`bg-gray-50 ${isMobile ? 'p-3' : 'p-4'} rounded-lg`}>
        <p className="font-medium text-gray-700 mb-2">Exercises Tracked</p>
        <p className={`text-gray-600 ${isMobile ? 'text-xs' : ''}`}>Total movements</p>
        <p className={`text-purple-600 font-medium mt-1 ${isMobile ? 'text-sm' : ''}`}>
          {totalExercises}
        </p>
      </div>
    </div>
  );
};

export function ExerciseMaxChart({ data }: ExerciseMaxChartProps) {
  const isMobile = useIsMobile();
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  // Filter data based on selected exercises
  const filteredData = selectedExercises.length > 0 
    ? data.filter(item => selectedExercises.includes(item.exercise))
    : data;

  // Sort by 1RM descending
  const sortedData = [...filteredData].sort((a, b) => b.oneRM - a.oneRM);

  // Color bars based on 1RM strength
  const getBarColor = (dataPoint: ExerciseMaxDataPoint) => {
    if (dataPoint.oneRM >= 120) return "#10b981"; // Green for very strong
    if (dataPoint.oneRM >= 80) return "#3b82f6"; // Blue for strong
    if (dataPoint.oneRM >= 50) return "#f59e0b"; // Amber for moderate
    return "#ef4444"; // Red for beginner
  };

  // Safety check for empty data
  if (!data || data.length === 0) {
    return (
      <Card className="border border-gray-200">
        <CardContent className={isMobile ? "p-4" : "p-6"}>
          <div className={`flex items-center justify-center ${isMobile ? 'h-[200px]' : 'h-[300px]'} bg-gray-50 rounded-lg border-2 border-dashed border-gray-300`}>
            <div className="text-center">
              <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No exercise data available</p>
              <p className="text-gray-400 text-sm">Exercise maxes will appear here once workout data is logged</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 rounded-md p-1.5">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium`}>Exercise Maxes (1RM)</h3>
              <p className="text-xs text-muted-foreground">Calculated from recent lifts</p>
            </div>
          </div>
          
          {/* Exercise Filter */}
          <div className={`${isMobile ? 'w-full' : 'w-64'}`}>
            <Select value={selectedExercises.join(',')} onValueChange={(value) => {
              setSelectedExercises(value ? value.split(',') : []);
            }}>
              <SelectTrigger className="bg-white border border-gray-300 shadow-sm">
                <SelectValue placeholder="Filter exercises" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                <SelectItem value="">All Exercises</SelectItem>
                {availableExercises.map((exercise) => (
                  <SelectItem key={exercise} value={exercise}>
                    {exercise}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Legend */}
        <div className={`flex ${isMobile ? 'flex-col gap-2' : 'items-center gap-4'} text-xs mb-4`}>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
            <span className={isMobile ? 'text-xs' : ''}>120kg+ (Advanced)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
            <span className={isMobile ? 'text-xs' : ''}>80-120kg (Intermediate)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-500 rounded mr-1"></div>
            <span className={isMobile ? 'text-xs' : ''}>50-80kg (Beginner)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
            <span className={isMobile ? 'text-xs' : ''}>Under 50kg (Novice)</span>
          </div>
        </div>

        {/* Chart Section */}
        <div className={`${isMobile ? 'h-[300px]' : 'h-[400px]'} w-full bg-white rounded border`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={sortedData}
              layout="vertical"
              margin={chartMargins}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, 'dataMax + 20']}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize }}
                label={{ value: 'Weight (kg)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                type="category" 
                dataKey="exercise" 
                width={yAxisWidth}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="oneRM" 
                radius={[0, 4, 4, 0]}
                barSize={barSize}
              >
                {sortedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Cards Section */}
        <div className={isMobile ? "mt-4" : "mt-6"}>
          <StatsCards data={filteredData} isMobile={isMobile} />
        </div>
      </CardContent>
    </Card>
  );
}