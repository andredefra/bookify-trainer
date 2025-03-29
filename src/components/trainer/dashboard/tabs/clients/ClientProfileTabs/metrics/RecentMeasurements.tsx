
import { HighlightText } from "../shared/HighlightText";

interface RecentMeasurementsProps {
  searchQuery?: string;
  clientMetrics?: {
    weight: string;
    height: string;
    bodyFat: string;
  };
}

export function RecentMeasurements({ searchQuery = "", clientMetrics }: RecentMeasurementsProps) {
  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-sm font-medium">Recent Measurements</h3>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-xs text-muted-foreground">Weight</div>
          <div className="text-lg font-medium">
            {clientMetrics ? (
              <HighlightText text={clientMetrics.weight} highlight={searchQuery} />
            ) : (
              "65kg"
            )}
          </div>
          <div className="text-xs text-green-600">↑ 2kg</div>
        </div>
        
        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-xs text-muted-foreground">Height</div>
          <div className="text-lg font-medium">
            {clientMetrics ? (
              <HighlightText text={clientMetrics.height} highlight={searchQuery} />
            ) : (
              "168cm"
            )}
          </div>
          <div className="text-xs text-muted-foreground">—</div>
        </div>
        
        <div className="p-3 bg-gray-50 rounded text-center">
          <div className="text-xs text-muted-foreground">Body Fat</div>
          <div className="text-lg font-medium">
            {clientMetrics ? (
              <HighlightText text={clientMetrics.bodyFat} highlight={searchQuery} />
            ) : (
              "24%"
            )}
          </div>
          <div className="text-xs text-red-600">↓ 2%</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <div className="text-xs text-muted-foreground flex justify-between p-2 border-b">
          <span>Jul 27, 2023</span>
          <span>65kg</span>
          <span>24%</span>
        </div>
        <div className="text-xs text-muted-foreground flex justify-between p-2 border-b">
          <span>Jun 27, 2023</span>
          <span>67kg</span>
          <span>26%</span>
        </div>
        <div className="text-xs text-muted-foreground flex justify-between p-2 border-b">
          <span>May 27, 2023</span>
          <span>69kg</span>
          <span>28%</span>
        </div>
      </div>
    </div>
  );
}
