import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Clock, 
  TrendingUp, 
  Calendar,
  Play,
  Pause,
  CheckCircle,
  Trophy,
  Dumbbell,
  MessageCircle
} from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export function UserTrainingProgram() {
  const [activeTab, setActiveTab] = useState("current");
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTrainingPlans();
  }, []);

  const loadTrainingPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('training_plans' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTrainingPlans((data as unknown as TrainingPlan[]) || []);
    } catch (error) {
      console.error('Error loading training plans:', error);
      setTrainingPlans([]); // Use empty array as fallback
    } finally {
      setIsLoading(false);
    }
  };

  const activatePlan = async (planId: string) => {
    try {
      const { error } = await supabase
        .from('training_plans' as any)
        .update({ 
          status: 'active',
          started_at: new Date().toISOString()
        })
        .eq('id', planId);

      if (error) throw error;
      
      await loadTrainingPlans();
      toast({
        title: 'Piano Attivato!',
        description: 'Il piano di allenamento è ora attivo'
      });
    } catch (error) {
      console.error('Error activating plan:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile attivare il piano',
        variant: 'destructive'
      });
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'accepted': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const renderPlanCard = (plan: TrainingPlan) => {
    const totalExercises = plan.plan_data.weeks.reduce((total, week) => {
      return total + week.days.reduce((dayTotal, day) => {
        return dayTotal + day.exercises.length;
      }, 0);
    }, 0);

    const progress = plan.status === 'completed' ? 100 : 
                    plan.status === 'active' ? 25 : 0; // Mock progress

    return (
      <Card key={plan.id} className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {plan.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={getDifficultyColor(plan.difficulty_level)}>
                {plan.difficulty_level}
              </Badge>
              <Badge className={getStatusColor(plan.status)}>
                {plan.status}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Progress Bar for Active Plans */}
          {plan.status === 'active' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Plan Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{plan.duration_weeks} settimane</span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
              <span>{totalExercises} esercizi</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{plan.plan_data.weeks.length} settimane</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span>{plan.goals.length} obiettivi</span>
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

          {/* Preview of plan structure */}
          {plan.plan_data.weeks[0] && (
            <div className="border rounded-lg p-3 bg-muted/30">
              <h4 className="text-sm font-medium mb-2">Anteprima Piano:</h4>
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

          {/* Action Button */}
          <div className="pt-2">
            {plan.status === 'accepted' && (
              <Button 
                onClick={() => activatePlan(plan.id)}
                className="w-full"
              >
                <Play className="h-4 w-4 mr-2" />
                Inizia Piano
              </Button>
            )}
            {plan.status === 'active' && (
              <Button variant="outline" className="w-full">
                <Pause className="h-4 w-4 mr-2" />
                Visualizza Dettagli
              </Button>
            )}
            {plan.status === 'completed' && (
              <Button variant="outline" className="w-full" disabled>
                <CheckCircle className="h-4 w-4 mr-2" />
                Completato
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Training Program</h1>
            <p className="text-muted-foreground">I tuoi piani di allenamento personalizzati</p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground mt-2">Caricamento piani...</p>
        </div>
      </div>
    );
  }

  const activePlans = trainingPlans.filter(plan => plan.status === 'active');
  const acceptedPlans = trainingPlans.filter(plan => plan.status === 'accepted');
  const completedPlans = trainingPlans.filter(plan => plan.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Training Program</h1>
          <p className="text-muted-foreground">I tuoi piani di allenamento personalizzati</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <MessageCircle className="h-4 w-4" />
          <span>Chiedi nuovo piano</span>
        </Button>
      </div>

      {trainingPlans.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">Nessun piano di allenamento</h3>
            <p className="text-muted-foreground mb-4">
              Vai nella sezione Messaggi e chiedi al tuo AI trainer di creare un piano personalizzato per te!
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Esempio: "Crea un piano di allenamento per principianti di 8 settimane per perdere peso"
            </p>
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Vai ai Messaggi
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">
              Attuali ({activePlans.length + acceptedPlans.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completati ({completedPlans.length})
            </TabsTrigger>
            <TabsTrigger value="all">
              Tutti ({trainingPlans.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            {[...activePlans, ...acceptedPlans].length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">Nessun piano attuale</p>
                </CardContent>
              </Card>
            ) : (
              [...activePlans, ...acceptedPlans].map(renderPlanCard)
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedPlans.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">Nessun piano completato</p>
                </CardContent>
              </Card>
            ) : (
              completedPlans.map(renderPlanCard)
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {trainingPlans.map(renderPlanCard)}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}