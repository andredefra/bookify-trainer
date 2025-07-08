
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, Users, DollarSign } from "lucide-react";
import { TopPerformingPackagesChart } from "./TopPerformingPackagesChart";
import { packageData, packageTypeData, CHART_COLORS, getAnalyticsMetrics } from "../data/packageAnalyticsData";

export function PackageAnalyticsChart() {
  const metrics = getAnalyticsMetrics();
  
  // Create chart data from unified source
  const chartData = packageData.map(pkg => ({
    name: pkg.title.replace(' Package', '').replace("'s Program", ''),
    sold: pkg.salesCount,
    revenue: pkg.revenue,
    avgValue: pkg.avgValue
  }));
  
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
                <p className="text-2xl font-bold">{metrics.totalSales}</p>
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
                <p className="text-2xl font-bold">€{metrics.totalRevenue.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">€{metrics.avgValue}</p>
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
                <p className="text-2xl font-bold">{metrics.estimatedClients}</p>
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
            <BarChart data={chartData}>
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
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
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
