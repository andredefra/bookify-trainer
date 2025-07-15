
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Download, Calendar, DollarSign, Target, Clock } from "lucide-react";

interface TrainingProgramHeaderProps {
  title: string;
  week: string;
  trainerName: string;
  duration?: number;
  targetFrequency?: number;
  totalSessions?: number;
  isPaid?: boolean;
  price?: number;
  objective?: string;
}

export function TrainingProgramHeader({ 
  title, 
  week, 
  trainerName, 
  duration, 
  targetFrequency, 
  totalSessions, 
  isPaid, 
  price, 
  objective 
}: TrainingProgramHeaderProps) {
  return (
    <CardHeader className="bg-primary/5 pb-3 sm:pb-4 px-3 sm:px-4 md:px-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div className="flex-1 min-w-0">
            <CardTitle className="flex items-center mb-2 text-base sm:text-lg md:text-xl">
              <Dumbbell className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
              <span className="truncate">{title}</span>
            </CardTitle>
            <CardDescription className="mb-3 text-xs sm:text-sm">
              {week} • Created by {trainerName}
            </CardDescription>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center flex-shrink-0 w-full sm:w-auto min-h-[44px] sm:min-h-[36px]"
          >
            <Download className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">Export PDF</span>
          </Button>
        </div>
        
        {/* Program Details - Mobile First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
          {duration && (
            <div className="flex items-center text-muted-foreground min-h-[24px]">
              <Calendar className="mr-2 h-3 w-3 flex-shrink-0" />
              <span>{duration} weeks</span>
            </div>
          )}
          
          {targetFrequency && (
            <div className="flex items-center text-muted-foreground min-h-[24px]">
              <Clock className="mr-2 h-3 w-3 flex-shrink-0" />
              <span>{targetFrequency}x per week</span>
            </div>
          )}
          
          {totalSessions && (
            <div className="flex items-center text-muted-foreground min-h-[24px]">
              <Target className="mr-2 h-3 w-3 flex-shrink-0" />
              <span>{totalSessions} total sessions</span>
            </div>
          )}
          
          {isPaid && price && (
            <div className="flex items-center text-muted-foreground min-h-[24px]">
              <DollarSign className="mr-2 h-3 w-3 flex-shrink-0" />
              <span>€{price}</span>
            </div>
          )}
        </div>
        
        {objective && (
          <div className="mt-1">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
              {objective}
            </Badge>
          </div>
        )}
      </div>
    </CardHeader>
  );
}
