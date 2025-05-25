
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Play, Square } from "lucide-react";
import { ExerciseItem } from "./ExerciseItem";
import { useIsMobile } from "@/hooks/use-mobile";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  notes?: string;
}

interface WorkoutDay {
  id: string;
  day: string;
  exercises: Exercise[];
  completed: boolean;
}

interface WorkoutDetailsProps {
  day: WorkoutDay;
  onMarkCompleted: (dayId: string) => void;
  onSaveWeight: (exerciseId: string, dayId: string, weight: number) => void;
}

export function WorkoutDetails({ day, onMarkCompleted, onSaveWeight }: WorkoutDetailsProps) {
  const isMobile = useIsMobile();
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  
  const handleStartWorkout = () => {
    setIsWorkoutStarted(true);
    setWorkoutStartTime(new Date());
    console.log(`Workout started for ${day.day} at:`, new Date().toISOString());
  };
  
  const handleWorkoutDone = () => {
    if (workoutStartTime) {
      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - workoutStartTime.getTime()) / 1000 / 60); // duration in minutes
      console.log(`Workout completed for ${day.day}. Duration: ${duration} minutes`);
      console.log(`Start: ${workoutStartTime.toISOString()}, End: ${endTime.toISOString()}`);
    }
    
    setIsWorkoutStarted(false);
    setWorkoutStartTime(null);
    onMarkCompleted(day.id);
  };
  
  return (
    <div>
      <div className={`${isMobile ? 'p-3' : 'p-4'} border-b flex justify-between items-center`}>
        <h3 className="font-medium flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          {day.day}'s Workout
        </h3>
        
        {!day.completed ? (
          <div className="flex gap-2">
            {!isWorkoutStarted ? (
              <Button 
                variant="default" 
                size={isMobile ? "sm" : "sm"}
                className="bg-primary hover:bg-primary/90"
                onClick={handleStartWorkout}
              >
                <Play className={`${isMobile ? 'mr-1 h-3.5 w-3.5' : 'mr-2 h-4 w-4'}`} />
                {isMobile ? 'Start' : 'Start Workout'}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "sm"}
                className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                onClick={handleWorkoutDone}
              >
                <Square className={`${isMobile ? 'mr-1 h-3.5 w-3.5' : 'mr-2 h-4 w-4'}`} />
                {isMobile ? 'Done' : 'Workout Done'}
              </Button>
            )}
          </div>
        ) : (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <CheckCircle className="mr-1 h-3.5 w-3.5" />
            Completed
          </Badge>
        )}
      </div>
      
      {isWorkoutStarted && (
        <div className={`${isMobile ? 'px-3 py-2' : 'px-4 py-3'} bg-blue-50 border-b`}>
          <div className="flex items-center text-sm text-blue-700">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            Workout in progress...
          </div>
        </div>
      )}
      
      <div className="divide-y">
        {day.exercises.map((exercise) => (
          <ExerciseItem 
            key={exercise.id} 
            exercise={exercise} 
            dayId={day.id}
            onSaveWeight={onSaveWeight}
          />
        ))}
      </div>
    </div>
  );
}
