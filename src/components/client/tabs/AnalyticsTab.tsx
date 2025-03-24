
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { WorkoutAnalytics } from "@/components/client/analytics/WorkoutAnalytics";
import { StatisticsSection } from "../analytics/sections/StatisticsSection";
import { 
  weeklyWorkoutData, 
  monthlyGoalsData, 
  workoutTypesData, 
  progressHistoryData 
} from "../analytics/data/sampleData";

export function AnalyticsTab() {
  return (
    <div className="space-y-6 w-full">
      <Card className="w-full shadow-sm bg-white/80 backdrop-blur-sm border-slate-200">
        <CardHeader className="py-5 px-6">
          <CardTitle className="text-xl font-bold text-slate-800">Fitness Analytics Dashboard</CardTitle>
          <CardDescription className="text-slate-600">
            Track your progress and visualize your fitness journey with real-time data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 lg:p-6">
          <Alert className="bg-blue-50 border-blue-100 shadow-sm mb-6">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-sm text-blue-700">
              Your analytics are based on your manually logged workouts and metrics.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-8">
            <WorkoutAnalytics 
              weeklyData={weeklyWorkoutData}
              monthlyData={monthlyGoalsData}
              workoutTypes={workoutTypesData}
              progressHistory={progressHistoryData}
            />
            
            <StatisticsSection />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
