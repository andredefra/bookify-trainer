
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle } from "lucide-react";
import { ExerciseItem } from "./ExerciseItem";

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
  return (
    <div>
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-medium flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          {day.day}'s Workout
        </h3>
        {!day.completed ? (
          <Button 
            variant="outline" 
            size="sm"
            className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
            onClick={() => onMarkCompleted(day.id)}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark Completed
          </Button>
        ) : (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            Completed
          </Badge>
        )}
      </div>
      
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
