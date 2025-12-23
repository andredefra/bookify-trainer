import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Package, DollarSign, Users } from "lucide-react";
import { StudioOverviewAnalytics } from './analytics/StudioOverviewAnalytics';
import { StudioProgramsAnalytics } from './analytics/StudioProgramsAnalytics';
import { StudioRevenueDetails } from './analytics/StudioRevenueDetails';
import { StudioTrainerPerformance } from './analytics/StudioTrainerPerformance';
import { TimeFrame } from './analytics/types';

export function AnalyticsTab() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">Track your studio's performance and growth</p>
        </div>
        <Select value={timeFrame} onValueChange={(v) => setTimeFrame(v as TimeFrame)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4 hidden sm:inline" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="programs" className="gap-2">
            <Package className="h-4 w-4 hidden sm:inline" />
            Programs
          </TabsTrigger>
          <TabsTrigger value="revenue" className="gap-2">
            <DollarSign className="h-4 w-4 hidden sm:inline" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="trainers" className="gap-2">
            <Users className="h-4 w-4 hidden sm:inline" />
            Trainer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <StudioOverviewAnalytics />
        </TabsContent>

        <TabsContent value="programs" className="mt-6">
          <StudioProgramsAnalytics />
        </TabsContent>

        <TabsContent value="revenue" className="mt-6">
          <StudioRevenueDetails />
        </TabsContent>

        <TabsContent value="trainers" className="mt-6">
          <StudioTrainerPerformance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
