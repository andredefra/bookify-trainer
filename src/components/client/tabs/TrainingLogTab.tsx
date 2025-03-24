
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { WorkoutLogForm } from "@/components/client/training/WorkoutLogForm";
import { PastWorkoutsLog } from "@/components/client/training/PastWorkoutsLog";

export function TrainingLogTab() {
  const [isLoggingWorkout, setIsLoggingWorkout] = useState(false);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Training Log</CardTitle>
              <CardDescription>
                Record and track your workouts
              </CardDescription>
            </div>
            <Button 
              className="flex items-center"
              onClick={() => setIsLoggingWorkout(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Log Workout
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoggingWorkout ? (
            <WorkoutLogForm onComplete={() => setIsLoggingWorkout(false)} />
          ) : (
            <PastWorkoutsLog />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
