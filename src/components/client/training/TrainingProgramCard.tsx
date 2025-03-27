
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { TrainingProgramHeader } from "./TrainingProgramHeader";
import { DaySelector } from "./DaySelector";
import { WorkoutDetails } from "./WorkoutDetails";
import { TrainingProgram, WorkoutDay, Exercise } from "@/data/training";

interface TrainingProgramProps {
  program: TrainingProgram;
}

export function TrainingProgramCard({ program }: TrainingProgramProps) {
  const [activeDay, setActiveDay] = useState<string | null>(program.days[0]?.id || null);
  
  const handleSaveWeight = (exerciseId: string, dayId: string, value: number) => {
    // Here you would update the weight in your state or database
    console.log(`Saved weight ${value} for exercise ${exerciseId} on day ${dayId}`);
  };
  
  const handleMarkCompleted = (dayId: string) => {
    // Here you would mark the day as completed in your state or database
    console.log(`Marked day ${dayId} as completed`);
  };
  
  return (
    <Card className="border-primary/10">
      <TrainingProgramHeader 
        title={program.title} 
        week={program.week} 
        trainerName={program.trainerName} 
      />
      
      <CardContent className="p-0">
        <DaySelector 
          days={program.days} 
          activeDay={activeDay} 
          onDaySelect={setActiveDay} 
        />

        {program.days.map((day) => (
          <div key={day.id} className={activeDay === day.id ? "block" : "hidden"}>
            <WorkoutDetails 
              day={day} 
              onMarkCompleted={handleMarkCompleted}
              onSaveWeight={handleSaveWeight}
            />
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="bg-muted/20 p-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2 text-emerald-600" />
          Update your weights and mark completed workouts to track your progress.
        </div>
      </CardFooter>
    </Card>
  );
}
