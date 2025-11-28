import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrainingProgram } from "@/data/training/types";
import { Calendar, User, Target, ChevronRight, Settings } from "lucide-react";

interface ProgramListViewProps {
  activePrograms: TrainingProgram[];
  previousPrograms: TrainingProgram[];
  onSelectProgram: (program: TrainingProgram) => void;
  onManageProgram?: (program: TrainingProgram) => void;
}

export function ProgramListView({ 
  activePrograms, 
  previousPrograms, 
  onSelectProgram,
  onManageProgram
}: ProgramListViewProps) {
  
  console.log('🎨 [ProgramListView] Rendering with:', {
    activeCount: activePrograms.length,
    previousCount: previousPrograms.length,
    activePrograms: activePrograms.map(p => ({
      title: p.title,
      sessions: `${p.sessions?.filter(s => s.completed).length || 0}/${p.totalSessions}`
    }))
  });
  
  const calculateProgress = (program: TrainingProgram): number => {
    const completedSessions = program.sessions.filter(s => s.completed).length;
    return (completedSessions / program.totalSessions) * 100;
  };

  const getStatusBadge = (status: 'active' | 'completed' | 'expired') => {
    const variants = {
      active: { label: 'Active', className: 'bg-primary/10 text-primary hover:bg-primary/20' },
      completed: { label: 'Completed', className: 'bg-green-500/10 text-green-600 hover:bg-green-500/20' },
      expired: { label: 'Expired', className: 'bg-muted text-muted-foreground' }
    };
    
    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const ProgramCard = ({ program, status }: { program: TrainingProgram; status: 'active' | 'completed' | 'expired' }) => {
    const progress = calculateProgress(program);
    const completedSessions = program.sessions.filter(s => s.completed).length;

    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => onSelectProgram(program)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {program.title}
                </CardTitle>
                {program.paymentStatus === 'pending' && (
                  <Badge variant="destructive" className="text-xs">
                    Payment Pending
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span>{program.trainerName}</span>
              </div>
            </div>
            {getStatusBadge(status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{completedSessions} / {program.totalSessions} sessions</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {program.duration && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{program.duration} weeks</span>
                </div>
              )}
              {program.objective && (
                <div className="flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5" />
                  <span className="line-clamp-1">{program.objective}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProgram(program);
                }}
              >
                View Details
                <ChevronRight className="h-4 w-4" />
              </Button>
              {onManageProgram && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onManageProgram(program);
                  }}
                >
                  <Settings className="h-4 w-4" />
                  Manage
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const EmptyState = ({ type }: { type: 'active' | 'previous' }) => (
    <Card className="border-dashed">
      <CardContent className="py-8 text-center">
        <p className="text-muted-foreground">
          {type === 'active' 
            ? 'No active training programs. Purchase a program package to get started!'
            : 'No previous programs yet.'
          }
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Active Programs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Active Programs</h2>
          {activePrograms.length > 0 && (
            <Badge variant="secondary">{activePrograms.length}</Badge>
          )}
        </div>
        
        {activePrograms.length === 0 ? (
          <EmptyState type="active" />
        ) : (
          <div className="grid gap-4">
            {activePrograms.map((program) => (
              <ProgramCard key={program.id} program={program} status="active" />
            ))}
          </div>
        )}
      </div>

      {/* Previous Programs */}
      {previousPrograms.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Previous Programs</h2>
            <Badge variant="secondary">{previousPrograms.length}</Badge>
          </div>
          
          <div className="grid gap-4">
            {previousPrograms.map((program) => {
              const isCompleted = program.sessions.every(s => s.completed);
              return (
                <ProgramCard 
                  key={program.id} 
                  program={program} 
                  status={isCompleted ? 'completed' : 'expired'} 
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
