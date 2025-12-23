import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MonthlySourceRevenueDataPoint } from '../types';
import { sourceColors, sourceLabels } from '../data/studioRevenueData';

interface MonthlySourceRevenueChartProps {
  data: MonthlySourceRevenueDataPoint[];
}

export const MonthlySourceRevenueChart = ({ data }: MonthlySourceRevenueChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-medium">€{entry.value.toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-border mt-2 pt-2">
            <span className="text-sm font-medium">
              Total: €{payload.reduce((sum: number, p: any) => sum + p.value, 0).toLocaleString()}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Monthly Revenue Trend by Source</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value: string) => <span className="text-sm text-foreground">{value}</span>}
              />
              <Bar 
                dataKey="direct" 
                name={sourceLabels.direct}
                stackId="a" 
                fill={sourceColors.direct} 
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="gym" 
                name={sourceLabels.gym}
                stackId="a" 
                fill={sourceColors.gym} 
                radius={[0, 0, 0, 0]}
              />
              <Bar 
                dataKey="studio" 
                name={sourceLabels.studio}
                stackId="a" 
                fill={sourceColors.studio} 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
