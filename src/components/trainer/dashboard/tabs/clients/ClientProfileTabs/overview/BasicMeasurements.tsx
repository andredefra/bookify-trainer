
import { HighlightText } from "../shared/HighlightText";

interface BasicMeasurementsProps {
  weight: string;
  height: string;
  bodyFat: string;
  searchQuery?: string;
}

export function BasicMeasurements({ weight, height, bodyFat, searchQuery = "" }: BasicMeasurementsProps) {
  return (
    <div>
      <h3 className="text-sm font-medium">Basic Measurements</h3>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <div className="p-2 bg-gray-50 rounded text-center">
          <div className="text-xs text-muted-foreground">Weight</div>
          <div className="font-medium">
            <HighlightText text={weight} highlight={searchQuery} />
          </div>
        </div>
        <div className="p-2 bg-gray-50 rounded text-center">
          <div className="text-xs text-muted-foreground">Height</div>
          <div className="font-medium">
            <HighlightText text={height} highlight={searchQuery} />
          </div>
        </div>
        <div className="p-2 bg-gray-50 rounded text-center">
          <div className="text-xs text-muted-foreground">Body Fat</div>
          <div className="font-medium">
            <HighlightText text={bodyFat} highlight={searchQuery} />
          </div>
        </div>
      </div>
    </div>
  );
}
