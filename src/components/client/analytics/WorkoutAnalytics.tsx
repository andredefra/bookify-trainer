import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart2, PieChart as PieChartIcon, AreaChart as AreaChartIcon, LineChart as LineChartIcon } from "lucide-react";

interface WorkoutAnalyticsProps {
  weeklyData: {
    day: string;
    workouts: number;
    calories: number;
    duration: number;
  }[];
  monthlyGoals: {
    type: string;
    progress: number;
    target: number;
  }[];
  workoutTypes: {
    name: string;
    sessions: number;
  }[];
  progressHistory: {
    month: string;
    weight: number;
    strength: number;
    endurance: number;
  }[];
}

const COLORS = ['#8b5cf6', '#0ea5e9', '#f97316', '#ef4444', '#10b981', '#f59e0b'];

export function WorkoutAnalytics({ 
  weeklyData, 
  monthlyGoals, 
  workoutTypes,
  progressHistory 
}: WorkoutAnalyticsProps) {
  const [activeTab, setActiveTab] = useState("weekly");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Workout Analytics</CardTitle>
            <CardDescription>Visualize your fitness progress over time</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Weekly</span>
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Monthly</span>
            </TabsTrigger>
            <TabsTrigger value="workoutTypes" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Workout Types</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <AreaChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-4">
            <WeeklyWorkoutChart data={weeklyData} />
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <MonthlyGoalsChart data={monthlyGoals} />
          </TabsContent>

          <TabsContent value="workoutTypes" className="space-y-4">
            <WorkoutTypesPieChart data={workoutTypes} />
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <ProgressHistoryChart data={progressHistory} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function WeeklyWorkoutChart({ data }: { data: WorkoutAnalyticsProps['weeklyData'] }) {
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Workouts & Calories Burned</div>
      <div className="h-[300px] w-full">
        <ChartContainer 
          config={{
            workouts: {
              label: "Workouts",
              color: "#8b5cf6",
            },
            calories: {
              label: "Calories",
              color: "#ef4444",
            }
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
              />
              <Bar 
                yAxisId="left" 
                dataKey="workouts" 
                fill="var(--color-workouts)" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
                name="workouts"
              />
              <Bar 
                yAxisId="right" 
                dataKey="calories" 
                fill="var(--color-calories)" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
                name="calories"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="text-sm font-medium mt-6">Workout Duration (minutes)</div>
      <div className="h-[200px] w-full">
        <ChartContainer 
          config={{
            duration: {
              label: "Minutes",
              color: "#0ea5e9",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />} 
              />
              <Area 
                type="monotone" 
                dataKey="duration" 
                stroke="var(--color-duration)" 
                fill="var(--color-duration)" 
                fillOpacity={0.2}
                name="duration"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}

function MonthlyGoalsChart({ data }: { data: WorkoutAnalyticsProps['monthlyGoals'] }) {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer 
        config={Object.fromEntries(
          data.map(item => [
            item.type,
            { 
              label: item.type,
              color: COLORS[data.findIndex(x => x.type === item.type) % COLORS.length]
            }
          ])
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" axisLine={false} tickLine={false} domain={[0, 'dataMax']} />
            <YAxis 
              dataKey="type" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              width={100}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip 
              content={
                ({active, payload}) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="p-2 bg-background border rounded shadow text-xs">
                        <p className="font-medium">{data.type}</p>
                        <p>{data.progress} / {data.target} ({Math.round(data.progress/data.target*100)}%)</p>
                      </div>
                    );
                  }
                  return null;
                }
              } 
            />
            <Bar dataKey="progress" name="progress">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`var(--color-${entry.type})`} 
                  radius={[4, 4, 4, 4]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

function WorkoutTypesPieChart({ data }: { data: WorkoutAnalyticsProps['workoutTypes'] }) {
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Workout Type Distribution</div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="sessions"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} sessions`, name]}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center flex-wrap gap-4 pt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressHistoryChart({ data }: { data: WorkoutAnalyticsProps['progressHistory'] }) {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer 
        config={{
          weight: {
            label: "Weight",
            color: "#ef4444",
          },
          strength: {
            label: "Strength",
            color: "#8b5cf6",
          },
          endurance: {
            label: "Endurance",
            color: "#0ea5e9",
          }
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />} 
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="var(--color-weight)" 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="weight"
            />
            <Line 
              type="monotone" 
              dataKey="strength" 
              stroke="var(--color-strength)" 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="strength"
            />
            <Line 
              type="monotone" 
              dataKey="endurance" 
              stroke="var(--color-endurance)" 
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
              name="endurance"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
