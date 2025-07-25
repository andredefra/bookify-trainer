
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, ClipboardList } from "lucide-react";
import { NewWorkoutLogForm } from "@/components/client/training/workout-form/NewWorkoutLogForm";
import { PastWorkoutsLog } from "@/components/client/training/PastWorkoutsLog";
import { useIsMobile } from "@/hooks/use-mobile";

export function TrainingLogTab() {
  const [isLoggingWorkout, setIsLoggingWorkout] = useState(false);
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <Card className="border-primary/10">
        <CardHeader className={isMobile ? "pb-2 pt-4 px-4" : "pb-2 pt-4"}>
          <div>
            <div className="flex items-center">
              <ClipboardList className="h-5 w-5 text-primary mr-2" />
              <CardTitle className={isMobile ? "text-xl" : ""}>Training Log</CardTitle>
            </div>
            <CardDescription className="mt-1 mb-3">
              Record and track your workouts
            </CardDescription>
            {!isLoggingWorkout && (
              <Button 
                className="flex items-center mt-2 w-full sm:w-auto"
                onClick={() => setIsLoggingWorkout(true)}
                size={isMobile ? "sm" : "default"}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Log Workout
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className={isMobile ? "p-3 pt-1" : ""}>
          {isLoggingWorkout ? (
            <NewWorkoutLogForm onComplete={() => setIsLoggingWorkout(false)} />
          ) : (
            <PastWorkoutsLog />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
