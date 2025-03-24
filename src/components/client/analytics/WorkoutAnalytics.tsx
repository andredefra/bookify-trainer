
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
    <Card className="col-span-12">
      <CardHeader>
        <ChartHeader 
          title="Workout Analytics"
          description="Track your workout patterns and progress"
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span>Workout Types</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <AreaChartIcon className="h-4 w-4" />
              <span>Monthly Goals</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span>Progress</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="space-y-4">
            <WeeklyActivityChart weeklyData={weeklyData} chartType={chartType} />
          </TabsContent>
          
          <TabsContent value="types" className="space-y-4">
            <WorkoutTypesChart workoutTypes={workoutTypes} />
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-4">
            <MonthlyGoalsChart monthlyData={monthlyData} />
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <div className="flex justify-end mb-4">
              <Select value={progressMetric} onValueChange={setProgressMetric}>
                <SelectTrigger className="w-[150px]">
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
