import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface AggregatedGoalStatsProps {
  clients: Array<{ id: string; name: string }>;
}

export function AggregatedGoalStats({ clients }: AggregatedGoalStatsProps) {
  // Mock goal distribution data
  const goalTypeDistribution = [
    { name: "Weight Loss", value: 30, color: "hsl(var(--chart-1))" },
    { name: "Strength", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Cardio", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Body Comp", value: 15, color: "hsl(var(--chart-4))" },
    { name: "Other", value: 10, color: "hsl(var(--chart-5))" },
  ];
  
  // Mock achievement rate by goal type
  const achievementRates = [
    { type: "Weight Loss", rate: 78, fill: "hsl(var(--chart-1))" },
    { type: "Strength", rate: 85, fill: "hsl(var(--chart-2))" },
    { type: "Cardio", rate: 72, fill: "hsl(var(--chart-3))" },
    { type: "Body Comp", rate: 68, fill: "hsl(var(--chart-4))" },
    { type: "Other", rate: 75, fill: "hsl(var(--chart-5))" },
  ];
  
  const totalGoals = 45;
  const achievedGoals = 32;
  const onTrackGoals = 35;
  const avgProgress = 73;
  
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Goals Achieved</p>
                <p className="text-2xl font-bold">{achievedGoals}/{totalGoals}</p>
                <p className="text-xs text-green-600 mt-1">
                  {Math.round((achievedGoals / totalGoals) * 100)}% completion rate
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Goals On Track</p>
                <p className="text-2xl font-bold">{onTrackGoals}/{totalGoals}</p>
                <p className="text-xs text-blue-600 mt-1">
                  {Math.round((onTrackGoals / totalGoals) * 100)}% on schedule
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold">{avgProgress}%</p>
                <p className="text-xs text-primary mt-1">Across all goals</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goal Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Goal Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={goalTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {goalTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Achievement Rate by Goal Type */}
        <Card>
          <CardHeader>
            <CardTitle>Achievement Rate by Goal Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={achievementRates} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number"
                  domain={[0, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  type="category"
                  dataKey="type" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={100}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  formatter={(value) => [`${value}%`, "Achievement Rate"]}
                />
                <Bar dataKey="rate" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
