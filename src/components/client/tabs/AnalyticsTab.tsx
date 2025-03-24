
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
    <div className="space-y-6 max-w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Fitness Analytics</CardTitle>
          <CardDescription>
            Track your progress and visualize your fitness journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              Your analytics are based on your completed workouts and logged metrics.
            </AlertDescription>
          </Alert>
          
          <div className="grid gap-6 w-full">
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
