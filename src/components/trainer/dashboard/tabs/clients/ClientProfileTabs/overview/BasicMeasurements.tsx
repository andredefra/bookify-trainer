
interface BasicMeasurementsProps {
  weight: string;
  height: string;
  bodyFat: string;
}

export function BasicMeasurements({ weight, height, bodyFat }: BasicMeasurementsProps) {
  return (
    <>
      <h3 className="text-sm font-medium mt-2">Basic Measurements</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 bg-gray-50 rounded text-center">
          <div className="text-xs text-muted-foreground">Weight</div>
          <div className="font-medium">{weight}</div>
        </div>
        <div className="p-2 bg-gray-50 rounded text-center">
          <div className="text-xs text-muted-foreground">Height</div>
          <div className="font-medium">{height}</div>
        </div>
        <div className="p-2 bg-gray-50 rounded text-center">
          <div className="text-xs text-muted-foreground">Body Fat</div>
          <div className="font-medium">{bodyFat}</div>
        </div>
      </div>
    </>
  );
}
