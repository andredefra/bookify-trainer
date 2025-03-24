
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
    <div className="space-y-4 max-w-full">
      <Card className="w-full shadow-sm">
        <CardHeader className="py-3">
          <CardTitle className="text-xl">Fitness Analytics</CardTitle>
          <CardDescription>
            Track your progress and visualize your fitness journey
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 space-y-3">
          <Alert className="bg-blue-50 border-blue-100">
            <InfoIcon className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-sm text-blue-700">
              Your analytics are based on your completed workouts and logged metrics.
            </AlertDescription>
          </Alert>
          
          <div className="grid gap-4">
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
