
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart2, PieChart as PieChartIcon, AreaChart as AreaChartIcon, LineChart as LineChartIcon } from "lucide-react";

// Import our types
import { WorkoutAnalyticsProps } from "./types";

// Import our chart components
import { WeeklyActivityChart } from "./charts/WeeklyActivityChart";
import { WorkoutTypesChart } from "./charts/WorkoutTypesChart";
import { MonthlyGoalsChart } from "./charts/MonthlyGoalsChart";
import { ProgressChart } from "./charts/ProgressChart";
import { ChartHeader } from "./charts/ChartHeader";

export function WorkoutAnalytics({ 
  weeklyData, 
  monthlyData, 
  workoutTypes, 
  progressHistory 
}: WorkoutAnalyticsProps) {
  const [timeframe, setTimeframe] = useState("weekly");
  const [chartType, setChartType] = useState("bar");
  const [progressMetric, setProgressMetric] = useState("weight");

  return (
    <Card className="col-span-12 border bg-white shadow-sm">
      <CardHeader className="pb-0 pt-3 px-3">
        <ChartHeader 
          title="Workout Analytics"
          description="Track your workout patterns and progress"
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />
      </CardHeader>
      <CardContent className="p-1">
        <Tabs defaultValue="activity" className="space-y-0">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-2 bg-slate-50/80 p-1 rounded-md w-full border">
            <TabsTrigger value="activity" className="flex items-center justify-center gap-1 text-xs py-1 px-2">
              <BarChart2 className="h-3 w-3" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center justify-center gap-1 text-xs py-1 px-2">
              <PieChartIcon className="h-3 w-3" />
              <span>Workout Types</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center justify-center gap-1 text-xs py-1 px-2">
              <AreaChartIcon className="h-3 w-3" />
              <span>Monthly Goals</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center justify-center gap-1 text-xs py-1 px-2">
              <LineChartIcon className="h-3 w-3" />
              <span>Progress</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="m-0 p-0">
            <WeeklyActivityChart weeklyData={weeklyData} chartType={chartType} />
          </TabsContent>
          
          <TabsContent value="types" className="m-0 p-0">
            <WorkoutTypesChart workoutTypes={workoutTypes} />
          </TabsContent>
          
          <TabsContent value="goals" className="m-0 p-0">
            <MonthlyGoalsChart monthlyData={monthlyData} />
          </TabsContent>
          
          <TabsContent value="progress" className="m-0 p-0">
            <div className="flex justify-end mb-1">
              <Select value={progressMetric} onValueChange={setProgressMetric}>
                <SelectTrigger className="w-[100px] h-6 text-xs">
                  <SelectValue placeholder="Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight">Weight</SelectItem>
                  <SelectItem value="strength">Strength</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="all">All Metrics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ProgressChart progressHistory={progressHistory} progressMetric={progressMetric} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
