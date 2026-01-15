import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Scale } from "lucide-react";

interface WeightDataPoint {
  date: string;
  weight: number;
  formattedDate: string;
}

interface WeightProgressChartProps {
  data: WeightDataPoint[];
  title?: string;
}

export function WeightProgressChart({ data, title = "Body Composition" }: WeightProgressChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Scale className="h-4 w-4 text-blue-500" />
            {title}
          </CardTitle>
          <CardDescription>Weight progression over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            No weight data available yet
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate domain with padding
  const weights = data.map(d => d.weight);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  const padding = (maxWeight - minWeight) * 0.2 || 2;
  const avgWeight = weights.reduce((a, b) => a + b, 0) / weights.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Scale className="h-4 w-4 text-blue-500" />
          {title}
        </CardTitle>
        <CardDescription>Weight progression over time</CardDescription>
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
              domain={[minWeight - padding, maxWeight + padding]}
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={40}
              tickFormatter={(value) => `${value}kg`}
              className="text-muted-foreground"
            />
            <Tooltip 
              formatter={(value: number) => [`${value} kg`, 'Weight']}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <ReferenceLine 
              y={avgWeight} 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="5 5"
              label={{ value: `Avg: ${avgWeight.toFixed(1)}kg`, position: 'right', fontSize: 10 }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
