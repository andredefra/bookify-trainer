import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart, 
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList,
  Cell
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart2, PieChart as PieChartIcon, AreaChart as AreaChartIcon, LineChart as LineChartIcon } from "lucide-react";

interface WorkoutAnalyticsProps {
  weeklyData: {
    day: string;
    minutes: number;
    calories: number;
  }[];
  monthlyData: {
    type: string;
    current: number;
    target: number;
  }[];
  workoutTypes: {
    name: string;
    value: number;
    color: string;
  }[];
  progressHistory: {
    week: string;
    weight: number;
    strength: number;
    endurance: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function WorkoutAnalytics({ weeklyData, monthlyData, workoutTypes, progressHistory }: WorkoutAnalyticsProps) {
  const [timeframe, setTimeframe] = useState("weekly");
  const [chartType, setChartType] = useState("bar");
  const [progressMetric, setProgressMetric] = useState("weight");

  const WeeklyActivityChart = () => {
    if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 shadow-md border rounded">
                      <p className="font-medium">{label}</p>
                      <p className="text-sm text-muted-foreground">
                        Minutes: <span className="font-medium">{payload[0].value}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Calories: <span className="font-medium">{payload[1].value}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="minutes" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="calories" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 shadow-md border rounded">
                      <p className="font-medium">{label}</p>
                      <p className="text-sm text-muted-foreground">
                        Minutes: <span className="font-medium">{payload[0].value}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Calories: <span className="font-medium">{payload[1].value}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line type="monotone" dataKey="minutes" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="calories" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (chartType === "area") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 shadow-md border rounded">
                      <p className="font-medium">{label}</p>
                      <p className="text-sm text-muted-foreground">
                        Minutes: <span className="font-medium">{payload[0].value}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Calories: <span className="font-medium">{payload[1].value}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area type="monotone" dataKey="minutes" fill="#4f46e5" stroke="#4f46e5" fillOpacity={0.2} />
            <Area type="monotone" dataKey="calories" fill="#10b981" stroke="#10b981" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };

  const WorkoutTypesChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={workoutTypes}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {workoutTypes.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-2 shadow-md border rounded">
                  <p className="font-medium">{data.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Sessions: <span className="font-medium">{data.value}</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  const MonthlyGoalsChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical"
        data={monthlyData}
        margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
        <XAxis type="number" axisLine={false} tickLine={false} domain={[0, 'dataMax']} />
        <YAxis 
          dataKey="type" 
          type="category" 
          axisLine={false} 
          tickLine={false}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-2 shadow-md border rounded">
                  <p className="font-medium">{data.type}</p>
                  <p className="text-sm text-muted-foreground">
                    Current: <span className="font-medium">{data.current}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Goal: <span className="font-medium">{data.target}</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="current" fill="#4f46e5" radius={[4, 4, 4, 4]}>
          {monthlyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.current >= entry.target ? "#10b981" : "#4f46e5"} />
          ))}
          <LabelList 
            dataKey="current" 
            position="right" 
            formatter={(value: number, entry: any) => `${value}/${entry.target}`} 
            style={{ fill: "#6b7280", fontSize: "12px" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const ProgressChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={progressHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="week" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-2 shadow-md border rounded">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm text-muted-foreground">
                    Weight: <span className="font-medium">{data.weight} kg</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Strength: <span className="font-medium">{data.strength}/10</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Endurance: <span className="font-medium">{data.endurance}/10</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        {progressMetric === "all" ? (
          <>
            <Line type="monotone" dataKey="weight" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="strength" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="endurance" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
          </>
        ) : (
          <Line type="monotone" dataKey={progressMetric} stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <Card className="col-span-12">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Workout Analytics</CardTitle>
            <CardDescription>Track your workout patterns and progress</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="area">Area Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
            <WeeklyActivityChart />
          </TabsContent>
          
          <TabsContent value="types" className="space-y-4">
            <WorkoutTypesChart />
          </TabsContent>
          
          <TabsContent value="goals" className="space-y-4">
            <MonthlyGoalsChart />
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
            <ProgressChart />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
