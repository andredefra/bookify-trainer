
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrainerData } from "../../data/trainerData";

interface AvailabilityTabProps {
  trainer: TrainerData;
}

export function AvailabilityTab({ trainer }: AvailabilityTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {Object.entries(trainer.availability).map(([day, hours]) => (
            <div key={day} className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <span className="font-medium capitalize text-gray-900">{day}</span>
              <div className="text-right">
                {Array.isArray(hours) && hours.length > 0 ? (
                  hours.map((timeSlot, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {timeSlot}
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">Closed</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Contact {trainer.name} to schedule a session or discuss availability for other times.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
