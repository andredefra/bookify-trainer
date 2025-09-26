
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { RevenueAnalytics } from "./analytics/RevenueAnalytics";
import { EnhancedRevenueAnalytics } from "./analytics/EnhancedRevenueAnalytics";
import { PackageAnalyticsChart } from "./analytics/charts/PackageAnalyticsChart";
import { AISummary } from "./analytics/AISummary";

export function AnalyticsTab() {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('analytics.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="revenue">{t('analytics.tabs.revenue')}</TabsTrigger>
            <TabsTrigger value="packages">{t('analytics.tabs.packages')}</TabsTrigger>
            <TabsTrigger value="clients">{t('analytics.tabs.clients')}</TabsTrigger>
            <TabsTrigger value="ai-summary">{t('analytics.tabs.aiSummary')}</TabsTrigger>
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
          
          <TabsContent value="ai-summary" className="space-y-6 mt-6">
            <AISummary />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
