
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
    <CardHeader className="bg-primary/5 pb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <CardTitle className="flex items-center mb-2">
            <Dumbbell className="mr-2 h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <CardDescription className="mb-3">
            {week} • Created by {trainerName}
          </CardDescription>
          
          {/* Program Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {duration && (
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                {duration} weeks
              </div>
            )}
            
            {targetFrequency && (
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {targetFrequency}x/week
              </div>
            )}
            
            {totalSessions && (
              <div className="flex items-center text-muted-foreground">
                <Target className="mr-1 h-3 w-3" />
                {totalSessions} sessions
              </div>
            )}
            
            {isPaid && price && (
              <div className="flex items-center text-muted-foreground">
                <DollarSign className="mr-1 h-3 w-3" />
                €{price}
              </div>
            )}
          </div>
          
          {objective && (
            <div className="mt-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {objective}
              </Badge>
            </div>
          )}
        </div>
        
        <Button variant="outline" size="sm" className="flex items-center ml-4">
          <Download className="mr-2 h-4 w-4" />
          Export PDF
        </Button>
      </div>
    </CardHeader>
  );
}
