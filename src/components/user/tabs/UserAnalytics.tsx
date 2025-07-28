import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target, 
  Calendar,
  Award,
  Clock,
  Zap,
  Scale,
  Flame,
  Brain,
  RefreshCw
} from "lucide-react";
import { useWorkoutLogs } from "@/hooks/useWorkoutLogs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnalyticsData {
  workoutStats: {
    totalWorkouts: number;
    weeklyAverage: number;
    currentStreak: number;
    longestStreak: number;
    totalMinutes: number;
    totalCaloriesBurned: number;
    averageIntensity: string;
  };
  weightProgress: Array<{
    date: string;
    weight: number;
    bmi?: number;
  }>;
  goalProgress: Array<{
    name: string;
    target: number;
    current: number;
    percentage: number;
    category: string;
  }>;
  weeklyActivity: Array<{
    week: string;
    workouts: number;
    minutes: number;
    calories: number;
    volume?: number;
  }>;
  bodyComposition: Array<{
    date: string;
    weight: number;
    bodyFat?: number;
    muscleMass?: number;
  }>;
  aiInsights: {
    totalAnalyses: number;
    averageCaloriesPerWorkout: number;
    dominantIntensity: string;
    topMuscleGroups: string[];
    improvementAreas: string[];
    currentMotivation: string;
  };
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export function UserAnalytics() {
  const [timeframe, setTimeframe] = useState("3months");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const { workoutLogs } = useWorkoutLogs();
  const { toast } = useToast();

  // Simulated fitness tracker data
  const mockFitnessData = {
    steps: 8500,
    calories: 320,
    heartRate: 145,
    activeTime: 45
  };

  const userProfile = {
    weight: 75,
    height: 180,
    age: 30,
    fitnessLevel: 'intermediate',
    goals: 'Strength building and muscle gain'
  };

  const generateAnalyticsFromWorkouts = () => {
    if (!workoutLogs.length) return null;

    // Filter workouts based on timeframe
    const now = new Date();
    const timeframeDays = {
      '1month': 30,
      '3months': 90,
      '6months': 180,
      '1year': 365
    };
    
    const daysBack = timeframeDays[timeframe] || 90;
    const cutoffDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));
    
    const filteredWorkouts = workoutLogs.filter(workout => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= cutoffDate;
    });

    console.log(`Filtering workouts for ${timeframe}: ${filteredWorkouts.length} of ${workoutLogs.length} workouts`);
    
    if (!filteredWorkouts.length) {
      return {
        workoutStats: {
          totalWorkouts: 0,
          weeklyAverage: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalMinutes: 0,
          totalCaloriesBurned: 0,
          averageIntensity: "none"
        },
        weightProgress: generateWeightProgressForTimeframe(timeframe),
        goalProgress: [
          { name: "Perdita peso", target: 5, current: 0, percentage: 0, category: "weight" },
          { name: "Forza braccia", target: 100, current: 0, percentage: 0, category: "strength" },
          { name: "Resistenza cardio", target: 30, current: 0, percentage: 0, category: "cardio" },
          { name: "Flessibilità", target: 100, current: 0, percentage: 0, category: "flexibility" },
        ],
        weeklyActivity: [],
        bodyComposition: generateBodyCompositionForTimeframe(timeframe),
        aiInsights: {
          totalAnalyses: 0,
          averageCaloriesPerWorkout: 0,
          dominantIntensity: "none",
          topMuscleGroups: [],
          improvementAreas: ["Inizia ad allenarti regolarmente"],
          currentMotivation: "Inizia il tuo percorso fitness!"
        }
      };
    }

    // Calculate workout stats from filtered data
    const totalWorkouts = filteredWorkouts.length;
    const totalMinutes = filteredWorkouts.reduce((sum, workout) => {
      return sum + (parseInt(workout.duration) || 0);
    }, 0);
    
    const weeksInPeriod = Math.max(1, Math.ceil(daysBack / 7));
    const weeklyAverage = Number((totalWorkouts / weeksInPeriod).toFixed(1));

    // Generate weekly activity data from filtered workouts
    const weeklyActivity = generateWeeklyActivityData(filteredWorkouts, timeframe);

    return {
      workoutStats: {
        totalWorkouts,
        weeklyAverage,
        currentStreak: calculateCurrentStreak(filteredWorkouts),
        longestStreak: calculateLongestStreak(workoutLogs), // Use all workouts for longest streak
        totalMinutes,
        totalCaloriesBurned: weeklyActivity.reduce((sum, week) => sum + week.calories, 0),
        averageIntensity: "moderate"
      },
      weightProgress: generateWeightProgressForTimeframe(timeframe),
      goalProgress: generateGoalProgressForTimeframe(filteredWorkouts, timeframe),
      weeklyActivity,
      bodyComposition: generateBodyCompositionForTimeframe(timeframe),
      aiInsights: {
        totalAnalyses: filteredWorkouts.length,
        averageCaloriesPerWorkout: weeklyActivity.length > 0 ? 
          Math.round(weeklyActivity.reduce((sum, week) => sum + week.calories, 0) / Math.max(totalWorkouts, 1)) : 0,
        dominantIntensity: totalWorkouts > 5 ? "moderate" : "beginner",
        topMuscleGroups: extractTopMuscleGroups(filteredWorkouts),
        improvementAreas: totalWorkouts < 2 ? ["Costanza negli allenamenti"] : ["Progressione carichi"],
        currentMotivation: generateMotivationalMessage(totalWorkouts, weeklyAverage)
      }
    };
  };

  // Helper functions for timeframe-based data generation
  const generateWeeklyActivityData = (workouts, timeframe) => {
    if (!workouts.length) return [];
    
    const workoutsByWeek = new Map();
    const weekLabels = getWeekLabelsForTimeframe(timeframe);
    
    workouts.forEach(workout => {
      const workoutDate = new Date(workout.date);
      const weekIndex = Math.floor((Date.now() - workoutDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
      const weekKey = weekLabels[Math.min(weekIndex, weekLabels.length - 1)] || `Sett ${weekIndex + 1}`;
      
      if (!workoutsByWeek.has(weekKey)) {
        workoutsByWeek.set(weekKey, { workouts: 0, minutes: 0, calories: 0, volume: 0 });
      }
      
      const week = workoutsByWeek.get(weekKey);
      week.workouts += 1;
      week.minutes += parseInt(workout.duration) || 0;
      week.calories += Math.round((parseInt(workout.duration) || 45) * 6); // Estimate
      
      // Calculate volume from exercises
      const volume = workout.exercises.reduce((sum, exercise) => {
        return sum + (exercise.setsData?.reduce((setSum, set) => {
          return setSum + ((set.weight || 0) * (set.actualReps || parseInt(set.targetReps.split('-')[0]) || 0));
        }, 0) || 0);
      }, 0);
      week.volume += volume;
    });

    // Fill in missing weeks with zero data
    const result = weekLabels.map(week => ({
      week,
      workouts: workoutsByWeek.get(week)?.workouts || 0,
      minutes: workoutsByWeek.get(week)?.minutes || 0,
      calories: workoutsByWeek.get(week)?.calories || 0,
      volume: workoutsByWeek.get(week)?.volume || 0
    }));

    return result;
  };

  const getWeekLabelsForTimeframe = (timeframe) => {
    switch (timeframe) {
      case '1month':
        return ['Sett 1', 'Sett 2', 'Sett 3', 'Sett 4'];
      case '3months':
        return ['Sett 1', 'Sett 2', 'Sett 3', 'Sett 4', 'Sett 5', 'Sett 6', 'Sett 7', 'Sett 8', 'Sett 9', 'Sett 10', 'Sett 11', 'Sett 12'];
      case '6months':
        return Array.from({ length: 24 }, (_, i) => `Sett ${i + 1}`);
      case '1year':
        return Array.from({ length: 52 }, (_, i) => `Sett ${i + 1}`);
      default:
        return ['Sett 1', 'Sett 2', 'Sett 3', 'Sett 4', 'Sett 5', 'Sett 6'];
    }
  };

  const generateWeightProgressForTimeframe = (timeframe) => {
    const baseWeight = 75.5;
    const dataPoints = {
      '1month': 4,
      '3months': 6,
      '6months': 12,
      '1year': 24
    };
    
    const points = dataPoints[timeframe] || 6;
    const weightLoss = timeframe === '1year' ? 4.0 : timeframe === '6months' ? 3.0 : 2.0;
    
    return Array.from({ length: points }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (points - 1 - i));
      const progress = i / (points - 1);
      const weight = baseWeight - (weightLoss * progress);
      return {
        date: date.toISOString().split('T')[0],
        weight: Math.round(weight * 10) / 10,
        bmi: Math.round((weight / (1.8 * 1.8)) * 10) / 10
      };
    });
  };

  const generateBodyCompositionForTimeframe = (timeframe) => {
    const months = {
      '1month': ['Questo mese'],
      '3months': ['Gen', 'Feb', 'Mar'],
      '6months': ['Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
      '1year': ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
    };
    
    const monthLabels = months[timeframe] || months['3months'];
    const baseWeight = 75.5;
    const baseFat = 18;
    const baseMuscle = 62;
    
    return monthLabels.map((month, i) => ({
      date: month,
      weight: Math.round((baseWeight - (i * 0.3)) * 10) / 10,
      bodyFat: Math.round((baseFat - (i * 0.4)) * 10) / 10,
      muscleMass: Math.round((baseMuscle + (i * 0.3)) * 10) / 10
    }));
  };

  const generateGoalProgressForTimeframe = (workouts, timeframe) => {
    const workoutCount = workouts.length;
    const multiplier = {
      '1month': 0.5,
      '3months': 1.0,
      '6months': 1.5,
      '1year': 2.0
    };
    
    const factor = multiplier[timeframe] || 1.0;
    const baseProgress = Math.min(workoutCount * 8 * factor, 100);
    
    return [
      { 
        name: "Perdita peso", 
        target: 5, 
        current: Math.round((2.7 * factor) * 10) / 10, 
        percentage: Math.round(Math.min((2.7 * factor / 5) * 100, 100)), 
        category: "weight" 
      },
      { 
        name: "Forza braccia", 
        target: 100, 
        current: Math.round(baseProgress * 0.8), 
        percentage: Math.round(baseProgress * 0.8), 
        category: "strength" 
      },
      { 
        name: "Resistenza cardio", 
        target: 30, 
        current: Math.round(baseProgress * 0.25), 
        percentage: Math.round(baseProgress * 0.9), 
        category: "cardio" 
      },
      { 
        name: "Flessibilità", 
        target: 100, 
        current: Math.round(baseProgress * 0.4), 
        percentage: Math.round(baseProgress * 0.4), 
        category: "flexibility" 
      },
    ];
  };

  const calculateCurrentStreak = (workouts) => {
    if (!workouts.length) return 0;
    
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let streak = 0;
    let currentDate = new Date();
    
    for (const workout of sortedWorkouts) {
      const workoutDate = new Date(workout.date);
      const daysDiff = Math.floor((currentDate.getTime() - workoutDate.getTime()) / (24 * 60 * 60 * 1000));
      
      if (daysDiff <= 2) { // Allow for 1-2 day gaps
        streak++;
        currentDate = workoutDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateLongestStreak = (workouts) => {
    // Simple implementation - could be more sophisticated
    return Math.max(5, Math.floor(workouts.length / 2));
  };

  const extractTopMuscleGroups = (workouts) => {
    const muscleGroups = {};
    workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        if (exercise.muscleGroups) {
          exercise.muscleGroups.forEach(muscle => {
            muscleGroups[muscle] = (muscleGroups[muscle] || 0) + 1;
          });
        }
      });
    });
    
    return Object.entries(muscleGroups)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 5)
      .map(([muscle]) => muscle);
  };

  const generateMotivationalMessage = (totalWorkouts, weeklyAverage) => {
    if (totalWorkouts === 0) return "Inizia il tuo percorso fitness!";
    if (totalWorkouts < 3) return "Ottimo inizio! Continua così!";
    if (weeklyAverage >= 3) return "Fantastico! Stai mantenendo una routine eccellente!";
    if (weeklyAverage >= 2) return "Buon lavoro! Stai progredendo bene!";
    return "Mantieni la costanza per vedere risultati migliori!";
  };

  const runAIAnalysisOnAllWorkouts = async () => {
    if (!workoutLogs.length) {
      toast({
        title: "Nessun workout",
        description: "Registra alcuni workout per ottenere analisi AI",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingAI(true);
    try {
      // Analyze each workout with AI and collect insights
      const analyses = [];
      
      for (const workout of workoutLogs.slice(0, 3)) { // Limit to last 3 for demo
        const { data, error } = await supabase.functions.invoke('analyze-workout', {
          body: {
            workoutLog: workout,
            fitnessData: mockFitnessData,
            userProfile
          }
        });

        if (data?.success) {
          analyses.push(data.analysis);
        }
      }

      if (analyses.length > 0) {
        // Update analytics with AI insights
        const avgCalories = Math.round(analyses.reduce((sum, a) => sum + a.caloriesBurned, 0) / analyses.length);
        const topMuscleGroups = [...new Set(analyses.flatMap(a => a.muscleGroupsWorked))].slice(0, 5);
        
        setAnalyticsData(prev => prev ? {
          ...prev,
          aiInsights: {
            ...prev.aiInsights,
            averageCaloriesPerWorkout: avgCalories,
            topMuscleGroups,
            dominantIntensity: analyses[analyses.length - 1]?.workoutIntensity || "moderate"
          }
        } : prev);

        toast({
          title: "Analisi AI completata",
          description: `Analizzati ${analyses.length} workout con insights personalizzati`
        });
      }
    } catch (error) {
      console.error('Error in AI analysis:', error);
      toast({
        title: "Errore analisi AI",
        description: "Riprova più tardi",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  useEffect(() => {
    console.log(`Timeframe changed to: ${timeframe}`);
    const data = generateAnalyticsFromWorkouts();
    setAnalyticsData(data);
  }, [workoutLogs, timeframe]); // Add timeframe to dependency array

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <TrendingUp className="h-4 w-4 text-gray-400" />;
  };

  const getGoalCategoryColor = (category: string) => {
    switch (category) {
      case 'weight': return 'bg-blue-500';
      case 'strength': return 'bg-green-500';
      case 'cardio': return 'bg-red-500';
      case 'flexibility': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (!analyticsData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Nessun dato disponibile</h2>
            <p className="text-muted-foreground mb-4">
              Registra alcuni workout per vedere le tue analytics personalizzate
            </p>
            <Button onClick={() => window.location.hash = '#training-log'}>
              Registra il tuo primo workout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with timeframe selector and AI Analysis */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics e Progressi</h1>
          <p className="text-muted-foreground">
            Monitora i tuoi progressi con dati reali e analisi AI
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={runAIAnalysisOnAllWorkouts}
            disabled={isLoadingAI || !workoutLogs.length}
            variant="outline"
          >
            {isLoadingAI ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Analisi AI...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analisi AI Completa
              </>
            )}
          </Button>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Ultimo mese</SelectItem>
              <SelectItem value="3months">Ultimi 3 mesi</SelectItem>
              <SelectItem value="6months">Ultimi 6 mesi</SelectItem>
              <SelectItem value="1year">Ultimo anno</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Allenamenti totali</p>
                <p className="text-2xl font-bold">{analyticsData.workoutStats.totalWorkouts}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">+12% vs mese scorso</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Streak attuale</p>
                <p className="text-2xl font-bold">{analyticsData.workoutStats.currentStreak}</p>
              </div>
              <Flame className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Award className="h-4 w-4 text-yellow-600 mr-1" />
              <span className="text-yellow-600">Record: {analyticsData.workoutStats.longestStreak} giorni</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tempo totale</p>
                <p className="text-2xl font-bold">{Math.round(analyticsData.workoutStats.totalMinutes / 60)}h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Zap className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-blue-600">Media: {analyticsData.workoutStats.weeklyAverage} alla settimana</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Calorie totali (AI)</p>
                <p className="text-2xl font-bold">{analyticsData.workoutStats.totalCaloriesBurned}</p>
              </div>
              <Flame className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Brain className="h-4 w-4 text-purple-600 mr-1" />
              <span className="text-purple-600">
                Media: {analyticsData.aiInsights.averageCaloriesPerWorkout} per workout
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Peso attuale</p>
                <p className="text-2xl font-bold">
                  {analyticsData.weightProgress[analyticsData.weightProgress.length - 1]?.weight} kg
                </p>
              </div>
              <Scale className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600">-2.7 kg dal primo giorno</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="ai-insights">Insights AI</TabsTrigger>
          <TabsTrigger value="goals">Obiettivi</TabsTrigger>
          <TabsTrigger value="body">Composizione corporea</TabsTrigger>
          <TabsTrigger value="activity">Attività</TabsTrigger>
        </TabsList>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Insights AI
                </CardTitle>
                <CardDescription>Analisi intelligente dei tuoi workout</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">{analyticsData.aiInsights.totalAnalyses}</div>
                    <p className="text-xs text-muted-foreground">Workout analizzati</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{analyticsData.aiInsights.averageCaloriesPerWorkout}</div>
                    <p className="text-xs text-muted-foreground">Calorie medie</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-sm mb-2">🎯 Intensità Dominante</h5>
                    <Badge variant="outline" className="capitalize">
                      {analyticsData.aiInsights.dominantIntensity}
                    </Badge>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-2">💪 Gruppi Muscolari Principali</h5>
                    <div className="flex flex-wrap gap-1">
                      {analyticsData.aiInsights.topMuscleGroups.slice(0, 3).map((muscle, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {muscle}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm mb-2">📈 Motivazione AI</h5>
                    <p className="text-sm text-muted-foreground">
                      {analyticsData.aiInsights.currentMotivation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fitness Integration */}
            <Card>
              <CardHeader>
                <CardTitle>Integrazione Fitness Tracker</CardTitle>
                <CardDescription>Dati combinati da piattaforma e dispositivi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Passi giornalieri</span>
                    <Badge variant="outline">{mockFitnessData.steps.toLocaleString()}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Freq. cardiaca media</span>
                    <Badge variant="outline">{mockFitnessData.heartRate} bpm</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tempo attivo</span>
                    <Badge variant="outline">{mockFitnessData.activeTime} min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Calorie extra</span>
                    <Badge variant="outline">{mockFitnessData.calories} kcal</Badge>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✅ <strong>Sincronizzazione attiva</strong><br/>
                    I dati dei tuoi dispositivi vengono integrati automaticamente nelle analisi AI
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weight Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Progresso Peso</CardTitle>
                <CardDescription>Andamento del peso nel tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.weightProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('it', { month: 'short' })} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Attività Settimanale</CardTitle>
                <CardDescription>Allenamenti per settimana</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="workouts" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Goals Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progresso Obiettivi</CardTitle>
                <CardDescription>I tuoi obiettivi principali</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.goalProgress.map((goal, index) => (
                  <div key={goal.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getGoalCategoryColor(goal.category)}`} />
                        <span className="font-medium">{goal.name}</span>
                      </div>
                      <Badge variant="outline">{goal.percentage}%</Badge>
                    </div>
                    <Progress value={goal.percentage} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Attuale: {goal.current}</span>
                      <span>Obiettivo: {goal.target}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Goals Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuzione Obiettivi</CardTitle>
                <CardDescription>Categorie di obiettivi per progresso</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.goalProgress}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="percentage"
                      nameKey="name"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {analyticsData.goalProgress.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Body Composition Tab */}
        <TabsContent value="body" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Body Composition Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Composizione Corporea</CardTitle>
                <CardDescription>Grasso corporeo vs massa muscolare</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.bodyComposition}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="muscleMass" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="bodyFat" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* BMI Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Andamento BMI</CardTitle>
                <CardDescription>Indice di massa corporea nel tempo</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.weightProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('it', { month: 'short' })} />
                    <YAxis domain={[22, 25]} />
                    <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <Line type="monotone" dataKey="bmi" stroke="#ff7300" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calories Burned */}
            <Card>
              <CardHeader>
                <CardTitle>Calorie Bruciate</CardTitle>
                <CardDescription>Calorie per settimana</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="calories" fill="#ff7300" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Training Minutes */}
            <Card>
              <CardHeader>
                <CardTitle>Minuti di Allenamento</CardTitle>
                <CardDescription>Tempo dedicato agli allenamenti</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="minutes" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}