
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

interface WorkoutSession {
  id: string;
  sessionNumber: number;
  title: string;
  exercises: Exercise[];
  completed: boolean;
  completedDate?: string;
}

interface SessionWorkoutDetailsProps {
  session: WorkoutSession;
  onMarkCompleted: (sessionId: string) => void;
  onSaveWeight: (exerciseId: string, sessionId: string, weight: number) => void;
}

export function SessionWorkoutDetails({ session, onMarkCompleted, onSaveWeight }: SessionWorkoutDetailsProps) {
  const isMobile = useIsMobile();
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  
  const handleStartWorkout = () => {
    setIsWorkoutStarted(true);
    setWorkoutStartTime(new Date());
    console.log(`Session ${session.sessionNumber} started at:`, new Date().toISOString());
  };
  
  const handleWorkoutDone = () => {
    if (workoutStartTime) {
      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - workoutStartTime.getTime()) / 1000 / 60);
      console.log(`Session ${session.sessionNumber} completed. Duration: ${duration} minutes`);
      console.log(`Start: ${workoutStartTime.toISOString()}, End: ${endTime.toISOString()}`);
    }
    
    setIsWorkoutStarted(false);
    setWorkoutStartTime(null);
    onMarkCompleted(session.id);
  };
  
  return (
    <div>
      <div className="p-3 sm:p-4 border-b">
        <div className="flex flex-col gap-3">
          <h3 className="font-medium flex items-center text-sm sm:text-base">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">Session {session.sessionNumber}: {session.title}</span>
          </h3>
          
          {!session.completed ? (
            <div className="flex gap-2">
              {!isWorkoutStarted ? (
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-primary hover:bg-primary/90 flex-1 sm:flex-none min-h-[44px]"
                  onClick={handleStartWorkout}
                >
                  <Play className="mr-2 h-4 w-4" />
                  <span className="text-sm">Start Session</span>
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 flex-1 sm:flex-none min-h-[44px]"
                  onClick={handleWorkoutDone}
                >
                  <Square className="mr-2 h-4 w-4" />
                  <span className="text-sm">Session Done</span>
                </Button>
              )}
            </div>
          ) : (
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 w-full sm:w-auto justify-center sm:justify-start p-2">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span className="text-xs sm:text-sm">
                Completed {session.completedDate && `on ${new Date(session.completedDate).toLocaleDateString()}`}
              </span>
            </Badge>
          )}
        </div>
      </div>
      
      {isWorkoutStarted && (
        <div className="px-3 py-3 sm:px-4 sm:py-3 bg-blue-50 border-b">
          <div className="flex items-center text-blue-700">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse flex-shrink-0"></div>
            <span className="text-sm font-medium">Session in progress...</span>
          </div>
        </div>
      )}
      
      <div className="divide-y">
        {session.exercises.map((exercise) => (
          <ExerciseItem 
            key={exercise.id} 
            exercise={exercise} 
            dayId={session.id}
            onSaveWeight={onSaveWeight}
          />
        ))}
      </div>
    </div>
  );
}
