import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Activity } from "lucide-react";

interface WellnessDataPoint {
  date: string;
  mood: number;
  energy: number;
  sleep: number;
  formattedDate: string;
}

interface WellnessTrendsChartProps {
  data: WellnessDataPoint[];
  title?: string;
}

export function WellnessTrendsChart({ data, title = "Bio-Feedback Trends" }: WellnessTrendsChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4 text-purple-500" />
            {title}
          </CardTitle>
          <CardDescription>Mood, Energy, and Sleep Quality over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            No wellness data available yet
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Activity className="h-4 w-4 text-purple-500" />
          {title}
        </CardTitle>
        <CardDescription>Mood, Energy, and Sleep Quality over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <YAxis 
              domain={[0, 10]}
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={30}
              className="text-muted-foreground"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend 
              iconType="line"
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ fill: '#F59E0B', r: 3 }}
              name="Mood"
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', r: 3 }}
              name="Energy"
            />
            <Line
              type="monotone"
              dataKey="sleep"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ fill: '#6366F1', r: 3 }}
              name="Sleep"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
