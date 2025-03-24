
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface AvailabilityTabProps {
  availability: {
    [key: string]: string[];
  };
  trainerName: string;
  onViewCalendar: () => void;
}

export const AvailabilityTab = ({ availability, trainerName, onViewCalendar }: AvailabilityTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(availability).map(([day, slots]) => (
              <div key={day} className="border-b pb-3 last:border-b-0">
                <h3 className="font-medium capitalize mb-2">{day}</h3>
                {slots.length > 0 ? (
                  slots.map((slot, i) => (
                    <div key={i} className="text-sm">
                      <span>{slot}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">Not available</div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Choose a date and time to schedule your session with {trainerName}.
            </p>
            <Button onClick={onViewCalendar}>
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
