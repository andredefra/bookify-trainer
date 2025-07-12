
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvailabilityCalendar } from "./AvailabilityCalendar";

export function TrainerAvailability() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Availability Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <AvailabilityCalendar />
        </CardContent>
      </Card>
    </div>
  );
}
