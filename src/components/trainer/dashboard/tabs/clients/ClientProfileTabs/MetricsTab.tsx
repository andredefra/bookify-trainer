
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricsChart } from "./metrics/MetricsChart";
import { RecentMeasurements } from "./metrics/RecentMeasurements";

export function MetricsTab() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Body Metrics</h3>
          <Button size="sm" variant="outline">Record New</Button>
        </div>
        
        <MetricsChart />
        <RecentMeasurements />
      </CardContent>
    </Card>
  );
}
