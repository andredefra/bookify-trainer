
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageCircle } from "lucide-react";
import { TrainingProgramHeader } from "./TrainingProgramHeader";
import { SessionSelector } from "./SessionSelector";
import { SessionWorkoutDetails } from "./SessionWorkoutDetails";
import { WorkoutAIAssistant } from "./WorkoutAIAssistant";
import { TrainingProgram, WorkoutSession, Exercise } from "@/data/training";

interface TrainingProgramProps {
  program: TrainingProgram;
}

export function TrainingProgramCard({ program }: TrainingProgramProps) {
  const [activeSession, setActiveSession] = useState<string | null>(program.sessions[0]?.id || null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  const handleSaveWeight = (exerciseId: string, sessionId: string, value: number) => {
    console.log(`Saved weight ${value} for exercise ${exerciseId} in session ${sessionId}`);
  };
  
  const handleMarkCompleted = (sessionId: string) => {
    const completedDate = new Date().toISOString();
    console.log(`Marked session ${sessionId} as completed on ${completedDate}`);
    // In a real app, this would update the session in state/database with completedDate
  };
  
  const completedSessions = program.sessions.filter(session => session.completed).length;
  const currentSession = program.sessions.find(s => s.id === activeSession);
  
  return (
    <>
      <Card className="border-primary/10 overflow-hidden relative">
      <TrainingProgramHeader 
        title={program.title} 
        week={program.week} 
        trainerName={program.trainerName}
        duration={program.duration}
        targetFrequency={program.targetFrequency}
        totalSessions={program.totalSessions}
        isPaid={program.isPaid}
        price={program.price}
        objective={program.objective}
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
      
      <CardFooter className="bg-muted/20 p-3 sm:p-4 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-start">
          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-emerald-600 mt-0.5 flex-shrink-0" />
          <span className="leading-relaxed">
            Track your progress through {program.totalSessions} sessions. Complete {program.targetFrequency} sessions per week to stay on schedule.
          </span>
        </div>
      </CardFooter>
      
      {/* AI Assistant FAB */}
      <Button
        onClick={() => setShowAIAssistant(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </Card>
    
    <WorkoutAIAssistant
      open={showAIAssistant}
      onOpenChange={setShowAIAssistant}
      workoutContext={{
        program: program.title,
        session: currentSession,
        exercises: currentSession?.exercises || []
      }}
    />
    </>
  );
}
