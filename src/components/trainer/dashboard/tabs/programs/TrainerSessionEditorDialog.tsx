import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SessionSelector } from '@/components/client/training/SessionSelector';
import { SessionWorkoutDetails } from '@/components/client/training/SessionWorkoutDetails';
import { useClientSessionTracking } from '@/hooks/useClientSessionTracking';
import { useExerciseTracking } from '@/hooks/useExerciseTracking';
import { TrainingProgram, WorkoutSession } from '@/data/training/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserCog } from 'lucide-react';

interface TrainerSessionEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId: string;
  clientName: string;
  program: TrainingProgram | null;
  onSave?: () => void;
}

export function TrainerSessionEditorDialog({
  open,
  onOpenChange,
  clientId,
  clientName,
  program,
  onSave,
}: TrainerSessionEditorDialogProps) {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const { saveClientSessionData, getClientSessionData, loading } = useClientSessionTracking();
  const { trackingData, initializeExercise, updateSet, completeExercise, resetExerciseCompletion } = useExerciseTracking();

  useEffect(() => {
    if (program && program.sessions.length > 0 && !activeSessionId) {
      setActiveSessionId(program.sessions[0].id);
    }
  }, [program, activeSessionId]);

  // Load existing session data when session changes
  useEffect(() => {
    if (activeSessionId && program) {
      loadSessionData();
    }
  }, [activeSessionId, program?.id]);

  const loadSessionData = async () => {
    if (!activeSessionId || !program) return;
    
    const sessionData = await getClientSessionData(clientId, program.id, activeSessionId);
    
    // If we have saved data, initialize exercises with it
    if (sessionData) {
      const session = program.sessions.find(s => s.id === activeSessionId);
      if (session) {
        session.exercises.forEach(exercise => {
          const savedExercise = sessionData.find((e: any) => e.exercise_id === exercise.id);
          if (savedExercise) {
            // Initialize with saved data
            initializeExercise(exercise, activeSessionId);
            // Apply saved set data
            savedExercise.sets.forEach((setData: any) => {
              updateSet(`${exercise.id}-${activeSessionId}`, setData.setNumber, setData);
            });
          } else {
            initializeExercise(exercise, activeSessionId);
          }
        });
      }
    }
  };

  const handleSaveSession = async () => {
    if (!activeSessionId || !program) return;

    const session = program.sessions.find(s => s.id === activeSessionId);
    if (!session) return;

    // Collect all exercise data from tracking state
    const exerciseData = session.exercises.map(exercise => {
      const exerciseTrackingId = `${exercise.id}-${activeSessionId}`;
      const tracking = trackingData[exerciseTrackingId];
      
      return {
        exercise_id: exercise.id,
        sets: tracking?.currentSets || [],
        completed: tracking?.isCompleted || false,
        completedDate: tracking?.isCompleted ? new Date().toISOString() : undefined,
      };
    });

    const sessionCompleted = exerciseData.every(e => e.completed);

    await saveClientSessionData(
      clientId,
      program.id,
      activeSessionId,
      exerciseData,
      sessionCompleted
    );

    if (onSave) {
      onSave();
    }
  };

  const activeSession = program?.sessions.find(s => s.id === activeSessionId);
  const completedCount = program?.sessions.filter(s => s.completed).length || 0;
  const totalSessions = program?.sessions.length || 0;

  if (!program) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <DialogTitle>Edit Training Data</DialogTitle>
            <Badge variant="secondary" className="gap-1">
              <UserCog className="h-3 w-3" />
              Editing as Trainer
            </Badge>
          </div>
          <DialogDescription>
            Editing session data for <strong>{clientName}</strong> - <strong>{program.title}</strong>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 overflow-y-auto">
          <div className="space-y-6 pb-6">
            {/* Session Selector */}
            <SessionSelector
              sessions={program.sessions}
              activeSession={activeSessionId}
              onSessionSelect={setActiveSessionId}
              completedSessions={completedCount}
              totalSessions={totalSessions}
            />

            {/* Active Session Details */}
            {activeSession && (
              <SessionWorkoutDetails
                session={activeSession}
                onMarkCompleted={(sessionId) => {
                  // Mark all exercises as completed
                  activeSession.exercises.forEach(exercise => {
                    completeExercise(`${exercise.id}-${sessionId}`, sessionId);
                  });
                }}
                onSaveWeight={(exerciseId, sessionId, weight) => {
                  updateSet(`${exerciseId}-${sessionId}`, 1, { weight });
                }}
              />
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-6 flex justify-between items-center bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Changes will be visible to the client immediately
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveSession}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
