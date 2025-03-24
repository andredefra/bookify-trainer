
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { WorkoutAnalytics } from "@/components/client/analytics/WorkoutAnalytics";

// Sample data for the charts - adjusted to match expected types
const weeklyWorkoutData = [
  { day: "Mon", minutes: 45, calories: 350 },
  { day: "Tue", minutes: 60, calories: 560 },
  { day: "Wed", minutes: 0, calories: 0 },
  { day: "Thu", minutes: 30, calories: 400 },
  { day: "Fri", minutes: 40, calories: 420 },
  { day: "Sat", minutes: 90, calories: 700 },
  { day: "Sun", minutes: 20, calories: 300 },
];

const monthlyGoalsData = [
  { type: "Weight Loss", current: 75, target: 100 },
  { type: "Cardio", current: 60, target: 100 },
  { type: "Strength", current: 85, target: 100 },
  { type: "Flexibility", current: 40, target: 100 },
];

const workoutTypesData = [
  { name: "HIIT", value: 12, color: "#0088FE" },
  { name: "Strength", value: 8, color: "#00C49F" },
  { name: "Cardio", value: 15, color: "#FFBB28" },
  { name: "Yoga", value: 6, color: "#FF8042" },
  { name: "Pilates", value: 4, color: "#8884d8" },
];

const progressHistoryData = [
  { week: "Jan", weight: 75, strength: 30, endurance: 40 },
  { week: "Feb", weight: 74, strength: 35, endurance: 42 },
  { week: "Mar", weight: 73, strength: 40, endurance: 45 },
  { week: "Apr", weight: 71, strength: 45, endurance: 50 },
  { week: "May", weight: 70, strength: 48, endurance: 55 },
  { week: "Jun", weight: 69, strength: 52, endurance: 60 },
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
              monthlyData={monthlyGoalsData}
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
