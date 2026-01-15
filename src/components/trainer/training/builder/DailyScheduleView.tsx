import { useState } from "react";
import { WorkoutSession, Routine, Exercise, Circuit, SessionItem } from "@/data/training/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  Layers, 
  AlertCircle, 
  Pencil,
  Dumbbell,
  RotateCcw 
} from "lucide-react";
import { ImportRoutineDialog } from "./ImportRoutineDialog";
import { ExerciseRowWithSelector } from "./ExerciseRowWithSelector";

interface DailyScheduleViewProps {
  sessions: WorkoutSession[];
  onSessionsChange: (sessions: WorkoutSession[]) => void;
  duration: number;
  sessionsPerWeek: number;
  routines: Routine[];
  onCreateRoutine?: (routine: Routine) => void;
}

const createEmptyExercise = (): Exercise => ({
  id: `ex-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  name: "",
  sets: 3,
  reps: "10",
  repsUnit: "reps",
});

const createEmptyCircuit = (): Circuit => ({
  id: `circuit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  name: "",
  rounds: 3,
  restBetweenRounds: 60,
  exercises: [],
});

export function DailyScheduleView({
  sessions,
  onSessionsChange,
  duration,
  sessionsPerWeek,
  routines,
  onCreateRoutine,
}: DailyScheduleViewProps) {
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importingForSession, setImportingForSession] = useState<string | null>(null);

  // Group sessions by week
  const sessionsByWeek: Record<number, WorkoutSession[]> = {};
  sessions.forEach((session, index) => {
    const weekNum = Math.floor(index / sessionsPerWeek) + 1;
    if (!sessionsByWeek[weekNum]) {
      sessionsByWeek[weekNum] = [];
    }
    sessionsByWeek[weekNum].push(session);
  });

  const handleSessionChange = (sessionId: string, updates: Partial<WorkoutSession>, markAsOverride = true) => {
    onSessionsChange(
      sessions.map((s) => 
        s.id === sessionId 
          ? { ...s, ...updates, isOverride: markAsOverride ? true : s.isOverride } 
          : s
      )
    );
  };

  const handleAddExercise = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    const newExercise = createEmptyExercise();

    if (session.items && session.items.length > 0) {
      handleSessionChange(sessionId, {
        items: [...session.items, { type: 'exercise', data: newExercise }],
      });
    } else {
      handleSessionChange(sessionId, {
        exercises: [...session.exercises, newExercise],
      });
    }
  };

  const handleAddCircuit = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    const newCircuit = createEmptyCircuit();
    const currentItems = session.items || session.exercises.map((ex) => ({ type: 'exercise' as const, data: ex }));

    handleSessionChange(sessionId, {
      items: [...currentItems, { type: 'circuit', data: newCircuit }],
    });
  };

  const handleRemoveExercise = (sessionId: string, exerciseId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    handleSessionChange(sessionId, {
      exercises: session.exercises.filter((e) => e.id !== exerciseId),
    });
  };

  const handleRemoveItem = (sessionId: string, itemId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session || !session.items) return;

    handleSessionChange(sessionId, {
      items: session.items.filter((item) => item.data.id !== itemId),
    });
  };

  const handleExerciseUpdate = (sessionId: string, exerciseId: string, updatedExercise: Exercise) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    handleSessionChange(sessionId, {
      exercises: session.exercises.map((e) =>
        e.id === exerciseId ? updatedExercise : e
      ),
    });
  };

  const handleItemExerciseUpdate = (sessionId: string, itemIndex: number, updatedExercise: Exercise) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session || !session.items) return;

    const newItems = [...session.items];
    newItems[itemIndex] = { type: 'exercise', data: updatedExercise };
    handleSessionChange(sessionId, { items: newItems });
  };

  const handleOpenImportDialog = (sessionId: string) => {
    setImportingForSession(sessionId);
    setShowImportDialog(true);
  };

  const handleImportRoutine = (routine: Routine) => {
    if (!importingForSession) return;

    const session = sessions.find((s) => s.id === importingForSession);
    if (!session) return;

    const importedExercises = routine.exercises.map((ex) => ({
      ...ex,
      id: `${ex.id}-import-${Date.now()}`,
    }));

    if (session.items && session.items.length > 0) {
      const newItems: SessionItem[] = importedExercises.map((ex) => ({
        type: 'exercise',
        data: ex,
      }));
      handleSessionChange(importingForSession, {
        items: [...session.items, ...newItems],
      });
    } else {
      handleSessionChange(importingForSession, {
        exercises: [...session.exercises, ...importedExercises],
      });
    }
  };

  const getSessionItemCount = (session: WorkoutSession): number => {
    if (session.items && session.items.length > 0) {
      return session.items.length;
    }
    return session.exercises.length;
  };

  const getAllExercisesFromSession = (session: WorkoutSession): Exercise[] => {
    if (session.items && session.items.length > 0) {
      return session.items.flatMap((item) =>
        item.type === 'exercise' ? [item.data] : item.data.exercises
      );
    }
    return session.exercises;
  };

  const currentSessionForImport = importingForSession
    ? sessions.find((s) => s.id === importingForSession)
    : null;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md flex items-start gap-2">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
        <div>
          <strong>Daily Schedule Mode:</strong> View and edit every individual session.
          Changes here override the weekly pattern for specific days.
        </div>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          {Object.entries(sessionsByWeek).map(([weekNum, weekSessions]) => (
            <div key={weekNum}>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Week {weekNum}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {weekSessions.map((session, dayIndex) => (
                  <Collapsible
                    key={session.id}
                    open={expandedSession === session.id}
                    onOpenChange={(open) =>
                      setExpandedSession(open ? session.id : null)
                    }
                  >
                    <Card className="overflow-hidden">
                      <CollapsibleTrigger asChild>
                        <CardHeader className="p-3 cursor-pointer hover:bg-muted/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-sm">
                                Day {dayIndex + 1}
                              </CardTitle>
                              <p className="text-xs text-muted-foreground">
                                {session.title || `Session ${session.sessionNumber}`}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {session.isOverride && (
                                <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-600 border-amber-500/30">
                                  <Pencil className="h-3 w-3 mr-1" />
                                  Customized
                                </Badge>
                              )}
                              <Badge variant="secondary" className="text-xs">
                                {getSessionItemCount(session)} items
                              </Badge>
                              {expandedSession === session.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="p-3 pt-0 space-y-2">
                          <Input
                            placeholder="Session title"
                            value={session.title}
                            onChange={(e) =>
                              handleSessionChange(session.id, { title: e.target.value })
                            }
                            className="text-sm"
                          />

                          {/* Render items or exercises */}
                          {session.items && session.items.length > 0 ? (
                            <div className="space-y-2">
                              {session.items.map((item, itemIndex) => (
                                item.type === 'exercise' ? (
                                  <ExerciseRowWithSelector
                                    key={item.data.id}
                                    exercise={item.data}
                                    index={itemIndex}
                                    onExerciseChange={(updatedEx) =>
                                      handleItemExerciseUpdate(session.id, itemIndex, updatedEx)
                                    }
                                    onRemove={() => handleRemoveItem(session.id, item.data.id)}
                                    compact={true}
                                    showDragHandle={false}
                                  />
                                ) : (
                                  <div key={item.data.id} className="border border-primary/30 rounded-md p-2 bg-primary/5">
                                    <div className="flex items-center gap-1 mb-1">
                                      <RotateCcw className="h-3 w-3 text-primary" />
                                      <span className="text-xs font-medium text-primary">
                                        {item.data.name || "Circuit"}
                                      </span>
                                      <span className="text-xs text-muted-foreground ml-auto">
                                        {item.data.rounds}R × {item.data.exercises.length}ex
                                      </span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5"
                                        onClick={() => handleRemoveItem(session.id, item.data.id)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                )
                              ))}
                            </div>
                          ) : session.exercises.length > 0 ? (
                            <div className="space-y-2">
                              {session.exercises.map((exercise, i) => (
                                <ExerciseRowWithSelector
                                  key={exercise.id}
                                  exercise={exercise}
                                  index={i}
                                  onExerciseChange={(updatedEx) =>
                                    handleExerciseUpdate(session.id, exercise.id, updatedEx)
                                  }
                                  onRemove={() => handleRemoveExercise(session.id, exercise.id)}
                                  compact={true}
                                  showDragHandle={false}
                                />
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground text-center py-2">
                              No exercises
                            </p>
                          )}

                          <div className="flex gap-1 pt-1">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 h-7 text-xs"
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                  <ChevronDown className="h-3 w-3 ml-1" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                <DropdownMenuItem onClick={() => handleAddExercise(session.id)}>
                                  <Dumbbell className="h-3 w-3 mr-2" />
                                  Exercise
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleOpenImportDialog(session.id)}>
                                  <Layers className="h-3 w-3 mr-2" />
                                  Routine
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleAddCircuit(session.id)}>
                                  <RotateCcw className="h-3 w-3 mr-2" />
                                  Circuit
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <ImportRoutineDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        routines={routines}
        onImport={handleImportRoutine}
        onCreateRoutine={onCreateRoutine}
        currentExercises={currentSessionForImport ? getAllExercisesFromSession(currentSessionForImport) : []}
      />
    </div>
  );
}
