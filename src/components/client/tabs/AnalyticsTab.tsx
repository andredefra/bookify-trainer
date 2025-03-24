
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { WorkoutAnalytics } from "@/components/client/analytics/WorkoutAnalytics";

// Sample data for the charts 
const weeklyWorkoutData = [
  { day: "Mon", workouts: 1, calories: 350, duration: 45 },
  { day: "Tue", workouts: 2, calories: 560, duration: 60 },
  { day: "Wed", workouts: 0, calories: 0, duration: 0 },
  { day: "Thu", workouts: 1, calories: 400, duration: 30 },
  { day: "Fri", workouts: 1, calories: 420, duration: 40 },
  { day: "Sat", workouts: 2, calories: 700, duration: 90 },
  { day: "Sun", workouts: 1, calories: 300, duration: 20 },
];

const monthlyGoalsData = [
  { type: "Weight Loss", progress: 75, target: 100 },
  { type: "Cardio", progress: 60, target: 100 },
  { type: "Strength", progress: 85, target: 100 },
  { type: "Flexibility", progress: 40, target: 100 },
];

const workoutTypesData = [
  { name: "HIIT", sessions: 12 },
  { name: "Strength", sessions: 8 },
  { name: "Cardio", sessions: 15 },
  { name: "Yoga", sessions: 6 },
  { name: "Pilates", sessions: 4 },
];

const progressHistoryData = [
  { month: "Jan", weight: 75, strength: 30, endurance: 40 },
  { month: "Feb", weight: 74, strength: 35, endurance: 42 },
  { month: "Mar", weight: 73, strength: 40, endurance: 45 },
  { month: "Apr", weight: 71, strength: 45, endurance: 50 },
  { month: "May", weight: 70, strength: 48, endurance: 55 },
  { month: "Jun", weight: 69, strength: 52, endurance: 60 },
];

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <Card>
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
          
          <div className="grid gap-6">
            <WorkoutAnalytics 
              weeklyData={weeklyWorkoutData}
              monthlyGoals={monthlyGoalsData}
              workoutTypes={workoutTypesData}
              progressHistory={progressHistoryData}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MetricCard 
                title="Weekly Stats" 
                metrics={[
                  { label: "Workouts", value: "8" },
                  { label: "Total Time", value: "285 min" },
                  { label: "Calories", value: "2,730" }
                ]} 
              />
              <MetricCard 
                title="Current Status" 
                metrics={[
                  { label: "Weight", value: "68 kg" },
                  { label: "Body Fat", value: "18%" },
                  { label: "Muscle Mass", value: "31%" }
                ]} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

function MetricCard({ title, metrics }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
