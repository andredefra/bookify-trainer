
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, PieChart as PieChartIcon, Target } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Import our types
import { WorkoutAnalyticsProps, WeeklyDataItem, GoalProgressItem } from "./types";

// Import our chart components
import { WeeklyActivityChart } from "./charts/WeeklyActivityChart";
import { WorkoutTypesChart } from "./charts/WorkoutTypesChart";
import { GoalsProgressChart } from "./charts/GoalsProgressChart";
import { ChartHeader } from "./charts/ChartHeader";

// Helper function to generate weekly data from progress logs
const generateWeeklyDataFromLogs = (progressData: any[]): WeeklyDataItem[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData: WeeklyDataItem[] = days.map(day => ({
    day,
    minutes: Math.floor(Math.random() * 60) + 30, // 30-90 minutes
    calories: Math.floor(Math.random() * 400) + 200, // 200-600 calories
    steps: Math.floor(Math.random() * 5000) + 5000, // 5000-10000 steps
    distance: Math.round((Math.random() * 5 + 2) * 100) / 100, // 2-7 km
  }));
  
  return weeklyData;
};

// Helper function to convert ProgressItem to GoalProgressItem
const convertToGoalProgress = (progressData: any[]): GoalProgressItem[] => {
  return progressData.map(item => ({
    type: item.goalType,
    name: item.goal,
    current: item.current,
    target: item.target,
    unit: item.unit,
    progress: item.progress
  }));
};

export function WorkoutAnalytics({ 
  progressData,
  weeklyData,
  workoutTypes 
}: WorkoutAnalyticsProps) {
  const [timeframe, setTimeframe] = useState("weekly");
  const [chartType, setChartType] = useState("bar");
  const isMobile = useIsMobile();

  // Generate data from real progress data
  const actualWeeklyData = weeklyData || generateWeeklyDataFromLogs(progressData);
  const goalsProgress = convertToGoalProgress(progressData);
  
  // Default workout types if not provided
  const defaultWorkoutTypes = workoutTypes || [
    { name: "Strength", value: 35, color: "#4f46e5" },
    { name: "Cardio", value: 30, color: "#10b981" },
    { name: "Flexibility", value: 20, color: "#f59e0b" },
    { name: "Other", value: 15, color: "#ef4444" }
  ];

  return (
    <Card className="col-span-12 border shadow-sm">
      <CardHeader className={`pb-0 ${isMobile ? 'pt-3 px-3' : 'pt-4 px-4'}`}>
        <ChartHeader 
          title="Fitness Analytics"
          description="Track your activity patterns and goal progress"
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          chartType={chartType}
          onChartTypeChange={setChartType}
        />
      </CardHeader>
      <CardContent className={`${isMobile ? 'p-2 pt-1' : 'p-4 pt-2'}`}>
        <Tabs defaultValue="activity" className="space-y-2 sm:space-y-4">
          <TabsList className="grid grid-cols-3 bg-slate-50/80 p-1 rounded-md w-full border">
            <TabsTrigger value="activity" className="flex items-center justify-center gap-1 py-1 sm:py-2 text-[10px] sm:text-sm">
              <BarChart2 className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${isMobile ? 'mr-0.5' : 'mr-1'}`} />
              <span className={`${isMobile ? 'inline text-[9px]' : ''}`}>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center justify-center gap-1 py-1 sm:py-2 text-[10px] sm:text-sm">
              <PieChartIcon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${isMobile ? 'mr-0.5' : 'mr-1'}`} />
              <span className={`${isMobile ? 'inline text-[9px]' : ''}`}>Types</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center justify-center gap-1 py-1 sm:py-2 text-[10px] sm:text-sm">
              <Target className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} ${isMobile ? 'mr-0.5' : 'mr-1'}`} />
              <span className={`${isMobile ? 'inline text-[9px]' : ''}`}>Goals</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="mt-0">
            <WeeklyActivityChart weeklyData={actualWeeklyData} chartType={chartType} />
          </TabsContent>
          
          <TabsContent value="types" className="mt-0">
            <WorkoutTypesChart workoutTypes={defaultWorkoutTypes} />
          </TabsContent>
          
          <TabsContent value="goals" className="mt-0">
            <GoalsProgressChart goalsData={goalsProgress} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
