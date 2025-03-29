
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricsChart } from "./metrics/MetricsChart";
import { RecentMeasurements } from "./metrics/RecentMeasurements";

interface MetricsTabProps {
  searchQuery?: string;
  clientMetrics?: {
    weight: string;
    height: string;
    bodyFat: string;
  };
}

export function MetricsTab({ searchQuery = "", clientMetrics }: MetricsTabProps) {
  console.log("MetricsTab search query:", searchQuery); // Logging per debug
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Body Metrics</h3>
          <Button size="sm" variant="outline">Record New</Button>
        </div>
        
        <MetricsChart />
        <RecentMeasurements 
          searchQuery={searchQuery}
          clientMetrics={clientMetrics}
        />
      </CardContent>
    </Card>
  );
}
