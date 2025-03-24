
import { CheckCircle } from "lucide-react";

interface Day {
  id: string;
  day: string;
  completed: boolean;
}

interface DaySelectorProps {
  days: Day[];
  activeDay: string | null;
  onDaySelect: (dayId: string) => void;
}

export function DaySelector({ days, activeDay, onDaySelect }: DaySelectorProps) {
  return (
    <div className="grid grid-cols-7 border-b">
      {days.map((day) => (
        <button
          key={day.id}
          className={`p-3 text-center border-r last:border-r-0 transition-colors ${
            activeDay === day.id ? "bg-primary/10 text-primary" : "hover:bg-gray-50"
          } ${day.completed ? "text-emerald-600" : ""}`}
          onClick={() => onDaySelect(day.id)}
        >
          <div className="text-xs font-medium">{day.day}</div>
          {day.completed && (
            <CheckCircle className="h-3 w-3 mx-auto mt-1 text-emerald-600" />
          )}
        </button>
      ))}
    </div>
  );
}
