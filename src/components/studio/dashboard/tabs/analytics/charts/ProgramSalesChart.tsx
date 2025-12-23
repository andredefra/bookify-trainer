import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgramSalesDataPoint } from '../types';
import { sourceColors, sourceLabels } from '../data/studioRevenueData';

interface ProgramSalesChartProps {
  data: ProgramSalesDataPoint[];
}

export const ProgramSalesChart = ({ data }: ProgramSalesChartProps) => {
  // Aggregate by program name
  const programAggregates = data.reduce((acc, item) => {
    const existing = acc.find(a => a.programName === item.programName);
    if (existing) {
      existing.totalUnits += item.unitsSold;
      existing.totalRevenue += item.revenue;
      existing.directUnits += item.source === 'direct' ? item.unitsSold : 0;
      existing.gymUnits += item.source === 'gym' ? item.unitsSold : 0;
      existing.studioUnits += item.source === 'studio' ? item.unitsSold : 0;
      existing.directRevenue += item.source === 'direct' ? item.revenue : 0;
      existing.gymRevenue += item.source === 'gym' ? item.revenue : 0;
      existing.studioRevenue += item.source === 'studio' ? item.revenue : 0;
    } else {
      acc.push({
        programName: item.programName,
        totalUnits: item.unitsSold,
        totalRevenue: item.revenue,
        directUnits: item.source === 'direct' ? item.unitsSold : 0,
        gymUnits: item.source === 'gym' ? item.unitsSold : 0,
        studioUnits: item.source === 'studio' ? item.unitsSold : 0,
        directRevenue: item.source === 'direct' ? item.revenue : 0,
        gymRevenue: item.source === 'gym' ? item.revenue : 0,
        studioRevenue: item.source === 'studio' ? item.revenue : 0,
      });
    }
    return acc;
  }, [] as any[]);

  // Sort by total revenue
  programAggregates.sort((a, b) => b.totalRevenue - a.totalRevenue);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const programData = programAggregates.find(p => p.programName === label);
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg min-w-[200px]">
          <p className="font-medium text-foreground mb-2">{label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Direct:</span>
              <span>€{programData?.directRevenue.toLocaleString()} ({programData?.directUnits} units)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gym:</span>
              <span>€{programData?.gymRevenue.toLocaleString()} ({programData?.gymUnits} units)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Studio:</span>
              <span>€{programData?.studioRevenue.toLocaleString()} ({programData?.studioUnits} units)</span>
            </div>
            <div className="border-t border-border pt-1 mt-1 flex justify-between font-medium">
              <span>Total:</span>
              <span>€{programData?.totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Program Sales by Source</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={programAggregates} 
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                type="number"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickFormatter={(value) => `€${value.toLocaleString()}`}
              />
              <YAxis 
                type="category"
                dataKey="programName"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value: string) => <span className="text-sm text-foreground">{value}</span>}
              />
              <Bar 
                dataKey="directRevenue" 
                name={sourceLabels.direct}
                stackId="a" 
                fill={sourceColors.direct} 
              />
              <Bar 
                dataKey="gymRevenue" 
                name={sourceLabels.gym}
                stackId="a" 
                fill={sourceColors.gym} 
              />
              <Bar 
                dataKey="studioRevenue" 
                name={sourceLabels.studio}
                stackId="a" 
                fill={sourceColors.studio} 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
