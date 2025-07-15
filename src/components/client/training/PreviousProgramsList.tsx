
import { useState } from "react";
import { TrainingProgram } from "@/data/training";
import { TrainingProgramCard } from "@/components/client/training/TrainingProgramCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Calendar, Target, DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface PreviousProgramsListProps {
  programs: TrainingProgram[];
}

export function PreviousProgramsList({ programs }: PreviousProgramsListProps) {
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set());

  const toggleProgram = (programId: string) => {
    const newExpanded = new Set(expandedPrograms);
    if (newExpanded.has(programId)) {
      newExpanded.delete(programId);
    } else {
      newExpanded.add(programId);
    }
    setExpandedPrograms(newExpanded);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {programs.map(program => {
        const isExpanded = expandedPrograms.has(program.id);
        const completedSessions = program.sessions.filter(session => session.completed).length;
        const isFullyCompleted = completedSessions === program.totalSessions;
        
        return (
          <div key={program.id}>
            {!isExpanded ? (
              <Card className="border-gray-200">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base sm:text-lg mb-2 truncate">{program.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                        Created by {program.trainerName} • {program.week}
                      </p>
                      
                      {/* Program Details Grid - Mobile First */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm mb-3">
                        {program.duration && (
                          <div className="flex items-center text-muted-foreground min-h-[24px]">
                            <Calendar className="mr-2 h-3 w-3 flex-shrink-0" />
                            <span>{program.duration} weeks</span>
                          </div>
                        )}
                        
                        {program.targetFrequency && (
                          <div className="flex items-center text-muted-foreground min-h-[24px]">
                            <Clock className="mr-2 h-3 w-3 flex-shrink-0" />
                            <span>{program.targetFrequency}x per week</span>
                          </div>
                        )}
                        
                        {program.totalSessions && (
                          <div className="flex items-center text-muted-foreground min-h-[24px]">
                            <Target className="mr-2 h-3 w-3 flex-shrink-0" />
                            <span>{completedSessions}/{program.totalSessions} sessions</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-muted-foreground min-h-[24px]">
                          <DollarSign className="mr-2 h-3 w-3 flex-shrink-0" />
                          <span>{program.isPaid && program.price ? `€${program.price}` : 'Free'}</span>
                        </div>
                      </div>
                      
                      {/* Objective Badge */}
                      {program.objective && (
                        <div className="mt-3">
                          {isFullyCompleted ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                              Completed: {program.objective}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">
                              Incomplete: {program.objective}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleProgram(program.id)}
                      className="flex-shrink-0 w-full sm:w-auto min-h-[44px] sm:min-h-[36px]"
                    >
                      <ChevronDown className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3 className="font-medium text-base sm:text-lg">Program Details</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleProgram(program.id)}
                    className="w-full sm:w-auto min-h-[44px] sm:min-h-[36px]"
                  >
                    <ChevronUp className="h-4 w-4 mr-1" />
                    Collapse
                  </Button>
                </div>
                <TrainingProgramCard program={program} />
              </div>
            )}
          </div>
        );
      })}
      
      <div className="text-center mt-4 sm:mt-6">
        <Button variant="outline" className="min-h-[44px]">View All Previous Programs</Button>
      </div>
    </div>
  );
}
