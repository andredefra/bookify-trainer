import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PatternDayPanel } from "./PatternDayPanel";
import { DayPattern, Routine, SessionItem } from "@/data/training/types";
import { cn } from "@/lib/utils";

interface WeeklyPatternViewProps {
  sessionsPerWeek: number;
  duration: number;
  dayPatterns: DayPattern[];
  onDayPatternsChange: (patterns: DayPattern[]) => void;
  routines: Routine[];
  onCreateRoutine?: (routine: Routine) => void;
  weekPatterns?: Map<number, DayPattern[]>;
  onWeekPatternsChange?: (patterns: Map<number, DayPattern[]>) => void;
}

export function WeeklyPatternView({
  sessionsPerWeek,
  duration,
  dayPatterns,
  onDayPatternsChange,
  routines,
  onCreateRoutine,
  weekPatterns = new Map(),
  onWeekPatternsChange,
}: WeeklyPatternViewProps) {
  const [activeDay, setActiveDay] = useState("1");
  const [activeWeek, setActiveWeek] = useState<number | null>(null); // null = master pattern

  // Get the active patterns (master or week-specific)
  const activePatterns = activeWeek !== null
    ? weekPatterns.get(activeWeek) || dayPatterns
    : dayPatterns;

  const handlePatternChange = (dayNumber: number, updates: Partial<DayPattern>) => {
    const newPatterns = activePatterns.map((pattern) =>
      pattern.dayNumber === dayNumber ? { ...pattern, ...updates } : pattern
    );

    if (activeWeek !== null) {
      // Update week-specific patterns
      const newWeekPatterns = new Map(weekPatterns);
      newWeekPatterns.set(activeWeek, newPatterns);
      onWeekPatternsChange?.(newWeekPatterns);
    } else {
      // Update master patterns
      onDayPatternsChange(newPatterns);
    }
  };

  const handleItemsChange = (dayNumber: number, items: SessionItem[]) => {
    handlePatternChange(dayNumber, { items });
  };

  const handleWeekSelect = (week: number | null) => {
    if (week !== null && !weekPatterns.has(week)) {
      // Clone master pattern for this week
      const clonedPatterns = dayPatterns.map((p) => ({
        ...p,
        exercises: [...p.exercises],
        items: p.items ? [...p.items] : undefined,
      }));
      const newWeekPatterns = new Map(weekPatterns);
      newWeekPatterns.set(week, clonedPatterns);
      onWeekPatternsChange?.(newWeekPatterns);
    }
    setActiveWeek(week);
  };

  const getItemCount = (pattern: DayPattern | undefined): number => {
    if (!pattern) return 0;
    if (pattern.items && pattern.items.length > 0) {
      return pattern.items.length;
    }
    return pattern.exercises?.length || 0;
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
        <strong>Weekly Pattern Mode:</strong> Design a "master week" that repeats for the
        entire program duration. Use week overrides to add progression.
      </div>

      {/* Week Selector */}
      {duration > 1 && (
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b">
          <span className="text-sm text-muted-foreground">Editing:</span>
          <Badge
            variant={activeWeek === null ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all",
              activeWeek === null && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => handleWeekSelect(null)}
          >
            Master Pattern
          </Badge>
          {Array.from({ length: duration }, (_, i) => i + 1).map((week) => {
            const hasOverride = weekPatterns.has(week);
            return (
              <Badge
                key={week}
                variant={activeWeek === week ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all",
                  activeWeek === week && "ring-2 ring-primary ring-offset-2",
                  hasOverride && activeWeek !== week && "border-amber-500 text-amber-600"
                )}
                onClick={() => handleWeekSelect(week)}
              >
                Week {week}
                {hasOverride && <span className="ml-1 text-amber-500">*</span>}
              </Badge>
            );
          })}
        </div>
      )}

      {activeWeek !== null && (
        <div className="text-xs text-amber-600 bg-amber-500/10 p-2 rounded-md">
          <strong>Week {activeWeek} Override:</strong> Changes here only affect Week {activeWeek}.
          The master pattern won't be modified.
        </div>
      )}

      <Tabs value={activeDay} onValueChange={setActiveDay}>
        <div className="overflow-x-auto">
          <TabsList className="w-auto inline-flex">
            {Array.from({ length: sessionsPerWeek }, (_, i) => i + 1).map((day) => {
              const pattern = activePatterns.find((p) => p.dayNumber === day);
              const itemCount = getItemCount(pattern);
              return (
                <TabsTrigger
                  key={day}
                  value={day.toString()}
                  className="flex items-center gap-2"
                >
                  Day {day}
                  {itemCount > 0 && (
                    <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                      {itemCount}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {Array.from({ length: sessionsPerWeek }, (_, i) => i + 1).map((day) => {
          const pattern = activePatterns.find((p) => p.dayNumber === day) || {
            dayNumber: day,
            title: "",
            exercises: [],
            items: [],
          };

          return (
            <TabsContent key={day} value={day.toString()} className="mt-4">
              <PatternDayPanel
                dayNumber={day}
                title={pattern.title}
                exercises={pattern.exercises}
                items={pattern.items}
                onTitleChange={(title) => handlePatternChange(day, { title })}
                onExercisesChange={(exercises) =>
                  handlePatternChange(day, { exercises })
                }
                onItemsChange={(items) => handleItemsChange(day, items)}
                routines={routines}
                sessionsPerWeek={sessionsPerWeek}
                onCreateRoutine={onCreateRoutine}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
