
import { WorkoutDay } from "@/data/training/types";

interface DayTabsProps {
  days: WorkoutDay[];
  activeDay: string;
  setActiveDay: (dayId: string) => void;
}

export function DayTabs({ days, activeDay, setActiveDay }: DayTabsProps) {
  return (
    <div className="grid grid-cols-7 border-b">
      {days.map((day) => (
        <button
          key={day.id}
          type="button"
          className={`p-3 text-center border-r last:border-r-0 transition-colors ${
            activeDay === day.id ? "bg-primary/10 text-primary" : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveDay(day.id)}
        >
          <div className="text-xs font-medium">{day.day}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {day.exercises.length} exercises
          </div>
        </button>
      ))}
    </div>
  );
}
