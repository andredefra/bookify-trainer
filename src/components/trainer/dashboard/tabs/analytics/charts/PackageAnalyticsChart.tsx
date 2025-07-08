
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, Users, DollarSign } from "lucide-react";
import { TopPerformingPackagesChart } from "./TopPerformingPackagesChart";

const packageData = [
  { name: 'Personal Training', sold: 12, revenue: 6000, avgValue: 500 },
  { name: 'Transformation', sold: 8, revenue: 6000, avgValue: 750 },
  { name: 'Beginner', sold: 15, revenue: 3600, avgValue: 240 },
  { name: 'Group Training', sold: 6, revenue: 1800, avgValue: 300 },
];

const packageTypeData = [
  { name: 'Sessions Only', value: 45, color: '#0088FE' },
  { name: 'Hybrid', value: 35, color: '#00C49F' },
  { name: 'Program Only', value: 20, color: '#FFBB28' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function PackageAnalyticsChart() {
  return (
    <div className="space-y-6">
      {/* Top Performing Packages Ranking */}
      <TopPerformingPackagesChart />
      
      {/* Package Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Packages Sold</p>
                <p className="text-2xl font-bold">41</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Package Revenue</p>
                <p className="text-2xl font-bold">€17,400</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Package Value</p>
                <p className="text-2xl font-bold">€424</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Package Clients</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Package Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Package Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={packageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0088FE" name="Revenue (€)" />
              <Bar dataKey="sold" fill="#00C49F" name="Units Sold" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Package Type Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Package Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={packageTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {packageTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
