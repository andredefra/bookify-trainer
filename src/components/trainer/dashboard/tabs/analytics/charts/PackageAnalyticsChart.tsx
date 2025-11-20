
import { Card, CardContent } from "@/components/ui/card";
import { Package, TrendingUp, Users, DollarSign } from "lucide-react";
import { TopPerformingPackagesChart } from "./TopPerformingPackagesChart";
import { getAnalyticsMetrics } from "../data/packageAnalyticsData";

export function PackageAnalyticsChart() {
  const metrics = getAnalyticsMetrics();
  
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
    </div>
  );
}
