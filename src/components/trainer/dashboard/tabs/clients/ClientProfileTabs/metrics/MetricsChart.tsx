
import { BarChart3 } from "lucide-react";

export function MetricsChart() {
  return (
    <div className="h-48 flex items-center justify-center border rounded bg-gray-50">
      <div className="text-center text-muted-foreground">
        <BarChart3 className="h-8 w-8 mx-auto mb-2" />
        <p>Metrics chart would display here</p>
      </div>
    </div>
  );
}
