
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, InfoIcon, Activity, Dumbbell, Flame, Target } from "lucide-react";
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
            
            {/* Stats row using improved layout and visual design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard 
                title="Completed Workouts" 
                value="32"
                change="+5"
                trend="up"
                period="vs last month" 
                icon={<Activity className="h-4 w-4" />}
                color="#4f46e5"
              />
              <StatCard 
                title="Active Days" 
                value="18/30"
                change="+2"
                trend="up"
                period="vs last month"
                icon={<TrendingUp className="h-4 w-4" />}
                color="#10b981"
              />
              <StatCard 
                title="Average Duration" 
                value="42 min"
                change="-3"
                trend="down"
                period="vs last month"
                icon={<Flame className="h-4 w-4" />}
                color="#f59e0b"
              />
              <StatCard 
                title="Goal Progress" 
                value="68%"
                change="+12%"
                trend="up"
                period="vs last month"
                icon={<Target className="h-4 w-4" />}
                color="#8884d8"
              />
            </div>

            {/* Detailed metrics cards with better layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard 
                title="Weekly Stats" 
                metrics={[
                  { label: "Workouts", value: "8", icon: <Dumbbell className="h-3 w-3" /> },
                  { label: "Total Time", value: "285 min", icon: <Activity className="h-3 w-3" /> },
                  { label: "Calories", value: "2,730", icon: <Flame className="h-3 w-3" /> }
                ]} 
              />
              <MetricCard 
                title="Current Status" 
                metrics={[
                  { label: "Weight", value: "68 kg", icon: <TrendingDown className="h-3 w-3 text-green-500" /> },
                  { label: "Body Fat", value: "18%", icon: <TrendingDown className="h-3 w-3 text-green-500" /> },
                  { label: "Muscle Mass", value: "31%", icon: <TrendingUp className="h-3 w-3 text-blue-500" /> }
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
    icon?: React.ReactNode;
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
            <div key={index} className="flex flex-col items-center">
              <div className="text-xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                {metric.icon}
                <span>{metric.label}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  period: string;
  icon?: React.ReactNode;
  color?: string;
}

function StatCard({ title, value, change, trend, period, icon, color }: StatCardProps) {
  return (
    <Card className="p-4 border-l-4" style={{ borderLeftColor: color || '#e5e7eb' }}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
        <div className="bg-gray-100 rounded-full p-1">
          {icon}
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-xl font-bold">{value}</span>
        <span className={`ml-2 text-xs font-medium flex items-center ${
          trend === "up" ? "text-green-600" : 
          trend === "down" ? "text-red-600" : 
          "text-gray-600"
        }`}>
          {change}
          {trend === "up" ? <ArrowUpRight className="h-3 w-3 ml-0.5" /> : 
           trend === "down" ? <ArrowDownRight className="h-3 w-3 ml-0.5" /> : null}
        </span>
      </div>
      <span className="text-xs text-muted-foreground">{period}</span>
    </Card>
  );
}
