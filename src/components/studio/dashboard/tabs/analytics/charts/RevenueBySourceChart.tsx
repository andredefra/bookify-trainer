import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sourceColors, sourceLabels } from '../data/studioRevenueData';
import { RevenueBySourceDataPoint } from '../types';

interface RevenueBySourceChartProps {
  data: RevenueBySourceDataPoint[];
}

export const RevenueBySourceChart = ({ data }: RevenueBySourceChartProps) => {
  // Aggregate by source type
  const aggregatedData = data.reduce((acc, item) => {
    const existing = acc.find(a => a.source === item.source);
    if (existing) {
      existing.value += item.grossRevenue;
    } else {
      acc.push({
        source: item.source,
        name: sourceLabels[item.source],
        value: item.grossRevenue,
        fill: sourceColors[item.source]
      });
    }
    return acc;
  }, [] as { source: string; name: string; value: number; fill: string }[]);

  const total = aggregatedData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            €{data.value.toLocaleString()} ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revenue by Source</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {aggregatedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value: string) => <span className="text-sm text-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 space-y-2">
          {aggregatedData.map((item) => (
            <div key={item.source} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium">€{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
