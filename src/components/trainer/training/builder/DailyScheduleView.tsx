import { useState } from "react";
import { WorkoutSession, Routine } from "@/data/training/types";
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
import { ChevronDown, ChevronUp, Plus, Trash2, Layers, AlertCircle } from "lucide-react";
import { ImportRoutineDialog } from "./ImportRoutineDialog";

interface DailyScheduleViewProps {
  sessions: WorkoutSession[];
  onSessionsChange: (sessions: WorkoutSession[]) => void;
  duration: number;
  sessionsPerWeek: number;
  routines: Routine[];
}

export function DailyScheduleView({
  sessions,
  onSessionsChange,
  duration,
  sessionsPerWeek,
  routines,
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

  const handleSessionChange = (sessionId: string, updates: Partial<WorkoutSession>) => {
    onSessionsChange(
      sessions.map((s) => (s.id === sessionId ? { ...s, ...updates } : s))
    );
  };

  const handleAddExercise = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    const newExercise = {
      id: `ex-${Date.now()}`,
      name: "",
      sets: 3,
      reps: "10",
      repsUnit: "reps" as const,
    };

    handleSessionChange(sessionId, {
      exercises: [...session.exercises, newExercise],
    });
  };

  const handleRemoveExercise = (sessionId: string, exerciseId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    handleSessionChange(sessionId, {
      exercises: session.exercises.filter((e) => e.id !== exerciseId),
    });
  };

  const handleExerciseChange = (
    sessionId: string,
    exerciseId: string,
    field: string,
    value: any
  ) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    handleSessionChange(sessionId, {
      exercises: session.exercises.map((e) =>
        e.id === exerciseId ? { ...e, [field]: value } : e
      ),
    });
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

    handleSessionChange(importingForSession, {
      exercises: [...session.exercises, ...importedExercises],
    });
  };

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
                              <Badge variant="secondary" className="text-xs">
                                {session.exercises.length} ex
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

                          {session.exercises.length > 0 ? (
                            <div className="space-y-1">
                              {session.exercises.map((exercise, i) => (
                                <div
                                  key={exercise.id}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <span className="text-muted-foreground w-4">
                                    {i + 1}.
                                  </span>
                                  <Input
                                    value={exercise.name}
                                    onChange={(e) =>
                                      handleExerciseChange(
                                        session.id,
                                        exercise.id,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    className="flex-1 h-7 text-xs"
                                    placeholder="Exercise"
                                  />
                                  <Input
                                    type="number"
                                    value={exercise.sets}
                                    onChange={(e) =>
                                      handleExerciseChange(
                                        session.id,
                                        exercise.id,
                                        "sets",
                                        parseInt(e.target.value) || 1
                                      )
                                    }
                                    className="w-10 h-7 text-xs text-center"
                                  />
                                  <span>×</span>
                                  <Input
                                    value={exercise.reps}
                                    onChange={(e) =>
                                      handleExerciseChange(
                                        session.id,
                                        exercise.id,
                                        "reps",
                                        e.target.value
                                      )
                                    }
                                    className="w-12 h-7 text-xs"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() =>
                                      handleRemoveExercise(session.id, exercise.id)
                                    }
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground text-center py-2">
                              No exercises
                            </p>
                          )}

                          <div className="flex gap-1 pt-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="flex-1 h-7 text-xs"
                              onClick={() => handleAddExercise(session.id)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => handleOpenImportDialog(session.id)}
                            >
                              <Layers className="h-3 w-3" />
                            </Button>
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
      />
    </div>
  );
}
