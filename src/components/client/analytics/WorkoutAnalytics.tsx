
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
      <CardHeader className="pb-0 pt-4 px-4">
        <ChartHeader 
          title="Workout Analytics"
          description="Track your workout patterns and progress"
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 bg-slate-50/80 p-1 rounded-md w-full border">
            <TabsTrigger value="activity" className="flex items-center justify-center gap-1 py-2">
              <BarChart2 className="h-4 w-4 mr-1" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center justify-center gap-1 py-2">
              <PieChartIcon className="h-4 w-4 mr-1" />
              <span>Workout Types</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center justify-center gap-1 py-2">
              <AreaChartIcon className="h-4 w-4 mr-1" />
              <span>Monthly Goals</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center justify-center gap-1 py-2">
              <LineChartIcon className="h-4 w-4 mr-1" />
              <span>Progress</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="mt-0">
            <WeeklyActivityChart weeklyData={weeklyData} chartType={chartType} />
          </TabsContent>
          
          <TabsContent value="types" className="mt-0">
            <WorkoutTypesChart workoutTypes={workoutTypes} />
          </TabsContent>
          
          <TabsContent value="goals" className="mt-0">
            <MonthlyGoalsChart monthlyData={monthlyData} />
          </TabsContent>
          
          <TabsContent value="progress" className="mt-0">
            <div className="flex justify-end mb-2">
              <Select value={progressMetric} onValueChange={setProgressMetric}>
                <SelectTrigger className="w-[140px] h-8">
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
