
import { CheckCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className={`grid grid-cols-7 border-b ${isMobile ? 'text-xs' : ''}`}>
      {days.map((day) => (
        <button
          key={day.id}
          className={`p-3 ${isMobile ? 'p-2' : 'p-3'} text-center border-r last:border-r-0 transition-colors ${
            activeDay === day.id ? "bg-primary/10 text-primary" : "hover:bg-gray-50"
          } ${day.completed ? "text-emerald-600" : ""}`}
          onClick={() => onDaySelect(day.id)}
          aria-label={`Select ${day.day}`}
        >
          <div className={`${isMobile ? 'text-xs' : 'text-xs'} font-medium`}>{day.day}</div>
          {day.completed && (
            <CheckCircle className={`${isMobile ? 'h-2.5 w-2.5' : 'h-3 w-3'} mx-auto mt-1 text-emerald-600`} />
          )}
        </button>
      ))}
    </div>
  );
}
