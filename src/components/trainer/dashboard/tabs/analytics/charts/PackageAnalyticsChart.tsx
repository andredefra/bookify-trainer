import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package, TrendingUp, Users, DollarSign } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { TopPerformingPackagesChart } from "./TopPerformingPackagesChart";
import { packageData } from "../data/packageAnalyticsData";
import { TimeFrameSelector } from "../../sales/analytics/TimeFrameSelector";
import { usePackageTimeAnalytics, TimeFrame } from "../hooks/usePackageTimeAnalytics";

export function PackageAnalyticsChart() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("month");
  const [customPeriod, setCustomPeriod] = useState(30);
  
  const analytics = usePackageTimeAnalytics(packageData, timeFrame, customPeriod);
  
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Package Performance</h3>
        <p className="text-sm text-muted-foreground">{analytics.timeFrameLabel}</p>
      </div>

      {/* Time Frame Selector */}
      <Tabs value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)} className="w-full">
        <TimeFrameSelector
          timeFrame={timeFrame}
          onTimeFrameChange={setTimeFrame}
          customPeriod={customPeriod}
          onCustomPeriodChange={setCustomPeriod}
          showTitle={false}
        />
      </Tabs>

      {/* Package Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Packages Sold</p>
                <p className="text-2xl font-bold">{analytics.totalSales}</p>
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
                <p className="text-2xl font-bold">€{analytics.totalRevenue.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">€{analytics.avgValue}</p>
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
                <p className="text-2xl font-bold">{analytics.estimatedClients}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Performing Packages Ranking */}
      <TopPerformingPackagesChart packages={analytics.filteredPackages} />
    </div>
  );
}
