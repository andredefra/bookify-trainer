
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export function MetricsTab() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Body Metrics</h3>
          <Button size="sm" variant="outline">Record New</Button>
        </div>
        
        <div className="h-48 flex items-center justify-center border rounded bg-gray-50">
          <div className="text-center text-muted-foreground">
            <BarChart3 className="h-8 w-8 mx-auto mb-2" />
            <p>Metrics chart would display here</p>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Recent Measurements</h4>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="font-medium">Date</div>
            <div className="font-medium">Weight</div>
            <div className="font-medium">Body Fat</div>
            <div className="font-medium">Muscle Mass</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm bg-gray-50 p-2 rounded">
            <div>Jul 28, 2023</div>
            <div>65kg</div>
            <div>24%</div>
            <div>46kg</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm bg-gray-50 p-2 rounded">
            <div>Jul 14, 2023</div>
            <div>66kg</div>
            <div>25%</div>
            <div>45.5kg</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
