
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
    <div className="space-y-4">
      {programs.map(program => {
        const isExpanded = expandedPrograms.has(program.id);
        const completedSessions = program.sessions.filter(session => session.completed).length;
        const isFullyCompleted = completedSessions === program.totalSessions;
        
        return (
          <div key={program.id}>
            {!isExpanded ? (
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-2">{program.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Created by {program.trainerName} • {program.week}
                      </p>
                      
                      {/* Program Details Grid - Aligned with current program header */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                        {program.duration && (
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            {program.duration} weeks
                          </div>
                        )}
                        
                        {program.targetFrequency && (
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {program.targetFrequency}x/week
                          </div>
                        )}
                        
                        {program.totalSessions && (
                          <div className="flex items-center text-muted-foreground">
                            <Target className="mr-1 h-3 w-3" />
                            {completedSessions}/{program.totalSessions} sessions
                          </div>
                        )}
                        
                        <div className="flex items-center text-muted-foreground">
                          <DollarSign className="mr-1 h-3 w-3" />
                          {program.isPaid && program.price ? `€${program.price}` : 'Free'}
                        </div>
                      </div>
                      
                      {/* Objective Badge with correct completion logic */}
                      {program.objective && (
                        <div className="mt-3">
                          {isFullyCompleted ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Completed: {program.objective}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
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
                      className="ml-4"
                    >
                      <ChevronDown className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">Program Details</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleProgram(program.id)}
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
      
      <div className="text-center mt-6">
        <Button variant="outline">View All Previous Programs</Button>
      </div>
    </div>
  );
}
