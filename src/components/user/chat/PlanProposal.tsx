import { CheckCircle, Clock, Target, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration_weeks: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  plan_data: {
    weeks: Array<{
      week: number;
      days: Array<{
        day: number;
        exercises: Array<{
          name: string;
          sets: number;
          reps: string;
          rest: string;
        }>;
      }>;
    }>;
  };
  status: 'pending' | 'accepted' | 'active' | 'completed';
}

interface PlanProposalProps {
  plan: TrainingPlan;
  onAccept: (planId: string) => void;
  onReject?: (planId: string) => void;
  isLoading?: boolean;
}

export function PlanProposal({ plan, onAccept, onReject, isLoading }: PlanProposalProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const totalExercises = plan.plan_data.weeks.reduce((total, week) => {
    return total + week.days.reduce((dayTotal, day) => {
      return dayTotal + day.exercises.length;
    }, 0);
  }, 0);

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              {plan.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{plan.description}</p>
          </div>
          <Badge className={getDifficultyColor(plan.difficulty_level)}>
            {plan.difficulty_level}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Plan Details */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{plan.duration_weeks} settimane</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{totalExercises} esercizi totali</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span>{plan.plan_data.weeks.length} settimane</span>
          </div>
        </div>

        {/* Goals */}
        {plan.goals && plan.goals.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Obiettivi:</h4>
            <div className="flex flex-wrap gap-1">
              {plan.goals.map((goal, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Preview of first week */}
        {plan.plan_data.weeks[0] && (
          <div className="border rounded-lg p-3 bg-muted/30">
            <h4 className="text-sm font-medium mb-2">Anteprima Settimana 1:</h4>
            <div className="space-y-1 text-xs">
              {plan.plan_data.weeks[0].days.slice(0, 2).map((day, dayIndex) => (
                <div key={dayIndex}>
                  <span className="font-medium">Giorno {day.day}:</span>
                  <span className="ml-2 text-muted-foreground">
                    {day.exercises.slice(0, 3).map(ex => ex.name).join(', ')}
                    {day.exercises.length > 3 && '...'}
                  </span>
                </div>
              ))}
              {plan.plan_data.weeks[0].days.length > 2 && (
                <div className="text-muted-foreground">
                  ... e altri {plan.plan_data.weeks[0].days.length - 2} giorni
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={() => onAccept(plan.id)}
            disabled={isLoading}
            className="flex-1"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {isLoading ? 'Accettando...' : 'Accetta Piano'}
          </Button>
          {onReject && (
            <Button 
              variant="outline" 
              onClick={() => onReject(plan.id)}
              disabled={isLoading}
            >
              Rifiuta
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}