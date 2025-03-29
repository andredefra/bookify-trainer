
interface Measurement {
  date: string;
  weight: string;
  bodyFat: string;
  muscleMass: string;
}

const defaultMeasurements: Measurement[] = [
  {
    date: "Jul 28, 2023",
    weight: "65kg",
    bodyFat: "24%",
    muscleMass: "46kg"
  },
  {
    date: "Jul 14, 2023",
    weight: "66kg",
    bodyFat: "25%",
    muscleMass: "45.5kg"
  }
];

interface RecentMeasurementsProps {
  measurements?: Measurement[];
}

export function RecentMeasurements({ measurements = defaultMeasurements }: RecentMeasurementsProps) {
  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-medium">Recent Measurements</h4>
      <div className="grid grid-cols-4 gap-2 text-sm">
        <div className="font-medium">Date</div>
        <div className="font-medium">Weight</div>
        <div className="font-medium">Body Fat</div>
        <div className="font-medium">Muscle Mass</div>
      </div>
      
      {measurements.map((measurement, index) => (
        <div key={index} className="grid grid-cols-4 gap-2 text-sm bg-gray-50 p-2 rounded">
          <div>{measurement.date}</div>
          <div>{measurement.weight}</div>
          <div>{measurement.bodyFat}</div>
          <div>{measurement.muscleMass}</div>
        </div>
      ))}
    </div>
  );
}
