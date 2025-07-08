
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { MonthlyRevenueDataPoint } from "../types";

interface ClientTypeRevenueChartProps {
  data: MonthlyRevenueDataPoint[];
}

export function ClientTypeRevenueChart({ data }: ClientTypeRevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Client Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`€${value}`, name]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="clientRevenue" 
                name="Recurring Clients" 
                fill="#0088FE" 
                stackId="client-type"
              />
              <Bar 
                dataKey="occasionalRevenue" 
                name="Occasional Participants" 
                fill="#00C49F" 
                stackId="client-type"
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                name="Total Revenue" 
                stroke="#FF8042" 
                strokeWidth={2}
                dot={{ fill: '#FF8042' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
