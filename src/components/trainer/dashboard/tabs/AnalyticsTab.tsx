
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevenueAnalytics } from "./analytics/RevenueAnalytics";
import { EnhancedRevenueAnalytics } from "./analytics/EnhancedRevenueAnalytics";
import { PackageAnalyticsChart } from "./analytics/charts/PackageAnalyticsChart";

export function AnalyticsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="clients">Client Types</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="space-y-6 mt-6">
            <RevenueAnalytics />
          </TabsContent>
          
          <TabsContent value="packages" className="space-y-6 mt-6">
            <PackageAnalyticsChart />
          </TabsContent>
          
          <TabsContent value="clients" className="space-y-6 mt-6">
            <EnhancedRevenueAnalytics />
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6 mt-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Performance Analytics</h3>
              <p className="text-muted-foreground">Detailed performance metrics coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
