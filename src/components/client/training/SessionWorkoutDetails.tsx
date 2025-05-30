
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
      <div className={`${isMobile ? 'p-3' : 'p-4'} border-b flex justify-between items-center`}>
        <h3 className="font-medium flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          Session {session.sessionNumber}: {session.title}
        </h3>
        
        {!session.completed ? (
          <div className="flex gap-2">
            {!isWorkoutStarted ? (
              <Button 
                variant="default" 
                size={isMobile ? "sm" : "sm"}
                className="bg-primary hover:bg-primary/90"
                onClick={handleStartWorkout}
              >
                <Play className={`${isMobile ? 'mr-1 h-3.5 w-3.5' : 'mr-2 h-4 w-4'}`} />
                {isMobile ? 'Start' : 'Start Session'}
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "sm"}
                className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                onClick={handleWorkoutDone}
              >
                <Square className={`${isMobile ? 'mr-1 h-3.5 w-3.5' : 'mr-2 h-4 w-4'}`} />
                {isMobile ? 'Done' : 'Session Done'}
              </Button>
            )}
          </div>
        ) : (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <CheckCircle className="mr-1 h-3.5 w-3.5" />
            Completed {session.completedDate && `on ${new Date(session.completedDate).toLocaleDateString()}`}
          </Badge>
        )}
      </div>
      
      {isWorkoutStarted && (
        <div className={`${isMobile ? 'px-3 py-2' : 'px-4 py-3'} bg-blue-50 border-b`}>
          <div className="flex items-center text-sm text-blue-700">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            Session in progress...
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
