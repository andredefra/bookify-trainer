import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatternDayPanel } from "./PatternDayPanel";
import { DayPattern, Routine } from "@/data/training/types";

interface WeeklyPatternViewProps {
  sessionsPerWeek: number;
  dayPatterns: DayPattern[];
  onDayPatternsChange: (patterns: DayPattern[]) => void;
  routines: Routine[];
}

export function WeeklyPatternView({
  sessionsPerWeek,
  dayPatterns,
  onDayPatternsChange,
  routines,
}: WeeklyPatternViewProps) {
  const [activeDay, setActiveDay] = useState("1");

  const handlePatternChange = (dayNumber: number, updates: Partial<DayPattern>) => {
    onDayPatternsChange(
      dayPatterns.map((pattern) =>
        pattern.dayNumber === dayNumber ? { ...pattern, ...updates } : pattern
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
        <strong>Weekly Pattern Mode:</strong> Design a "master week" that repeats for the
        entire program duration. Exercises added to Day 1 will appear in Week 1 Day 1,
        Week 2 Day 1, etc.
      </div>

      <Tabs value={activeDay} onValueChange={setActiveDay}>
        <div className="overflow-x-auto">
          <TabsList className="w-auto inline-flex">
            {Array.from({ length: sessionsPerWeek }, (_, i) => i + 1).map((day) => {
              const pattern = dayPatterns.find((p) => p.dayNumber === day);
              const exerciseCount = pattern?.exercises.length || 0;
              return (
                <TabsTrigger
                  key={day}
                  value={day.toString()}
                  className="flex items-center gap-2"
                >
                  Day {day}
                  {exerciseCount > 0 && (
                    <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">
                      {exerciseCount}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {Array.from({ length: sessionsPerWeek }, (_, i) => i + 1).map((day) => {
          const pattern = dayPatterns.find((p) => p.dayNumber === day) || {
            dayNumber: day,
            title: "",
            exercises: [],
          };

          return (
            <TabsContent key={day} value={day.toString()} className="mt-4">
              <PatternDayPanel
                dayNumber={day}
                title={pattern.title}
                exercises={pattern.exercises}
                onTitleChange={(title) => handlePatternChange(day, { title })}
                onExercisesChange={(exercises) =>
                  handlePatternChange(day, { exercises })
                }
                routines={routines}
                sessionsPerWeek={sessionsPerWeek}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
