import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BuilderModeToggle } from "../builder/BuilderModeToggle";
import { WeeklyPatternView } from "../builder/WeeklyPatternView";
import { DailyScheduleView } from "../builder/DailyScheduleView";
import { DayPattern, WorkoutSession, Routine, SessionItem } from "@/data/training/types";
import { useRoutines } from "@/components/trainer/dashboard/tabs/routines/hooks/useRoutines";

type BuilderMode = "weekly" | "daily";

interface Step2BuilderProps {
  duration: number;
  sessionsPerWeek: number;
  sessions: WorkoutSession[];
  onSessionsChange: (sessions: WorkoutSession[]) => void;
  onBack: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function Step2Builder({
  duration,
  sessionsPerWeek,
  sessions,
  onSessionsChange,
  onBack,
  onSave,
  isSaving,
}: Step2BuilderProps) {
  const [mode, setMode] = useState<BuilderMode>("weekly");
  const { routines, addRoutine } = useRoutines();

  // Week-specific pattern overrides
  const [weekPatterns, setWeekPatterns] = useState<Map<number, DayPattern[]>>(new Map());

  // Initialize day patterns from sessions or create empty ones
  const [dayPatterns, setDayPatterns] = useState<DayPattern[]>(() => {
    const patterns: DayPattern[] = [];
    for (let i = 1; i <= sessionsPerWeek; i++) {
      // Try to get pattern from first week's sessions
      const firstWeekSession = sessions[i - 1];
      patterns.push({
        dayNumber: i,
        title: firstWeekSession?.title || "",
        exercises: firstWeekSession?.exercises || [],
        items: firstWeekSession?.items || [],
      });
    }
    return patterns;
  });

  // When switching to Daily Schedule mode, generate sessions from patterns
  useEffect(() => {
    if (mode === "daily") {
      applyPatternsToSessions();
    }
  }, [mode]);

  // Update sessions per week changes
  useEffect(() => {
    // Ensure we have the right number of patterns
    if (dayPatterns.length !== sessionsPerWeek) {
      const newPatterns: DayPattern[] = [];
      for (let i = 1; i <= sessionsPerWeek; i++) {
        const existingPattern = dayPatterns.find((p) => p.dayNumber === i);
        newPatterns.push(
          existingPattern || { dayNumber: i, title: "", exercises: [], items: [] }
        );
      }
      setDayPatterns(newPatterns);
    }
  }, [sessionsPerWeek]);

  const applyPatternsToSessions = () => {
    const newSessions: WorkoutSession[] = [];
    let sessionNumber = 1;

    for (let week = 0; week < duration; week++) {
      const weekNumber = week + 1;
      // Use week-specific pattern if exists, otherwise use master
      const patterns = weekPatterns.get(weekNumber) || dayPatterns;

      for (let day = 0; day < sessionsPerWeek; day++) {
        const pattern = patterns[day];
        const existingSession = sessions.find(
          (s) => s.sessionNumber === sessionNumber
        );

        // If session is marked as overridden, preserve it completely
        if (existingSession?.isOverride) {
          newSessions.push(existingSession);
        } else {
          // Otherwise, generate from pattern
          const exercisesFromPattern = (pattern?.exercises || []).map((ex) => ({
            ...ex,
            id: `${ex.id}-session-${sessionNumber}`,
          }));

          const itemsFromPattern = (pattern?.items || []).map((item) => ({
            ...item,
            data: {
              ...item.data,
              id: `${item.data.id}-session-${sessionNumber}`,
              ...(item.type === 'circuit' && {
                exercises: item.data.exercises?.map((ex: any) => ({
                  ...ex,
                  id: `${ex.id}-session-${sessionNumber}`,
                })),
              }),
            },
          })) as SessionItem[];

          newSessions.push({
            id: existingSession?.id || `session-${sessionNumber}`,
            sessionNumber,
            title: pattern?.title || `Session ${sessionNumber}`,
            exercises: exercisesFromPattern,
            items: itemsFromPattern,
            completed: existingSession?.completed || false,
            isOverride: false,
            dayOfWeek: day + 1,
          });
        }
        sessionNumber++;
      }
    }

    onSessionsChange(newSessions);
  };

  const handleDayPatternsChange = (patterns: DayPattern[]) => {
    setDayPatterns(patterns);
  };

  const handleWeekPatternsChange = (patterns: Map<number, DayPattern[]>) => {
    setWeekPatterns(patterns);
  };

  const handleCreateRoutine = (routine: Routine) => {
    addRoutine(routine);
  };

  const handleSave = () => {
    // Before saving, ensure sessions are generated from patterns
    if (mode === "weekly") {
      applyPatternsToSessions();
    }
    onSave();
  };

  return (
    <div className="space-y-4">
      <BuilderModeToggle mode={mode} onModeChange={setMode} />

      {mode === "weekly" ? (
        <WeeklyPatternView
          sessionsPerWeek={sessionsPerWeek}
          duration={duration}
          dayPatterns={dayPatterns}
          onDayPatternsChange={handleDayPatternsChange}
          routines={routines}
          onCreateRoutine={handleCreateRoutine}
          weekPatterns={weekPatterns}
          onWeekPatternsChange={handleWeekPatternsChange}
        />
      ) : (
        <DailyScheduleView
          sessions={sessions}
          onSessionsChange={onSessionsChange}
          duration={duration}
          sessionsPerWeek={sessionsPerWeek}
          routines={routines}
          onCreateRoutine={handleCreateRoutine}
        />
      )}

      <div className="flex justify-between pt-4 border-t">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button type="button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Template"}
        </Button>
      </div>
    </div>
  );
}
