import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { it } from "date-fns/locale";

interface WeekNavigationProps {
  currentWeek: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
}

export function WeekNavigation({ 
  currentWeek, 
  onPrevWeek, 
  onNextWeek, 
  onToday 
}: WeekNavigationProps) {
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  
  const isCurrentWeek = () => {
    const today = new Date();
    const todayWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    return weekStart.getTime() === todayWeekStart.getTime();
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevWeek}
          className="h-9 w-9 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onNextWeek}
          className="h-9 w-9 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="text-lg font-semibold ml-4">
          {format(weekStart, 'd MMM', { locale: it })} - {format(weekEnd, 'd MMM yyyy', { locale: it })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!isCurrentWeek() && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToday}
            className="gap-2"
          >
            <Calendar className="h-4 w-4" />
            Oggi
          </Button>
        )}
      </div>
    </div>
  );
}