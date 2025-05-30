
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { TrainingProgramHeader } from "./TrainingProgramHeader";
import { SessionSelector } from "./SessionSelector";
import { SessionWorkoutDetails } from "./SessionWorkoutDetails";
import { TrainingProgram, WorkoutSession, Exercise } from "@/data/training";

interface TrainingProgramProps {
  program: TrainingProgram;
}

export function TrainingProgramCard({ program }: TrainingProgramProps) {
  const [activeSession, setActiveSession] = useState<string | null>(program.sessions[0]?.id || null);
  
  const handleSaveWeight = (exerciseId: string, sessionId: string, value: number) => {
    console.log(`Saved weight ${value} for exercise ${exerciseId} in session ${sessionId}`);
  };
  
  const handleMarkCompleted = (sessionId: string) => {
    const completedDate = new Date().toISOString();
    console.log(`Marked session ${sessionId} as completed on ${completedDate}`);
    // In a real app, this would update the session in state/database with completedDate
  };
  
  const completedSessions = program.sessions.filter(session => session.completed).length;
  
  return (
    <Card className="border-primary/10">
      <TrainingProgramHeader 
        title={program.title} 
        week={program.week} 
        trainerName={program.trainerName} 
      />
      
      <CardContent className="p-0">
        <SessionSelector 
          sessions={program.sessions} 
          activeSession={activeSession} 
          onSessionSelect={setActiveSession}
          completedSessions={completedSessions}
          totalSessions={program.totalSessions}
        />

        {program.sessions.map((session) => (
          <div key={session.id} className={activeSession === session.id ? "block" : "hidden"}>
            <SessionWorkoutDetails 
              session={session} 
              onMarkCompleted={handleMarkCompleted}
              onSaveWeight={handleSaveWeight}
            />
          </div>
        ))}
      </CardContent>
      
      <CardFooter className="bg-muted/20 p-4 text-sm text-muted-foreground">
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2 text-emerald-600" />
          Track your progress through {program.totalSessions} sessions. Complete {program.targetFrequency} sessions per week to stay on schedule.
        </div>
      </CardFooter>
    </Card>
  );
}
