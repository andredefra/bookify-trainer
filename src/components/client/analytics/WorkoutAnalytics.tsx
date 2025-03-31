
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart2, PieChart as PieChartIcon, AreaChart as AreaChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  return (
    <Card className="col-span-12 border shadow-sm">
      <CardHeader className={`pb-0 ${isMobile ? 'pt-3 px-3' : 'pt-4 px-4'}`}>
        <ChartHeader 
          title="Workout Analytics"
          description="Track your workout patterns and progress"
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />
      </CardHeader>
      <CardContent className={`${isMobile ? 'p-2 pt-1' : 'p-4 pt-2'}`}>
        <Tabs defaultValue="activity" className="space-y-2 sm:space-y-4">
          <TabsList className="grid grid-cols-4 bg-slate-50/80 p-1 rounded-md w-full border">
            <TabsTrigger value="activity" className="flex items-center justify-center gap-1 py-1 sm:py-2 text-[10px] sm:text-sm">
              <BarChart2 className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${isMobile ? 'mr-0.5' : 'mr-1'}`} />
              <span className={`${isMobile ? 'inline text-[9px]' : ''}`}>Act</span>
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center justify-center gap-1 py-1 sm:py-2 text-[10px] sm:text-sm">
              <PieChartIcon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${isMobile ? 'mr-0.5' : 'mr-1'}`} />
              <span className={`${isMobile ? 'inline text-[9px]' : ''}`}>Type</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center justify-center gap-1 py-1 sm:py-2 text-[10px] sm:text-sm">
              <AreaChartIcon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${isMobile ? 'mr-0.5' : 'mr-1'}`} />
              <span className={`${isMobile ? 'inline text-[9px]' : ''}`}>Goal</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center justify-center gap-1 py-1 sm:py-2 text-[10px] sm:text-sm">
              <LineChartIcon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${isMobile ? 'mr-0.5' : 'mr-1'}`} />
              <span className={`${isMobile ? 'inline text-[9px]' : ''}`}>Prog</span>
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
            <div className="flex justify-end mb-1 sm:mb-2">
              <Select value={progressMetric} onValueChange={setProgressMetric}>
                <SelectTrigger className={`${isMobile ? 'w-[95px] h-7 text-xs px-2' : 'w-[140px] h-8'}`}>
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
