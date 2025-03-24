
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart2, PieChart as PieChartIcon, AreaChart as AreaChartIcon, LineChart as LineChartIcon } from "lucide-react";

// Import our new types
import { WorkoutAnalyticsProps } from "./types";

// Import our new chart components
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
    <Card className="col-span-12 border shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <ChartHeader 
          title="Workout Analytics"
          description="Track your workout patterns and progress"
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="activity" className="space-y-2">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-2 bg-slate-50 p-1 rounded-md w-full">
            <TabsTrigger value="activity" className="flex items-center gap-1.5 text-xs md:text-sm">
              <BarChart2 className="h-3.5 w-3.5" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center gap-1.5 text-xs md:text-sm">
              <PieChartIcon className="h-3.5 w-3.5" />
              <span>Workout Types</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-1.5 text-xs md:text-sm">
              <AreaChartIcon className="h-3.5 w-3.5" />
              <span>Monthly Goals</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-1.5 text-xs md:text-sm">
              <LineChartIcon className="h-3.5 w-3.5" />
              <span>Progress</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="m-0">
            <WeeklyActivityChart weeklyData={weeklyData} chartType={chartType} />
          </TabsContent>
          
          <TabsContent value="types" className="m-0">
            <WorkoutTypesChart workoutTypes={workoutTypes} />
          </TabsContent>
          
          <TabsContent value="goals" className="m-0">
            <MonthlyGoalsChart monthlyData={monthlyData} />
          </TabsContent>
          
          <TabsContent value="progress" className="m-0">
            <div className="flex justify-end mb-2">
              <Select value={progressMetric} onValueChange={setProgressMetric}>
                <SelectTrigger className="w-[120px] h-8 text-xs">
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
