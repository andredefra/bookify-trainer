
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, FileDown } from "lucide-react";
import { RevenueAnalytics } from "./analytics/RevenueAnalytics";
import { EnhancedRevenueAnalytics } from "./analytics/EnhancedRevenueAnalytics";

export function AnalyticsTab() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Business Analytics Dashboard</CardTitle>
            <CardDescription>Analisi completa del business con breakdown per servizi e tipologie di clienti</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pb-6">
        <Tabs defaultValue="revenue">
          <TabsList className="mb-6">
            <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
            <TabsTrigger value="clienttypes">Client Type Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="mt-0">
            <RevenueAnalytics />
          </TabsContent>
          
          <TabsContent value="clienttypes" className="mt-0">
            <EnhancedRevenueAnalytics />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
